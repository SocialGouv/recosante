import re
from bs4 import BeautifulSoup
import requests
from . import EpisodeMixin, ForecastMixin

class Service(object):
    is_active = True
    website = 'http://www.ligair.fr/'
    nom_aasqa = "Lig'Air"
    licence = 'OdbL v1.0'


class Forecast(Service, ForecastMixin):
    url = 'https://services1.arcgis.com/HzzPcgRsxxyIZdlU/arcgis/rest/services/Indices_%C3%A0_la_commune_sur_3_jours/FeatureServer/0/query'
    outfields = ['date_ech', 'code_qual', 'lib_qual' , 'coul_qual', 'date_dif', 'code_zone', 'lib_zone']

    def params(self, date_, insee):
        return {
            'where': f"(date_ech >= CURRENT_DATE - INTERVAL '2' DAY) AND code_zone ={insee}",
            'outFields': ",".join(self.outfields),
            'f': 'json',
            'outSR': '4326'
        }

    @classmethod
    def getter(cls, attributes):
        return super().getter(
            {
                'couleur': attributes.get('coul_qual'),
                **attributes
            }
        )

    @classmethod
    def get_from_scraping(cls, previous_results, date_, insee):
        r = requests.get(f'http://www.ligair.fr/commune/{cls.get_nom_ville(insee)}')
        soup = BeautifulSoup(r.text, "html.parser")
        indices = soup.find_all('div', class_='atmo-index-legend')
        legend = indices[0]
        bars = legend.find_all('div', class_='atmo-bar')
        today = next(filter(lambda v: "Aujourd'hui" in v.text, bars))
        labels = today.find_all('div', class_="atmo-bar-label")
        today_text = next(filter(lambda v: "Aujourd'hui" in v.find_next('strong').text, labels)).text
        indice = today_text[len("Aujourd'hui : "):].lower()
        return previous_results + [
            cls.getter({
                "date": str(date_), 
                "indice": indice,
            })
        ]

    def get_nom_ville(self, insee):
        r = requests.get(f'https://geo.api.gouv.fr/communes/{insee}',
                params={
                    "fields": "codesPostaux",
                    "format": "json",
                    "geometry": "centre"
                }
        )
        code_postal = r.json()['codesPostaux'][0]
        r = requests.get('http://www.ligair.fr/ville/city',
                params={"q": code_postal},
                headers={"X-Requested-With": "XMLHttpRequest"}
        )
        return list(r.json().values())[0]

    url_fetch_all = 'https://services1.arcgis.com/HzzPcgRsxxyIZdlU/ArcGIS/rest/services/Indices_Atmo_%C3%A0_la_commune/FeatureServer/0/query'

class Episode(Service, EpisodeMixin):
    url = "https://services1.arcgis.com/HzzPcgRsxxyIZdlU/arcgis/rest/services/alerte_3j1/FeatureServer/0/query"