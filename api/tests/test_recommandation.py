from datetime import date, timedelta
from itertools import product

import pytest
from indice_pollution.history.models.vigilance_meteo import VigilanceMeteo

from ecosante.inscription.models import Inscription
from ecosante.newsletter.models import Newsletter, NewsletterDB
from ecosante.recommandations.models import Recommandation


def published_recommandation(**kw):
    kw.setdefault('type_', 'indice_atmo')
    kw.setdefault('status', 'published')
    return Recommandation(**kw)


def help_activites(nom_activite):
    recommandation = published_recommandation(**{nom_activite: True})
    i = Inscription(activites=[nom_activite])
    assert recommandation.is_relevant(i, None, [], 0, date.today())

    recommandation = published_recommandation(**{nom_activite: True})
    i = Inscription(activites=[])
    assert not recommandation.is_relevant(i, None, [], 0, date.today())


def help_deplacement(nom_deplacement, nom_deplacement_inscription=None):
    recommandation = published_recommandation(**{nom_deplacement: True})
    i = Inscription(
        deplacement=[nom_deplacement_inscription or nom_deplacement])
    assert recommandation.is_relevant(i, None, [], 0, date.today())

    recommandation = published_recommandation(**{nom_deplacement: True})
    i = Inscription(deplacement=[])
    assert not recommandation.is_relevant(i, None, [], 0, date.today())


def test_is_relevant_menage():
    help_activites('menage')


def test_is_relevant_bricolage():
    help_activites('bricolage')


def test_is_relevant_jardinage():
    help_activites('jardinage')


def test_is_relevant_sport():
    help_activites('sport')


def test_is_relevant_velo():
    recommandation = published_recommandation(velo=True)
    inscription = Inscription(deplacement=["velo"])
    assert recommandation.is_relevant(inscription, None, [], 0, date.today())

    recommandation = published_recommandation(velo=True)
    inscription = Inscription(deplacement=[])
    assert not recommandation.is_relevant(
        inscription, None, [], 0, date.today())


def test_is_relevant_transport_en_commun():
    help_deplacement("tec", "tec")


def test_is_relevant_voiture():
    help_deplacement("voiture")


def test_is_relevant_enfants():
    recommandation = published_recommandation(enfants=True)
    inscription = Inscription(enfants='oui')
    assert recommandation.is_relevant(inscription, None, [], 0, date.today())

    recommandation = published_recommandation(enfants=True)
    inscription = Inscription(enfants='non')
    assert not recommandation.is_relevant(
        inscription, None, [], 0, date.today())


def test_is_qualite_evenement():
    recommandation = published_recommandation(qa_evenement=True)
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "evenement", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "extrement_mauvais", [], 0, date.today())


def test_is_qualite_mauvaise():
    recommandation = published_recommandation(qa_mauvaise=True)
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "mauvais", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "bon", [], 0, date.today())


def test_is_qualite_tres_mauvaise():
    recommandation = published_recommandation(qa_mauvaise=True)
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "tres_mauvais", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "bon", [], 0, date.today())


def test_is_qualite_extrement_mauvaise():
    recommandation = published_recommandation(qa_mauvaise=True)
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "extrement_mauvais", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "bon", [], 0, date.today())


def test_is_qualite_bonne():
    recommandation = published_recommandation(qa_bonne=True)
    inscription = Inscription()
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "moyen", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "extrement_mauvais", [], 0, date.today())


def test_is_qualite_bonne_mauvaise():
    recommandation = published_recommandation(qa_bonne=True, qa_mauvaise=True)
    inscription = Inscription()
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "moyen", [], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "degrade", [], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "extrement_mauvais", [], 0, date.today())


def test_is_relevant_ozone():
    recommandation = published_recommandation(
        ozone=True, type_="episode_pollution")
    inscription = Inscription()
    assert recommandation.is_relevant(inscription=inscription, qualif="bon", polluants=[
        "ozone"], raep=0, date_=date.today())
    assert recommandation.is_relevant(inscription=inscription, qualif="moyen", polluants=[
        "ozone", "particules_fines"], raep=0, date_=date.today())
    assert not recommandation.is_relevant(
        inscription=inscription, qualif="degrade", polluants=[], raep=0, date_=date.today())
    assert not recommandation.is_relevant(inscription=inscription, qualif="degrade", polluants=[
        "particules_fines"], raep=0, date_=date.today())


def test_is_relevant_particules_fines():
    recommandation = published_recommandation(
        particules_fines=True, type_="episode_pollution")
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "degrade", ["particules_fines"], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "moyen", ["ozone", "particules_fines"], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "degrade", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "bon", ["ozone"], 0, date.today())


def test_is_relevant_dioxyde_azote():
    recommandation = published_recommandation(
        dioxyde_azote=True, type_="episode_pollution")
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "degrade", ["dioxyde_azote"], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "moyen", ["ozone", "dioxyde_azote"], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "degrade", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "bon", ["ozone"], 0, date.today())


def test_is_relevant_dioxyde_soufre():
    recommandation = published_recommandation(
        dioxyde_soufre=True, type_="episode_pollution")
    inscription = Inscription()
    assert recommandation.is_relevant(
        inscription, "degrade", ["dioxyde_soufre"], 0, date.today())
    assert recommandation.is_relevant(
        inscription, "moyen", ["ozone", "dioxyde_soufre"], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "degrade", [], 0, date.today())
    assert not recommandation.is_relevant(
        inscription, "bon", ["ozone"], 0, date.today())


def test_qualite_air_bonne_menage_bricolage():
    recommandation = published_recommandation(
        menage=True, bricolage=True, qa_bonne=True)

    inscription = Inscription(activites=["menage"])
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())

    inscription = Inscription(activites=["bricolage"])
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())

    inscription = Inscription(activites=["bricolage", "menage"])
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())


def test_reco_pollen_pollution():
    recommandation = published_recommandation(type_="pollens")

    inscription = Inscription(allergie_pollens=False)
    assert not recommandation.is_relevant(inscription=inscription, qualif="bon", polluants=[
        "ozone"], raep=0, date_=date.today())

    inscription = Inscription(allergie_pollens=True)
    assert not recommandation.is_relevant(inscription=inscription, qualif="bon", polluants=[
        "ozone"], raep=0, date_=date.today())

    recommandation = published_recommandation(type_="indice_atmo")

    inscription = Inscription(allergie_pollens=False)
    assert not recommandation.is_relevant(inscription=inscription, qualif="bon", polluants=[
        "ozone"], raep=0, date_=date.today())

    inscription = Inscription(allergie_pollens=True)
    assert not recommandation.is_relevant(inscription=inscription, qualif="bon", polluants=[
        "ozone"], raep=0, date_=date.today())


def test_reco_pollen_pas_pollution_raep_nul():
    recommandation = published_recommandation(type_="pollens")

    inscription = Inscription(allergie_pollens=False)
    assert not recommandation.is_relevant(
        inscription, "bon", [], 0, date.today())

    inscription = Inscription(allergie_pollens=True)
    assert not recommandation.is_relevant(
        inscription, "bon", [], 0, date.today())

    recommandation = published_recommandation()

    inscription = Inscription(allergie_pollens=False)
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())

    inscription = Inscription(allergie_pollens=True)
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())


@pytest.mark.parametrize(
    "delta,qualif,raep",
    product(
        list(range(0, 7)),
        ["bon", "mauvais"],
        [1, 6]
    )
)
def test_reco_pollen_pas_pollution_raep_faible_atmo_bon(delta, qualif, raep):
    recommandation = published_recommandation(type_="pollens", min_raep=raep)

    date_ = date.today() + timedelta(days=delta)
    inscription = Inscription(indicateurs=["indice_atmo"])
    assert not recommandation.is_relevant(inscription=inscription, qualif=qualif,
                                          polluants=[], raep=raep, date_=date_)

    inscription = Inscription(indicateurs=["raep"])
    assert recommandation.is_relevant(inscription=inscription, qualif=qualif,
                                      polluants=[], raep=raep, date_=date_)


def test_chauffage():
    recommandation = published_recommandation(chauffage=[])
    inscription = Inscription(chauffage=[])
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())

    recommandation = published_recommandation(chauffage=[])
    inscription = Inscription(chauffage=["bois"])
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())

    recommandation = published_recommandation(chauffage=["bois"])
    inscription = Inscription(chauffage=[""])
    assert not recommandation.is_relevant(
        inscription, "bon", [], 0, date.today())

    recommandation = published_recommandation(chauffage=["bois"])
    inscription = Inscription(chauffage=["bois"])
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())

    recommandation = published_recommandation(chauffage=None)
    inscription = Inscription(chauffage=None)
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today())


def test_get_relevant_recent(db_session, inscription):
    recommandation_1 = published_recommandation(status="published")
    recommandation_2 = published_recommandation(ordre=0)
    db_session.add_all([recommandation_1, recommandation_2, inscription])
    db_session.commit()
    newsletter_1 = NewsletterDB(Newsletter(
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=[recommandation_1, recommandation_2]
    ))
    assert newsletter_1.recommandation.ordre == 0
    db_session.add(newsletter_1)
    db_session.commit()
    newsletter_2 = NewsletterDB(Newsletter(
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=[recommandation_1, recommandation_2]
    ))

    assert newsletter_1.recommandation_id != newsletter_2.recommandation_id


def test_get_relevant_last_criteres(db_session, inscription):
    recommandation_1 = published_recommandation(menage=True)
    recommandation_2 = published_recommandation(menage=True)
    recommandation_3 = published_recommandation(velo=True)
    inscription.activites = ["menage"]
    inscription.deplacement = ["velo"]
    db_session.add_all([recommandation_1, recommandation_2,
                       recommandation_3, inscription])
    db_session.commit()
    newsletter = Newsletter(
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=[recommandation_1, recommandation_2, recommandation_3]
    )
    mewsletter_db_1 = NewsletterDB(newsletter)
    db_session.add(mewsletter_db_1)
    db_session.commit()
    mewsletter_db_2 = NewsletterDB(Newsletter(
        inscription=inscription,
        forecast={"data": []},
        episodes={"data": []},
        recommandations=[recommandation_1, recommandation_2, recommandation_3]
    ))
    assert mewsletter_db_1.recommandation.criteres != mewsletter_db_2.recommandation.criteres


def test_min_raep():
    recommandation = published_recommandation(type_="pollens", min_raep=0)
    inscription = Inscription()
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today(),
                                      media="dashboard") is True
    assert recommandation.is_relevant(inscription, "bon", [], 1, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 3, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 4, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 6, date.today(),
                                      media="dashboard") is False

    recommandation = published_recommandation(type_="pollens", min_raep=1)
    inscription = Inscription()
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 1, date.today(),
                                      media="dashboard") is True
    assert recommandation.is_relevant(inscription, "bon", [], 3, date.today(),
                                      media="dashboard") is True
    assert recommandation.is_relevant(inscription, "bon", [], 4, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 6, date.today(),
                                      media="dashboard") is False

    recommandation = published_recommandation(type_="pollens", min_raep=4)
    inscription = Inscription()
    assert recommandation.is_relevant(inscription, "bon", [], 0, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 1, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 3, date.today(),
                                      media="dashboard") is False
    assert recommandation.is_relevant(inscription, "bon", [], 4, date.today(),
                                      media="dashboard") is True
    assert recommandation.is_relevant(inscription, "bon", [], 6, date.today(),
                                      media="dashboard") is True


def test_vigilances():
    recommandation = published_recommandation(type_="vigilance_meteo", vigilance_couleur_ids=[
        1], vigilance_phenomene_ids=[1])
    assert recommandation.is_relevant(media="dashboard", types=[
                                      "vigilance_meteo"]) is False

    vigilance_meteo_1 = VigilanceMeteo(couleur_id=1, phenomene_id=1)
    assert recommandation.is_relevant(media="dashboard", vigilances=[
        vigilance_meteo_1], types=["vigilance_meteo"]) is True

    vigilance_meteo_2 = VigilanceMeteo(couleur_id=1, phenomene_id=2)
    assert recommandation.is_relevant(media="dashboard", vigilances=[
        vigilance_meteo_2], types=["vigilance_meteo"]) is False

    vigilance_meteo_3 = VigilanceMeteo(couleur_id=2, phenomene_id=1)
    assert recommandation.is_relevant(media="dashboard", vigilances=[
        vigilance_meteo_3], types=["vigilance_meteo"]) is False

    assert recommandation.is_relevant(media="dashboard", vigilances=[
        vigilance_meteo_2, vigilance_meteo_1, vigilance_meteo_3], types=["vigilance_meteo"]) is True


def test_min_indice_uv():
    recommandation = published_recommandation(
        type_="indice_uv", min_indice_uv=0)
    assert recommandation.is_relevant(types=["indice_uv"], indice_uv=0) is True
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=1) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=3) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=6) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=8) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=11) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=12) is False

    recommandation = published_recommandation(
        type_="indice_uv", min_indice_uv=1)
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=0) is False
    assert recommandation.is_relevant(types=["indice_uv"], indice_uv=1) is True
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=3) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=6) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=8) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=11) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=12) is False

    recommandation = published_recommandation(
        type_="indice_uv", min_indice_uv=3)
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=0) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=1) is False
    assert recommandation.is_relevant(types=["indice_uv"], indice_uv=3) is True
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=6) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=8) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=11) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=12) is False

    recommandation = published_recommandation(
        type_="indice_uv", min_indice_uv=6)
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=0) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=1) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=3) is False
    assert recommandation.is_relevant(types=["indice_uv"], indice_uv=6) is True
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=8) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=11) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=12) is False

    recommandation = published_recommandation(
        type_="indice_uv", min_indice_uv=8)
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=0) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=1) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=3) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=6) is False
    assert recommandation.is_relevant(types=["indice_uv"], indice_uv=8) is True
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=11) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=12) is False

    recommandation = published_recommandation(
        type_="indice_uv", min_indice_uv=11)
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=0) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=1) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=3) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=6) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=8) is False
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=11) is True
    assert recommandation.is_relevant(
        types=["indice_uv"], indice_uv=12) is True
