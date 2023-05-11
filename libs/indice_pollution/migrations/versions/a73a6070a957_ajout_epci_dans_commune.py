"""Ajout epci dans commune

Revision ID: a73a6070a957
Revises: 15d404247610
Create Date: 2021-05-12 11:54:49.878474

"""
from alembic import op
import sqlalchemy as sa
import csv
import requests

from sqlalchemy.sql.expression import column


# revision identifiers, used by Alembic.
revision = 'a73a6070a957'
down_revision = '15d404247610'
branch_labels = None
depends_on = None



def upgrade():
    op.add_column('commune', sa.Column('epci_id', sa.Integer(), nullable=True), schema='indice_schema')
    op.create_foreign_key('commune_epci_id_fkey', 'commune', 'epci', ['epci_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')

    departements = dict(op.get_bind().execute(sa.text("SELECT code, id FROM indice_schema.departement")).fetchall())

    res = op.get_bind().execute(sa.text('SELECT insee FROM indice_schema.commune')).fetchall()
    insees = [r[0] for r in res]
    commune_table = sa.Table(
        "commune",
        sa.MetaData(),
        sa.Column("insee", sa.String()),
        sa.Column("nom", sa.String()),
        sa.Column("departement_id", sa.Integer),
        schema="indice_schema"
    )

    r = requests.get("https://geo.api.gouv.fr/communes")
    bucket = []
    for commune in r.json():
        if commune['code'] in insees:
            continue
        bucket.append(commune)
        if len(bucket) < 100:
            continue
        op.bulk_insert(
            commune_table,
            [
                {
                    "insee": c['code'],
                    "nom": c['nom'],
                    "departement_id": departements.get(c.get('codeDepartement'))
                }
                for c in bucket
            ]
        )
        bucket = []
    op.bulk_insert(
        commune_table,
        [
            {
                "insee": c['code'],
                "nom": c['nom'],
                "departement_id": departements.get(c.get('codeDepartement'))
            }
            for c in bucket
        ]
    )
    
    with open("migrations/versions/epci.csv") as f:
        reader = csv.reader(f)
        next(reader)
        epcis = dict()
        for row in reader:
            epcis.setdefault(row[2], [])
            epcis[row[2]].append(row[0])
    for epci, communes in epcis.items():
        op.get_bind().execute(sa.text("""
            UPDATE indice_schema.commune
            SET epci_id = (SELECT id FROM indice_schema.epci WHERE code = :code_epci)
            WHERE insee = ANY(:codes_commune)
        """), {
            "code_epci": epci,
            "codes_commune": [f"{int(v):05}" if v[:2] not in ("2A", "2B") else v for v in communes]
        })


def downgrade():
    op.drop_constraint('commune_epci_id_fkey', 'commune', schema='indice_schema', type_='foreignkey')
    op.drop_column('commune', 'epci_id', schema='indice_schema')
