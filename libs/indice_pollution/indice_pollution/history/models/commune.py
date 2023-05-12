from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, select
from indice_pollution.history.models.departement import Departement
from indice_pollution.history.models.tncc import TNCC
from indice_pollution.extensions import logger
from indice_pollution import db
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import joinedload, relationship
import requests
import json

from functools import lru_cache
import unicodedata, re

class Commune(db.Base, TNCC):
    __tablename__ = "commune"

    id = Column(Integer, primary_key=True)
    insee = Column(String)
    nom = Column(String)
    epci_id = Column(Integer, ForeignKey("indice_schema.epci.id"))
    epci = relationship("indice_pollution.history.models.epci.EPCI")
    departement_id = Column(Integer, ForeignKey("indice_schema.departement.id"))
    departement = relationship("indice_pollution.history.models.departement.Departement")
    code_zone = Column(String)
    zone_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone = relationship("indice_pollution.history.models.zone.Zone", foreign_keys=zone_id)
    _centre = Column('centre', String)
    zone_pollution_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone_pollution = relationship("indice_pollution.history.models.zone.Zone", foreign_keys=zone_pollution_id)
    pollinarium_sentinelle = Column(Boolean)
    codes_postaux = Column(postgresql.ARRAY(String))

    def __init__(self, **kwargs):
        if 'code' in kwargs:
            kwargs['insee'] = kwargs.pop('code')
        super().__init__(**kwargs)

    @property
    def centre(self):
        return json.loads(self._centre)

    @centre.setter
    def centre(self, value):
        self._centre = json.dumps(value)

    @classmethod
    @lru_cache(maxsize=None)
    def get_from_id(cls, id):
        return db.session.query(
            cls
        ).options(
            joinedload(cls.departement).joinedload(Departement.region)
        ).populate_existing(
        ).get(
            id
        )

    @classmethod
    def get(cls, insee):
        if insee is None:
            return None
        if r:= db.session.execute(cls.get_query(insee, with_joins=True)).first():
            return r[0]

    @classmethod
    def select(cls, s, insee=None, code=None, with_joins=False):
        if with_joins:
            s = s.join(cls.departement, isouter=True).join(cls.zone, isouter=True).join(cls.epci, isouter=True)
        if insee:
            return s.where(cls.insee==insee).limit(1)
        elif code:
            from indice_pollution.history.models.epci import EPCI
            subquery = EPCI.get_query(code=code).with_entities(EPCI.id).limit(1).subquery()
            return s.where(cls.epci_id==subquery).limit(1)


    @classmethod
    def get_query(cls, insee=None, code=None, with_joins=False):
        return cls.select(select(cls), insee, code, with_joins)
        
    @classmethod
    def bulk_query(cls, insees=None, codes=None):
        if insees:
            return db.session.query(cls).filter(cls.insee.in_(insees))
        elif codes:
            from indice_pollution.history.models.epci import EPCI
            subquery = EPCI.bulk_query(codes=codes).with_entities(EPCI.id).subquery()
            return cls.query.filter(cls.epci_id.in_(subquery)).limit(1)

    @classmethod
    def get_and_init_from_api(cls, insee):
        res_api = cls.get_from_api(insee)
        if not res_api:
            return None
        o = cls(**res_api)
        db.session.add(o)
        return o

    @classmethod
    def get_from_api(cls, insee):
        r = requests.get(
            f'https://geo.api.gouv.fr/communes/{insee}',
            params={
                "fields": "code,nom,codeDepartement,centre,codesPostaux",
                "format": "json",
            }
        )
        try:
            r.raise_for_status()
        except requests.HTTPError as e:
            logger.error(f"HTTP Error getting commune: '{insee}' {e}")
            return None
        if not 'codeDepartement' in r.json() or not 'centre' in r.json():
            logger.error(f'Error getting info about: "{insee}" we need "codeDepartement" and "centre" in "{r.json()}"')
            return None
        j = r.json()
        if 'codesPostaux' in j:
            j['codes_postaux'] = j['codesPostaux']
            del j['codesPostaux']
        return j

    @property
    def code(self):
        return self.insee

    @property
    def departement_nom(self):
        if self.departement:
            return self.departement.nom
        return ""

    @property
    def slug(self):
        # lower, replace whitespace and apostrophe by hyphen, replace œ by oe
        slug = self.nom.lower()\
            .replace(' ', '-')\
            .replace('\'', '-').replace(u'\u2019', '-')\
            .replace(u'\u0153', 'oe')
        # remove diacritics
        slug = re.sub(r'[\u0300-\u036f]', '', unicodedata.normalize('NFD', slug))
        return slug
