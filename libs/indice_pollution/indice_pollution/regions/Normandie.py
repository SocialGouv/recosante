# pylint: disable=invalid-name
# pylint: enable=invalid-name
import logging
from datetime import datetime
from itertools import takewhile
from json.decoder import JSONDecodeError
from string import printable

import orjson as json
import requests

from . import EpisodeMixin, ForecastMixin


class Service:
    is_active = True
    website = 'http://www.atmonormandie.fr/'
    nom_aasqa = 'ATMO Normandie'
    attributes_key = 'properties'
    use_dateutil_parser = True

    insee_list = ['76351', '14366', '76540',
                  '14118', '50502', '27229', '50129', '61001']


class Forecast(Service, ForecastMixin):
    url = 'https://api.atmonormandie.fr/index.php/lizmap/service/'

    def get_one_attempt(self, url, params):
        # pylint: disable-next=line-too-long
        filter_zone = f"<PropertyIsEqualTo><PropertyName>code_zone</PropertyName><Literal>{params['insee']}</Literal></PropertyIsEqualTo>"
        params = {'project': 'flux_indice_atmo_normandie',
                  'repository': 'dindice'}
        data = {
            'filter': f'<Filter>{filter_zone}</Filter>',
            'OUTPUTFORMAT': 'GeoJSON',
            'SERVICE': 'WFS',
            'REQUEST': 'GetFeature',
            'dl': 1,
            'TYPENAME': 'ind_normandie_3jours',
            'VERSION': '1.0.0'
        }
        try:
            request = requests.post(
                self.url, params=params, data=data, timeout=10)
        except requests.exceptions.SSLError as exception:
            logging.error('Erreur ssl %s', url)
            logging.error(exception)
            return None
        except requests.exceptions.ConnectionError as exception:
            logging.error('Impossible de se connecter à %s', url)
            logging.error(exception)
            return None
        try:
            request.raise_for_status()
        except requests.HTTPError as exception:
            logging.error('Erreur HTTP: %s', exception)
            return None
        return request

    @classmethod
    def get_one_attempt_fetch_all(cls, url, params):
        params = {'project': 'flux_indice_atmo_normandie',
                  'repository': 'dindice'}
        data = {
            'OUTPUTFORMAT': 'GeoJSON',
            'SERVICE': 'WFS',
            'REQUEST': 'GetFeature',
            'dl': 1,
            'TYPENAME': 'ind_normandie_3jours',
            'VERSION': '1.0.0'
        }
        try:
            request = requests.post(url, params=params, data=data, timeout=10)
        except requests.exceptions.SSLError as exception:
            logging.error('Erreur ssl %s', url)
            logging.error(exception)
            return None
        except requests.exceptions.ConnectionError as exception:
            logging.error('Impossible de se connecter à %s', url)
            logging.error(exception)
            return None
        try:
            request.raise_for_status()
        except requests.HTTPError as exception:
            logging.error('Erreur HTTP: %s', exception)
            return None
        return request

    def params(self, date_, insee):
        _ = date_
        return {"insee": insee}

    @classmethod
    def features(cls, r):
        r.encoding = 'utf8'
        try:
            return r.json()['features']
        except JSONDecodeError:
            set_printable = set(printable + 'éèàçôêùà')
            clean_string = str(
                "".join(takewhile(lambda c: c in set_printable, r.text)))
            return json.loads(clean_string)['features']


class Episode(Service, EpisodeMixin):
    url = 'https://dservices7.arcgis.com/FPRT1cIkPKcq73uN/arcgis/services/alrt3j_normandie/WFSServer'
    url_all = 'https://api.atmonormandie.fr/index.php/lizmap/service/'

    def params(self, date_, insee):
        _ = date_
        centre = self.centre(insee)
        srsname = 'urn:ogc:def:crs:EPSG::4326'

        return {
            'service': 'wfs',
            'version': '2.0.0',
            'request': 'getfeature',
            'typeName': 'alrt3j_normandie:alrt3j_normandie',
            'outputFormat': 'geojson',
            'srsName': srsname,
            'bbox': f'{centre[0]},{centre[1]},{centre[0]},{centre[1]},{srsname}',
        }

    params_fetch_all = {
        'repository': 'bepisode',
        'project': 'alerte3j_normandie',
        'SERVICE': 'WFS',
        'VERSION': '2.0.0',
        'REQUEST': 'GetFeature',
        'typename': 'alrt3j_normandie',
        'outputformat': 'geojson'
    }

    def date_getter(self, attributes):
        str_date = attributes.get('date_ech')
        if not str_date:
            return None
        split_date = str_date.split('/')
        if len(split_date) != 3:
            return None
        return datetime(int(split_date[2]), int(split_date[0]), int(split_date[1]))
