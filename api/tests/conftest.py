import os
from datetime import date, datetime, timedelta

import pytest
import sqlalchemy as sa
from indice_pollution import db as db_indice_pollution
from indice_pollution import init_app as init_app_indice_pollution
from indice_pollution.history.models.commune import Commune
from indice_pollution.history.models.departement import Departement
from indice_pollution.history.models.episode_pollution import EpisodePollution
from indice_pollution.history.models.indice_atmo import IndiceATMO
from indice_pollution.history.models.raep import RAEP
from indice_pollution.history.models.region import Region
from indice_pollution.history.models.zone import Zone
from psycopg2.extras import DateRange
from sqlalchemy import text

from ecosante import create_app
from ecosante.inscription.models import Inscription, WebpushSubscriptionInfo
from ecosante.newsletter.models import NewsletterHebdoTemplate
from ecosante.recommandations.models import Recommandation
from tests.utils import published_recommandation

# Retrieve a database connection string from the shell environment
try:
    DB_CONN = os.environ['TEST_DATABASE_URL']
except KeyError as exception:
    raise KeyError('TEST_DATABASE_URL not found. You must export a database ' +
                   'connection string to the environmental variable ' +
                   'TEST_DATABASE_URL in order to run tests.') from exception
DB_OPTS = sa.engine.url.make_url(DB_CONN).translate_connect_args()

pytest_plugins = ['pytest-flask-sqlalchemy']


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def client(app):
    return app.test_client()


@pytest.fixture(scope="session")
def app():
    _app = create_app()

    _app.config['WTF_CSRF_ENABLED'] = False
    _app.config['SQLALCHEMY_DATABASE_URI'] = DB_CONN
    with _app.app_context():
        init_app_indice_pollution(_app)
        db_indice_pollution.engine.execute(
            'CREATE SCHEMA IF NOT EXISTS indice_schema')
        db_indice_pollution.metadata.create_all()
        _db = _app.extensions['sqlalchemy'].db
        _db.engine.execute('DROP TABLE IF EXISTS alembic_version;')
        with open("migrations/data/generate-random-short-id.sql", encoding="utf-8") as file:
            query = text(file.read())
            _db.engine.execute(query)
        _db.metadata.bind = _db.engine
        _db.metadata.create_all()
        yield _app
        _db.metadata.drop_all()
        db_indice_pollution.engine.execute(
            'DROP SCHEMA IF EXISTS indice_schema CASCADE')
        _db.engine.execute("DROP FUNCTION IF EXISTS get_random_string")
        _db.engine.execute("DROP FUNCTION IF EXISTS generate_random_id")


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def _db(app):
    return app.extensions['sqlalchemy'].db


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def db_session(_db):
    session = _db.session
    api_tables = [table.name for table in reversed(_db.metadata.sorted_tables)]
    indice_pollution_tables = [f'{table.schema}."{table.name}"' for table in reversed(
        db_indice_pollution.metadata.sorted_tables)]
    tables = ','.join(api_tables + indice_pollution_tables)
    command = f'TRUNCATE {tables} RESTART IDENTITY;'
    session.execute(command)
    session.commit()
    yield session
    session.close()


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def commune(db_session) -> Commune:
    region = Region(nom="Pays de la Loire", code="52", tncc=4, nccenr='Pays de la Loire',
                    aasqa_nom='Air Pays de la Loire', aasqa_website='https://airpl.org')
    zone_departement = Zone(type='departement', code='53')
    departement = Departement(nom="Mayenne", code="53", region=region,
                              zone=zone_departement, tncc=3, nccenr='Mayenne')
    zone = Zone(type='commune', code='53130')
    _commune = Commune(nom="Laval", code="53130", codes_postaux=[
        "53000"], zone=zone, zone_pollution=departement.zone, departement=departement, tncc=0, nccenr='Laval')
    db_session.add_all([region, zone_departement, departement, zone, _commune])
    return _commune


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def commune_commited(commune, db_session) -> Commune:
    db_session.commit()
    return commune


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def inscription(commune) -> Inscription:
    _inscription = Inscription(date_inscription='2021-09-28', indicateurs_media=[
        "mail"], commune_id=commune.id, commune=commune, mail='test@example.com')
    return _inscription


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def inscription_alerte(commune) -> Inscription:
    _inscription = Inscription(ville_insee=commune.code, date_inscription='2021-09-28', indicateurs_media=[
        'mail'], commune_id=commune.id, commune=commune, mail='test@example.com')
    _inscription.indicateurs_frequence = ["alerte"]
    return _inscription


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def inscription_notifications(db_session, inscription: Inscription) -> Inscription:
    inscription.indicateurs_media = ['notifications_web']
    db_session.add(inscription)
    db_session.commit()
    webpush_subscription_info = WebpushSubscriptionInfo(
        inscription_id=inscription.id,
        data={
            "keys": {
                "auth": "Cbx6kg7FdlZHKZjaCUc_QQ",
                "p256dh": "BNSBF5mKSirivNxvBtgzqviOcuFGvSHh21JGLr5m8G0Gb4lrW0jb0Uu5mk6pjTjk5ak2fMkgAOZs1_UfLXmv3K0"
            },
            "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/pouet"
        }
    )
    db_session.add(webpush_subscription_info)
    db_session.commit()
    return inscription


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def date_ech() -> datetime:
    return datetime.now() + timedelta(days=1)

@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def bonne_qualite_air(commune_commited, db_session, date_ech) -> IndiceATMO:
    indice = IndiceATMO(
        zone_id=commune_commited.zone_id,
        date_ech=date_ech,
        date_dif=datetime.now(),
        no2=1, so2=1, o3=1, pm10=1, pm25=1,
        valeur=1)
    db_session.add(indice)
    return indice


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def evenement_qualite_air(commune_commited, db_session, date_ech=datetime.now()) -> IndiceATMO:
    indice = IndiceATMO(
        zone_id=commune_commited.zone_id,
        date_ech=date_ech,
        date_dif=datetime.now(),
        no2=1, so2=1, o3=1, pm10=1, pm25=1,
        valeur=7)
    db_session.add(indice)
    return indice


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def recommandation(db_session) -> Recommandation:
    _recommandation = published_recommandation()
    db_session.add(_recommandation)
    return _recommandation


def make_episode(code_pol, _commune):
    episode = EpisodePollution(
        code_pol=code_pol,
        etat="INFORMATION ET RECOMMANDATION",
        date_ech=datetime.now(),
        date_dif=datetime.now(),
        zone_id=_commune.zone_pollution_id,
        zone=_commune.zone_pollution
    )
    return episode


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def episode_soufre(commune_commited):
    return make_episode(1, commune_commited)


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def episode_carbone(commune_commited):
    return make_episode(4, commune_commited)


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def episode_pm10(commune_commited):
    return make_episode(5, commune_commited)


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def episode_ozone(commune_commited):
    return make_episode(7, commune_commited)


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def episode_azote(commune_commited):
    return make_episode(8, commune_commited)


def make_raep(_commune, raep):
    # pylint: disable-next=unexpected-keyword-arg
    return RAEP(
        zone_id=_commune.departement.zone_id,
        validity=DateRange(date.today(), date.today() + timedelta(weeks=1)),
        cypres=raep,
        noisetier=raep,
        aulne=raep,
        peuplier=raep,
        saule=raep,
        frene=raep,
        charme=raep,
        bouleau=raep,
        platane=raep,
        chene=raep,
        olivier=raep,
        tilleul=raep,
        chataignier=raep,
        rumex=raep,
        graminees=raep,
        plantain=raep,
        urticacees=raep,
        armoises=raep,
        ambroisies=raep,
        total=raep
    )


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def raep_eleve(db_session, commune_commited):
    raep = make_raep(commune_commited, 5)
    db_session.add(raep)
    return raep


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def raep_faible(db_session, commune_commited):
    raep = make_raep(commune_commited, 1)
    db_session.add(raep)
    return raep


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def raep_nul(db_session, commune_commited):
    raep = make_raep(commune_commited, 0)
    db_session.add(raep)
    return raep


@pytest.fixture(scope='function')
def template():
    return NewsletterHebdoTemplate(ordre=1, sib_id=1, _periode_validite=DateRange(date(2022, 1, 1), date(2123, 1, 1)))


@pytest.fixture(scope='function')
# pylint: disable-next=redefined-outer-name
def templates(db_session):
    _templates = [
        NewsletterHebdoTemplate(ordre=12, sib_id=14, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1)), indicateurs=['indice_atmo', 'raep']),
        NewsletterHebdoTemplate(ordre=12, sib_id=13, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1)), indicateurs=['indice_atmo']),
        # pylint: disable-next=unexpected-keyword-arg
        NewsletterHebdoTemplate(ordre=11, sib_id=12, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1)), enfants=True),
        # pylint: disable-next=unexpected-keyword-arg
        NewsletterHebdoTemplate(ordre=11, sib_id=11, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1)), enfants=False),
        NewsletterHebdoTemplate(ordre=10, sib_id=10, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1))),
        NewsletterHebdoTemplate(ordre=7, sib_id=7, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1))),
        NewsletterHebdoTemplate(ordre=9, sib_id=9, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1))),
        NewsletterHebdoTemplate(ordre=5, sib_id=5, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1))),
        NewsletterHebdoTemplate(ordre=1, sib_id=1, _periode_validite=DateRange(
            date(2022, 1, 1), date(2123, 1, 1)))
    ]
    db_session.add_all(_templates)
    return _templates
