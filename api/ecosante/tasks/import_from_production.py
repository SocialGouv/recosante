import os
from datetime import datetime, timedelta
from itertools import chain

from faker import Faker
from flask.globals import current_app
from indice_pollution.history.models import (Commune, EpisodePollution,
                                             IndiceATMO, Zone)
from sqlalchemy import create_engine, func, inspect
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import sessionmaker

from ecosante.extensions import celery, db
from ecosante.inscription.models import Inscription, WebpushSubscriptionInfo
from ecosante.newsletter.models import NewsletterDB, NewsletterHebdoTemplate
from ecosante.recommandations.models import Recommandation


def clone_data(model, model_b=None, **kwargs):
    _ = model_b
    # Ensure the model’s data is loaded before importing.
    if hasattr(model, "id"):
        # pylint: disable-next=pointless-statement
        model.id
    elif hasattr(model, "valeur"):
        # pylint: disable-next=pointless-statement
        model.valeur

    i = inspect(model.__class__)
    relationships_columns = i.relationships.keys()
    non_relationships_columns = [
        k for k in i.columns.keys() if k not in relationships_columns]
    data = {c: getattr(model, c) for c in non_relationships_columns}
    data.update(kwargs)
    return data


def clone_model(model, model_b=None, **kwargs):
    data = clone_data(model, model_b, **kwargs)
    if not model_b:
        clone = model.__class__(**data)
        return clone
    table = model.__table__
    i = inspect(model.__class__)
    for key in chain(table.primary_key.columns.keys(), i.relationships.keys()):
        if key in data:
            del data[key]
    for key, value in data.items():
        setattr(model_b, key, value)
    return model_b


def import_inscriptions(prod_session):
    faker = Faker(locale='fr_FR.utf8')

    staging_inscriptions = {i.id: i for i in Inscription.query.all()}
    communes = {c.insee: c.id for c in Commune.query.all()}
    pas_de_commune = 0
    avec_commune = 0
    for inscription in prod_session.query(Inscription).yield_per(100):
        insee = inscription.commune.insee if inscription.commune else inscription.ville_insee
        if inscription.id in staging_inscriptions:
            new_inscription = clone_model(
                inscription, staging_inscriptions[inscription.id])
        else:
            new_inscription = clone_model(inscription)
            new_inscription.mail = faker.email()
        new_inscription.commune = None
        if insee in communes:
            new_inscription.commune_id = communes[inscription.commune.insee]
            avec_commune += 1
        else:
            new_inscription.commune_id = None
            pas_de_commune += 1
        db.session.add(new_inscription)
    db.session.commit()


def import_webpush_subcriptions(prod_session):
    staging_subs = {w.id: w for w in WebpushSubscriptionInfo.query.all()}
    for webpush_subscription_info in prod_session.query(WebpushSubscriptionInfo).all():
        if webpush_subscription_info.id in staging_subs:
            continue
        new_wp = clone_model(webpush_subscription_info)
        db.session.add(new_wp)
    db.session.commit()


def import_recommandations(prod_session):
    staging_recommandations = {r.id: r for r in Recommandation.query.all()}
    for recommandation in prod_session.query(Recommandation).all():
        db.session.add(clone_model(
            recommandation, staging_recommandations.get(recommandation.id)))
    db.session.commit()


def import_indices_generic(last_week, prod_session, model, date_col, staging_inscriptions=None, zones=None):
    # pylint: disable-next=line-too-long
    # table_name = f'{model.__table__.schema}."{model.__tablename__}"' if model.__table__.schema else model.__tablename__
    # db.session.execute(f'TRUNCATE TABLE {table_name}')
    # db.session.commit()
    # On commente pour l’instant à cause de deadlocks
    hours = int(((datetime.today() + timedelta(days=1)) - last_week).days * 24)
    for date in [(last_week + timedelta(hours=i)) for i in range(1, hours)]:
        indices = []
        for indice in prod_session.query(model).filter(func.date_trunc('hour', date_col) == date).all():
            cloned_data = clone_data(indice)
            if staging_inscriptions and cloned_data['inscription_id'] not in staging_inscriptions:
                continue
            if zones and cloned_data['zone_id'] in zones:
                cloned_data['zone_id'] = zones[cloned_data['zone_id']]
            indices.append(cloned_data)
            if len(indices) == 1000:
                query = insert(
                    model.__table__,
                    indices
                ).on_conflict_do_nothing()
                db.session.execute(query)
                db.session.commit()
                indices = []
        db.session.execute(
            insert(
                model.__table__,
                indices
            ).on_conflict_do_nothing()
        )
        db.session.commit()


def import_indices(prod_session):
    last_week = datetime.combine(
        (datetime.now() - timedelta(days=3)),
        datetime.min.time()
    )

    zones = {
        "region": {},
        "epci": {},
        "departement": {},
        "bassin_dair": {},
        "commune": {},
    }
    for zone in Zone.query.all():
        zones[zone.type][zone.code] = zone.id
    zones_production = {z.id: zones[z.type][z.code]
                        for z in prod_session.query(Zone).all()}
    import_indices_generic(last_week, prod_session, IndiceATMO,
                           IndiceATMO.date_dif, zones=zones_production)
    import_indices_generic(last_week, prod_session, EpisodePollution,
                           EpisodePollution.date_dif, zones=zones_production)
    staging_inscriptions = {i.id for i in Inscription.query.all()}
    import_indices_generic(last_week, prod_session, NewsletterDB,
                           NewsletterDB.date, staging_inscriptions=staging_inscriptions)


def import_newsletter_hebdo_template(prod_session):
    staging_nlts = {w.id: w for w in NewsletterHebdoTemplate.query.all()}
    for nlt in prod_session.query(NewsletterHebdoTemplate).all():
        if nlt.id in staging_nlts:
            continue
        new_nlt = clone_model(nlt)
        db.session.add(new_nlt)
    db.session.commit()


@celery.task
def import_from_production():
    prod_url = os.getenv('SQLALCHEMY_PROD_DATABASE_URI')
    if not prod_url or celery.conf.env not in ('staging', 'dev', 'development'):
        current_app.logger.error(
            "Quitting, can not import to an environment that is not staging or dev")
        return
    if str(db.engine.url) == prod_url:
        current_app.logger.error(
            "Quitting, can not import from the same url as prod_url")
        return
    prod_engine = create_engine(prod_url)
    prod_session = sessionmaker(prod_engine)()

    try:
        import_inscriptions(prod_session)
    except Exception as exception:
        print(exception)
        db.session.rollback()
        prod_session.rollback()
        return
    import_webpush_subcriptions(prod_session)
    import_recommandations(prod_session)
    import_newsletter_hebdo_template(prod_session)
    import_indices(prod_session)
