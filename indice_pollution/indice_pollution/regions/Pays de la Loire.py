from indice_pollution.history.models.commune import Commune
from indice_pollution.regions import ForecastMixin, EpisodeMixin
from datetime import timedelta, date
from .pays_de_la_loire_epcis import dict_commune_ecpi
from indice_pollution.helpers import today

class Service(object):
    is_active = True
    website = 'http://www.airpl.org/'
    nom_aasqa = 'Air Pays de la Loire'
    use_dateutil_parser = True
    licence = 'OdbL v1.0'

    def get_close_insee(self, insee):
        return insee

class Episode(Service, EpisodeMixin):
    url = 'https://data.airpl.org/geoserver/alrt3j_pays_de_la_loire/wfs'
    attributes_key = 'properties'

    def params(self, date_, insee):
        commune = Commune.get(insee)
        return {
            "version": "2.0.0",
            "typeName": "alrt3j_pays_de_la_loire:alrt3j_pays_de_la_loire",
            "service": "WFS",
            "outputFormat": "application/json",
            "request": "GetFeature",
            "CQL_FILTER": f"date_ech >= {date_}T00:00:00Z AND code_zone='{commune.departement.code}'"
        }

    @classmethod
    def params_fetch_all(cls):
        return {
            "version": "2.0.0",
            "typeName": "alrt3j_pays_de_la_loire:alrt3j_pays_de_la_loire",
            "service": "WFS",
            "outputFormat": "application/json",
            "request": "GetFeature",
            "CQL_FILTER": f"date_ech >= {today()}T00:00:00Z"
        }

class Forecast(Service, ForecastMixin):
    url = 'https://data.airpl.org/api/v1/indice/epci/'
    url_fetch_all = 'https://data.airpl.org/geoserver/ind_pays_de_la_loire/wfs'

    @classmethod
    def params(cls, date_, insee):
        max_date = date_ + timedelta(days=1)
        return {
            "epci": dict_commune_ecpi[insee],
            "date__range": f"{date_},{max_date}",
            "export": "json"
        }

    @classmethod
    def params_fetch_all(cls):
        return {
            "version": "2.0.0",
            "typeName": "ind_pays_de_la_loire:ind_pays_de_la_loire ",
            "service": "WFS",
            "outputFormat": "application/json",
            "request": "GetFeature",
            "CQL_FILTER": f"date_ech >= {date.today()}T00:00:00Z AND type_zone='EPCI'"
        }

    @classmethod
    def features(cls, r):
        return r.json().get('results', [])

    @classmethod
    def attributes_getter(cls, feature):
        return feature

    @classmethod
    def getter(cls, feature):
        return super().getter({
            "sous_indices": feature.get('sous_indice'),
            **feature
        })
