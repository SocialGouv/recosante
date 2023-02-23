from datetime import timedelta
from typing import List
from indice_pollution.history.models.episode_pollution import EpisodePollution
from ecosante.api.schemas.indice import FullIndiceSchema, IndiceDetailsSchema, NestedIndiceSchema
from marshmallow import fields, pre_dump
from ecosante.utils.funcs import oxford_comma

class EpisodeIndiceDetailsSchema(IndiceDetailsSchema):
    level = fields.String()
    @pre_dump
    def dump_details(self, data, **kwargs):
        return {
            "label": data.lib_pol,
            "level": data.lib_etat.capitalize()
        }

class IndiceSchema(EpisodeIndiceDetailsSchema):
    details = fields.List(fields.Nested(EpisodeIndiceDetailsSchema))

    def make_label_level(self, episodes: List[EpisodePollution]):
        if len(episodes) == 0:
            return {"label": "", "level": ""}
        episodes_etat_haut = EpisodePollution.filter_etat_haut(episodes)
        if episodes_etat_haut == []:
            return {"label": "Pas de depassement", "level": "Pas de depassement"}
        preposition = "au"
        if len(episodes_etat_haut) > 1 or 'particules' in episodes_etat_haut[0].lib_pol.lower():
            preposition = "aux"
        return  {
            "label": f"Épisode de pollution {preposition} {oxford_comma([v.lib_pol for v in episodes_etat_haut])}",
            "level": episodes_etat_haut[0].lib_etat.capitalize()
        }

    @pre_dump
    def dump_details(self, episodes, **kwargs):
        label_level = self.make_label_level(episodes)
        return {
            "label": label_level['label'],
            "level": label_level['level'],
            "details": episodes
        }

class EpisodePollutionSchema(FullIndiceSchema):
    indice = fields.Nested(IndiceSchema)


    @pre_dump
    def load_sources(self, data, many, **kwargs):
        regions = set([e.commune.departement.region for e in data["indice"]])
        data['sources'] = [{
                   "label":  region.aasqa_nom,
                   "url": region.aasqa_website
                } for region in regions
        ]
        errors = [e.error for e in data["indice"] if hasattr(e, "error")]
        if len(errors) > 0:
            data['error'] = ",".join(errors)
            del data["indice"]
        else:
            if data["indice"]:
                start = min([e.date_ech for e in data["indice"]])
                end = max([e.date_ech for e in data["indice"]]) + timedelta(1) - timedelta(seconds=1)
                area_details = data["indice"][0].zone
                area = area_details.lib
            else:
                start = None
                end = None
                area = None
                area_details = None
            data['validity'] = {
                "start": start,
                "end": end,
                "area": area,
                "area_details": area_details,
            }
        return data