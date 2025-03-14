import copy
import csv
import logging
import os
from dataclasses import dataclass
from datetime import date, datetime, timedelta

import requests
from psycopg2.extras import DateRange
from sqlalchemy import (Column, ForeignKey, Index, Integer, UniqueConstraint,
                        func, select, DateTime)
from sqlalchemy.dialects.postgresql import DATERANGE
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.engine.row import Row

from indice_pollution import db
from indice_pollution.history.models.commune import Commune
from indice_pollution.history.models.departement import Departement


@dataclass
class RAEP(db.Base):
    __tablename__ = "raep"

    # This is the database field
    # pylint: disable-next=invalid-name
    id: int = Column(Integer, primary_key=True)
    zone_id: int = Column(Integer, ForeignKey(
        'indice_schema.zone.id'), nullable=False)
    validity = Column(DATERANGE(), nullable=False)

    cypres: int = Column(Integer)
    noisetier: int = Column(Integer)
    aulne: int = Column(Integer)
    peuplier: int = Column(Integer)
    saule: int = Column(Integer)
    frene: int = Column(Integer)
    charme: int = Column(Integer)
    bouleau: int = Column(Integer)
    platane: int = Column(Integer)
    chene: int = Column(Integer)
    olivier: int = Column(Integer)
    tilleul: int = Column(Integer)
    chataignier: int = Column(Integer)
    rumex: int = Column(Integer)
    graminees: int = Column(Integer)
    plantain: int = Column(Integer)
    urticacees: int = Column(Integer)
    armoises: int = Column(Integer)
    ambroisies: int = Column(Integer)
    total: int = Column(Integer)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index('raep_zone_validity_idx', zone_id, validity),
        UniqueConstraint(zone_id, validity),
        {"schema": "indice_schema"},
    )
    liste_allergenes = [
        "cypres",
        "noisetier",
        "aulne",
        "peuplier",
        "saule",
        "frene",
        "charme",
        "bouleau",
        "platane",
        "chene",
        "olivier",
        "tilleul",
        "chataignier",
        "rumex",
        "graminees",
        "plantain",
        "urticacees",
        "armoises",
        "ambroisies"
    ]

    @classmethod
    def save_all(cls):
        if not os.getenv('ALLERGIES_URL'):
            return
        try:
            request = requests.get(os.getenv("ALLERGIES_URL"), timeout=10)
        except Exception as exception:
            logging.error(exception)
            return
        decoded_content = request.content.decode('utf-8')
        first_column_name = decoded_content[:10]  # Il s'agit de la date
        date_format = "%d/%m/%Y"
        debut_validite = datetime.strptime(
            first_column_name, date_format).date()
        fin_validite = debut_validite + timedelta(weeks=1)
        reader = csv.DictReader(
            decoded_content.splitlines(),
            delimiter=';'
        )

        risques = []
        for request in reader:
            departement_code = f"{request[first_column_name]:0>2}"
            if departement_code == "20":
                departement_code = "2A"
            departement = Departement.get(departement_code)
            risques.append({
                **{
                    "zone_id": departement.zone_id,
                    "total": request["Total"],
                    "validity": DateRange(debut_validite, fin_validite)
                },
                **{allergene: int(request[allergene]) for allergene in cls.liste_allergenes}
            })
            if departement_code == "2A":
                request = copy.deepcopy(risques[-1])
                request["zone_id"] = Departement.get("2B").zone_id
                risques.append(request)
        ins = pg_insert(cls)\
            .values(risques)\
            .on_conflict_do_nothing()
        db.session.execute(ins)
        db.session.commit()

    @classmethod
    def get(cls, insee=None, zone_id=None, date_=None):
        date_ = date_ or date.today()
        if insee:
            if len(insee) == 5:
                zone_id = Commune.get(insee).departement.zone_id
            elif len(insee) == 2:
                zone_id = Departement.get(insee).zone_id
            else:
                return None
        elif zone_id is None:
            return None
        stmt = select(cls).where(
            cls.zone_id == zone_id,
            cls.validity.contains(date_)
        ).order_by(
            func.upper(cls.validity).desc()
        )
        if request := db.session.execute(stmt).first():
            return request[0]
        return None

    @classmethod
    def get_all(cls, date_=None):
        date_ = date_ or date.today()
        stmt = select(cls).where(
            cls.validity.contains(date_)
        ).distinct(cls.zone_id
                   ).order_by(
            cls.zone_id,
            func.upper(cls.validity).desc()
        )
        return [v[0] if isinstance(v, Row) else v for v in db.session.execute(stmt).all()]

    def to_dict(self):
        date_format = "%d/%m/%Y"
        return {
            "total": self.total,
            "allergenes": {
                allergene: getattr(self, allergene)
                for allergene in self.liste_allergenes
            },
            "periode_validite": {
                "debut": self.validity.lower.strftime(date_format),
                "fin": self.validity.upper.strftime(date_format)
            }
        }
