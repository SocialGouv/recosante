from . import ServiceMixin, ForecastMixin, EpisodeMixin
from indice_pollution.history.models import Zone

class Service(ServiceMixin):
    is_active = True
    website = 'http://www.atmo-grandest.eu/'
    nom_aasqa = 'ATMO Grand Est'
    licence = 'OdbL v1.0'
    insee_list = [
        '8105', '57463', '67180', '67482', '88160', '57672', '10387', '68224', '68297',
        '57227', '68066', '52448', '51454', '54395', '51108'
    ]

class Forecast(Service, ForecastMixin):
    url = 'https://opendata.arcgis.com/api/v3/datasets/b0d57e8f0d5e4cb786cb554eb15c3bcb_0/downloads/data'
    outfields = ['*']

    params_fetch_all = {
        'format': 'geojson',
        'spatialRefId': 4326
    }

    @classmethod
    def get_zone(cls, properties):
        int_code = properties['code_zone']
        code = f"{int_code:05}"
        return Zone.get(code=code, type_=properties['type_zone'].lower())

class Episode(Service, EpisodeMixin):
    url = 'https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/alrt3j_grandest/FeatureServer/0/query'