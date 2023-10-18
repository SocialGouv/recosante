import os
from datetime import datetime, timedelta

import pytz
import requests
from unidecode import unidecode

from .extensions import logger


def today():
    zone = pytz.timezone('Europe/Paris')
    return datetime.now(tz=zone).date()

def tomorrow():
    zone = pytz.timezone('Europe/Paris')
    return datetime.now(tz=zone).date() + timedelta(days=1)


def oxford_comma(items):
    if not items:
        return None
    items = list(items)
    length = len(items)
    if length == 0:
        return None
    if length == 1:
        return items[0]
    if length == 2:
        return f'{items[0]} et {items[1]}'
    prev = ', '.join(items[:-1])
    return f'{prev}, et {items[-1]}'


def get_healthchecksio_slug(caller):
    cls_types = [
        {
            "start": "<class 'indice_pollution.regions.",
            "end": ".Forecast'>",
            "debut_slug": "import-indice_atmo-"
        },
        {
            "start": "<class 'indice_pollution.regions.",
            "end": ".Episode'>",
            "debut_slug": "import-episode_pollution-"
        },
        {
            "start": "<class 'indice_pollution.history.models.raep",
            "end": ".RAEP'>",
            "debut_slug": "import-raep"},
        {
            "start": "<class 'indice_pollution.history.models.vigilance_meteo",
            "end": ".VigilanceMeteo'>",
            "debut_slug": "import-vigilance_meteo"},
        {
            "start": "<class 'indice_pollution.history.models.indice_uv",
            "end": ".IndiceUv'>",
            "debut_slug": "import-indice_uv"
        },
    ]
    str_cls = str(caller)
    for cls_type in cls_types:
        if str_cls.startswith(cls_type["start"]) and str_cls.endswith(cls_type["end"]):
            raw_name = str_cls[len(cls_type["start"]):-(len(cls_type["end"]))]
            return cls_type["debut_slug"] + unidecode(raw_name.lower().replace(" ", "-"))
    return None


def ping(caller, ping_type, scheduled_datetime=None, launch_datetime=None):
    if not (slug := get_healthchecksio_slug(caller)):
        return
    _ping(slug, ping_type, scheduled_datetime, launch_datetime)


def _ping(slug, ping_type, scheduled_datetime, launch_datetime, retry=0):
    if isinstance(scheduled_datetime, str):
        scheduled_datetime = datetime.fromisoformat(scheduled_datetime)
    if isinstance(launch_datetime, str):
        launch_datetime = datetime.fromisoformat(launch_datetime)
    if retry >= 3:
        logger.error(
            "Already retried 3 times to ping %s %s %s, we're not doing it another time.",
            slug,
            ping_type,
            scheduled_datetime
        )
        return
    data = None
    if scheduled_datetime:
        data = {
            "scheduled_datetime": str(scheduled_datetime),
            "since schedule": str(datetime.now() - scheduled_datetime),
        }
    if launch_datetime:
        data = data or {}
        data.update({
            "launch_datetime": str(launch_datetime),
            "since launch": str(datetime.now() - launch_datetime),
        })
    ping_key = os.getenv("HEALTCHECKSIO_API_KEY")
    end_url = f"/{ping_type}" if ping_type != "success" else ""
    try:
        requests.get(
            f"https://hc-ping.com/{ping_key}/{slug}{end_url}", timeout=10)
    except requests.RequestException as exception:
        logger.error("Ping to healthchecks.io failed: %s", exception)
