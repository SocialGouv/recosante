import operator
import os
import re
import time
from datetime import datetime

import bs4
import requests
from bs4 import BeautifulSoup
from flask import current_app
from indice_pollution.history.models.commune import Commune


# pylint: disable-next=too-many-locals
def make_baignades_response(insee):
    commune = Commune.get(insee)
    details = []
    # Déduction de l'id carte en fonction du code insee
    id_carte = id_carte_from_insee(insee)
    if id_carte is not None:
        code_departement = commune.departement.code
        # Obtention de la liste des sites de baignade de la commune
        sites = get_commune_sites(id_carte, insee, code_departement)
    else:
        sites = None
    if sites is not None:
        now = datetime.now()
        # Obtention de la saison à interroger selon la date et selon si France métropolitaine ou Outre-mer
        season_year = get_season_year(id_carte, now)
        for site in sites:
            site_id = site['isite']
            # Obtention de tous les détails du site de baignade interrogé
            site_details = get_site_details(
                site_id, code_departement, season_year, id_carte)
            site_details['label'] = site['nom']
            details.append(site_details)
            # Temporisation pour éviter de surcharger le fournisseur de données
            time.sleep(0.1)  # 100ms
        # Tri des sites par interdiction de baignade puis par résultat de prélèvement (du plus mauvais au meilleur)
        details.sort(key=get_site_order)
        # Construction des dates de début et de fin de saison pour une commune
        commune_season_start, commune_season_end = make_season_dates(
            id_carte, season_year, details)
        start_dt = make_start_dt(commune_season_start)
        start = start_dt.isoformat()
        end_dt = make_end_dt(commune_season_end)
        end = end_dt.isoformat()
        # Nombre total de sites de baignade de la commune
        commune_nb_sites = len(details)
        # Nombre d'interdiction de baignade
        nb_interdiction = len(
            list(filter(lambda k: k['interdiction'] is not None, details)))
        # Nombre de mauvais résultats de prélèvement
        nb_mauvais_resultats = len(
            list(filter(lambda k: k['sample']['label'] == "Mauvais résultat", details)))
        # Nombre de résultats moyens de prélèvement
        nb_resultats_moyens = len(
            list(filter(lambda k: k['sample']['label'] == "Résultat moyen", details)))
        # Nombre de bons résultats de prélèvement
        nb_bons_resultats = len(
            list(filter(lambda k: k['sample']['label'] == "Bon résultat", details)))
        # Construction du label principal de l'indicateur
        label = make_main_label(now, start_dt, end_dt, commune_nb_sites,
                                nb_mauvais_resultats, nb_resultats_moyens, nb_bons_resultats)
        resp = {
            "baignades": {
                "indice": {
                    "label": label,
                    "summary": {
                        "Interdiction": nb_interdiction,
                        "Mauvais résultats": nb_mauvais_resultats,
                        "Résultats moyens": nb_resultats_moyens,
                        "Bons résultats": nb_bons_resultats,
                    },
                    "details": details,
                },
                "sources": [{
                    "label": "le site Baignades du Ministère des Solidarités et de la Santé",
                    "url": "https://baignades.sante.gouv.fr/"
                }],
                "validity": {
                    "area": commune.zone.lib,
                    "start": start,
                    "end": end,
                }
            }
        }
    else:
        resp = {
            "baignades": {
                "error": "Inactive region"
            }
        }
    return resp


def get_commune_sites(id_carte, insee, code_departement):
    sites = []
    baignades_commune_sites_url = os.getenv('BAIGNADES_COMMUNE_SITES_URL')
    if baignades_commune_sites_url is None:
        raise Exception("BAIGNADES_COMMUNE_SITES_URL var env is required")
    url = baignades_commune_sites_url.format(id_carte, insee, code_departement)
    try:
        request = requests.get(url, timeout=10)
        request.raise_for_status()
        sites = request.json().get('sites', [])
    except Exception as exception:
        current_app.logger.error(f"Error when fetching site list: {exception}")
    return sites


# pylint: disable-next=too-many-branches,too-many-locals,too-many-statements
def get_site_details(site_id, code_departement, season_year, id_carte):
    # préfixe avec des 0 pour atteindre une longueur de 3 caractères
    dptddass = code_departement.zfill(3)
    site = dptddass + site_id
    baignades_site_details_url = os.getenv('BAIGNADES_SITE_DETAILS_URL')
    if baignades_site_details_url is None:
        raise Exception("BAIGNADES_SITE_DETAILS_URL var env is required")
    url = baignades_site_details_url.format(dptddass, site, season_year)
    try:
        request = requests.get(url, timeout=10)
        request.raise_for_status()
        markup = request.content
        soup = BeautifulSoup(markup, 'html.parser')
    except Exception as exception:
        current_app.logger.error(f"Error when fetching site page: {exception}")
    season_dict = None
    site_season_start = None
    site_season_end = None
    td0 = soup.find(text=re.compile('Début de la saison'))
    if isinstance(td0, bs4.PageElement):
        site_season_start = re.sub(r'[^\d\/]', '', td0.text.strip())
    td1 = soup.find(text=re.compile('Fin de la saison'))
    if isinstance(td1, bs4.PageElement):
        site_season_end = re.sub(r'[^\d\/]', '', td1.text.strip())
    # pylint: disable-next=line-too-long
    if None not in (site_season_start, site_season_end) and is_valid_date(site_season_start) and is_valid_date(site_season_end):
        if id_carte != 'fra':
            last_year = str(int(season_year) - 1)
            site_season_start = site_season_start[:-4] + last_year
            site_season_end = site_season_end[:-4] + season_year
        season_dict = {
            "start": site_season_start,
            "end": site_season_end
        }
    interdiction_dict = None
    interdiction_date = None
    interdiction_type = None
    interdiction_reason = None
    interdiction_observations = None
    titre_interdiction = soup.find(class_="texte_titre_interdiction")
    if isinstance(titre_interdiction, bs4.PageElement):
        interdiction_label = titre_interdiction.text.strip()
        interdiction_date = re.sub(r'[^\d\/]', '', interdiction_label)
        texte_interdiction_type = soup.find(
            class_="texte_interdiction", text=re.compile('Type :'))
        if isinstance(texte_interdiction_type, bs4.PageElement):
            full_type = texte_interdiction_type.text.strip()
            if "TEMPORAIRE" in full_type:
                interdiction_type = "temporaire"
            elif "PERMANENTE" in full_type:
                interdiction_type = "permanente"
            elif "DEFINITIVE" in full_type:
                interdiction_type = "définitive"
            if "RAISON SANITAIRE" in full_type:
                interdiction_reason = "sanitaire"
            elif "RAISON NON SANITAIRE" in full_type:
                interdiction_reason = "non sanitaire"

    def text_is_none(text):
        return text is None
    texte_interdiction_observations = soup.find(
        class_="texte_interdiction", text=text_is_none)
    if isinstance(texte_interdiction_observations, bs4.PageElement):
        interdiction_observations = re.sub(
            '^Observations : \n(\t)*', '', texte_interdiction_observations.text.strip())
    if interdiction_date is not None and is_valid_date(interdiction_date):
        interdiction_dict = {
            "date": interdiction_date,
            "type": interdiction_type,
            "reason": interdiction_reason,
            "observations": interdiction_observations
        }
    cadre_dotted = soup.find_all(class_="cadre_dotted")
    sample_dict = {
        "label": "Pas de résultats de prélèvements",
    }
    sample_date = None
    sample_label = None
    if isinstance(cadre_dotted, list) and len(cadre_dotted) > 0:
        last_cadre_dotted = cadre_dotted[-1]
        if isinstance(last_cadre_dotted, bs4.PageElement):
            strong = last_cadre_dotted.find('strong')
            if isinstance(strong, bs4.PageElement):
                sample_date = strong.text.strip()
                children = last_cadre_dotted.find_all()
                for child in children:
                    if isinstance(child, bs4.PageElement):
                        child.extract()
                sample_label = sample_label_from_value(
                    last_cadre_dotted.text.strip())
    if None not in (sample_date, sample_label) and is_valid_date(sample_date):
        sample_dict = {
            "label": sample_label,
            "date": sample_date
        }
        url = url + '&plv=all'
    ranking_dict = None
    ranking_year = None
    cellule_titre = soup.find_all(class_="cellule_titre")
    if isinstance(cellule_titre, list) and len(cellule_titre) > 0:
        last_cellule_titre = cellule_titre[-1]
        if isinstance(last_cellule_titre, bs4.PageElement):
            ranking_year = last_cellule_titre.text.strip()
    ranking_label = None
    cadre_dotted_complet_classement = soup.find_all(
        class_="cadre_dotted_complet_classement")
    if isinstance(cadre_dotted_complet_classement, list) and len(cadre_dotted_complet_classement) > 0:
        last_cadre_dotted_complet_classement = cadre_dotted_complet_classement[-1]
        if isinstance(last_cadre_dotted_complet_classement, bs4.PageElement):
            img = last_cadre_dotted_complet_classement.find('img')
            if isinstance(img, bs4.PageElement):
                ranking_label = ranking_label_from_src(img['src'])
    if None not in (ranking_year, ranking_label) and is_valid_year(ranking_year):
        ranking_dict = {
            "label": ranking_label,
            "year": ranking_year
        }
    return {
        "season": season_dict,
        "sample": sample_dict,
        "ranking": ranking_dict,
        "interdiction": interdiction_dict,
        "url": url
    }


def id_carte_from_insee(insee):
    return {
        "971": "gua",  # Guadeloupe
        "972": "mar",  # Martinique
        "973": "guy",  # Guyane
        "974": "reu",  # Réunion
        "976": "may",  # Mayotte
        "975": None,  # COM non supporté
        "977": None,
        "978": None,
        "984": None,
        "986": None,
        "987": None,
        "988": None,
        "989": None,
    }.get(insee[0:3], 'fra')  # France métropolitaine par défaut


def get_season_year(id_carte, date_time):
    if id_carte == 'fra':  # France métropolitaine
        if date_time.month < 6:
            # année précédente en avant-saison
            season_year = str(date_time.year - 1)
        else:
            season_year = str(date_time.year)  # année en cours dès juin
    else:  # Outre-mer
        if date_time.month < 10:
            season_year = str(date_time.year)  # année en cours dès octobre
        else:
            season_year = str(date_time.year + 1)  # année suivante
    return season_year


def get_site_order(details):
    interdiction = details['interdiction']
    if interdiction is not None:  # interdiction d'abord
        order = 0
    else:
        order = 10
    sample_label = details['sample']['label']
    order += order_from_sample_label(sample_label)  # mauvais résultats ensuite
    return order


def order_from_sample_label(label):
    return ["Mauvais résultat", "Résultat moyen", "Bon résultat", "Pas de résultats de prélèvements"].index(label)


def sample_label_from_value(value):
    return {
        "Mauvais": "Mauvais résultat",
        "Moyen": "Résultat moyen",
        "Bon": "Bon résultat",
    }.get(value, None)


def ranking_label_from_src(src):
    if "classe1.gif" in src:
        ranking_label = "Excellent"
    elif "classe2.gif" in src:
        ranking_label = "Bon"
    elif "classe3.gif" in src:
        ranking_label = "Suffisant"
    elif "classe4.gif" in src:
        ranking_label = "Insuffisant"
    elif "classe5.gif" in src:
        ranking_label = "Insuffisamment de prélèvements"
    elif "classe6.gif" in src or "classe7.gif" in src or "classe11.gif" in src:
        ranking_label = "Site non classé"
    else:
        ranking_label = "Non suivi"
    return ranking_label


def date_from_str(date_str):
    return datetime.strptime(date_str, '%d/%m/%Y').date()


def is_valid_date(date_str):
    try:
        date_from_str(date_str)
    except ValueError:
        return False
    return True


def is_valid_year(year_str):
    return year_str.isdigit() and int(year_str) >= 2020


def compare_date_str(date_str1, date_str2, oper):
    return oper(date_from_str(date_str1), date_from_str(date_str2))


def is_before(date_str1, date_str2):
    return compare_date_str(date_str1, date_str2, operator.lt)


def is_after(date_str1, date_str2):
    return compare_date_str(date_str1, date_str2, operator.gt)


def make_start_dt(date_str):
    start_time = datetime.min.time()
    start_dt = datetime.combine(date_from_str(date_str), start_time)
    return start_dt


def make_end_dt(date_str):
    end_time = datetime.max.time().replace(microsecond=0)
    end_dt = datetime.combine(date_from_str(date_str), end_time)
    return end_dt


def make_season_dates(id_carte, season_year, details):
    commune_season_start = None
    commune_season_end = None
    for detail in details:
        if detail['season'] is not None:
            if commune_season_start is None or is_before(detail['season']['start'], commune_season_start):
                # date la plus tôt parmi les sites de la commune
                commune_season_start = detail['season']['start']
            if commune_season_end is None or is_after(detail['season']['end'], commune_season_end):
                # date la plus tardive parmi les sites de la commune
                commune_season_end = detail['season']['end']
    if id_carte == 'fra':  # dates par défaut pour la France métropolitaine
        if commune_season_start is None:
            commune_season_start = '15/06/' + season_year
        if commune_season_end is None:
            commune_season_end = '15/09/' + season_year
    else:  # dates par défaut pour l'Outre-mer
        if commune_season_start is None:
            last_year = str(int(season_year) - 1)
            commune_season_start = '01/10/' + last_year
        if commune_season_end is None:
            commune_season_end = '30/09/' + season_year
    return [commune_season_start, commune_season_end]


# pylint: disable-next=too-many-arguments
def make_main_label(
        now,
        start_dt,
        end_dt,
        commune_nb_sites,
        nb_mauvais_resultats,
        nb_resultats_moyens,
        nb_bons_resultats):
    if now < start_dt or now > end_dt:  # en dehors des dates de début et de fin de saison
        label = "Hors-saison"
    elif commune_nb_sites == 0:
        label = "Pas de sites"
    elif nb_mauvais_resultats == 0 and nb_resultats_moyens == 0 and nb_bons_resultats == 0:
        label = "Pas de résultats"
    elif nb_mauvais_resultats > 0 and nb_resultats_moyens == 0 and nb_bons_resultats == 0:
        label = "Mauvais résultats"
    elif nb_resultats_moyens > 0 and nb_mauvais_resultats == 0 and nb_bons_resultats == 0:
        label = "Résultats moyens"
    elif nb_bons_resultats > 0 and nb_mauvais_resultats == 0 and nb_resultats_moyens == 0:
        label = "Bons résultats"
    else:
        label = "Résultats mixtes"
    return label
