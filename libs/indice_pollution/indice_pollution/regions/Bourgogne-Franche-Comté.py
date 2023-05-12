from . import EpisodeMixin, ForecastMixin
from datetime import date, timedelta
from indice_pollution.history.models import EPCI, Commune

class Service(object):
    is_active = True
    website = 'https://www.atmo-bfc.org/'
    nom_aasqa = 'ATMO Bourgogne-Franche-Comté'

    def get_close_insee(self, insee):
        return insee

class Forecast(Service, ForecastMixin):
    url = 'https://atmo-bfc.iad-informatique.com/geoserver/ows'
    attributes_key = 'properties'
    use_dateutil_parser = True

    def params(self, date_, insee):
        return {
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typeName': 'indice:ind_bfc',
            'outputFormat': 'application/json',
            'CQL_FILTER': f"date_ech >= '{date_}T00:00:00Z' AND code_zone={insee}"
        }

    @classmethod
    def params_fetch_all(cls):
        return {
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typeName': 'indice:ind_bfc',
            'outputFormat': 'application/json',
            'CQL_FILTER': f"date_ech >= {date.today() - timedelta(days=2)}"
        }

class Episode(Service, EpisodeMixin):
    url = 'https://atmo-bfc.iad-informatique.com/geoserver/ows'
    attributes_key = 'properties'

    def params(self, date_, insee):
        centre = self.centre(insee)

        return {
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typeName': 'alerte:alrt3j_bfc',
            'outputFormat': 'application/json',
            'CQL_FILTER': f"date_ech >= '{date_}T00:00:00Z'",
            'inSR': '4326',
            'outSR': '4326',
            'geometry': f'{centre[0]},{centre[1]}',
            'geometryType': 'esriGeometryPoint',
        }

    @classmethod
    def getter(cls, attributes):
        return super().getter({'code_pol': attributes['id_poll_ue'], **attributes})

    @classmethod
    def params_fetch_all(cls):
        return {
            'service': 'WFS',
            'version': '2.0.0',
            'request': 'GetFeature',
            'typeName': 'alerte:alrt3j_bfc',
            'outputFormat': 'application/json',
            'CQL_FILTER': f"date_ech >= {date.today() - timedelta(days=2)}"
        }