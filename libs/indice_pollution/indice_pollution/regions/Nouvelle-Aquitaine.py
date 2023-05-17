# pylint: disable=invalid-name
# pylint: enable=invalid-name
import logging
from datetime import date, datetime

import requests
from bs4 import BeautifulSoup

from . import EpisodeMixin, ForecastMixin


class Service:
    is_active = True
    website = 'https://www.atmo-nouvelleaquitaine.org/'
    nom_aasqa = 'ATMO Nouvelle-Aquitaine'
    attributes_key = 'properties'
    use_dateutil_parser = True
    licence = 'OdbL v1.0'

    insee_list = [
        '33063', '79005', '16102', '64102', '64445', '19272', '87085', '24322', '40088',
        '17300', '16015', '79191', '87154', '86194', '19031', '64300', '23096'
    ]

    def get_close_insee(self, insee):
        return insee


class Episode(Service, EpisodeMixin):
    url = 'https://opendata.atmo-na.org/api/v1/alerte/data/'
    url_all = 'https://opendata.atmo-na.org/geoserver/alrt3j_nouvelle_aquitaine/wfs'

    params_fetch_all = {
        'service': 'wfs',
        'request': 'getfeature',
        'typeName': 'alrt3j_nouvelle_aquitaine:alrt3j_nouvelle_aquitaine',
        'outputFormat': 'json',
        'PropertyName': 'code_zone,lib_zone,date_ech,date_dif,code_pol,lib_pol,etat,couleur,com_court,com_long',
    }

    def params(self, date_, insee):
        return {
            "date_deb": f"{date_}",
            "type": "json"
        }

    def features(self, request):
        return request.json().get('features', [])

    def attributes_getter(self, feature):
        return feature['properties']

    @classmethod
    def getter(cls, attributes):
        polluant_code_pol = {
            "O3": "7",
            "NO2": "8",
            "Particules PM10": "5"
        }
        if not 'code_pol' in attributes and 'lib_pol' in attributes:
            attributes['code_pol'] = polluant_code_pol.get(
                attributes['lib_pol'])
        return super().getter(attributes)


class Forecast(Service, ForecastMixin):
    url = 'https://opendata.atmo-na.org/geoserver/ind_nouvelle_aquitaine_agglo/wfs'
    url_all = 'https://opendata.atmo-na.org/geoserver/ind_nouvelle_aquitaine/wfs'

    @classmethod
    def params(cls, date_, insee):
        # pylint: disable-next=line-too-long
        filter_zone = f'<PropertyIsEqualTo><PropertyName>code_zone</PropertyName><Literal>{insee}</Literal></PropertyIsEqualTo>'
        # pylint: disable-next=line-too-long
        filter_date = f'<PropertyIsGreaterThanOrEqualTo><PropertyName>date_ech</PropertyName><Literal>{date_}T00:00:00Z</Literal></PropertyIsGreaterThanOrEqualTo>'
        return {
            'service': 'wfs',
            'request': 'getfeature',
            'typeName': 'ind_nouvelle_aquitaine_agglo:ind_nouvelle_aquitaine_agglo',
            'Filter': f"<Filter><And>{filter_zone}{filter_date}</And></Filter>",
            'outputFormat': 'json',
        }

    @classmethod
    def params_fetch_all(cls):
        # pylint: disable-next=line-too-long
        filter_date_ech = f'<PropertyIsGreaterThanOrEqualTo><PropertyName>date_ech</PropertyName><Literal>{date.today()}T00:00:00Z</Literal></PropertyIsGreaterThanOrEqualTo>'
        return {
            'service': 'wfs',
            'request': 'getfeature',
            'typeName': 'ind_nouvelle_aquitaine:ind_nouvelle_aquitaine',
            'Filter': f"<Filter>{filter_date_ech}</Filter>",
            'outputFormat': 'json',
        }

    @classmethod
    def get_from_scraping(cls, previous_results, date_, insee):
        _ = (previous_results, date_)
        url = f'https://www.atmo-nouvelleaquitaine.org/monair/commune/{insee}'
        try:
            request = requests.get(url, timeout=10)
        except requests.exceptions.SSLError as exception:
            logging.error('Erreur ssl %s', url)
            logging.error(exception)
            return []
        except requests.exceptions.ConnectionError as exception:
            logging.error('Impossible de se connecter à %s', url)
            logging.error(exception)
            return []
        request.raise_for_status()
        soup = BeautifulSoup(request.text, 'html.parser')

        controls = soup.find_all('div', class_='day-controls')
        days = controls[0].find_all('a', class_='raster-control-link')

        return [
            cls.getter({
                "date": str(datetime.fromtimestamp(int(day.attrs.get('data-rasterid'))).date()),
                "indice": int(day.attrs.get('data-index')) - 1,
            })
            for day in days
        ]
