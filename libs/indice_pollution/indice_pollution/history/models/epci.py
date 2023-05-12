from sqlalchemy import Column, ForeignKey, Integer, String, select
from indice_pollution import db
from sqlalchemy.orm import relationship
from indice_pollution.history.models import Commune

class EPCI(db.Base):
    __tablename__ = "epci"

    id = Column(Integer, primary_key=True)
    code = Column(String())
    label = Column(String())
    departement_id = Column(Integer, ForeignKey("indice_schema.departement.id"))
    departement = relationship("indice_pollution.history.models.departement.Departement")
    zone_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone = relationship("indice_pollution.history.models.zone.Zone")

    @classmethod
    def get(cls, code=None, insee=None):
        if r:= db.session.execute(cls.get_query(insee, with_joins=True)).first():
            return r[0]

    @classmethod
    def select(cls, s, code=None, insee=None, with_joins=False):
        if with_joins:
            s = s.join(cls.departement, isouter=True)
        if code:
            return s.where(cls.code==code)
        elif insee:
            subquery = Commune.get_query(insee).subquery()
            return s.where(cls.id.in_([subquery.c.epci_id]))

    @classmethod
    def get_query(cls, code=None, insee=None, with_joins=False):
        return cls.select(select(cls), code, insee, with_joins)
        
    @classmethod
    def bulk_query(cls, codes=None, insees=None):
        if codes:
            return cls.query.filter(cls.code.in_(codes))
        elif insees:
            subquery = Commune.bulk_query(insees=insees).with_entities(Commune.epci_id)
            return cls.query.filter(cls.id.in_(subquery))