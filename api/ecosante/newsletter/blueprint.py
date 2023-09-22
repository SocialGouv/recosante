from calendar import THURSDAY
from datetime import date, datetime, timedelta

import sib_api_v3_sdk
from flask import (abort, current_app, redirect, render_template, request,
                   url_for)
from flask.helpers import flash
from indice_pollution.helpers import today
from indice_pollution.history.models import IndiceATMO
from indice_pollution.history.models.indice_uv import IndiceUv
from indice_pollution.history.models.vigilance_meteo import VigilanceMeteo
from psycopg2.extras import DateTimeTZRange
from sqlalchemy import func, funcfilter

from ecosante.extensions import admin_authenticator, db, sib
from ecosante.inscription.models import Inscription
from ecosante.newsletter.forms import FormTemplateAdd, FormTemplateEdit
from ecosante.newsletter.models import (Newsletter, NewsletterDB,
                                        NewsletterHebdoTemplate)
from ecosante.newsletter.tasks.import_in_sb import import_
from ecosante.newsletter.tasks.send_webpush_notifications import (
    send_webpush_notification, vapid_claims)
from ecosante.recommandations.models import Recommandation
from ecosante.utils import Blueprint

bp = Blueprint("newsletter", __name__)


@bp.route('<short_id>/avis', methods=['POST'])
def avis(short_id):
    newsletter = db.session.query(
        NewsletterDB).filter_by(short_id=short_id).first()
    if not newsletter:
        abort(404)
    newsletter.appliquee = request.args.get(
        'avis') == 'oui' or request.args.get('appliquee') == 'oui'
    db.session.add(newsletter)
    db.session.commit()
    return {
        "short_id": newsletter.short_id,
        "avis": newsletter.avis,
        "recommandation": newsletter.recommandation,
        "appliquee": newsletter.appliquee
    }


@bp.route('/avis/liste')
@admin_authenticator.route
def liste_avis():
    offset = (date(2023, 9, 6).weekday() - THURSDAY) % 7
    last_thursday = date(2023, 9, 6) - timedelta(days=offset)
    liste_avis_hebdos = db.session.query(
        NewsletterDB.newsletter_hebdo_template_id,
        NewsletterHebdoTemplate.sib_id,
        func.count('1').label('nb_envois'),
        funcfilter(func.count('1'), NewsletterDB.appliquee.is_(
            True)).label('nb_avis_positifs'),
        funcfilter(func.count('1'), NewsletterDB.appliquee.is_not(
            None)).label('nb_avis'),
        funcfilter(func.count('&'), NewsletterDB.date ==
                   last_thursday).label('nb_envois_semaine_passee')
    )\
        .join(NewsletterHebdoTemplate)\
        .filter(
        NewsletterDB.newsletter_hebdo_template_id.is_not(None))\
        .group_by(NewsletterDB.newsletter_hebdo_template_id, NewsletterHebdoTemplate.sib_id)\
        .all()
    nb_avis = sum(i['nb_avis'] for i in liste_avis_hebdos)
    nb_avis_positifs = sum(i['nb_avis_positifs'] for i in liste_avis_hebdos)
    nb_envois = sum(i['nb_envois'] for i in liste_avis_hebdos)

    return render_template(
        'liste_avis.html',
        liste_avis_hebdos=liste_avis_hebdos,
        nb_avis=nb_avis,
        nb_avis_positifs=nb_avis_positifs,
        nb_envois=nb_envois,
        sib_api_key=sib.configuration.api_key['api-key']
    )


@bp.route('/test', methods=['GET', 'POST'])
@admin_authenticator.route
def test():
    if request.method == "GET":
        return render_template("test.html")
    indice_atmo = int(request.form.get("indice_atmo"))
    uid = request.form.get("uid")
    inscription = Inscription.query.filter_by(uid=uid).first()
    nb_mails = 0
    nb_notifications = 0
    nb_notifications_sent = 0
    phenomene_to_phenomene_id = {v: k for k,
                                 v in VigilanceMeteo.phenomenes.items()}
    couleur_to_couleur_id = {v: k for k, v in VigilanceMeteo.couleurs.items()}
    recommandations = Recommandation.published_query().all()
    indice_uv = IndiceUv()
    indice_uv.uv_jo = request.form.get("indice_uv", type=int)
    for media in inscription.indicateurs_media:
        newsletter = Newsletter(
            inscription=inscription,
            forecast={"data": [{"date": str(date(2023, 9, 6)), "label": IndiceATMO.label_from_valeur(
                indice_atmo), "couleur": IndiceATMO.couleur_from_valeur(indice_atmo)}]},
            raep=int(request.form.get("raep")),
            allergenes=dict(zip(request.form.getlist(
                'allergene_nom[]'), request.form.getlist('allergene_value[]'))),
            validite_raep={
                "debut": date(2023, 9, 6).strftime("%d/%m/%Y"),
                "fin": (date(2023, 9, 6)+timedelta(days=7)).strftime("%d/%m/%Y")
            },
            vigilances=Newsletter.get_vigilances_recommandations(
                [
                    VigilanceMeteo(
                        zone_id=inscription.commune.departement.zone_id,
                        couleur_id=couleur_to_couleur_id[c],
                        phenomene_id=phenomene_to_phenomene_id[ph],
                        date_export=datetime.now() - timedelta(minutes=30),
                        validity=DateTimeTZRange(
                            datetime.now() - timedelta(hours=6), datetime.now() + timedelta(hours=6)),
                    )
                    for c, ph in zip(
                        request.form.getlist('vigilance_couleur[]'),
                        request.form.getlist('vigilance_phenomene[]')
                    )
                ],
                recommandations
            ),
            recommandations=recommandations,
            indice_uv=indice_uv
        )
        if media == "mail":
            import_(None, newsletters=[newsletter], force_send=True, test=True)
            nb_mails += 1
        elif media == "notifications_web":
            for webpush_subscriptions_info in inscription.webpush_subscriptions_info:
                newsletter.webpush_subscription_info = webpush_subscriptions_info
                newsletter.webpush_subscription_info_id = webpush_subscriptions_info.id
                if send_webpush_notification(NewsletterDB(newsletter), vapid_claims):
                    nb_notifications_sent += 1
                nb_notifications += 1

    return render_template(
        "test_ok.html",
        nb_mails=nb_mails,
        nb_notifications=nb_notifications,
        nb_notifications_sent=nb_notifications_sent)


@bp.route('/newsletter_hebdo_templates', methods=['GET', 'POST'])
@admin_authenticator.route
def newsletter_hebdo():
    templates_db = NewsletterHebdoTemplate.query.order_by(
        NewsletterHebdoTemplate.ordre).all()
    templates = []
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib)
    for template_db in templates_db:
        template = {"db": template_db, "is_active": False}
        try:
            api_response = api_instance.get_smtp_template(template_db.sib_id)
            template["is_active"] = api_response.is_active
        except sib_api_v3_sdk.rest.ApiException:
            current_app.logger.info(
                f"Template SIB {template_db.sib_id} inexistant")
        templates.append(template)
    return render_template("newsletter_hebdo_templates.html", templates=templates)


@bp.route('/newsletter_hebdo/_add', methods=['GET', 'POST'])
@bp.route('/newsletter_hebdo/<int:id_>/_edit', methods=['GET', 'POST'])
@admin_authenticator.route
def newsletter_hebdo_form(id_=None):
    form_cls = FormTemplateEdit if id_ else FormTemplateAdd
    form = form_cls(obj=NewsletterHebdoTemplate.query.get(id_))
    (dernier_ordre,) = db.session.query(
        func.max(NewsletterHebdoTemplate.ordre)).first()
    form.ordre.description = f"Dernier ordre ajouté : {dernier_ordre}"
    if request.method == "GET":
        return render_template("newsletter_hebdo_form.html", form=form)
    if form.validate_on_submit():
        template = NewsletterHebdoTemplate.query.get(
            id_) or NewsletterHebdoTemplate()
        form.populate_obj(template)
        db.session.add(template)
        db.session.commit()
        flash(
            "Template édité !" if id_ else "Template ajouté"
        )
        return redirect(url_for("newsletter.newsletter_hebdo"))
    return render_template("newsletter_hebdo_form.html", form=form)
