import requests
from sqlalchemy import Column, DateTime, func, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from indice_pollution import db
from indice_pollution.history.models.tncc import TNCC


class Region(db.Base, TNCC):
    __tablename__ = 'region'

    id = Column(Integer, primary_key=True)
    nom = Column(String)
    code = Column(String)
    aasqa_website = Column(String)
    aasqa_nom = Column(String)
    zone_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone = relationship("indice_pollution.history.models.zone.Zone")
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    @classmethod
    def get(cls, code):
        return db.session.query(cls).filter_by(code=code).first() or cls.get_and_init_from_api(code)

    @classmethod
    def get_and_init_from_api(cls, code):
        res_api = cls.get_from_api(code)
        request = cls(**res_api)
        db.session.add(request)
        return request

    @classmethod
    def get_from_api(cls, code):
        request = requests.get(
            f'https://geo.api.gouv.fr/regions/{code}?fields=nom,code', timeout=10)
        request.raise_for_status()
        return request.json()
