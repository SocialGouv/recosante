import requests
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from indice_pollution import db
from indice_pollution.history.models.region import Region
from indice_pollution.history.models.tncc import TNCC


class Departement(db.Base, TNCC):
    __tablename__ = 'departement'

    id = Column(Integer, primary_key=True)
    nom = Column(String)
    code = Column(String)
    region_id = Column(Integer, ForeignKey('indice_schema.region.id'))
    region = relationship("indice_pollution.history.models.region.Region")
    preposition = Column(String)
    zone_id = Column(Integer, ForeignKey('indice_schema.zone.id'))
    zone = relationship("indice_pollution.history.models.zone.Zone")

    def __init__(self, **kwargs):
        if 'codeRegion' in kwargs:
            self.region = Region.get(kwargs.pop('codeRegion'))
        super().__init__(**kwargs)

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
            f'https://geo.api.gouv.fr/departements/{code}?fields=nom,code,codeRegion',
            headers={"Accept": "application/json"},
            timeout=10,
        )
        request.raise_for_status()
        return request.json()
