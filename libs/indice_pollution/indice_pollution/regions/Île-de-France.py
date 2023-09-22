# pylint: disable=invalid-name,non-ascii-file-name
# pylint: enable=invalid-name,non-ascii-file-name
import os
from datetime import date, timedelta

import requests

from indice_pollution.extensions import logger
from indice_pollution.history.models.zone import Zone
from indice_pollution.regions import EpisodeMixin, ForecastMixin


class Service:
    is_active = True
    website = 'https://www.airparif.asso.fr/'
    nom_aasqa = 'Airparif'
    insee_list = ['75056']

    def get_close_insee(self, insee):
        return insee


class Forecast(Service, ForecastMixin):
    url = 'https://magellan.airparif.asso.fr/geoserver/DIDON/wfs'
    attributes_key = 'properties'
    use_dateutil_parser = True
    get_only_from_scraping = True

    def params(self, date_, insee):
        return {
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typeName': 'DIDON:indice_atmo_2020',
            'outputFormat': 'application/json',
            'CQL_FILTER': f"date_ech >= '{date_}T00:00:00Z' AND code_zone={insee}"
        }

    @classmethod
    def params_fetch_all(cls):
        return {
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typeName': 'DIDON:indice_atmo_2020',
            'outputFormat': 'application/json',
            'CQL_FILTER': f'(date_dif >= {date(2023, 9, 6)}) OR (date_ech >= {date(2023, 9, 6)})'
        }

    @classmethod
    def get_from_scraping(cls, previous_results, date_, insee):
        _ = (previous_results, date_)
        api_key = os.getenv('AIRPARIF_API_KEY')
        if not api_key:
            return []
        request = requests.get(
            f"https://api.airparif.asso.fr/indices/prevision/commune?insee={insee}",
            headers={
                "X-Api-Key": api_key,
                "accept": "application/json"
            },
            timeout=10)
        to_return = []
        for _k, indices in request.json().items():
            to_return = [
                cls.getter({
                    "date": indice["date"],
                    "lib_qual": indice["indice"],
                })
                for indice in indices
                if "date" in indice and "indice" in indice
            ]
        return to_return


class Episode(Service, EpisodeMixin):
    get_only_from_scraping = True
    fetch_only_from_scraping = True
    zone_type = 'region'

    @classmethod
    def get_from_scraping(cls, to_return=None, date_=None, insee=None):
        _ = (date_, insee)
        api_key = os.getenv('AIRPARIF_API_KEY')
        polluant_code_pol = {
            "O3": "7",
            "NO2": "8",
            "PM10": "5"
        }
        if not api_key:
            return []
        if to_return is None:
            to_return = []
        request = requests.get(
            "https://api.airparif.asso.fr/episodes/en-cours-et-prevus",
            headers={
                "X-Api-Key": api_key,
                "accept": "application/json"
            },
            timeout=10)
        try:
            request.raise_for_status()
        except requests.HTTPError as exception:
            logger.error(exception)
            return []
        try:
            request.json()
        except ValueError as exception:
            logger.error(exception)
            return []
        for k, datetime in [('jour', date(2023, 9, 6)), ('demain', date(2023, 9, 6) + timedelta(days=1))]:
            for polluant in request.json()[k]['polluants']:
                to_return += [{
                    'code_pol': polluant_code_pol.get(polluant['nom']),
                    'date': str(datetime),
                    'etat': "PAS DE DEPASSEMENT" if polluant['niveau'] == "-" else polluant['niveau'],
                    'code_zone': '11'
                }]
        return to_return

    @classmethod
    def get_zone_id(cls, properties):
        return Zone.query.filter_by(code='11', type='region').first().id
