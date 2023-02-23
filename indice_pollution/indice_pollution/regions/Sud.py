from . import ForecastMixin, EpisodeMixin
from datetime import timedelta, datetime, date

class Service(object):
    is_active = True
    website = 'https://www.atmosud.org/'
    nom_aasqa = 'AtmoSud'
    attributes_key = 'properties'
    use_dateutil_parser = True
    fr_date_format = '%Y-%m-%dT00:00:00Z'

class Episode(Service, EpisodeMixin):
    url = 'https://geoservices.atmosud.org/geoserver/alrt_sudpaca_dep/ows'

    def params(self, date_, insee):
        centre = self.centre(insee)

        return {
            'service': 'WFS',
            'version': '1.1.0',
            'request': 'GetFeature',
            'typeName': 'alrt_sudpaca_dep:alrt3j_sudpaca',
            'outputFormat': 'json',
            'geometry': f'{centre[0]},{centre[1]}',
            'inSR': '4326',
            'geometryType': 'esriGeometryPoint',
        }

    @classmethod
    def params_fetch_all(cls):
        date_ = date.today()
        tomorrow_date = date_ + timedelta(days=1)

        fr_date = date_.strftime(cls.fr_date_format)
        fr_tomorrow = tomorrow_date.strftime(cls.fr_date_format)

        return {
            'service': 'WFS',
            'version': '1.1.0',
            'request': 'GetFeature',
            'typeName': 'alrt_sudpaca_dep:alrt3j_sudpaca',
            'CQL_FILTER': f"(date_ech='{fr_date}' OR date_ech='{fr_tomorrow}')",
            'outputFormat': 'json'
        }

class Forecast(Service, ForecastMixin):
    url = 'https://geoservices.atmosud.org/geoserver/ind_sudpaca/ows'

    @classmethod
    def params(cls, date_, insee):
        tomorrow_date = date_ + timedelta(days=1)

        fr_date = date_.strftime(cls.fr_date_format)
        fr_tomorrow = tomorrow_date.strftime(cls.fr_date_format)

        insee = {
            "13055": "13201" # Seuls les arrondissement de Marseilles sont pris en compte, on prend le premier
        }.get(insee, insee)

        return {
            'service': 'WFS',
            'version': '1.1.0',
            'request': 'GetFeature',
            'typeName': 'ind_sudpaca:ind_sudpaca',
            'CQL_FILTER': f"code_zone='{insee}' AND (date_ech='{fr_date}' OR date_ech='{fr_tomorrow}')",
            'outputFormat': 'json'
        }

    @classmethod
    def params_fetch_all(cls):
        date_ = date.today()
        tomorrow_date = date_ + timedelta(days=1)

        fr_date = date_.strftime(cls.fr_date_format)
        fr_tomorrow = tomorrow_date.strftime(cls.fr_date_format)

        return {
            'service': 'WFS',
            'version': '1.1.0',
            'request': 'GetFeature',
            'typeName': 'ind_sudpaca:ind_sudpaca',
            'CQL_FILTER': f"(date_ech='{fr_date}' OR date_ech='{fr_tomorrow}')",
            'outputFormat': 'json'
        }


    def date_getter(self, attributes):
        return datetime.strptime(attributes['date_ech'], self.fr_date_format)
