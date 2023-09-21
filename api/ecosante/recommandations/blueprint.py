from datetime import datetime
from itertools import chain

from flask import (abort, flash, jsonify, redirect, render_template, request,
                   stream_with_context, url_for)
from flask.wrappers import Response
from sqlalchemy import func, or_

from ecosante.extensions import admin_authenticator
from ecosante.newsletter.models import NewsletterDB
from ecosante.recommandations.forms import FormAdd, FormEdit, FormSearch
from ecosante.recommandations.models import Recommandation, db
from ecosante.utils import Blueprint
from ecosante.utils.funcs import generate_line

bp = Blueprint(
    "recommandations",
    __name__,
)


@bp.route('_list')
def list_recommandations():
    form = FormSearch(request.args)
    query = make_query(form)
    return jsonify(query.filter(Recommandation.status == "published").all())


@bp.route('_rendu_markdown', methods=['POST'])
def rendu_markdown():
    return Recommandation.sanitizer(request.form.get('to_render'))


@bp.route('add', methods=['GET', 'POST'])
@admin_authenticator.route
def add():
    form = FormAdd()
    if request.method == "POST":
        recommandation = Recommandation()
        form.populate_obj(recommandation)
        db.session.add(recommandation)
        db.session.commit()
        flash("Recommandation ajoutée")
        return redirect(url_for("recommandations.list_"))
    return render_template(
        "edit.html",
        form=form,
        action="Ajouter"
    )


@bp.route('edit/<id>', methods=['GET', 'POST'])
@admin_authenticator.route
# pylint: disable-next=invalid-name,redefined-builtin
def edit(id):
    recommandation = db.session.query(Recommandation).get(id)
    if not recommandation:
        abort(404)
    form = FormEdit(obj=recommandation)
    if request.method == "POST" and form.validate():
        form.populate_obj(recommandation)
        db.session.add(recommandation)
        db.session.commit()
        return redirect(url_for("recommandations.list_", **request.args.to_dict(flat=False)))
    return render_template(
        "edit.html",
        form=form,
        action="Éditer",
        recommandation=recommandation
    )


@bp.route('remove/<id>', methods=["GET", "POST"])
@admin_authenticator.route
# pylint: disable-next=invalid-name,redefined-builtin
def remove(id):
    recommandation = Recommandation.query.get(id)
    if request.method == "POST":
        recommandation.delete()
        db.session.commit()
        flash("Recommandation supprimée")
        return redirect(url_for("recommandations.list_"))
    return render_template(
        "remove.html",
        id=id,
        recommandation=recommandation
    )


def make_query(form):
    query = Recommandation.query
    if form.search.data:
        search = f"%{form.search.data}%"
        query = query.filter(
            or_(
                Recommandation.recommandation.ilike(search),
                Recommandation.precisions.ilike(search),
                Recommandation.categorie.ilike(search)
            )
        )
    if form.status.data:
        query = query.filter(Recommandation.status == form.status.data)
    else:
        query = query.filter(
            or_(
                Recommandation.status is None,
                Recommandation.status != 'deleted'
            )
        )
    for categorie in form.categories.data:
        attr = getattr(Recommandation, categorie)
        if attr.type.python_type == list:
            query = query.filter(func.cardinality(attr) > 0)
        else:
            query = query.filter(attr.is_(True))

    if form.type.data is not None and form.type.data != "None":
        query = query.filter(Recommandation.type_ == form.type.data)
    if form.order.data == 'random':
        return query.order_by(func.random())
    return query.order_by(Recommandation.id)


@bp.route('/', methods=["GET", "POST"])
@admin_authenticator.route
def list_():
    form = FormSearch(request.args)
    query = make_query(form)
    return render_template(
        "list.html",
        recommandations=query.all(),
        count=query.count(),
        form=form,
    )


@bp.route('/csv', methods=["GET", "POST"])
@admin_authenticator.route
def csv():
    form = FormSearch(request.args)
    query = make_query(form)

    return Response(
        stream_with_context(
            chain(
                generate_line(Recommandation().to_dict().keys()),
                map(
                    lambda line: generate_line(line.to_dict().values()),
                    query.all()
                )
            )
        ),
        mimetype="text/csv",
        headers={
            # pylint: disable-next=line-too-long
            "Content-Disposition": f"attachment; filename=recommandations-export-{datetime.now().strftime('%Y-%m-%d_%H%M')}.csv"
        }
    )


@bp.route('/<id>/details')
@admin_authenticator.route
# pylint: disable-next=invalid-name,redefined-builtin
def details(id):
    recommandation = Recommandation.query.get(id)
    if not recommandation:
        return abort(404)

    newsletters = NewsletterDB.query\
        .filter_by(recommandation_id=id)\
        .filter(NewsletterDB.appliquee.isnot(None))\
        .order_by(NewsletterDB.date.desc())\
        .all()

    return render_template(
        "details.html",
        recommandation=recommandation,
        newsletters=newsletters,
    )
