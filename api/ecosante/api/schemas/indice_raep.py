from marshmallow.utils import pprint
from ecosante.api.schemas.indice import FullIndiceSchema, IndiceDetailsSchema, NestedIndiceSchema
from marshmallow import fields, pre_dump
from datetime import datetime
from ecosante.newsletter.models import Newsletter
from ecosante.recommandations.models import Recommandation

class NestedIndiceRAEPSchema(NestedIndiceSchema):
    value = fields.Integer(attribute='total')

    @pre_dump
    def load_couleur_qualif(self, data, *args, **kwargs):
        label = Newsletter.raep_value_to_qualif(int(data['total']))
        data['label'] = label.capitalize() if label else None
        data['color'] = Newsletter.raep_value_to_couleur(int(data['total']))
        return data

class IndiceRAEPDetailsSchema(IndiceDetailsSchema):
    indice = fields.Nested(NestedIndiceRAEPSchema)

class IndiceRAEPSchema(NestedIndiceRAEPSchema):
    details = fields.List(fields.Nested(IndiceRAEPDetailsSchema))

    @pre_dump
    def dict_to_dicts(self, data, *a, **kw):
        data['details'] = [{"label": k, "indice": {"total": v}} for k, v in data['allergenes'].items()]
        return data

class IndiceRAEP(FullIndiceSchema):
    indice = fields.Nested(IndiceRAEPSchema)

    @pre_dump
    def load_indice_raep(self, data, many, **kwargs):
        date_format = "%d/%m/%Y"
        resp = {"sources": data.get('sources')}
        if data['indice']['data']:
            departement = data["indice"]["departement"]
            resp['indice'] = data["indice"]["data"]
            resp['advice'] = data['advice']
            resp['validity'] = {
                "start": datetime.strptime(data["indice"]["data"]["periode_validite"]["debut"], date_format),
                "end": datetime.strptime(data["indice"]["data"]["periode_validite"]["fin"], date_format),
                "area": departement.zone.lib,
                "area_details": departement.zone,
            }
        else:
            resp['error'] = "Inactive region"
        return resp