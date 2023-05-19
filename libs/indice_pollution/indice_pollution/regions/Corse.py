# pylint: disable=invalid-name
# pylint: enable=invalid-name
from . import EpisodeMixin, ForecastMixin, ServiceMixin


class Service(ServiceMixin):
    is_active = True
    website = 'https://www.qualitaircorse.org/'
    nom_aasqa = 'Qualitair Corse'


class Forecast(Service, ForecastMixin):
    # pylint: disable-next=line-too-long
    url = 'https://services9.arcgis.com/VQopoXNvUqHYZHjY/arcgis/rest/services/indice_atmo_communal_corse/FeatureServer/0/query'

    params_fetch_all = {
        "outFields": "*",
        "outSR": "4326",
        "f": "json",
        'orderByFields': 'date_ech DESC',
        'where': "(date_ech >= CURRENT_DATE - INTERVAL '1' DAY)",
    }


class Episode(Service, EpisodeMixin):
    url = 'https://services9.arcgis.com/VQopoXNvUqHYZHjY/arcgis/rest/services/Alrt3j_corse/FeatureServer/0/query'

    params_fetch_all = {
        "outFields": "*",
        "outSR": "4326",
        "f": "json",
        'orderByFields': 'date_ech DESC',
        'where': "(date_ech >= CURRENT_DATE - INTERVAL '5' DAY)",
    }
