from ecosante.recommandations.models import Recommandation
from .indice import FullIndiceSchema, IndiceSchema, ValiditySchema, AdviceSchema
from marshmallow import fields, pre_dump, Schema
from indice_pollution.history.models.vigilance_meteo import VigilanceMeteo
from ecosante.utils.funcs import oxford_comma

class NestedIndiceSchema(Schema):
    label = fields.String(attribute='phenomene')
    color = fields.String(attribute='couleur')
    validity = fields.Nested(ValiditySchema)
    advice = fields.Nested(AdviceSchema)

    @pre_dump
    def add_advice(self, data: VigilanceMeteo, *a, **kw):
        r = {"phenomene": data.phenomene, "couleur": data.couleur, "validity": {"start": data.validity.lower, "end": data.validity.upper}}
        try:
            r['advice'] = next(filter(
                lambda r: r.is_relevant(types=["vigilance_meteo"], media="dashboard", vigilances=[data]),
                Recommandation.published_query().all()
            ))
        except StopIteration:
            r['advice'] = None
        return r

class IndiceDetailsSchema(Schema):
    label = fields.String()
    indice = fields.Nested(NestedIndiceSchema)

    @pre_dump
    def dict_to_dicts(self, data, *a, **kw):
        return {"indice": data}

class IndiceSchema(Schema):
    details = fields.List(fields.Nested(IndiceDetailsSchema))
    label = fields.String()
    color = fields.String()

    @pre_dump
    def dict_to_dicts(self, data, *a, **kw):
        max_couleur = VigilanceMeteo.make_max_couleur(data['details'])
        data['color'] = VigilanceMeteo.couleurs.get(max_couleur) or ''
        data['label'] = VigilanceMeteo.make_label(max_couleur)
        return data

class VigilanceMeteoSchema(FullIndiceSchema):
    indice = fields.Nested(IndiceSchema)

    @pre_dump
    def add_advice_and_validity(self, data, *a, **kw):
        data['validity']['start'] = VigilanceMeteo.make_start_date(data.get('indice', {}).get('details'))
        data['validity']['end'] = VigilanceMeteo.make_end_date(data.get('indice', {}).get('details'))
        max_couleur = VigilanceMeteo.make_max_couleur(data['indice']['details'])
        if isinstance(max_couleur, int) and max_couleur <= 2:
            data['advice'] = Recommandation.published_query().filter(Recommandation.vigilance_couleur_ids.contains([max_couleur])).first()
        return data
