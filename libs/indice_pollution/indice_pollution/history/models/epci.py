from sqlalchemy import Column, ForeignKey, DateTime, func, Integer, String, select
from sqlalchemy.orm import relationship

from indice_pollution import db
from indice_pollution.history.models.commune import Commune


class EPCI(db.Base):
    __tablename__ = "epci"

    id = Column(Integer, primary_key=True)
    code = Column(String())
    label = Column(String())
    departement_id = Column(Integer, ForeignKey(
        "indice_schema.departement.id"))
    departement = relationship(
        "indice_pollution.history.models.departement.Departement")
    zone_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone = relationship("indice_pollution.history.models.zone.Zone")
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    @classmethod
    def get(cls, code=None, insee=None):
        _ = code
        if request := db.session.execute(cls.get_query(insee, with_joins=True)).first():
            return request[0]
        return None

    @classmethod
    def select(cls, slct, code=None, insee=None, with_joins=False):
        if with_joins:
            slct = slct.join(cls.departement, isouter=True)
        if code:
            return slct.where(cls.code == code)
        if insee:
            subquery = Commune.get_query(insee).subquery()
            return slct.where(cls.id.in_([subquery.c.epci_id]))
        return None

    @classmethod
    def get_query(cls, code=None, insee=None, with_joins=False):
        return cls.select(select(cls), code, insee, with_joins)

    @classmethod
    def bulk_query(cls, codes=None, insees=None):
        if codes:
            return cls.query.filter(cls.code.in_(codes))
        if insees:
            subquery = Commune.bulk_query(
                insees=insees).with_entities(Commune.epci_id)
            return cls.query.filter(cls.id.in_(subquery))
        return None
