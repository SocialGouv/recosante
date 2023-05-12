from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from indice_pollution import db
import requests
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

    @classmethod
    def get(cls, code):
        return db.session.query(cls).filter_by(code=code).first() or cls.get_and_init_from_api(code)

    @classmethod
    def get_and_init_from_api(cls, code):
        res_api = cls.get_from_api(code)
        r = cls(**res_api)
        db.session.add(r)
        return r

    @classmethod
    def get_from_api(cls, code):
        r = requests.get(f'https://geo.api.gouv.fr/regions/{code}?fields=nom,code')
        r.raise_for_status()
        return r.json()