from sqlalchemy import Column, ForeignKey, Integer, select
from indice_pollution import db
from indice_pollution.history.models.commune import Commune
from dataclasses import dataclass

@dataclass
class PotentielRadon(db.Base):
    __tablename__ = "potentiel_radon"

    zone_id: int = Column(Integer, ForeignKey('indice_schema.zone.id'), primary_key=True)
    classe_potentiel: int = Column(Integer)

    @classmethod
    def get(cls, insee):
        stmt = select(cls).join(Commune, cls.zone_id == Commune.zone_id).filter(Commune.insee == insee)
        if r:= db.session.execute(stmt).first():
            return r[0]

    @property
    def label(self):
        return f"Catégorie {self.classe_potentiel}"