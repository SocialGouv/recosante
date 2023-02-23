from indice_pollution.regions import EpisodeMixin, ServiceMixin, ForecastMixin

class Service(ServiceMixin):
    is_active = True
    website = 'https://www.madininair.fr/'
    nom_aasqa = "Madininair"

class Forecast(Service, ForecastMixin):
    url = 'https://services1.arcgis.com/y8pKCLYeLI1K2217/arcgis/rest/services/ind_martinique/FeatureServer/0/query'
    outfields = ['*']

class Episode(Service, EpisodeMixin):
    url = 'https://services1.arcgis.com/y8pKCLYeLI1K2217/arcgis/rest/services/Episodes_de_pollution_de_la_veille_au_lendemain/FeatureServer/0/query'
    outfields = ['*']