# pylint: disable=invalid-name,non-ascii-file-name
# pylint: enable=invalid-name,non-ascii-file-name
import os

import requests

from indice_pollution.extensions import logger
from indice_pollution.history.models.zone import Zone
from indice_pollution.regions import EpisodeMixin, ForecastMixin


class Service:
    is_active = True
    website = 'https://www.atmo-auvergnerhonealpes.fr/'
    nom_aasqa = 'Atmo Auvergne-Rhône-Alpes'


class Forecast(Service, ForecastMixin):
    get_only_from_scraping = True
    url = 'https://services3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/rest/services/Indice_ATMO/FeatureServer/0/query'

    @classmethod
    def get_from_scraping(cls, previous_results, date_, insee):
        _ = previous_results
        api_key = os.getenv('AURA_API_KEY')
        if not api_key:
            return []

        request = requests.get(
            # pylint: disable-next=line-too-long
            f'https://api.atmo-aura.fr/api/v1/communes/{insee}/indices/atmo?api_token={api_key}&date_debut_echeance={date_}',
            timeout=10,
        )
        try:
            request.raise_for_status()
        except requests.HTTPError as exception:
            logger.error(exception)
            return []
        return [
            cls.getter({
                "date": indice['date_echeance'],
                "lib_qual": indice['qualificatif']
            })
            for indice in request.json()['data']
        ]


class Episode(Service, EpisodeMixin):
    # pylint: disable-next=line-too-long
    url = 'https://services3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/rest/services/Episodes%20de%20pollution%20pr%C3%A9vus%20ou%20constat%C3%A9s/FeatureServer/0/query'
    # pylint: disable-next=line-too-long
    url_all = 'https://services3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/rest/services/Episodes%20de%20pollution%20pr%C3%A9vus%20ou%20constat%C3%A9s%20complets/FeatureServer/0/query'
    zone_type = 'bassin_dair'

    def filtre_post_get(self, code_zone, date_):
        _ = code_zone
        return lambda f: f.get('date') == str(date_)

    params_fetch_all = {
        'where': '1=1',
        'f': 'json',
        'returnGeometry': False,
        'orderByFields': 'OBJECTID ASC',
        'outFields': '*'
    }

    @classmethod
    def get_zone_id(cls, properties):
        return Zone.get(code=str(properties['code_zone']), type_='bassin_dair').id
