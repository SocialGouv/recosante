from datetime import datetime, timedelta

from marshmallow import fields, pre_dump

from .indice import FullIndiceSchema, IndiceSchema


class IndiceUv(IndiceSchema):
    value = fields.Integer(attribute='uv_j0')


class FullIndiceUv(FullIndiceSchema):
    indice = fields.Nested(IndiceUv)

    @pre_dump
    def add_validity_dates(self, data, many, **kwargs):
        _ = (many, kwargs)
        if data["indice"] is None:
            resp = {}
        else:
            resp = data
            date_time = datetime.combine(
                data["indice"].date, datetime.min.time())
            resp['validity'] = {
                "start": date_time,
                "end": date_time + timedelta(1) - timedelta(seconds=1),
                "area": data["validity"]["area"],
                "area_details": data["validity"]["area_details"]
            }
        return resp
