import json
import re
import unicodedata
from functools import lru_cache

import requests
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, select
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import joinedload, relationship

from indice_pollution import db
from indice_pollution.extensions import logger
from indice_pollution.history.models.departement import Departement
from indice_pollution.history.models.tncc import TNCC


class Commune(db.Base, TNCC):
    __tablename__ = "commune"

    # This is the database field
    # pylint: disable-next=invalid-name
    id = Column(Integer, primary_key=True)
    insee = Column(String)
    nom = Column(String)
    epci_id = Column(Integer, ForeignKey("indice_schema.epci.id"))
    epci = relationship("indice_pollution.history.models.epci.EPCI")
    departement_id = Column(Integer, ForeignKey(
        "indice_schema.departement.id"))
    departement = relationship(
        "indice_pollution.history.models.departement.Departement")
    code_zone = Column(String)
    zone_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone = relationship(
        "indice_pollution.history.models.zone.Zone", foreign_keys=zone_id)
    _centre = Column('centre', String)
    zone_pollution_id = Column(Integer, ForeignKey("indice_schema.zone.id"))
    zone_pollution = relationship(
        "indice_pollution.history.models.zone.Zone", foreign_keys=zone_pollution_id)
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
    # This is the database field
    # pylint: disable-next=invalid-name,redefined-builtin
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
        if request := db.session.execute(cls.get_query(insee, with_joins=True)).first():
            return request[0]
        return None

    @classmethod
    def select(cls, slct, insee=None, code=None, with_joins=False):
        # This is to avoid circular import
        # pylint: disable-next=import-outside-toplevel
        from indice_pollution.history.models.epci import EPCI
        if with_joins:
            slct = slct.join(cls.departement, isouter=True).join(
                cls.zone, isouter=True).join(cls.epci, isouter=True)
        if insee:
            return slct.where(cls.insee == insee).limit(1)
        if code:
            subquery = EPCI.get_query(code=code).with_entities(
                EPCI.id).limit(1).subquery()
            return slct.where(cls.epci_id == subquery).limit(1)
        return None

    @classmethod
    def get_query(cls, insee=None, code=None, with_joins=False):
        return cls.select(select(cls), insee, code, with_joins)

    @classmethod
    def bulk_query(cls, insees=None, codes=None):
        # This is to avoid circular import
        # pylint: disable-next=import-outside-toplevel
        from indice_pollution.history.models.epci import EPCI
        if insees:
            return db.session.query(cls).filter(cls.insee.in_(insees))
        if codes:
            subquery = EPCI.bulk_query(
                codes=codes).with_entities(EPCI.id).subquery()
            return cls.query.filter(cls.epci_id.in_(subquery)).limit(1)
        return None

    @classmethod
    def get_and_init_from_api(cls, insee):
        res_api = cls.get_from_api(insee)
        if not res_api:
            return None
        commune = cls(**res_api)
        db.session.add(commune)
        return commune

    @classmethod
    def get_from_api(cls, insee):
        request = requests.get(
            f'https://geo.api.gouv.fr/communes/{insee}',
            params={
                "fields": "code,nom,codeDepartement,centre,codesPostaux",
                "format": "json",
            },
            timeout=10
        )
        try:
            request.raise_for_status()
        except requests.HTTPError as exception:
            logger.error("HTTP Error getting commune: '%s' %s",
                         insee, exception)
            return None
        if not 'codeDepartement' in request.json() or not 'centre' in request.json():
            logger.error(
                'Error getting info about: "%s" we need "codeDepartement" and "centre" in "%s"', insee, request.json())
            return None
        j = request.json()
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
            .replace('\'', '-').replace('\u2019', '-')\
            .replace('\u0153', 'oe')
        # remove diacritics
        slug = re.sub(r'[\u0300-\u036f]', '',
                      unicodedata.normalize('NFD', slug))
        return slug
