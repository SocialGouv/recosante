import csv
import io
import logging
import os
from dataclasses import dataclass
from datetime import datetime, timedelta
from ftplib import FTP

from sqlalchemy import Column, Date, DateTime, func, ForeignKey, Integer, select
from sqlalchemy.dialects.postgresql import insert as pg_insert

from indice_pollution import db
from indice_pollution.helpers import today
from indice_pollution.history.models.commune import Commune


@dataclass
class IndiceUv(db.Base):
    __tablename__ = "indice_uv"

    zone_id: int = Column(Integer, ForeignKey(
        'indice_schema.zone.id'), primary_key=True)
    date: datetime.date = Column(Date, primary_key=True, nullable=False)
    uv_j0: int = Column(Integer)
    uv_j1: int = Column(Integer)
    uv_j2: int = Column(Integer)
    uv_j3: int = Column(Integer)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    @classmethod
    def save_all(cls):

        def get_ftp_content():
            ftp_url = os.getenv('FS_BUCKET_URL')
            ftp_user = os.getenv('FS_BUCKET_USERNAME')
            ftp_password = os.getenv('FS_BUCKET_PASSWORD')
            if not ftp_url or not ftp_user or not ftp_password:
                logging.error(
                    'The following env vars are required: FS_BUCKET_URL, FS_BUCKET_USERNAME and FS_BUCKET_PASSWORD')
                return None
            try:
                ftp = FTP(ftp_url)
                ftp.login(ftp_user, ftp_password)
                bio = io.BytesIO()
                filename = f'{today().strftime("%Y%m%d")}'
                ftp.retrbinary(f'RETR {filename}.csv', callback=bio.write)
                bio_value = bio.getvalue()
                decoded_content = bio_value.decode('UTF-8')
                return decoded_content
            except Exception as exception:
                logging.error(exception)
                return None

        decoded_content = get_ftp_content()
        if decoded_content is None:
            return
        reader = csv.DictReader(
            decoded_content.splitlines(),
            delimiter=';'
        )
        indices = []

        def format_insee(raw_insee: str):
            if len(raw_insee) == 5 and raw_insee.isdigit():
                return raw_insee
            return None

        def format_uv(raw_uv: str):  # '-999' or '' means no value
            parsed_uv = None
            if raw_uv.isdigit():
                parsed_uv = int(raw_uv)
                if parsed_uv < 0:
                    parsed_uv = None
            return parsed_uv

        # file header: insee;commune;date;UV_J0;UV_J1;UV_J2;UV_J3
        for row in reader:
            insee = format_insee(row['insee'])
            outdated_communes = []
            if insee and insee not in outdated_communes:
                departement_code = f'{insee[:2]}'
                if departement_code == '20':  # Corse: 20 in file, 2A or 2B in db
                    insee_2a = insee.replace('20', '2A', 1)
                    commune = Commune.get(insee_2a)
                    if commune is None:
                        insee_2b = insee.replace('20', '2B', 1)
                        commune = Commune.get(insee_2b)
                else:
                    commune = Commune.get(insee)
                date_format = '%Y-%m-%d'
                try:
                    date = datetime.strptime(row['date'], date_format).date()
                except Exception as exception:
                    logging.error(exception)
                    continue
                if commune and date:
                    indices.append({
                        **{
                            "zone_id": commune.zone_id,
                            "date": date,
                            "uv_j0": format_uv(row['UV_J0']),
                            "uv_j1": format_uv(row['UV_J1']),
                            "uv_j2": format_uv(row['UV_J2']),
                            "uv_j3": format_uv(row['UV_J3'])
                        }
                    })
        ins = pg_insert(cls)\
            .values(indices)\
            .on_conflict_do_nothing()
        db.session.execute(ins)
        db.session.commit()

    @classmethod
    def get(cls, insee, date_=None):
        date_ = date_ or today()
        stmt = select(cls).join(Commune, Commune.zone_id == cls.zone_id).where(
            Commune.insee == insee, IndiceUv.date == date_)
        if result := db.session.execute(stmt).first():
            return result[0]
        min_date = date_ - timedelta(days=3)
        stmt = select(cls).join(Commune, Commune.zone_id == cls.zone_id).where(
            Commune.insee == insee, IndiceUv.date <= date_, IndiceUv.date >= min_date).order_by(IndiceUv.date.desc())
        if result := db.session.execute(stmt).first():
            result = result[0]
            delta = (date_ - result.date).days
            return cls(zone_id=result.zone_id, date=date_, uv_j0=getattr(result, f"uv_j{delta}"))
        return None

    @classmethod
    def get_all_query(cls, date_):
        return select(Commune.id, IndiceUv
                      ).join(
            Commune, Commune.zone_id == cls.zone_id
        ).where(
            IndiceUv.date == date_
        )

    @classmethod
    def get_all(cls, date_=None):
        date_ = date_ or today()
        return dict(db.session.execute(cls.get_all_query(date_)).all())

    @property
    def label(self):
        uv_j1_or_j0 = self.uv_j1 or self.uv_j0
        if isinstance(uv_j1_or_j0, int):
            if uv_j1_or_j0 >= 11:
                label = 'Extrême'
            elif uv_j1_or_j0 >= 8:
                label = 'Très\u00a0fort'  # unbreakable space
            elif uv_j1_or_j0 >= 6:
                label = 'Fort'
            elif uv_j1_or_j0 >= 3:
                label = 'Modéré'
            elif uv_j1_or_j0 >= 1:
                label = 'Faible'
            else:
                label = 'Nul'
            label += f' (UV\u00a0{uv_j1_or_j0})'  # unbreakable space
        else:
            label = None
        return label
