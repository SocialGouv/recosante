from . import ServiceMixin, ForecastMixin, EpisodeMixin
from datetime import timedelta
from dateutil.parser import parse

class Service(ServiceMixin):
    is_active = True
    date_format = '%Y-%m-%d'
    website = 'https://www.atmo-hdf.fr/'
    nom_aasqa = 'ATMO Hauts-de-France'
    licence = 'OdbL v1.0'

class Forecast(Service, ForecastMixin):
    url = 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/ind_hdf_2021/FeatureServer/0/query'
    outfields = '*'

    url_fetch_all = "https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/ind_hdf_3j/FeatureServer/0/query"

class Episode(Service, EpisodeMixin):
    url = 'https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/alrt3j_hdf/FeatureServer/0/query'