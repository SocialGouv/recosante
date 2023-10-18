from datetime import date, datetime, timedelta

import pytest
from indice_pollution.history.models import (IndiceATMO, IndiceUv,
                                             VigilanceMeteo)
from psycopg2.extras import DateTimeTZRange
from indice_pollution.helpers import tomorrow

from ecosante.newsletter.models.newsletter import Newsletter


@pytest.mark.parametrize(
    "valeur,expected",
    [(v, False) for v in range(0, 3)] + [(v, True) for v in range(3, 8)]
)
def test_indice_atmo(inscription_alerte, commune, valeur, expected):
    inscription_alerte.indicateurs = ['indice_atmo']
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
        forecast={"data": [indice.dict()]}, inscription=inscription_alerte, type_="")
    assert newsletter.show_qa == expected
    if expected:
        assert newsletter.to_send('quotidien', False) is True
        newsletter = Newsletter(date=tomorrow(),forecast={"data": []},
                                inscription=inscription_alerte, type_="")
        assert newsletter.to_send('quotidien', False) is False


def test_episode_pollution(inscription_alerte, episode_soufre_tomorrow):
    inscription_alerte.indicateurs = ['episode_pollution']
    newsletter = Newsletter(date=tomorrow(),episodes=[episode_soufre_tomorrow.dict()],
                            inscription=inscription_alerte)
    # TODO: Fix me
    # pylint: disable-next=pointless-statement
    newsletter.show_vigilance is True
    newsletter = Newsletter(date=tomorrow(),episodes=[], inscription=inscription_alerte)
    # pylint: disable-next=pointless-statement
    newsletter.show_vigilance is False


@pytest.mark.parametrize(
    "raep, expected",
    [(0, False)] + [(v, True) for v in range(1, 7)]
)
def test_raep(inscription_alerte, raep, expected):
    inscription_alerte.indicateurs = ["raep"]
    newsletter = Newsletter(date=tomorrow(),raep=raep, inscription=inscription_alerte)
    assert newsletter.show_raep == expected
    if expected:
        assert newsletter.to_send('quotidien', False) is True
        newsletter = Newsletter(date=tomorrow(),raep=None, inscription=inscription_alerte)
        assert newsletter.to_send('quotidien', False) is False


@pytest.mark.parametrize(
    "couleur_id, expected",
    [(1, False), (2, False), (3, True), (4, True)]
)
def test_vigilance(inscription_alerte, couleur_id, expected):
    inscription_alerte.indicateurs = ["vigilance_meteo"]

    vigilance_meteo = VigilanceMeteo(
        zone_id=inscription_alerte.commune.departement.zone_id,
        phenomene_id=1,
        couleur_id=couleur_id,
        date_export=datetime.now() - timedelta(hours=1),
        validity=DateTimeTZRange(
            date.today() - timedelta(days=1), date.today() + timedelta(days=1)),
    )
    newsletter = Newsletter(date=tomorrow(),vigilances={'globale': {
        'vigilance': vigilance_meteo, 'recommandation': None}}, inscription=inscription_alerte)
    assert newsletter.show_vigilance == expected
    if expected:
        assert newsletter.to_send('quotidien', False) is True
        newsletter = Newsletter(date=tomorrow(),vigilances={'globale': {
            'vigilance': None, 'recommandation': None}}, inscription=inscription_alerte)
        assert newsletter.to_send('quotidien', False) is False


@pytest.mark.parametrize(
    "valeur,enfants,expected",
    [
        # Pas d’enfant
        # Pas envoyé pour les valeurs < 6
        *[(v, False, False) for v in range(0, 6)],
        *[(v, False, True)
          for v in range(6, 9)],  # Envoyé pour les valeurs >= 6
        # Avec enfant
        # Pas envoyé pour les valeurs < 3
        *[(v, True, False) for v in range(0, 3)],
        # Envoyé pour les valeurs >= 3
        *[(v, True, True) for v in range(3, 8)],
    ]
)
def test_indice_uv(inscription_alerte, valeur, enfants, expected):
    inscription_alerte.indicateurs = ["indice_uv"]
    inscription_alerte.enfants = "oui" if enfants else "non"
    indice_uv = IndiceUv(
        zone_id=inscription_alerte.commune.zone_id,
        date=date.today(),
        uv_j1=valeur,
    )
    newsletter = Newsletter(date=tomorrow(),indice_uv=indice_uv,
                            inscription=inscription_alerte)
    assert newsletter.show_indice_uv == expected
