from psycopg2.extras import DateTimeTZRange
from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, UniqueConstraint
from sqlalchemy.dialects.postgresql import TSTZRANGE
from sqlalchemy.sql.expression import case, select, text
from sqlalchemy.sql import func
import requests
import zipfile
from io import BytesIO
from xml.dom.minidom import parseString
from datetime import date, datetime, time, timedelta

from indice_pollution import db, logger
from indice_pollution.history.models.departement import Departement
from indice_pollution.history.models.commune import Commune

class VigilanceMeteo(db.Base):
    __tablename__ = "vigilance_meteo"

    id = Column(Integer, primary_key=True)

    zone_id = Column(Integer, ForeignKey('indice_schema.zone.id'))
    phenomene_id = Column(Integer)
    date_export = Column(DateTime)

    couleur_id = Column(Integer)
    validity = Column(TSTZRANGE(), nullable=False)

    __table_args__ = (
        Index('vigilance_zone_phenomene_date_export_idx', zone_id, phenomene_id, date_export),
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
    def get_departement_codes(code):
        if code == "20":
            return ["2A"]
        elif code == "120":
            return ["2B"]
        elif code == "175":
            return ["75", "92", "93", "94"]
        elif code == "99":
            return [None]
        return [code]

    @classmethod
    def save_all(cls):
        def convert_datetime(a):
            return datetime.strptime(a.value, "%Y%m%d%H%M%S")
        r = requests.get("http://vigilance2019.meteofrance.com/data/vigilance.zip")
        with zipfile.ZipFile(BytesIO(r.content)) as z:
            fname = "NXFR49_LFPW_.xml"
            if not fname in z.namelist():
                return
            with z.open(fname) as f:
                x = parseString(f.read())
                date_export = convert_datetime(x.getElementsByTagName('SIV_MENHIR')[0].attributes['dateExportTU'])
                if db.session.query(func.max(cls.date_export)).first() == (date_export,):
                    logger.warn("Import déjà fait aujourd’hui")
                    return

                for phenomene in x.getElementsByTagName("PHENOMENE"):
                    for departement_code in cls.get_departement_codes(phenomene.attributes['departement'].value):
                        if not departement_code:
                            continue
                        departement = Departement.get(departement_code)
                        if not departement:
                            logger.error(f"Pas de département pour : {departement_code}")
                            continue
                        debut = convert_datetime(phenomene.attributes['dateDebutEvtTU'])
                        fin = convert_datetime(phenomene.attributes['dateFinEvtTU'])
                        if debut < fin:
                            obj = cls(
                                zone_id=departement.zone_id,
                                phenomene_id=int(phenomene.attributes['phenomene'].value),
                                date_export=date_export,
                                couleur_id=int(phenomene.attributes['couleur'].value),
                                validity=DateTimeTZRange(debut, fin),
                            )
                            db.session.add(obj)
                        else:
                            logger.error(f"Impossible d’enregistrer le phénomène: {phenomene}")
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
                ((func.date_part('hour', vigilance_t.c.date_export) < 6), text(f"'{cls.hours_to_add_before_6}h'::interval")),
                ((func.date_part('hour', vigilance_t.c.date_export) < 16), text(f"'{cls.hours_to_add_before_16}h'::interval")),
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
            statement = statement.filter(departement_t.c.code == departement_code)

        return statement.fetch(1, with_ties=True) # Renvoie toutes les vigilances avec le même date export, voir FECTH LAST 1 ROW WITH TIES

    @classmethod
    def get(cls, departement_code=None, insee=None, date_=None, time_=None):
        orms_obj = select(cls).from_statement(cls.get_query(departement_code, insee, date_, time_))
        return list(db.session.execute(orms_obj).scalars())

    @classmethod
    def get_all(cls, date_=None, time_=None):
        orms_obj = select(cls).from_statement(cls.get_query(None, None, date_, time_))
        return list(db.session.execute(orms_obj).scalars())

    @property
    def couleur(self) -> str:
        return self.couleurs.get(self.couleur_id)

    @property
    def phenomene(self) -> str:
        return self.phenomenes.get(self.phenomene_id)

    def __repr__(self) -> str:
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
