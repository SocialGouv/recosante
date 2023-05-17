import logging
from importlib import import_module

from indice_pollution.history.models.commune import Commune


def get_region(insee=None, region_name=None):
    if not region_name and insee:
        commune = Commune.get(insee)
        if commune.departement and commune.departement.region:
            region_name = commune.departement.region.nom
        else:
            logging.error("No region for %s", insee)
            raise KeyError
    if not region_name:
        logging.error("No region or insee given, couldn't find region")
        raise KeyError
    try:
        region = import_module(f'.{region_name}', 'indice_pollution.regions')
    except ModuleNotFoundError as exception:
        logging.error('Region %s not found INSEE: %s', region_name, insee)
        logging.error(exception)
        raise KeyError from exception

    return region
