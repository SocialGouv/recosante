from sqlalchemy.orm import aliased, relationship, Mapped
from sqlalchemy.sql import and_
from sqlalchemy.sql.functions import coalesce
from sqlalchemy import Column, DateTime, ForeignKey, Integer, func, select
from indice_pollution.history.models.zone import Zone
from requests.models import codes
from indice_pollution import db
from indice_pollution.helpers import today
from indice_pollution.history.models import Commune, EPCI
from sqlalchemy import Date, text
from dataclasses import dataclass
from datetime import datetime
from operator import attrgetter, itemgetter


@dataclass
class IndiceATMO(db.Base):
    __tablename__ = "indiceATMO"

    zone_id: int = Column(Integer, ForeignKey('indice_schema.zone.id'), primary_key=True, nullable=False)
    zone: Mapped["Zone"] = relationship("indice_pollution.history.models.zone.Zone")
    date_ech: datetime = Column(DateTime, primary_key=True, nullable=False)
    date_dif: datetime = Column(DateTime, primary_key=True, nullable=False)
    no2: int = Column(Integer)
    so2: int = Column(Integer)
    o3:int = Column(Integer)
    pm10: int = Column(Integer)
    pm25: int = Column(Integer)
    valeur: int = Column(Integer)

    @classmethod
    def get(cls, insee=None, code_epci=None, date_=None):
        zone_subquery = cls.zone_subquery(insee=insee, code_epci=code_epci)
        zone_subquery_or = cls.zone_subquery_or(insee=insee)
        zones_subquery = zone_subquery.union(zone_subquery_or).subquery()
        date_ = date_ or today()
        stmt = select(cls)\
            .where(
                IndiceATMO.date_ech.cast(Date)==date_,
               IndiceATMO.zone_id.in_([zones_subquery.c.zone_id])
            )\
            .order_by(IndiceATMO.date_dif.desc())
        if r := db.session.execute(stmt).first():
            return r[0]

    @classmethod
    def bulk_query(cls, insees=None, date_=None):
        date_ = date_ or today()
        return text(
            """
            SELECT 
                DISTINCT ON (i.date_ech, coalesce(c.insee, c2.insee)) i.*, i.date_ech date, coalesce(c.insee, c2.insee) insee
            FROM
                indice_schema."indiceATMO" i
            JOIN indice_schema.zone z ON i.zone_id = z.id
            LEFT JOIN indice_schema.commune c ON z.type = 'commune' AND z.id = c.zone_id
            LEFT JOIN indice_schema.epci e ON z.type = 'epci' AND z.id = e.zone_id
            LEFT JOIN indice_schema.commune c2 ON c2.epci_id = e.id
            WHERE date(date_ech) = :date_ech AND ((c.insee = ANY(:insees)) OR (c2.insee = ANY(:insees)))
            ORDER BY i.date_ech, coalesce(c.insee, c2.insee), i.date_dif DESC;
            """
        ).bindparams(
            date_ech=date_,
            insees=insees
        )

    @classmethod
    def bulk(cls, insees=None, codes_epci=None, date_=None):
        return db.session.execute(IndiceATMO.bulk_query(insees=insees, date_=date_))

    @classmethod
    def get_all_query(cls, date_):
        commune_alias = aliased(Commune)
        commune_id = coalesce(Commune.id, commune_alias.id)
        return db.session.query(
                commune_id, IndiceATMO
            ).select_from(
                IndiceATMO
            ).join(
                Zone
            ).join(
                Commune, and_(Zone.type == 'commune', Zone.id == Commune.zone_id), isouter=True
            ).join(
                EPCI, and_(Zone.type == 'epci', Zone.id == EPCI.zone_id), isouter=True
            ).join(
                commune_alias, commune_alias.epci_id == EPCI.id, isouter=True
            ).filter(
                func.date(IndiceATMO.date_ech) == date_
            ).order_by(
                commune_id, IndiceATMO.date_dif.desc()
            ).distinct(
                commune_id
            )

    @classmethod
    def get_all(cls, date_):
        return dict(cls.get_all_query(date_).all())

    @classmethod
    def zone_subquery(cls, insee=None, code_epci=None):
        if insee:
            return Commune.select(select([Commune.zone_id]), insee=insee)
        elif code_epci:
            return EPCI.select(select([EPCI.zone_id]), code=code_epci)

    @classmethod
    def zone_subquery_or(cls, insee=None, code_epci=None):
        if insee:
            return EPCI.select(select([EPCI.zone_id]), insee=insee)
        elif code_epci:
            return Commune.select(select([Commune.zone_id]), code=code_epci)

    @classmethod
    def couleur_from_valeur(cls, valeur):
        return {
            "indisponible": "#DDDDDD",
            "bon": "#50F0E6",
            "moyen": "#50CCAA",
            "degrade" :"#F0E641",
            "mauvais": "#FF5050",
            "tres_mauvais": "#960032",
            "extrement_mauvais": "#960032",
            "evenement": "#888888"
        }.get(cls.indice_from_valeur(valeur))
    @property
    def couleur(self):
        return self.couleur_from_valeur(self.valeur)

    @classmethod
    def label_from_valeur(cls, valeur):
        return {
            "indisponible": "Indisponible",
            "bon": "Bon",
            "moyen": "Moyen",
            "degrade": "Dégradé",
            "mauvais": "Mauvais",
            "tres_mauvais": "Très mauvais",
            "extrement_mauvais": "Extrêment mauvais",
            "evenement": "Événement"
        }.get(cls.indice_from_valeur(valeur))
    @property
    def label(self):
        return self.label_from_valeur(self.valeur)

    @classmethod
    def indice_from_valeur(cls, valeur):
        return [
            "indisponible",
            "bon",
            "moyen",
            "degrade",
            "mauvais",
            "tres_mauvais",
            "extrement_mauvais",
            "evenement"
        ][valeur]
    @property
    def indice(self):
        return self.indice_from_valeur(self.valeur)

    @classmethod
    def indice_dict(cls, valeur):
        return {
            'indice': cls.indice_from_valeur(valeur),
            'label': cls.label_from_valeur(valeur),
            'couleur': cls.couleur_from_valeur(valeur),
            'valeur': valeur
        }

    @classmethod
    def make_sous_indice_dict(cls, code, valeur):
        if valeur is None:
            return {}
        return {
            **{'polluant_name': code.upper()},
            **cls.indice_dict(valeur)
        }
    @property
    def sous_indices(self):
        return [self.make_sous_indice_dict(k, getattr(self, k)) for k in ['pm25', 'pm10', 'no2', 'o3', 'so2']]

    def dict(self):
        return self.make_dict(self)

    @classmethod
    def make_dict(cls, indice):
        getter = itemgetter if type(indice) == dict else attrgetter
        return {
            **{
                'sous_indices': [cls.make_sous_indice_dict(k, getter(k)(indice)) for k in ['pm25', 'pm10', 'no2', 'o3', 'so2']],
                'date': getter('date_ech')(indice).date().isoformat(),
                'valeur': getter('valeur')(indice)
            },
            **cls.indice_dict(getter('valeur')(indice))
        }

    @property
    def insee(self):
        zone = Zone.query.get(self.zone_id)
        if zone.type == 'commune':
            return zone.code
        if zone.type == 'epci':
            r = db.session.query(
                EPCI, Commune
            ).filter(
                EPCI.zone_id == self.zone_id
            ).limit(1).first()
            return r.Commune.insee

    @property
    def details(self):
        return [self.make_sous_indice_dict(k, getattr(self, k)) for k in ['no2', 'so2', 'o3', 'pm10', 'pm25']]

    @property
    def indice(self):
        return self.indice_from_valeur(self.valeur)