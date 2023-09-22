import os
from datetime import date, datetime, time, timedelta

import requests
from psycopg2.extras import DateTimeTZRange
from sqlalchemy import (Column, DateTime, ForeignKey, Index, Integer,
                        UniqueConstraint)
from sqlalchemy.dialects.postgresql import TSTZRANGE
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import case, select, text

from indice_pollution import db, logger
from indice_pollution.history.models.commune import Commune
from indice_pollution.history.models.departement import Departement


class VigilanceMeteo(db.Base):
    __tablename__ = "vigilance_meteo"

    id = Column(Integer, primary_key=True)

    zone_id = Column(Integer, ForeignKey('indice_schema.zone.id'))
    phenomene_id = Column(Integer)
    date_export = Column(DateTime)

    couleur_id = Column(Integer)
    validity = Column(TSTZRANGE(), nullable=False)

    __table_args__ = (
        Index('vigilance_zone_phenomene_date_export_idx',
              zone_id, phenomene_id, date_export),
        UniqueConstraint(zone_id, phenomene_id, date_export, validity),
        {"schema": "indice_schema"},
    )

    couleurs = {
        1: 'Vert',
        2: 'Jaune',
        3: 'Orange',
        4: 'Rouge'
    }

    labels = {
        1: 'Vigilance verte',
        2: 'Vigilance jaune',
        3: 'Vigilance orange',
        4: 'Vigilance rouge'
    }

    phenomenes = {
        1: 'Vent violent',
        2: 'Pluie-Inondation',
        3: 'Orages',
        4: 'Crues',
        5: 'Neige-verglas',
        6: 'Canicule',
        7: 'Grand Froid',
        8: 'Avalanches',
        9: 'Vagues-Submersion'
    }

    hours_to_add_before_6 = 16
    hours_to_add_before_16 = 30
    hours_to_add_after_16 = 40

    @staticmethod
    def get_departement_code(code):
        if code == "2A10":
            return "2A"
        if code == "2B10":
            return "2B"
        if code in {"99", "FRA"}:
            return None
        return code

    @classmethod
    def save_all(cls):
        def convert_datetime(iso_date):
            return datetime.strptime(iso_date[:19], "%Y-%m-%dT%H:%M:%S")

        portal_api_meteofrance_api_key = os.getenv(
            'PORTAL_API_METEOFRANCE_API_KEY')
        if not portal_api_meteofrance_api_key:
            logger.error(
                'The following env var is required: PORTAL_API_METEOFRANCE_API_KEY')
            return None

        request = requests.get(
            "https://public-api.meteofrance.fr/public/DPVigilance/v1/cartevigilance/encours",
            timeout=10,
            headers={"apikey": portal_api_meteofrance_api_key}
        )

        product = request.json().get('product')

        if product is None:
            logger.error(
                'Invalid payload returned by PORTAL_API_METEOFRANCE')
            return None

        date_export = convert_datetime(product['update_time'])

        if db.session.query(func.max(cls.date_export)).first() == (date_export,):
            logger.warn("Import déjà fait aujourd’hui")
            return None

        period_j = next(
            (period for period in product['periods'] if period['echeance'] == 'J'), None)

        for domain in period_j['timelaps']['domain_ids']:
            dept_code = cls.get_departement_code(domain['domain_id'])

            if dept_code is None:
                continue

            try:
                departement = Departement.get(dept_code)
            except requests.HTTPError:
                departement = None

            if not departement:
                logger.warn("domain_id inconnu : %s", dept_code)
                continue

            for phenomene in domain['phenomenon_items']:
                timelaps_items = phenomene['timelaps_items'][0]
                debut = convert_datetime(
                    timelaps_items['begin_time'][:19])
                fin = convert_datetime(timelaps_items['end_time'])
                obj = cls(
                    zone_id=departement.zone_id,
                    phenomene_id=int(phenomene['phenomenon_id']),
                    date_export=date_export,
                    couleur_id=int(phenomene['phenomenon_max_color_id']),
                    validity=DateTimeTZRange(debut, fin),
                )
                db.session.add(obj)
        db.session.commit()

    # Cette requête selectionne les vigilances météo du dernier export fait avant date_ & time_
    # Et ne renvoie que les vigilances comprises entre :
    #  * le date & time passés et date_export J +16h si l’heure dans le date export est < 6
    #  * le date & time passés et date_export J+1 6h si l’heure dans le date export est < 16
    #  * le date & time passés et date_export J+1 16h si l’heure dans le date export est >= 16

    @classmethod
    def get_query(cls, departement_code, insee, date_, time_):
        if not isinstance(date_, date):
            datetime_ = datetime.now()
        else:
            datetime_ = datetime.combine(date_, datetime.now().time())
        if isinstance(time_, time):
            datetime_ = datetime.combine(date_, time_)

        # On est obligé de passer par les tables sinon la fonction fetch à la fin n’est pas prise en compte
        vigilance_t = VigilanceMeteo.__table__
        departement_t = Departement.__table__
        statement = select(
            vigilance_t
        ).join(
            departement_t, vigilance_t.c.zone_id == departement_t.c.zone_id
        ).filter(
            vigilance_t.c.date_export <= datetime_,
            vigilance_t.c.validity.overlaps(
                DateTimeTZRange(
                    cls.make_start_date(date_=datetime_),
                    cls.make_end_date(date_=datetime_)
                )
            ),
            # Permet de ne pas selectionner des vigilances publiées il y a trop longtemps
            # ça donne des données parcelaires dont on ne veut pas.
            func.date_trunc('day', vigilance_t.c.date_export) + case(
                ((func.date_part('hour', vigilance_t.c.date_export) < 6),
                 text(f"'{cls.hours_to_add_before_6}h'::interval")),
                ((func.date_part('hour', vigilance_t.c.date_export) < 16),
                 text(f"'{cls.hours_to_add_before_16}h'::interval")),
                else_=text(f"'{cls.hours_to_add_after_16}h'::interval")
            ) > datetime_
        ).order_by(
            vigilance_t.c.date_export.desc()
        )

        if insee:
            commune_t = Commune.__table__
            statement = statement.join(
                commune_t, departement_t.c.id == commune_t.c.departement_id
            ).filter(commune_t.c.insee == insee)
        elif departement_code:
            statement = statement.filter(
                departement_t.c.code == departement_code)

        # Renvoie toutes les vigilances avec le même date export, voir FECTH LAST 1 ROW WITH TIES
        return statement.fetch(1, with_ties=True)

    @classmethod
    def get(cls, departement_code=None, insee=None, date_=None, time_=None):
        orms_obj = select(cls).from_statement(
            cls.get_query(departement_code, insee, date_, time_))
        return list(db.session.execute(orms_obj).scalars())

    @classmethod
    def get_all(cls, date_=None, time_=None):
        orms_obj = select(cls).from_statement(
            cls.get_query(None, None, date_, time_))
        return list(db.session.execute(orms_obj).scalars())

    @property
    def couleur(self) -> str:
        return self.couleurs.get(self.couleur_id)

    @property
    def phenomene(self) -> str:
        return self.phenomenes.get(self.phenomene_id)

    def __repr__(self) -> str:
        # pylint: disable-next=line-too-long
        return f"<VigilanceMeteo zone_id={self.zone_id} phenomene_id={self.phenomene_id} date_export={self.date_export} couleur_id={self.couleur_id} validity={self.validity}>"

    @classmethod
    def make_max_couleur(cls, vigilances):
        couleurs = [v.couleur_id for v in vigilances]
        return max(couleurs) if couleurs else None

    @classmethod
    def make_label(cls, max_couleur=None):
        return VigilanceMeteo.labels.get(max_couleur, '')

    @classmethod
    def make_start_date(cls, vigilances=None, date_=None):
        if isinstance(date_, datetime):
            return cls.make_end_date(date_=date_) - timedelta(days=1)
        if isinstance(vigilances, list) and len(vigilances) > 0:
            return vigilances[0].date_export
        return None

    @classmethod
    def make_end_date(cls, vigilances=None, date_=None):
        if date_ is None:
            if not isinstance(vigilances, list) or len(vigilances) < 1:
                return None
            date_ = vigilances[0].date_export
        if not isinstance(date_, datetime):
            return None

        if date_.hour < 6:
            hours_to_add = cls.hours_to_add_before_6
        elif date_.hour < 16:
            hours_to_add = cls.hours_to_add_before_16
        else:
            hours_to_add = cls.hours_to_add_after_16

        return date_.replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(hours=hours_to_add)
