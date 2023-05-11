from importlib import import_module
from indice_pollution import create_app
from indice_pollution.history.models import RAEP, VigilanceMeteo, IndiceUv
create_app()
regions = [
        'Auvergne-Rhône-Alpes',
        'Bourgogne-Franche-Comté',
        'Bretagne',
        'Centre-Val de Loire',
        'Corse',
        'Grand Est',
        'Guadeloupe',
        'Guyane',
        'Hauts-de-France',
        'Île-de-France',
        'Martinique',
        'Mayotte',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Réunion",
        "Sud"
    ]
for region in regions:
    module = import_module(f"indice_pollution.regions.{region}")
    if hasattr(module, "Forecast"):
        module.Forecast.save_all()
        print(f"indices ATMO de {region} sauvegardés")
    if hasattr(module, "Episode"):
        module.Episode.save_all()
        print(f"episodes de {region} sauvegardés")
RAEP.save_all()
VigilanceMeteo.save_all()
IndiceUv.save_all()