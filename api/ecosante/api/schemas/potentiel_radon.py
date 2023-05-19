from marshmallow import fields

from .indice import FullIndiceSchema, IndiceSchema


class PotentielRadonSchema(IndiceSchema):
    value = fields.Integer(attribute='classe_potentiel')


class FullPotentielRadonSchema(FullIndiceSchema):
    indice = fields.Nested(PotentielRadonSchema)
