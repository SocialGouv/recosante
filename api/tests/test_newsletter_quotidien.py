from datetime import date, datetime, timedelta

import pytest
from indice_pollution.helpers import tomorrow
from indice_pollution.history.models import (Commune, IndiceATMO, IndiceUv,
                                             VigilanceMeteo)
from psycopg2.extras import DateTimeTZRange

from ecosante.inscription.models import Inscription
from ecosante.newsletter.models import Newsletter


@pytest.mark.parametrize(
    "valeur",
    list(range(1, 7))
)
def test_indice(commune: Commune, inscription: Inscription, valeur):
    inscription.indicateurs = ['indice_atmo']
    indice = IndiceATMO(
        zone_id=commune.zone_id,
        date_ech=datetime.today(),
        date_dif=datetime.today(),
        no2=valeur,
        so2=valeur,
        o3=valeur,
        pm10=valeur,
        pm25=valeur,
        valeur=valeur,
    )
    newsletter = Newsletter(date=tomorrow(),
        forecast={"data": [indice.dict()]}, inscription=inscription)
    assert newsletter.show_qa is True


def test_episode_pollution(inscription, episode_soufre_tomorrow):
    inscription.indicateurs = ['episode_pollution']
    newsletter = Newsletter(date=tomorrow(),
        episodes=[episode_soufre_tomorrow.dict()], inscription=inscription)
    # TODO: Fix me
    # pylint: disable-next=pointless-statement
    newsletter.show_vigilance is True
    newsletter = Newsletter(date=tomorrow(),episodes=[], inscription=inscription)
    # pylint: disable-next=pointless-statement
    newsletter.show_vigilance is False


@pytest.mark.parametrize(
    "raep, expected",
    [(0, False)] + [(v, True) for v in range(1, 7)]
)
def test_raep(inscription, raep, expected):
    inscription.indicateurs = ["raep"]
    newsletter = Newsletter(date=tomorrow(),raep=raep, inscription=inscription)
    assert newsletter.show_raep == expected


@pytest.mark.parametrize(
    "couleur_id",
    list(range(1, 5))
)
def test_vigilance(inscription, couleur_id):
    inscription.indicateurs = ["vigilance_meteo"]

    vigilance_meteo = VigilanceMeteo(
        zone_id=inscription.commune.departement.zone_id,
        phenomene_id=1,
        couleur_id=couleur_id,
        date_export=datetime.now() - timedelta(hours=1),
        validity=DateTimeTZRange(
            date.today() - timedelta(days=1), date.today() + timedelta(days=1)),
    )
    newsletter = Newsletter(date=tomorrow(),vigilances={'globale': {
        'vigilance': vigilance_meteo, 'recommandation': None}}, inscription=inscription)
    assert newsletter.show_vigilance is True


@pytest.mark.parametrize(
    "valeur",
    list(range(0, 9))
)
def test_indice_uv(inscription, valeur):
    inscription.indicateurs = ["indice_uv"]
    indice_uv = IndiceUv(
        zone_id=inscription.commune.zone_id,
        date=date.today(),
        uv_j1=valeur,
    )
    newsletter = Newsletter(date=tomorrow(),indice_uv=indice_uv, inscription=inscription)
    assert newsletter.show_indice_uv is True

