"""Ajout données radon

Revision ID: 51c45c33b356
Revises: 60d538317728
Create Date: 2021-06-21 10:37:18.850467

"""
from re import subn
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import insert
import requests
import csv

# revision identifiers, used by Alembic.
revision = '51c45c33b356'
down_revision = '60d538317728'
branch_labels = None
depends_on = None


def upgrade():
    potentiel_radon = sa.Table(
        "potentiel_radon",
        sa.MetaData(),
        sa.Column("zone_id", sa.Integer),
        sa.Column("classe_potentiel", sa.Integer),
        schema="indice_schema"
    )
    commune_table = sa.Table(
        "commune",
        sa.MetaData(),
        sa.Column("zone_id", sa.Integer()),
        sa.Column("insee", sa.Integer),
        schema="indice_schema"
    )

    r = requests.get('https://static.data.gouv.fr/resources/connaitre-le-potentiel-radon-de-ma-commune/20190506-174309/radon.csv')
    decoded_content = r.content.decode('utf-8')
    lines = decoded_content.splitlines()
    reader = csv.reader(lines, delimiter=';')

    def format_insee(i: str):
        try:
            return f"{int(i.strip()):05}"
        except ValueError:
            return i
    conn = op.get_bind()
    res = conn.execute(sa.text("select insee from indice_schema.commune where zone_id IS NOT NULL"))
    good_communes_insees = set([r[0] for r in res.fetchall()])
    def insert_potentiel(rows):
        for row in rows:
            insee = format_insee(row[2]) if row[2] else None
            if insee not in good_communes_insees:
                continue
            op.execute(
                insert(potentiel_radon).values(
                    {
                        "zone_id": sa.select(commune_table.c.zone_id).where(commune_table.c.insee==insee, commune_table.c.zone_id != None).scalar_subquery(),
                        "classe_potentiel": int(row[3])
                    }
                ).on_conflict_do_nothing()
            )

    rows = []
    next(reader)
    for row in reader:
        rows.append(row)
        if len(rows) < 100:
            continue
        insert_potentiel(rows)
        rows = []
    insert_potentiel(rows)



def downgrade():
    sa.execute('TRUNCATE TABLE indice_schema.potentiel_radon')

