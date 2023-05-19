from datetime import datetime

import pytz
from flask import abort, current_app, jsonify, request

from . import episodes as episodes_
from . import forecast as forecast_
from .autocomplete import autocomplete as autocomplete_


@current_app.route("/forecast")
def forecast():
    insee = request.args.get("insee")
    date_ = request.args.get("date")

    try:
        result = forecast_(insee, date_)
    except KeyError as exception:
        current_app.logger.error("INSEE %s not found", insee)
        current_app.logger.error(exception)
        abort(404)

    return jsonify(result)


@current_app.route("/episodes")
def episodes():
    insee = request.args.get("insee")
    zone = pytz.timezone("Europe/Paris")
    date_ = request.args.get("date") or str(
        datetime.now(tz=zone).date().isoformat())

    try:
        result = episodes_(insee, date_)
    except KeyError as exception:
        current_app.logger.error("INSEE %s not found", insee)
        current_app.logger.error(exception)
        abort(404)

    return jsonify(result)


@current_app.route("/autocomplete")
def autocomplete():
    query = request.args.get("q")

    return jsonify(autocomplete_(query))


@current_app.route("/healthz")
def healthz():
    return jsonify({"ready": True})
