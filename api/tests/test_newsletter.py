from datetime import date, datetime, timedelta
from itertools import product

import pytest
from indice_pollution.history.models import (IndiceATMO, IndiceUv,
                                             VigilanceMeteo)
from indice_pollution.helpers import tomorrow
from psycopg2.extras import DateTimeTZRange

from ecosante.newsletter.models import Newsletter, NewsletterDB
from ecosante.recommandations.models import Recommandation
from tests.utils import published_recommandation


def test_episode_passe(db_session, inscription):
    yesterday = date.today() - timedelta(days=1)
    recommandations = [
        published_recommandation(
            particules_fines=True, type_="episode_pollution"),
        published_recommandation(
            recommandation="ça va en fait", type_="indice_atmo")
    ]
    db_session.add_all(recommandations)
    db_session.commit()
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [
            {"code_pol": "5", "etat": "INFORMATION ET RECOMMANDATION", "date": str(yesterday)}]},
        recommandations=recommandations,
        raep=1
    )
    newsletter_db = NewsletterDB(newsletter)
    assert newsletter_db.polluants_formatted is None
    assert newsletter_db.polluants_symbols == []
    assert newsletter_db.lien_recommandations_alerte is None
    assert newsletter_db.attributes()['POLLUANT'] == ""
    assert newsletter_db.attributes(
    )['RECOMMANDATION'] == '<p>ça va en fait</p>'
    assert newsletter_db.attributes()['DEPARTEMENT'] == 'de la Mayenne'


def test_formatted_polluants_indice_atmo_pm10(db_session, inscription, episode_pm10):
    recommandations = [published_recommandation(), published_recommandation(
        particules_fines=True, type_='episode_pollution')]
    db_session.add_all(recommandations)
    db_session.commit()
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_pm10.dict()]},
        recommandations=recommandations
    )
    print(f'test_formatted_polluants_indice_atmo_pm10: {newsletter}')
    assert newsletter.polluants_formatted == "aux particules fines"
    assert newsletter.polluants_symbols == ['pm10']
    # pylint: disable-next=line-too-long
    assert newsletter.lien_recommandations_alerte == 'http://localhost:5000/recommandation-episodes-pollution?population=generale&polluants=pm10'
    assert newsletter.recommandation_qa.type_ == "indice_atmo"
    assert newsletter.recommandation_episode.type_ == "episode_pollution"


def test_formatted_polluants_indice_atmo_pm10_no2(db_session, inscription, episode_pm10, episode_azote):
    recommandations = [published_recommandation(
        particules_fines=True, type_='episode_pollution')]
    db_session.add_all(recommandations)
    db_session.commit()
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_pm10.dict(), episode_azote.dict()]},
        recommandations=recommandations
    )
    assert newsletter.polluants_formatted == "aux particules fines et au dioxyde d’azote"
    assert newsletter.polluants_symbols == ['pm10', 'no2']
    # pylint: disable-next=line-too-long
    assert newsletter.lien_recommandations_alerte == 'http://localhost:5000/recommandation-episodes-pollution?population=generale&polluants=pm10&polluants=no2'
    assert newsletter.recommandation.particules_fines is True
    assert newsletter.recommandation_qa.particules_fines is True


# pylint: disable-next=line-too-long
def test_formatted_polluants_indice_atmo_tous(db_session, inscription, episode_soufre_tomorrow, episode_pm10, episode_ozone, episode_azote):
    recommandations = [published_recommandation(
        particules_fines=True, type_='episode_pollution')]
    db_session.add_all(recommandations)
    db_session.commit()
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_soufre_tomorrow.dict(), episode_pm10.dict(
        ), episode_ozone.dict(), episode_azote.dict()]},
        recommandations=recommandations
    )
    # pylint: disable-next=line-too-long
    assert newsletter.polluants_formatted == "au dioxyde de soufre, aux particules fines, à l’ozone, et au dioxyde d’azote"
    assert newsletter.polluants_symbols == ['so2', 'pm10', 'o3', 'no2']
    # pylint: disable-next=line-too-long
    assert newsletter.lien_recommandations_alerte == 'http://localhost:5000/recommandation-episodes-pollution?population=generale&polluants=so2&polluants=pm10&polluants=o3&polluants=no2'


# pylint: disable-next=line-too-long
def test_formatted_polluants_indice_atmo_pm10_o3_no2(db_session, inscription, episode_soufre_tomorrow, episode_pm10, episode_ozone, episode_azote):
    recommandations = [published_recommandation(
        particules_fines=True, type_='episode_pollution')]
    db_session.add_all(recommandations)
    db_session.commit()
    episode_dict = episode_soufre_tomorrow.dict()
    episode_dict['etat'] = 'PAS DE DEPASSEMENT'
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_dict, episode_pm10.dict(
        ), episode_ozone.dict(), episode_azote.dict()]},
        recommandations=recommandations
    )
    assert newsletter.polluants_formatted == "aux particules fines, à l’ozone, et au dioxyde d’azote"
    assert newsletter.polluants_symbols == ['pm10', 'o3', 'no2']
    # pylint: disable-next=line-too-long
    assert newsletter.lien_recommandations_alerte == 'http://localhost:5000/recommandation-episodes-pollution?population=generale&polluants=pm10&polluants=o3&polluants=no2'


def test_formatted_polluants_indice_atmo_no2(db_session, inscription, episode_azote):
    recommandations = [
        published_recommandation(particules_fines=True, autres=True,
                                 enfants=False, dioxyde_azote=True, type_='episode_pollution'),
        published_recommandation(particules_fines=True, personnes_sensibles=True,
                                 dioxyde_azote=True, type_='episode_pollution'),
    ]
    db_session.add_all(recommandations)
    db_session.commit()
    inscription.pathologie_respiratoire = True
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_azote.dict()]},
        recommandations=recommandations
    )
    # pylint: disable-next=line-too-long
    assert newsletter.lien_recommandations_alerte == 'http://localhost:5000/recommandation-episodes-pollution?population=vulnerable&polluants=no2'
    assert newsletter.recommandation.personnes_sensibles is True


def test_avis_oui(db_session, client, inscription, episode_azote):
    recommandations = [
        published_recommandation(particules_fines=True, autres=True,
                                 enfants=False, dioxyde_azote=True, type_='episode_pollution'),
        published_recommandation(particules_fines=True, personnes_sensibles=True,
                                 dioxyde_azote=True, type_='episode_pollution'),
    ]
    db_session.add_all(recommandations)
    db_session.commit()
    inscription.pathologie_respiratoire = True
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_azote.dict()]},
        recommandations=recommandations
    )
    newsletter_db_1 = NewsletterDB(newsletter)
    db_session.add(newsletter_db_1)
    db_session.commit()
    response = client.post(
        f'/newsletter/{newsletter_db_1.short_id}/avis?appliquee=oui', json={})
    assert response.status_code == 200
    newsletter_db_2 = NewsletterDB.query.get(newsletter_db_1.id)
    assert newsletter_db_2.appliquee is True


def test_avis_non(db_session, client, inscription, episode_azote):
    recommandations = [
        published_recommandation(particules_fines=True, autres=True,
                                 enfants=False, dioxyde_azote=True, type_='episode_pollution'),
        published_recommandation(particules_fines=True, personnes_sensibles=True,
                                 dioxyde_azote=True, type_='episode_pollution'),
    ]
    db_session.add_all(recommandations)
    db_session.commit()
    inscription.pathologie_respiratoire = True
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": [episode_azote.dict()]},
        recommandations=recommandations
    )
    newsletter_db = NewsletterDB(newsletter)
    db_session.add(newsletter_db)
    db_session.commit()
    response = client.post(
        f'/newsletter/{newsletter_db.short_id}/avis?appliquee=non', headers={"Accept": "application/json"})
    assert response.status_code == 200
    nldb2 = NewsletterDB.query.get(newsletter_db.id)
    assert nldb2.appliquee is False


@pytest.mark.parametrize(
    "episodes,raep,delta,indice",
    product(
        [[], ["episode_azote"]],
        [0, 2, 6],
        range(0, 7),
        ["bon", "degrade"]
    )
)
# pylint: disable-next=too-many-arguments
def test_pollens(db_session, inscription, episodes, raep, delta, indice, request):
    if len(episodes) > 0:
        episodes = [request.getfixturevalue(episodes[0]).dict()]
    recommandations = [
        published_recommandation(particules_fines=True, autres=True,
                                 enfants=False, dioxyde_azote=True, type_='episode_pollution'),
        published_recommandation(particules_fines=True, personnes_sensibles=True,
                                 dioxyde_azote=True, type_='episode_pollution'),
        published_recommandation(type_="pollens", min_raep=raep),
        published_recommandation()
    ]
    db_session.add_all(recommandations)
    db_session.commit()
    date_ = date.today() + timedelta(days=delta)
    if delta == 0:
        episode = episodes
    else:
        episode = []
    inscription.indicateurs = ['raep']
    newsletter = Newsletter(
        inscription=inscription,
        forecast={"data": [{"date": date_, "indice": indice}]},
        episodes={"data": episode},
        raep=raep,
        date=date_,
        recommandations=recommandations
    )

    assert newsletter.show_raep == (raep > 0)


def test_show_qa(inscription, bonne_qualite_air_tomorrow):
    inscription.indicateurs = ['indice_atmo']
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": [bonne_qualite_air_tomorrow.dict()]},
        episodes={"data": []},
        raep=0,
        recommandations=[]
    )
    assert newsletter.show_qa is True

    inscription.indicateurs = []
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": [{"date": str(tomorrow()), "indice": "bon"}]},
        episodes={"data": []},
        raep=0,
        recommandations=[]
    )
    assert newsletter.show_qa is False


def test_show_qa_evenement(inscription, evenement_qualite_air):
    inscription.indicateurs = ['indice_atmo']
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": [evenement_qualite_air.dict()]},
        episodes={"data": []},
        raep=0,
        recommandations=[
            Recommandation(
                type_="indice_atmo",
                qa_evenement=True,
                recommandation='Événement en cours, consultez le site de <a href="{aasqa_website}">{aasqa_nom}</a>'
            )
        ]
    )
    assert newsletter.show_qa is True
    assert newsletter.recommandation is not None
    newsletter_db = NewsletterDB(newsletter)
    # pylint: disable-next=line-too-long
    assert f'<a href="{inscription.commune.departement.region.aasqa_website}">{inscription.commune.departement.region.aasqa_nom}</a>' in newsletter_db.attributes()[
        'RECOMMANDATION']

    inscription.indicateurs = []
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": [evenement_qualite_air.dict()]},
        episodes={"data": []},
        raep=0,
        recommandations=[]
    )
    assert newsletter.show_qa is False


def test_show_indice_uv(inscription):
    inscription.indicateurs = ['indice_uv']
    indice_uv = IndiceUv(
        zone_id=inscription.commune.zone_id,
        date=date.today(),
        uv_j1=1,
    )
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        raep=0,
        indice_uv=indice_uv,
        recommandations=[]
    )
    assert newsletter.show_indice_uv is True

    inscription.indicateurs = []
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        raep=0,
        indice_uv=None,
        recommandations=[]
    )
    assert newsletter.show_indice_uv is False


def test_sous_indice(db_session, inscription):
    recommandations = [
        published_recommandation(
            particules_fines=True, autres=True, enfants=False, dioxyde_azote=True),
        published_recommandation(
            particules_fines=True, personnes_sensibles=True, dioxyde_azote=True),
        published_recommandation(type_="pollens"),
        published_recommandation(type_="generale")
    ]
    db_session.add_all(recommandations)
    db_session.commit()
    inscription.allergie_pollens = False
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": [{"date": str(tomorrow()), "indice": "bon"}]},
        episodes={"data": []},
        raep=0,
        recommandations=recommandations,
        radon=2
    )
    noms_sous_indices = ['no2', 'so2', 'o3', 'pm10', 'pm25']
    newsletter_db = NewsletterDB(newsletter)
    for sous_indice in noms_sous_indices:
        assert newsletter_db.attributes()[
            f'SS_INDICE_{sous_indice.upper()}_LABEL'] == ""
        assert newsletter_db.attributes()[
            f'SS_INDICE_{sous_indice.upper()}_COULEUR'] == ""

    forecast = {
        'couleur': '#50CCAA',
        'date': str(tomorrow()),
        'indice': 'moyen',
        'label': 'Moyen',
        'sous_indices': [
            {
                'couleur': '#50CCAA',
                'indice': 'moyen',
                'label': 'Moyen',
                'polluant_name': 'NO2'
            },
            {
                'couleur': '#50F0E6',
                'indice': 'bon',
                'label': 'Bon',
                'polluant_name': 'SO2'
            },
            {
                'couleur': '#50CCAA',
                'indice': 'moyen',
                'label': 'Moyen',
                'polluant_name': 'O3'
            },
            {
                'couleur': '#50F0E6',
                'indice': 'bon',
                'label': 'Bon',
                'polluant_name': 'PM10'
            },
            {
                'couleur': '#50F0E6',
                'indice': 'bon',
                'label': 'Bon',
                'polluant_name': 'PM25'
            }
        ],
        'valeur': 2
    }

    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": [forecast]},
        episodes={"data": []},
        raep=0,
        recommandations=recommandations,
        radon=2
    )
    noms_sous_indices = ['no2', 'so2', 'o3', 'pm10', 'pm25']
    newsletter_db = NewsletterDB(newsletter)
    for sous_indice in noms_sous_indices:
        assert newsletter_db.attributes()[
            f'SS_INDICE_{sous_indice.upper()}_LABEL'] != ""
        assert isinstance(newsletter_db.attributes()[
            f'SS_INDICE_{sous_indice.upper()}_LABEL'], str)
        assert newsletter_db.attributes()[
            f'SS_INDICE_{sous_indice.upper()}_COULEUR'] != ""
        assert isinstance(newsletter_db.attributes()[
            f'SS_INDICE_{sous_indice.upper()}_COULEUR'], str)


def test_export_simple(db_session, inscription, bonne_qualite_air_tomorrow, raep_nul):
    _ = (bonne_qualite_air_tomorrow, raep_nul)
    db_session.add(published_recommandation())
    db_session.add(inscription)
    db_session.commit()

    newsletters = list(Newsletter.export())
    assert len(newsletters) == 1


def test_indice_nul(db_session, inscription):
    db_session.add(published_recommandation())
    db_session.add(inscription)
    inscription.indicateurs = ["indice_atmo"]
    db_session.commit()
    indice = IndiceATMO(
        zone_id=inscription.commune.zone.id,
        date_ech=tomorrow(),
        date_dif=date.today(),
        no2=1, so2=1, o3=1, pm10=1, pm25=1,
        valeur=0)
    db_session.add(indice)
    db_session.commit()

    newsletters = list(Newsletter.export())
    assert len(newsletters) == 0


def test_indice_sept(db_session, inscription):
    db_session.add(published_recommandation())
    db_session.add(inscription)
    inscription.indicateurs = ["indice_atmo"]
    db_session.commit()
    indice = IndiceATMO(
        zone_id=inscription.commune.zone.id,
        date_ech=tomorrow(),
        date_dif=date.today(),
        no2=1, so2=1, o3=1, pm10=1, pm25=1,
        valeur=7)
    db_session.add(indice)
    db_session.commit()

    newsletters = list(Newsletter.export())
    assert len(newsletters) == 1


def test_ville_slug(db_session, inscription, bonne_qualite_air_tomorrow, raep_nul):
    _ = bonne_qualite_air_tomorrow, raep_nul
    # Lowercase
    inscription.commune.nom = "Paris"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'paris'

    # Whitespace
    inscription.commune.nom = "Le Loreur"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'le-loreur'

    # Apostrophe
    inscription.commune.nom = "L'Épine-aux-Bois"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'l-epine-aux-bois'
    inscription.commune.nom = "Plateau d’Hauteville"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'plateau-d-hauteville'

    # œ => oe
    inscription.commune.nom = "Bonnœil"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'bonnoeil'

    # Diacritics
    inscription.commune.nom = "Montluçon"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'montlucon'
    inscription.commune.nom = "Éourres"
    db_session.add(inscription)
    db_session.commit()
    newsletters = list(Newsletter.export())
    newsletter_db = NewsletterDB(newsletters[0])
    assert newsletter_db.attributes()['VILLE_SLUG'] == 'eourres'


def test_export_user_hebdo(db_session, inscription, templates):
    _ = templates
    inscription.recommandations_actives = ["non"]
    newsletters = list(Newsletter.export(type_='hebdomadaire'))
    assert len(newsletters) == 0

    inscription.recommandations_actives = ["oui"]
    db_session.add(inscription)
    db_session.commit()

    newsletters = list(Newsletter.export(type_='hebdomadaire'))
    assert len(newsletters) == 1
    newsletter = newsletters[0]
    assert newsletter.newsletter_hebdo_template is not None
    assert newsletter.newsletter_hebdo_template.ordre == 1

    db_session.add(NewsletterDB(newsletter))
    db_session.commit()

    newsletters = list(Newsletter.export(type_='hebdomadaire'))
    assert len(newsletters) == 0


def test_export_user_hebdo_ordre(db_session, inscription, templates):
    yesterday = date.today() - timedelta(days=1)
    nl1 = Newsletter(
        inscription=inscription,
        date=yesterday,
        newsletter_hebdo_template=min(templates, key=lambda t: t.ordre)
    )
    db_session.add(NewsletterDB(nl1))
    db_session.commit()

    newsletters = list(Newsletter.export(type_='hebdomadaire'))
    nl2 = newsletters[0]
    assert nl2.newsletter_hebdo_template.ordre > nl1.newsletter_hebdo_template.ordre


def test_export_user_hebdo_quotidien(db_session, inscription, templates, bonne_qualite_air_tomorrow, raep_eleve):
    _ = (templates, bonne_qualite_air_tomorrow, raep_eleve)
    db_session.add(inscription)
    db_session.commit()
    newsletters_hebdo = list(Newsletter.export(type_='hebdomadaire'))
    assert len(newsletters_hebdo) == 1
    assert newsletters_hebdo[0].newsletter_hebdo_template is not None

    newsletters_quotidien = list(Newsletter.export(type_='quotidien'))
    assert len(newsletters_quotidien) == 1
    assert newsletters_quotidien[0].newsletter_hebdo_template is None


def test_export_user_hebdo_alerte(db_session, inscription, templates):
    _ = templates
    inscription.indicateurs_frequence = ['alerte']
    db_session.add(inscription)

    newsletters_hebdo = list(Newsletter.export(type_='hebdomadaire'))
    assert len(newsletters_hebdo) == 1
    assert newsletters_hebdo[0].newsletter_hebdo_template is not None


@pytest.mark.parametrize(
    "inscription, episode, raep, nb_nls",
    [
        ("inscription_alerte", "episode_soufre_tomorrow", "raep_nul", 0),
        ("inscription_alerte", "", "raep_nul", 0),
        ("inscription_alerte", "episode_soufre_tomorrow", "raep_eleve", 1),
        ("inscription_alerte", "", "raep_eleve", 1)
    ]
)
# pylint: disable-next=too-many-arguments
def test_export(db_session, recommandation, bonne_qualite_air_tomorrow, inscription, episode, raep, nb_nls, request):
    _ = (recommandation, bonne_qualite_air_tomorrow)
    inscription = request.getfixturevalue(inscription)
    db_session.add(inscription)
    raep = request.getfixturevalue(raep)
    if episode:
        episode = request.getfixturevalue(episode)
        db_session.add(episode)
    db_session.commit()

    newsletters = list(Newsletter.export())
    assert len(newsletters) == nb_nls


def test_get_recommandation_simple_case(inscription, recommandation):
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=[recommandation],
    )

    assert newsletter.recommandation is not None


def test_get_recommandation_deja_recue(inscription, db_session):
    yesterday = date.today() - timedelta(days=1)
    recommandations = [
        published_recommandation(),
        published_recommandation()
    ]
    db_session.add_all(recommandations)
    nl1 = Newsletter(
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=recommandations,
        date=yesterday
    )
    db_session.add(NewsletterDB(nl1))
    db_session.commit()
    nl2 = Newsletter(
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=recommandations,
    )
    assert nl1.recommandation.id != nl2.recommandation.id


def test_get_recommandation_par_type(inscription, db_session):
    recommandations = [
        published_recommandation(),
        published_recommandation(type_="raep")
    ]
    db_session.add_all(recommandations)
    newsletter = Newsletter(date=tomorrow(),
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=recommandations,
    )
    eligible_recommandations = list(newsletter.eligible_recommandations(
        {r.id: r for r in recommandations}, types=["indice_atmo"]))
    assert all([r.type_ == "indice_atmo"] for r in eligible_recommandations)


def test_vigilance(db_session, inscription, bonne_qualite_air_tomorrow, raep_nul):
    _ = (bonne_qualite_air_tomorrow, raep_nul)
    db_session.add(published_recommandation())
    db_session.add(inscription)
    db_session.commit()

    for phenomene_id in VigilanceMeteo.phenomenes:
        vigilance_meteo = VigilanceMeteo(
            zone_id=inscription.commune.departement.zone_id,
            phenomene_id=phenomene_id,
            couleur_id=1,
            date_export=datetime.now() - timedelta(hours=1),
            validity=DateTimeTZRange(
                date.today() - timedelta(days=1), date.today() + timedelta(days=1)),
        )
        db_session.add(vigilance_meteo)
        vigilance_meteo_tomorrow = VigilanceMeteo(
            zone_id=inscription.commune.departement.zone_id,
            phenomene_id=phenomene_id,
            couleur_id=1,
            date_export=datetime.now() - timedelta(hours=1) + timedelta(days=1),
            validity=DateTimeTZRange(
                date.today(), date.today() + timedelta(days=2)),
        )
        db_session.add(vigilance_meteo_tomorrow)
        db_session.commit()
        newsletters = list(Newsletter.export())
        assert len(newsletters) == 1
        attributes = NewsletterDB(newsletters[0]).attributes()
        key = f'VIGILANCE_{Newsletter.phenomenes_sib[phenomene_id].upper()}'
        assert f'{key}_COULEUR' in attributes
        assert attributes[f'{key}_COULEUR'] == 'Vert'
        assert attributes[f'{key}_COULEUR'] == attributes['VIGILANCE_GLOBALE_COULEUR']

        db_session.delete(vigilance_meteo)
        db_session.delete(vigilance_meteo_tomorrow)
        db_session.commit()


def test_vigilance_alerte(db_session, inscription, bonne_qualite_air_tomorrow, raep_nul):
    _ = bonne_qualite_air_tomorrow, raep_nul
    db_session.add(published_recommandation())
    inscription.indicateurs_frequence = ['alerte']
    inscription.indicateurs = ['vigilance_meteo']
    db_session.add(inscription)
    db_session.commit()

    for phenomene_id in VigilanceMeteo.phenomenes:
        vigilance_meteo = VigilanceMeteo(
            zone_id=inscription.commune.departement.zone_id,
            phenomene_id=phenomene_id,
            couleur_id=1,
            date_export=datetime.now() - timedelta(hours=1),
            validity=DateTimeTZRange(
                date.today() - timedelta(days=1), date.today() + timedelta(days=1)),
        )
        db_session.add(vigilance_meteo)
        vigilance_meteo_tomorrow = VigilanceMeteo(
            zone_id=inscription.commune.departement.zone_id,
            phenomene_id=phenomene_id,
            couleur_id=1,
            date_export=datetime.now() - timedelta(hours=1) + timedelta(days=1),
            validity=DateTimeTZRange(
                date.today(), date.today() + timedelta(days=2)),
        )
        db_session.add(vigilance_meteo_tomorrow)
        db_session.commit()
        newsletters = list(Newsletter.export())
        assert len(newsletters) == 0
        db_session.delete(vigilance_meteo)
        db_session.delete(vigilance_meteo_tomorrow)
        db_session.commit()

    for phenomene_id in VigilanceMeteo.phenomenes:
        vigilance_meteo = VigilanceMeteo(
            zone_id=inscription.commune.departement.zone_id,
            phenomene_id=phenomene_id,
            couleur_id=3,
            date_export=datetime.now() - timedelta(hours=1),
            validity=DateTimeTZRange(
                date.today() - timedelta(days=1), date.today() + timedelta(days=1)),
        )
        db_session.add(vigilance_meteo)
        vigilance_meteo_tomorrow = VigilanceMeteo(
            zone_id=inscription.commune.departement.zone_id,
            phenomene_id=phenomene_id,
            couleur_id=3,
            date_export=datetime.now() - timedelta(hours=1) + timedelta(days=1),
            validity=DateTimeTZRange(
                date.today(), date.today() + timedelta(days=2)),
        )
        db_session.add(vigilance_meteo_tomorrow)
        db_session.commit()
        newsletters = list(Newsletter.export())
        assert len(newsletters) == 1
        attributes = NewsletterDB(newsletters[0]).attributes()
        key = f'VIGILANCE_{Newsletter.phenomenes_sib[phenomene_id].upper()}'
        assert f'{key}_COULEUR' in attributes
        assert attributes[f'{key}_COULEUR'] == 'Orange'
        assert attributes[f'{key}_COULEUR'] == attributes['VIGILANCE_GLOBALE_COULEUR']

        db_session.delete(vigilance_meteo)
        db_session.delete(vigilance_meteo_tomorrow)
        db_session.commit()


def test_no_indice_uv_data(db_session, inscription, bonne_qualite_air_tomorrow):
    _ = bonne_qualite_air_tomorrow
    db_session.add(published_recommandation())
    inscription.indicateurs = ['indice_atmo', 'indice_uv']
    db_session.add(inscription)
    db_session.commit()

    newsletters = list(Newsletter.export(force_send=True))
    assert len(newsletters) == 1
    attributes = NewsletterDB(newsletters[0]).attributes()
    assert 'INDICE_UV_VALUE' in attributes
    assert attributes['INDICE_UV_VALUE'] == ""
    assert 'INDICE_UV_LABEL' in attributes
    assert attributes['INDICE_UV_LABEL'] == ""


def test_no_indice_uv(db_session, inscription):
    db_session.add(published_recommandation())
    inscription.indicateurs = ['indice_uv']
    db_session.add(inscription)
    db_session.commit()

    indice_uv = IndiceUv(
        zone_id=inscription.commune.zone_id,
        date=date.today(),
        uv_j1=None,
    )
    db_session.add(indice_uv)
    db_session.commit()
    newsletters = list(Newsletter.export(force_send=True))
    assert len(newsletters) == 1
    attributes = NewsletterDB(newsletters[0]).attributes()
    assert 'INDICE_UV_VALUE' in attributes
    assert attributes['INDICE_UV_VALUE'] == ""
    assert 'INDICE_UV_LABEL' in attributes
    assert attributes['INDICE_UV_LABEL'] == ""

    db_session.delete(indice_uv)
    db_session.commit()


def test_indice_uv(db_session, inscription):
    db_session.add(published_recommandation())
    inscription.indicateurs = ['indice_uv']
    db_session.add(inscription)
    db_session.commit()

    indice_uv = IndiceUv(
        zone_id=inscription.commune.zone_id,
        date=date.today(),
        uv_j1=1,
    )
    db_session.add(indice_uv)
    db_session.commit()
    newsletters = list(Newsletter.export())
    assert len(newsletters) == 1
    attributes = NewsletterDB(newsletters[0]).attributes()
    assert 'INDICE_UV_VALUE' in attributes
    assert attributes['INDICE_UV_VALUE'] == 1
    assert 'INDICE_UV_LABEL' in attributes
    assert attributes['INDICE_UV_LABEL'] == "Faible (UV\u00a01)"

    db_session.delete(indice_uv)
    db_session.commit()


def test_indice_uv_alerte(db_session, inscription):
    db_session.add(published_recommandation())
    inscription.indicateurs_frequence = ['alerte']
    inscription.indicateurs = ['indice_uv']
    db_session.add(inscription)
    db_session.commit()

    indice_uv = IndiceUv(
        zone_id=inscription.commune.zone_id,
        date=date.today(),
        uv_j1=1,
    )
    db_session.add(indice_uv)
    db_session.commit()
    newsletters = list(Newsletter.export())
    assert len(newsletters) == 0

    indice_uv.uv_j1 = 3
    db_session.add(indice_uv)
    db_session.commit()
    newsletters = list(Newsletter.export())
    assert len(newsletters) == 0

    indice_uv.uv_j1 = 8
    db_session.add(indice_uv)
    db_session.commit()
    newsletters = list(Newsletter.export())
    assert len(newsletters) == 1
    attributes = NewsletterDB(newsletters[0]).attributes()
    assert 'INDICE_UV_VALUE' in attributes
    assert attributes['INDICE_UV_VALUE'] == 8
    assert 'INDICE_UV_LABEL' in attributes
    assert attributes['INDICE_UV_LABEL'] == "Très\u00a0fort (UV\u00a08)"

    indice_uv.uv_j1 = 3
    inscription.enfants = "oui"
    db_session.add_all([indice_uv, inscription])
    db_session.commit()
    newsletters = list(Newsletter.export())
    assert len(newsletters) == 1

    db_session.delete(indice_uv)
    db_session.commit()


def test_indice_uv_recommandation(db_session, inscription):
    recommandations = [published_recommandation(
        type_="indice_uv", min_indice_uv=3, recommandation="Recommandation pour indice UV égal à 3")]
    db_session.add_all(recommandations)
    db_session.commit()
    inscription.indicateurs = ['indice_uv']
    db_session.add(inscription)
    db_session.commit()

    indice_uv = IndiceUv(
        zone_id=inscription.commune.zone_id,
        date=date.today(),
        uv_j1=3,
    )
    db_session.add(indice_uv)
    db_session.commit()
    newsletters = list(Newsletter.export())
    assert len(newsletters) == 1
    newsletter = newsletters[0]
    newsletter.recommandations = recommandations
    newsletter_db = NewsletterDB(newsletter)
    attributes = newsletter_db.attributes()
    assert 'RECOMMANDATION_INDICE_UV' in attributes
    assert attributes['RECOMMANDATION_INDICE_UV'] == "<p>Recommandation pour indice UV égal à 3</p>"

    db_session.delete(indice_uv)
    db_session.commit()

