from indice_pollution.history.models.zone import Zone
from indice_pollution.extensions import logger
from . import ForecastMixin, EpisodeMixin
import os
import requests


class Service(object):
    is_active = True
    website = 'https://www.atmo-auvergnerhonealpes.fr/'
    nom_aasqa = 'Atmo Auvergne-Rhône-Alpes'

class Forecast(Service, ForecastMixin):
    get_only_from_scraping = True
    url = 'https://services3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/rest/services/Indice_ATMO/FeatureServer/0/query'

    @classmethod
    def get_from_scraping(cls, previous_results, date_, insee):
        api_key = os.getenv('AURA_API_KEY')
        if not api_key:
            return []

        r = requests.get(f'https://api.atmo-aura.fr/api/v1/communes/{insee}/indices/atmo?api_token={api_key}&date_debut_echeance={date_}')
        try:
            r.raise_for_status()
        except requests.HTTPError as e:
            logger.error(e)
            return []
        return [
            cls.getter({
                "date": indice['date_echeance'],
                "lib_qual": indice['qualificatif']
            })
            for indice in r.json()['data']
        ]


class Episode(Service, EpisodeMixin):
    url = 'https://services3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/rest/services/Episodes%20de%20pollution%20pr%C3%A9vus%20ou%20constat%C3%A9s/FeatureServer/0/query'
    url_fetch_all = 'https://services3.arcgis.com/o7Q3o5SkiSeZD5LK/arcgis/rest/services/Episodes%20de%20pollution%20pr%C3%A9vus%20ou%20constat%C3%A9s%20complets/FeatureServer/0/query'
    zone_type = 'bassin_dair'

    def filtre_post_get(self, code_zone, date_):
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