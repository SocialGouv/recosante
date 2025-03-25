import os
from datetime import date, datetime
from functools import partial
from importlib import import_module
from itertools import groupby

from celery.schedules import crontab
from flask import Flask
from kombu import Queue
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from celery import shared_task

from . import db
from .extensions import celery, logger
from .helpers import ping, today, tomorrow
from .history.models import (RAEP, Commune, EpisodePollution, IndiceATMO,
                             IndiceUv, VigilanceMeteo)
from .regions.solvers import get_region


def configure_db(*, app, conn_uri=None, force=False):
    if hasattr(app, 'extensions') and 'sqlalchemy' in app.extensions:
        db.engine = app.extensions['sqlalchemy'].db.engine
        db.session = app.extensions['sqlalchemy'].db.session
    else:
        if db.engine is None or force:
            db.engine = create_engine(conn_uri or os.getenv(
                'SQLALCHEMY_DATABASE_URI'
            ) or os.getenv('POSTGRESQL_ADDON_URI'))
            db.session = scoped_session(sessionmaker(
                autocommit=False, autoflush=False, bind=db.engine))
    db.metadata.bind = db.engine


def configure_celery(flask_app=None):
    """
    Configure tasks.celery:
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
    celery_conf.setdefault('result_backend', "db+" +
                           os.getenv('SQLALCHEMY_DATABASE_URI'))
    celery_conf.setdefault('broker_url', "sqla+" +
                           os.getenv('SQLALCHEMY_DATABASE_URI'))

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

        # pylint: disable-next=unused-argument
        def after_return(self, *args, **kwargs):
            db.session.remove()

    celery.Task = SqlAlchemyTask

@celery.task(bind=True)
def test_task(self):
    print("test_task")
    self.update_state("test_task")
    return "test_task"

@shared_task(rate_limit='10/m')
def save_indicator(module_name, class_name, indicator_name, scheduled_datetime=None):
    print(f"Saving {module_name}.{class_name}.{indicator_name}")
    module = import_module(module_name)
    if not hasattr(module, class_name):
        print(f"No class {class_name} in {module_name}")
        return f"No class {class_name} in {module_name}"
    
    cls_ = getattr(module, class_name)
    launch_datetime = datetime.now()
    ping(cls_, "start", scheduled_datetime, launch_datetime)
    
    try:
        indicator = cls_.get_indicator(indicator_name)
        indicator.save()
        print(f"Indicator {indicator_name} saved")
    except Exception as e:
        logger.exception("Error while saving indicator %r", indicator_name, e)
    
    ping(cls_, "success", scheduled_datetime, launch_datetime)
    return f"{module_name}.{class_name}.{indicator_name} saved"

@shared_task(rate_limit='10/m')
def save_all_indices(module_name, class_name, scheduled_datetime=None):
    print(f"Starting to save all indices for {module_name}.{class_name}")
    module = import_module(module_name)
    if hasattr(module, "Service") and hasattr(module.Service, "is_active") and not module.Service.is_active:
        print(f"{module_name} is not active")
        return f"{module_name} is not active"
    
    if not hasattr(module, class_name):
        print(f"No class {class_name} in {module_name}")
        return f"No class {class_name} in {module_name}"
    
    cls_ = getattr(module, class_name)
    indicators = cls_.get_indicators()
    
    task_ids = []
    for indicator in indicators:
        task = save_indicator.apply_async(
            args=[module_name, class_name, indicator.name, scheduled_datetime],
            queue='save_indices',
            routing_key='save_indices.save_indicator'
        )
        task_ids.append(task.id)
        print(f"Task for {indicator.name} created with ID: {task.id}")
    
    return f"Tasks for {module_name}.{class_name} indicators have been dispatched: {task_ids}"


@celery.on_after_configure.connect
# This argument is mandatory for Celery API
# pylint: disable-next=unused-argument
def setup_periodic_tasks(sender, **kwargs):
    add_periodic_task = partial(
        sender.add_periodic_task,
        schedule=crontab(minute='0', hour='*/1'),
        queue='save_indices',
        routing_key='save_indices.save_all'
    )

    for task in all_tasks():
        add_periodic_task(sig=task)


def call_tasks_now():
    for task in all_tasks():
        task.apply_async(queue='save_indices',
                         routing_key='save_indices.save_all')


def all_tasks():
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

    scheduled_datetime = datetime.now().isoformat()
    tasks = []

    for region in regions:
        tasks.append(save_all_indices.s(
            f"indice_pollution.regions.{region}", "Forecast", scheduled_datetime))
        tasks.append(save_all_indices.s(
            f"indice_pollution.regions.{region}", "Episode", scheduled_datetime))

    tasks.append(save_all_indices.s(
        "indice_pollution.history.models.raep", "RAEP", scheduled_datetime))
    tasks.append(save_all_indices.s(
        "indice_pollution.history.models.vigilance_meteo", "VigilanceMeteo", scheduled_datetime))

    tasks.append(save_all_indices.s(
        "indice_pollution.history.models.indice_uv", "IndiceUv", scheduled_datetime))

    return tasks


def init_app(app):
    configure_celery(app)
    configure_db(app=app)


def create_app():
    app = Flask(
        __name__,
        instance_relative_config=True,
    )
    app.config.from_mapping(
        SECRET_KEY=os.getenv('SECRET_KEY', 'dev'),
        SQLALCHEMY_DATABASE_URI=os.getenv(
            'SQLALCHEMY_DATABASE_URI') or os.getenv('POSTGRESQL_ADDON_URI'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )
    app.config['CELERY_RESULT_BACKEND'] = os.getenv(
        'CELERY_RESULT_BACKEND') or f"db+{app.config['SQLALCHEMY_DATABASE_URI']}"
    app.config['CELERY_BROKER_URL'] = os.getenv(
        'CELERY_BROKER_URL') or f"sqla+{app.config['SQLALCHEMY_DATABASE_URI']}"
    app.config['CELERY_REDBEAT_REDIS_URL'] = os.getenv(
        'CELERY_REDBEAT_REDIS_URL')

    init_app(app)

    @app.route('/test_task')
    def test_task_http():
        test_task.apply_async(queue='save_indices',
                         routing_key='save_indices.save_all')
        return "test_task"

    return app


def make_resp(region, result, date_=None):
    if isinstance(result, list):
        if date_:
            result = [v for v in result if v['date'] == str(date_)]
    elif hasattr(result, 'dict'):
        result = [result.dict()]
    else:
        result = [result]
    return {
        "data": result,
        "metadata": make_metadata(region)
    }


def make_metadata(region):
    return {
        "region": {
            "nom": region.__name__.split(".")[-1],
            "website": region.Service.website,
            "nom_aasqa": region.Service.nom_aasqa
        }
    }


def forecast(insee, date_=None, use_make_resp=True):
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
        if indice is not None:
            indice.region = region
            indice.commune = Commune.get(insee)
        return indice
    indice = IndiceATMO()
    indice.region = region
    indice.commune = Commune.get(insee)
    indice.error = "Inactive region"
    return indice


def chunks(lst, count):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), count):
        yield lst[i:i + count]


def get_all():
    indices = IndiceATMO.get_all(tomorrow())
    print("indices finito")
    episodes_pollution = EpisodePollution.get_all(tomorrow())
    print("episodes_pollution finito")
    allergenes_par_departement = {
        r.zone_id: r
        for r in RAEP.get_all(tomorrow())
    }
    print("allergenes_par_departement finito")
    vigilances_par_departement = {
        zone_id: list(vigilances)
        for zone_id, vigilances in groupby(
            sorted(
                VigilanceMeteo.get_all(date_=tomorrow()),
                key=lambda v: v.zone_id
            ),
            lambda v: v.zone_id
        )
    }
    print("vigilances_par_departement finito")
    indices_uv = IndiceUv.get_all(today())
    print("indices_uv finito")
    return (indices, episodes_pollution, allergenes_par_departement, vigilances_par_departement, indices_uv)


def episodes(insee, date_=None, use_make_resp=True):
    date_ = date_ or today()
    if isinstance(date_, str):
        date_ = date.fromisoformat(date_)

    region = get_region(insee)
    if region.Service.is_active:
        results = EpisodePollution.get(insee=insee, date_=date_)
        if use_make_resp:
            results = list(map(lambda e: e.dict(), results))
            return make_resp(region, results, date_)
        for result in results:
            result.region = region
            result.commune = Commune.get(insee)
        return results
    if use_make_resp:
        return {
            "error": "Inactive region",
            "metadata": make_metadata(region)
        }, 400
    episode = EpisodePollution()
    episode.region = region
    episode.commune = Commune.get(insee)
    episode.error = "Inactive region"
    return [episode]


def availability(insee):
    try:
        return get_region(insee).Service.is_active
    except KeyError:
        return False
    except AttributeError:
        return False


def raep(insee, date_=None, departement_as_dict=True):
    if insee is None:
        return {}
    commune = Commune.get(insee)
    if commune is None:
        return {}
    departement = commune.departement
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
