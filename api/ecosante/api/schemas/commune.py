from indice_pollution.history.models import Commune as CommuneModel
from marshmallow import Schema, fields, post_load

from ecosante.extensions import db


class DepartementSchema(Schema):
    code = fields.String()
    nom = fields.String()
    charniere = fields.String(dump_only=True, allow_none=True)
    article = fields.String(dump_only=True, allow_none=True)


class CommuneSchema(Schema):
    code = fields.String()
    nom = fields.String(dump_only=True, allow_none=True)
    codes_postaux = fields.List(
        fields.String(), dump_only=True, allow_none=True)
    departement = fields.Nested(
        DepartementSchema, dump_only=True, allow_none=True)
    charniere = fields.String(dump_only=True, allow_none=True)
    article = fields.String(dump_only=True, allow_none=True)

    @post_load
    def load_commune(self, data, **kwargs):
        _ = kwargs
        if 'code' in data:
            return db.session.query(CommuneModel).filter_by(insee=data['code']).first()
        return None
