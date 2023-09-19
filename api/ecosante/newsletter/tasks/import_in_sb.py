import os
from datetime import datetime, timedelta
from uuid import uuid4

import sib_api_v3_sdk
from flask import current_app
from sib_api_v3_sdk.api.lists_api import ListsApi
from sib_api_v3_sdk.rest import ApiException

from ecosante.extensions import celery, db, sib
from ecosante.inscription.models import Inscription
from ecosante.newsletter.models import Newsletter, NewsletterDB
from ecosante.utils.cache import cache_lock, cache_unlock
from ecosante.utils.healthchecksio import ping
from ecosante.utils.send_log_mail import send_log_mail

def get_all_contacts(limit=100):
    current_app.logger.info(f"Faking get_all_contacts with limit={limit}")
    return []

def get_blacklisted_contacts(contacts):
    return [c for c in contacts if c['emailBlacklisted']]

def deactivate_contacts(contacts):
    for contact in get_blacklisted_contacts(contacts):
        db_contact = Inscription.active_query().filter(
            Inscription.mail == contact['email']).first()
        if not db_contact or not db_contact.is_active:
            continue
        db_contact.unsubscribe()

def delete_lists():
    return

def import_and_send(type_='quotidien', force_send=False):
    send_in_blue_contacts = get_all_contacts()
    deactivate_contacts(send_in_blue_contacts)
    delete_lists()
    result = import_(type_=type_, force_send=force_send,
                     send_in_blue_contacts=send_in_blue_contacts)
    result['progress'] = 100
    if current_app.config['ENV'] == 'production':
        db.session.commit()
    return result

def send(campaign_id, type_, test=False):
    current_app.logger.info(
            f"Envoi en cours de la campagne: {campaign_id}")

def create_mail_list(now, test):
    return 123456789


def get_mail_list_id(newsletter, template_id_mail_list_id, now, test):
    template_sib_id = newsletter.newsletter_hebdo_template.sib_id if newsletter.newsletter_hebdo_template else None
    if not template_sib_id in template_id_mail_list_id:
        template_id_mail_list_id[template_sib_id] = create_mail_list(now, test)
    return template_id_mail_list_id[template_sib_id]


def import_(
        type_='quotidien',
        force_send=False,
        test=False,
        mail_list_id=None,
        newsletters=None,
        activate_webhook=True,
        filter_already_sent=True,
        send_in_blue_contacts=None):

    if send_in_blue_contacts is None:
        send_in_blue_contacts = []

    now = datetime.now()
    current_app.logger.info(f"Import en cours {now}, type={type_}, force_send={force_send}, test={test}, mail_list_id={mail_list_id}, activate_webhook={activate_webhook}, filter_already_sent={filter_already_sent}")
    errors, template_id_mail_list_id = import_in_db(
        now, type_, force_send, test, mail_list_id, newsletters, filter_already_sent)
    import_contacts_in_sb_all(template_id_mail_list_id,
                              now, type_, test, activate_webhook, send_in_blue_contacts)

    return {
        "state": "STARTED",
        "progress": 100,
        "details": "Terminé",
        "errors": errors
    }


def import_in_db(
        now,
        type_='quotidien',
        force_send=False,
        test=False,
        mail_list_id=None,
        newsletters=None,
        filter_already_sent=True):

    errors = []
    template_id_mail_list_id = {}
    if mail_list_id:
        template_id_mail_list_id[None] = mail_list_id

    def row2dict(row):
        return {
            c.name: getattr(row, c.name) for c in row.__table__.columns if not c.name in ["id", "short_id"]
        }

    to_add = []
    for newsletter in (newsletters or Newsletter.export(type_=type_, force_send=force_send, filter_already_sent=filter_already_sent)):
        current_app.logger.info('Newsletter?')
        print(newsletter)
        nldb = NewsletterDB(newsletter, get_mail_list_id(
            newsletter, template_id_mail_list_id, now, test))
        errors.extend(newsletter.errors)
        current_app.logger.info(
                f"Création de l’objet NewsletterDB pour {nldb.inscription_id}, template: {nldb.newsletter_hebdo_template_id}, mail_list_id: {nldb.mail_list_id}")
        to_add.append(nldb)
        current_app.logger.info(
            f"Création de l’objet NewsletterDB pour {nldb.inscription_id}, template: {nldb.newsletter_hebdo_template_id}, mail_list_id: {nldb.mail_list_id} ")
    current_app.logger.info('to_add?')

    print(list(map(row2dict, to_add)))

    db.engine.execute(NewsletterDB.__table__.insert(),
                        list(map(row2dict, to_add)))
    current_app.logger.info(
        "Commit des newsletters dans la base de données")
    return errors, template_id_mail_list_id

def import_contacts_in_sb_all(
        template_id_mail_list_id,
        now,
        type_,
        test,
        activate_webhook,
        send_in_blue_contacts):

    _ = activate_webhook
    if current_app.config['ENV'] == 'production' or test:
        for template_id, mail_list_id in template_id_mail_list_id.items():
            campaign_id = create_campaign(
                now, mail_list_id=mail_list_id, template_id=template_id, type_=type_)
            send(campaign_id, type_)


def check_campaign_already_sent(email_campaign_api, mail_list_id):
    api_response = email_campaign_api.get_email_campaigns(limit=20)
    return any(
        mail_list_id in c['recipients']['lists']
        for c in api_response.campaigns
        if 'recipients' in c and 'lists' in c['recipients'] and isinstance(c['recipients']['lists'], list)
    )


def create_campaign(now, mail_list_id, template_id=None, type_='quotidien', test=False):
    def get_tag(test, type_):
        if test:
            return "test_newsletter"
        if type_ == 'hebdomadaire':
            return "newsletter_hebdo"
        return "newsletter"

    email_campaign_id = 0
    current_app.logger.info(
        f"Campagne créée {email_campaign_id} avec la liste {mail_list_id}, now: {now}, template_id:{template_id}")
    return email_campaign_id


def format_errors(errors):
    if not errors:
        return ''
    response = ''
    response_2 = ''
    regions = {}
    errors_types = {
        "no_air_quality": "Pas de qualité de l’air",
        "nothing_to_show": "Aucune donnée à montrer",
        "no_template_weekly_nl": "Pas de template pour la newsletter hebdomadaire"
    }
    for error in errors:
        if error['type'] == 'no_template_weekly_nl':
            response += f"Pas de template de newsletter hebdomadaire pour {error['mail']} (Inscription[{error['inscription_id']})"
            continue
        response += f"{errors_types.get(error['type'], error['type'])} pour la ville de {error['ville']} ({error['insee']}) région: '{error['region']}'\n"
        response_2 += f"{error['ville']}, {error['insee']}, {error['region']}\n"
        regions.setdefault(error['region'], 0)
        regions[error['region']] += 1
    response += '\n'
    for region, i in regions.items():
        response += f'La région {region} a eu {i} erreurs\n'
    response += '\n'
    response += response_2

    return response


def make_nom_ping(type_):
    return "envoi-email-quotidien" if type_ == "quotidien" else "envoi-email-hebdomadaire"


def import_send_and_report(type_='quotidien', force_send=False, report=False):
    nom_ping = make_nom_ping(type_)
    ping(nom_ping, "start")
    current_app.logger.info(f"Début ! type={type_}, force_send={force_send}, report={report}")

    lock_id = f"type={type_}"
    result = import_and_send(type_=type_, force_send=force_send)
    if report:
        errors = format_errors(result['errors'])
        body = """
Bonjour,
Il n’y a pas eu d’erreur lors de l’envoi de la newsletter
Bonne journée !
""" if not errors else f"""
Bonjour,
Il y a eu des erreurs lors de l’envoi de la newsletter :
{errors}

Bonne journée
    """
        send_log_mail("Rapport d’envoi de la newsletter", body,
                      name="Rapport recosante", email="rapport-envoi@recosante.beta.gouv.fr")
    cache_unlock(lock_id)
    ping(nom_ping, "success")
    return result


def get_lists_ids_to_delete():
    api_instance = sib_api_v3_sdk.ContactsApi(sib)
    return []
