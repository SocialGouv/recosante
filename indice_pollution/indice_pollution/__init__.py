from itertools import groupby
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from indice_pollution.extensions import logger
from flask import Flask
from datetime import date, datetime
import os

from .helpers import today, ping
from .extensions import celery
from importlib import import_module
from kombu import Queue
from celery.schedules import crontab
from functools import partial


def configure_db(*, app=None, conn_uri=None, force=False):
    from indice_pollution import db
    if hasattr(app, 'extensions') and 'sqlalchemy' in app.extensions:
        db.engine = app.extensions['sqlalchemy'].db.engine
        db.session = app.extensions['sqlalchemy'].db.session
    else:
        if db.engine is None or force:
            db.engine = create_engine(conn_uri or os.getenv('SQLALCHEMY_DATABASE_URI') or os.getenv('POSTGRESQL_ADDON_URI'))
            db.session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=db.engine))
    db.metadata.bind = db.engine



def configure_celery(flask_app=None):
    from indice_pollution import db
    """Configure tasks.celery:
    * read configuration from flask_app.config and update celery config
    * create a task context so tasks can access flask.current_app
    Doing so is recommended by flask documentation:
    https://flask.palletsprojects.com/en/1.1.x/patterns/celery/
    """
    # Settings list:
    # https://docs.celeryproject.org/en/stable/userguide/configuration.html
    if flask_app:
        celery_conf = {
            key[len('CELERY_'):].lower(): value
            for key, value in flask_app.config.items()
            if key.startswith('CELERY_')
        }
    else:
        celery_conf = {
            key[len('CELERY_'):].lower(): value
            for key, value in os.environ.items()
            if key.startswith('CELERY_')
        }
    celery_conf.setdefault('result_backend', "db+" + os.getenv('SQLALCHEMY_DATABASE_URI'))
    celery_conf.setdefault('broker_url', "sqla+" + os.getenv('SQLALCHEMY_DATABASE_URI'))

    celery.conf.update(celery_conf)
    celery.conf.task_queues = (
        Queue("default", routing_key='task.#'),
        Queue("save_indices", routing_key='save_indices.#'),
    )
    celery.conf.task_default_exchange = 'tasks'
    celery.conf.task_default_exchange_type = 'topic'
    celery.conf.task_default_routing_key = 'task.default'

    class SqlAlchemyTask(celery.Task):
        """An abstract Celery Task that ensures that the connection the the
        database is closed on task completion"""
        abstract = True

        def after_return(self, status, retval, task_id, args, kwargs, einfo):
            db.session.remove()

    celery.Task = SqlAlchemyTask


@celery.task(bind=True)
def save_all_indices(self, module_name, class_name, scheduled_datetime=None):
    self.update_state(f"Saving {module_name}.{class_name}")
    module = import_module(module_name)
    if hasattr(module, "Service") and hasattr(module.Service, "is_active") and not module.Service.is_active:
        self.update_state(f"{module_name} is not active")
        return f"{module_name} is not active"
    if not hasattr(module, class_name):
        self.update_state(f"No class {class_name} in {module_name}")
        return f"No class {class_name} in {module_name}"
    cls_ = getattr(module, class_name)
    launch_datetime = datetime.now()
    ping(cls_, "start", scheduled_datetime, launch_datetime)
    try:
        cls_.save_all()
    except Exception as e:
        logger.error(e)
        ping(cls_, "fail", scheduled_datetime, launch_datetime)
    self.update_state(f"{module_name}.{class_name} saved")
    ping(cls_, "success", scheduled_datetime, launch_datetime)
    return f"{module_name}.{class_name} saved"


@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    add_periodic_task = partial(
        sender.add_periodic_task,
        schedule=crontab(minute='0', hour='*/1'),
        queue='save_indices',
        routing_key='save_indices.save_all'
    )

    regions = [
        'Auvergne-Rhône-Alpes',
        'Bourgogne-Franche-Comté',
        'Bretagne',
        'Centre-Val de Loire',
        'Corse',
        'Grand Est',
        'Guadeloupe',
        'Guyane',
        'Hauts-de-France',
        'Île-de-France',
        'Martinique',
        'Mayotte',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Réunion",
        "Sud"
    ]
    scheduled_datetime = datetime.now()
    for region in regions:
        add_periodic_task(sig=save_all_indices.s(f"indice_pollution.regions.{region}", "Forecast", scheduled_datetime))
        add_periodic_task(sig=save_all_indices.s(f"indice_pollution.regions.{region}", "Episode", scheduled_datetime))

    add_periodic_task(sig=save_all_indices.s("indice_pollution.history.models.raep", "RAEP", scheduled_datetime))
    add_periodic_task(sig=save_all_indices.s("indice_pollution.history.models.vigilance_meteo", "VigilanceMeteo", scheduled_datetime))

    add_periodic_task(sig=save_all_indices.s("indice_pollution.history.models.indice_uv", "IndiceUv", scheduled_datetime))


def init_app(app):
    configure_celery(app)
    configure_db(app=app)

def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
    )
    app.config.from_mapping(
        SECRET_KEY=os.getenv('SECRET_KEY', 'dev'),
        SQLALCHEMY_DATABASE_URI=os.getenv('SQLALCHEMY_DATABASE_URI') or os.getenv('POSTGRESQL_ADDON_URI'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )
    app.config['CELERY_RESULT_BACKEND'] = os.getenv('CELERY_RESULT_BACKEND') or f"db+{app.config['SQLALCHEMY_DATABASE_URI']}"
    app.config['CELERY_BROKER_URL'] = os.getenv('CELERY_BROKER_URL') or f"sqla+{app.config['SQLALCHEMY_DATABASE_URI']}"

    init_app(app)

    return app

def make_resp(r, result, date_=None):
    if type(result) == list:
        if date_:
            result = [v for v in result if v['date'] == str(date_)]
    elif hasattr(result, 'dict'):
        result = [result.dict()]
    else:
        result = [result]
    return {
        "data": result,
        "metadata": make_metadata(r)
    }

def make_metadata(r):
    return {
        "region": {
            "nom": r.__name__.split(".")[-1],
            "website": r.Service.website,
            "nom_aasqa": r.Service.nom_aasqa
        }
    }

def forecast(insee, date_=None, use_make_resp=True):
    from indice_pollution.history.models.commune import Commune
    from indice_pollution.history.models.indice_atmo import IndiceATMO
    from .regions.solvers import get_region
    date_ = date_ or today()
    try:
        region = get_region(insee)
    except KeyError:
        return {
            "error": f"No region for {insee}",
            "metadata": {}
        }, 400
    if region.Service.is_active:
        indice = IndiceATMO.get(insee=insee, date_=date_)
        if use_make_resp:
            return make_resp(region, indice, date_)
        else:
            if indice is not None:
                indice.region = region
                indice.commune = Commune.get(insee)
            return indice
    else:
        indice = IndiceATMO()
        indice.region = region
        indice.commune = Commune.get(insee)
        indice.error = "Inactive region"
        return indice


def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def get_all(date_):
    from indice_pollution.history.models import IndiceATMO, EpisodePollution, IndiceUv, RAEP, VigilanceMeteo

    date_ = date_ or today()
    indices = IndiceATMO.get_all(date_)
    episodes = EpisodePollution.get_all(date_)
    allergenes_par_departement = {
            r.zone_id: r
            for r in RAEP.get_all()
        }
    vigilances_par_departement = {
        zone_id: list(vigilances)
        for zone_id, vigilances in groupby(
            sorted(
                VigilanceMeteo.get_all(date_=date_),
                key=lambda v: v.zone_id
            ),
            lambda v: v.zone_id
        )
    }
    indices_uv = IndiceUv.get_all(date_)
    return (indices, episodes, allergenes_par_departement, vigilances_par_departement, indices_uv)


def episodes(insee, date_=None, use_make_resp=True):
    from .regions.solvers import get_region
    from indice_pollution.history.models import Commune, EpisodePollution

    date_ = date_ or today()
    if type(date_) == str:
        date_ = date.fromisoformat(date_)

    region = get_region(insee)
    if region.Service.is_active:
        result = EpisodePollution.get(insee=insee, date_=date_)
        if use_make_resp:
            result = list(map(lambda e: e.dict(), result))
            return make_resp(region, result, date_)
        else:
            for r in result:
                r.region = region
                r.commune = Commune.get(insee)
            return result
    else:
        if use_make_resp:
            return {
                "error": "Inactive region",
                "metadata": make_metadata(region)
            }, 400
        else:
            episode = EpisodePollution()
            episode.region = region
            episode.commune = Commune.get(insee)
            episode.error = "Inactive region"
            return [episode]

def availability(insee):
    from .regions.solvers import get_region
    try:
        return get_region(insee).Service.is_active
    except KeyError:
        return False
    except AttributeError:
        return False


def raep(insee, date_=None, extended=False, departement_as_dict=True):
    from indice_pollution.history.models import Commune, RAEP
    if insee is None:
        return {}
    departement = Commune.get(insee).departement
    if not departement:
        return {}
    data = RAEP.get(zone_id=departement.zone_id, date_=date_)
    return {
        "departement": {
            "nom": departement.nom,
            "code": departement.code,
            "charniere": departement.charniere
        } if departement_as_dict else departement,
        "data": data.to_dict() if data else None
    }
