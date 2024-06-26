from dataclasses import dataclass
from datetime import date
from typing import List

from psycopg2.extras import DateRange
from sqlalchemy.dialects import postgresql
from sqlalchemy.dialects.postgresql import DATERANGE

from ecosante.extensions import db
from ecosante.inscription.models import Inscription


# Unused variable '<lambda>' ????
# pylint: disable=unused-variable
def property_indicateur(indicateur):
    return property(
        lambda self: self.indicateur_getter(indicateur),
        lambda self, value: self.indicateur_setter(value, indicateur)
    )
# pylint: enable=unused-variable


@dataclass
class NewsletterHebdoTemplate(db.Model):
    # pylint: disable-next=invalid-name
    id: int = db.Column(db.Integer, primary_key=True)
    sib_id: int = db.Column(db.Integer, nullable=False)
    ordre: int = db.Column(db.Integer, nullable=False)

    deplacement: List[str] = db.Column(postgresql.ARRAY(db.String))
    activites: List[str] = db.Column(postgresql.ARRAY(db.String))
    _enfants: List[str] = db.Column("enfants", postgresql.ARRAY(db.String))
    chauffage: List[str] = db.Column(postgresql.ARRAY(db.String))
    _animaux_domestiques: List[str] = db.Column(
        "animaux_domestiques", postgresql.ARRAY(db.String))
    indicateurs: List[str] = db.Column(postgresql.ARRAY(db.String))
    indicateurs_exclus: List[str] = db.Column(postgresql.ARRAY(db.String))

    _periode_validite: DateRange = db.Column(
        "periode_validite",
        DATERANGE(),
        nullable=False,
        default=lambda: DateRange('2022-01-01', '2122-01-01')
    )

    @classmethod
    def get_templates(cls):
        return cls.query.order_by(cls.ordre).all()

    def filtre_date(self, date_):
        return date_ in self.periode_validite

     # pylint: disable-next=too-many-return-statements
    def filtre_criteres(self, inscription):
        for nom_critere in ['chauffage', 'activites', 'deplacement']:
            critere = getattr(self, nom_critere)
            if isinstance(critere, list) and len(critere) > 0:
                if nom_critere == 'activites':
                    critere = list(map(lambda x: x.replace(
                        'activite_physique', 'sport'), critere))
                inscription_critere = getattr(inscription, nom_critere)
                if not isinstance(inscription_critere, list):
                    return False
                if len(set(critere).intersection(inscription_critere)) == 0:
                    return False
        if isinstance(self.enfants, bool) and self.enfants != inscription.has_enfants:
            return False
        # pylint: disable-next=line-too-long
        if isinstance(self.animaux_domestiques, bool) and self.animaux_domestiques != inscription.has_animaux_domestiques:
            return False
        inscription_indicateurs = inscription.indicateurs if isinstance(
            inscription.indicateurs, list) else []
        self_indicateurs = self.indicateurs if isinstance(
            self.indicateurs, list) else []
        self_indicateurs_exclus = self.indicateurs_exclus if isinstance(
            self.indicateurs_exclus, list) else []
        if not all(indicateur in inscription_indicateurs for indicateur in self_indicateurs):
            return False
        if any(indicateur in inscription_indicateurs for indicateur in self_indicateurs_exclus):
            return False
        return True

    @classmethod
    def next_template(cls, inscription: Inscription, templates=None) -> 'NewsletterHebdoTemplate | None':
        templates = templates or cls.get_templates()
        template_id_ordre = {t.id: t.ordre for t in templates}
        already_sent_templates_ordres = [
            template_id_ordre[nl.newsletter_hebdo_template_id]
            for nl in inscription.last_newsletters_hebdo
        ]
        valid_templates = sorted(
            [
                t
                for t in templates
                if t.filtre_date(date.today())
                and t.ordre not in already_sent_templates_ordres
                and t.filtre_criteres(inscription)
            ],
            key=lambda t: t.ordre
        )
        if len(valid_templates) == 0:
            return None

        return valid_templates[0]

    @property
    def periode_validite(self) -> DateRange:
        return self._periode_validite

    @property
    def debut_periode_validite(self):
        return self.periode_validite.lower

    @debut_periode_validite.setter
    def debut_periode_validite(self, value):
        self._periode_validite = DateRange(
            value,
            self._periode_validite.upper if self._periode_validite else None)

    @property
    def fin_periode_validite(self):
        return self.periode_validite.upper

    @fin_periode_validite.setter
    def fin_periode_validite(self, value):
        self._periode_validite = DateRange(
            self._periode_validite.lower if self._periode_validite else None,
            value
        )

    @property
    def animaux_domestiques(self):
        if isinstance(self._animaux_domestiques, list):
            return self._animaux_domestiques[0] == 'true' if self._animaux_domestiques else False
        return None

    @animaux_domestiques.setter
    def animaux_domestiques(self, value):
        if isinstance(value, bool):
            self._animaux_domestiques = ["true" if value else "false"]
        else:
            self._animaux_domestiques = None

    @property
    def enfants(self):
        if isinstance(self._enfants, list):
            return self._enfants[0] == 'true' if self._enfants else False
        return None

    @enfants.setter
    def enfants(self, value):
        if isinstance(value, bool):
            self._enfants = ["true" if value else "false"]
        else:
            self._enfants = None

    def indicateur_setter(self, value, indicateur):
        if value is None:
            self.indicateurs = list(
                set(self.indicateurs or []) - set([indicateur]))
            self.indicateurs_exclus = list(
                set(self.indicateurs_exclus or []) - set([indicateur]))
        elif value is False:
            self.indicateurs = list(
                set(self.indicateurs or []) - set([indicateur]))
            self.indicateurs_exclus = list(
                set(self.indicateurs_exclus or []) | set([indicateur]))
        elif value is True:
            self.indicateurs = list(
                set(self.indicateurs or []) | set([indicateur]))
            self.indicateurs_exclus = list(
                set(self.indicateurs_exclus or []) - set([indicateur]))

    def indicateur_getter(self, indicateur):
        if not type(self.indicateurs) in [list, None]:
            return None
        if indicateur in (self.indicateurs or []):
            return True
        if not type(self.indicateurs_exclus) in [list, None]:
            return None
        if indicateur in (self.indicateurs_exclus or []):
            return False
        return None

    raep = property_indicateur("raep")
    indice_atmo = property_indicateur("indice_atmo")
    vigilance_meteo = property_indicateur("vigilance_meteo")

    indice_uv = property_indicateur("indice_uv")
