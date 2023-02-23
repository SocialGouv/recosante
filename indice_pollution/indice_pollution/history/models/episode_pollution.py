from typing import List
from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func, select
from indice_pollution.history.models.commune import Commune
from indice_pollution import db
from datetime import datetime
from indice_pollution.helpers import today
from sqlalchemy import  Date, text


class EpisodePollution(db.Base):
    __tablename__ = "episode_pollution"

    zone_id: int = Column(Integer, ForeignKey('indice_schema.zone.id'), primary_key=True, nullable=False)
    zone = relationship("indice_pollution.history.models.zone.Zone")
    date_ech: datetime = Column(DateTime, primary_key=True, nullable=False)
    date_dif: datetime = Column(DateTime, primary_key=True, nullable=False)
    code_pol: int = Column(Integer, primary_key=True, nullable=False)
    etat: str = Column(String)
    com_court: str = Column(String)
    com_long: str = Column(String)

    @classmethod
    def get_query(cls, insee=None, code_epci=None, date_=None):
        table_ = cls.__table__
        commune_table = Commune.__table__
        date_ = date_ or today()
        statement = select(table_)
        if insee:
            statement = statement.join(
                commune_table,
                table_.c.zone_id == commune_table.c.zone_pollution_id
            ).filter(
                commune_table.c.insee == insee
            )
        return statement.filter(
            table_.c.date_ech.cast(Date) == date_
        ).order_by(table_.c.date_dif.desc()
        ).fetch(1, with_ties=True)

    @classmethod
    def get(cls, insee=None, code_epci=None, date_=None):
        orms_obj = select(cls).from_statement(cls.get_query(insee, code_epci, date_))
        return list(db.session.execute(orms_obj).scalars())

    @classmethod
    def bulk_query(cls, insees=None, codes_epci=None, date_=None):
        return text(
            """
            SELECT
                DISTINCT ON (e.zone_id, e.date_ech, e.col_pol) e.*, e.date_ech e, c.insee
            FROM
                indice_schema.episode_pollution e
                LEFT JOIN indice_schema.commune c ON c.zone_pollution_id = e.zone_id
                WHERE c.insee = ANY(:insees) AND date_ech=:date_ech
                ORDER BY e.zone_id, e.date_ech, e.date_dif DESC
            """
        ).bindparams(
            date_ech=date_,
            insees=insees
        )
    
    @classmethod
    def bulk(cls, insees=None, codes_epcis=None, date_=None):
        return db.session.execute(cls.bulk_query(insees=insees, date_=date_))

    @classmethod
    def get_all_query(cls, date_):
        return db.session.query(
                cls.zone_id, cls
            ).filter(
                func.date(cls.date_ech) == date_
            ).order_by(
                cls.zone_id, cls.code_pol, cls.date_ech, cls.date_dif
            ).distinct(cls.zone_id, cls.date_ech, cls.code_pol)

    @classmethod
    def get_all(cls, date_):
        to_return = dict()
        for zone_id, e in cls.get_all_query(date_).all():
            to_return.setdefault(zone_id, [])
            to_return[zone_id].append(e)
        return to_return


    @property
    def lib_pol_abbr(self):
        return self.get_lib_pol(self.code_pol)

    @classmethod
    def get_lib_pol_abbr(cls, code_pol):
        return {
            1: 'SO2',
            3: 'NO2',
            4: 'CO',
            5: 'PM10',
            7: 'O3',
            8: 'NO2',
            24: 'PM10',
            39: 'PM25',
        }.get(code_pol)

    @property
    def lib_pol(self):
        return self.get_lib_pol(self.code_pol)

    @classmethod
    def get_lib_pol(cls, code_pol):
        return {
            1: 'Dioxyde de soufre',
            3: 'Dioxyde d’azote',
            4: 'Monoxyde de carbone',
            5: 'Particules PM10',
            7: 'Ozone',
            8: 'Dioxyde d’azote',
            24: 'Particules PM10',
            39: 'Particules PM25',
        }.get(code_pol)

    @property
    def lib_pol_normalized(self):
        return self.get_lib_pol_normalized(self.code_pol)

    @classmethod
    def get_lib_pol_normalized(cls, code_pol):
        return {
            1: 'dioxyde_soufre',
            3: 'dioxyde_azote',
            5: 'particules_fines',
            7: 'ozone',
            8: 'dioxyde_azote',
            24: 'pm10',
            39: 'pm25',
        }.get(code_pol)

    @property
    def code_etat(self):
        return self.get_code_etat(self.etat)

    @classmethod
    def get_code_etat(cls, etat):
        if not isinstance(etat, str):
            return None
        etat = etat.lower()
        if "ssement" in etat:
            return 0
        elif "information" in etat:
            return 1
        elif "alerte" in etat:
            return 2
        else:
            return None

    @property
    def lib_etat(self):
        return self.get_lib_etat(self.code_etat)

    @classmethod
    def get_lib_etat(cls, code_etat):
        return {0: "pas de dépassement", 1: "information", 2: "alerte"}.get(code_etat, "")

    def dict(self):
        return {
            "code_pol": f"{self.code_pol:02}",
            "code_zone": self.zone.code if self.zone else "",
            "com_court": self.com_court,
            "com_long": self.com_long,
            "date": self.date_ech.date().isoformat(),
            "date_ech": self.date_ech.date().isoformat(),
            "date_dif": self.date_dif.date().isoformat(),
            "etat": self.etat,
            "lib_pol": self.lib_pol,
            "lib_pol_normalized": self.lib_pol_normalized
        }

    @classmethod
    def filter_etat_haut(cls, episodes):
        valid_etats = [e.code_etat for e in episodes if e.code_etat != None]
        if len(valid_etats) == 0:
            return []
        max_etat = max(valid_etats)
        if max_etat == 0:
            return []
        return [e for e in episodes if e.code_etat == max_etat]
