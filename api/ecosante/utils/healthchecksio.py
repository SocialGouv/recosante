import os

import requests
from flask import current_app


def ping(slug, ping_type):
    ping_key = os.getenv("HEALTCHECKSIO_API_KEY")
    end_url = f"/{ping_type}" if ping_type != "success" else ""
    if not ping_key:
        current_app.logger.error(
            "No HEALTCHECKSIO_API_KEY variable environment")
        return
    try:
        requests.get(
            f"https://hc-ping.com/{ping_key}/{slug}{end_url}", timeout=10)
    except requests.RequestException as exception:
        current_app.logger.error(
            "Ping to healthchecks.io failed: %s", exception)
