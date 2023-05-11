from . import ForecastMixin, EpisodeMixin
import requests
import json
from bs4 import BeautifulSoup
from dateutil.parser import parse
from .occitanie_epcis import insee_epci

class Service(object):
    is_active = True
    website = 'https://www.atmo-occitanie.org/'
    nom_aasqa = 'ATMO Occitanie'
    attributes_key = 'attributes'
    licence = 'OdbL v1.0'

class Episode(Service, EpisodeMixin):
    url = 'https://services9.arcgis.com/7Sr9Ek9c1QTKmbwr/arcgis/rest/services/epipol_3j_occitanie/FeatureServer/0/query'

class Forecast(Service, ForecastMixin):
    url = 'https://services9.arcgis.com/7Sr9Ek9c1QTKmbwr/arcgis/rest/services/Indice_quotidien_de_qualit%C3%A9_de_l%E2%80%99air_pour_les_collectivit%C3%A9s_territoriales_en_Occitanie/FeatureServer/0/query'

    def params(self, date_, insee):
        zone = insee_epci.get(insee, insee)
        return {
            'where': f"(date_ech >= CURRENT_DATE - INTERVAL '2' DAY) AND code_zone ='{zone}'",
            'outFields': "*",
            'f': 'json',
            'outSR': '4326'
        }

    @classmethod
    def get_from_scraping(cls, previous_results, date_, insee):
        url = cls.get_url(insee)
        if not url:
            return []
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        script = soup.find_all('script', {"data-drupal-selector": "drupal-settings-json"})[0]
        j = json.loads(script.contents[0])
        city_iqa = j['atmo_mesures']['city_iqa']
        return [
            cls.getter({
                "indice": int(v['iqa']) - 1,
                "date": str(parse(v['date']).date())
            })
            for v in city_iqa
        ]

    @classmethod
    def get_url(cls, insee):
        r = requests.get(f'https://geo.api.gouv.fr/communes/{insee}',
                params={
                    "fields": "codesPostaux",
                    "format": "json",
                    "geometry": "centre"
                }
        )
        codes_postaux = ",".join(r.json()['codesPostaux'])
        search_string = f"{r.json()['nom']} [{codes_postaux}]"
        r = requests.post(
            'https://www.atmo-occitanie.org/',
            data={
                "search_custom": search_string,
                "form_id": "city_search_block_form"
            },
            allow_redirects=False
        )
        return r.headers.get('Location')
