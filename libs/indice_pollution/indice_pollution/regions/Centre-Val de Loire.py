# pylint: disable=invalid-name
# pylint: enable=invalid-name
import requests
from bs4 import BeautifulSoup

from . import EpisodeMixin, ForecastMixin


class Service:
    is_active = True
    website = 'http://www.ligair.fr/'
    nom_aasqa = "Lig'Air"
    licence = 'OdbL v1.0'


class Forecast(Service, ForecastMixin):
    # pylint: disable-next=line-too-long
    url = 'https://services1.arcgis.com/HzzPcgRsxxyIZdlU/arcgis/rest/services/Indices_%C3%A0_la_commune_sur_3_jours/FeatureServer/0/query'
    outfields = ['date_ech', 'code_qual', 'lib_qual',
                 'coul_qual', 'date_dif', 'code_zone', 'lib_zone']

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
        request = requests.get(
            # Shouldn't get_nom_ville be a class method ???
            # pylint: disable-next=no-value-for-parameter
            f'http://www.ligair.fr/commune/{cls.get_nom_ville(insee)}', timeout=10)
        soup = BeautifulSoup(request.text, "html.parser")
        indices = soup.find_all('div', class_='atmo-index-legend')
        legend = indices[0]
        bars = legend.find_all('div', class_='atmo-bar')
        today = next(filter(lambda v: "Aujourd'hui" in v.text, bars))
        labels = today.find_all('div', class_="atmo-bar-label")
        today_text = next(
            filter(lambda v: "Aujourd'hui" in v.find_next('strong').text, labels)).text
        indice = today_text[len("Aujourd'hui : "):].lower()
        return previous_results + [
            cls.getter({
                "date": str(date_),
                "indice": indice,
            })
        ]

    def get_nom_ville(self, insee):
        request = requests.get(f'https://geo.api.gouv.fr/communes/{insee}',
                               params={
                                   "fields": "codesPostaux",
                                   "format": "json",
                                   "geometry": "centre"
                               },
                               timeout=10
                               )
        code_postal = request.json()['codesPostaux'][0]
        request = requests.get('http://www.ligair.fr/ville/city',
                               params={"q": code_postal},
                               headers={"X-Requested-With": "XMLHttpRequest"},
                               timeout=10
                               )
        return list(request.json().values())[0]

    # pylint: disable-next=line-too-long
    url_all = 'https://services1.arcgis.com/HzzPcgRsxxyIZdlU/ArcGIS/rest/services/Indices_Atmo_%C3%A0_la_commune/FeatureServer/0/query'


class Episode(Service, EpisodeMixin):
    # pylint: disable-next=line-too-long
    url = "https://services1.arcgis.com/HzzPcgRsxxyIZdlU/arcgis/rest/services/alrt_centre_val_de_loire_1/FeatureServer/0/query"
