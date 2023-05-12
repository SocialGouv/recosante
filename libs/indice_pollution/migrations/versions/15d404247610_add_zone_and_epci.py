"""add zone and epci

Revision ID: 15d404247610
Revises: 384e24f8d9e5
Create Date: 2021-05-11 16:50:12.682968

"""
from alembic import op
import sqlalchemy as sa
import csv


# revision identifiers, used by Alembic.
revision = '15d404247610'
down_revision = '384e24f8d9e5'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('zone',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('type', sa.String(), nullable=True),
        sa.Column('code', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        schema='indice_schema'
    )
    epci_table = op.create_table('epci',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('code', sa.String(), nullable=True),
        sa.Column('label', sa.String(), nullable=True),
        sa.Column('departement_id', sa.Integer(), nullable=True),
        sa.Column('zone_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['departement_id'], ['indice_schema.departement.id'], ),
        sa.PrimaryKeyConstraint('id'),
        schema='indice_schema'
    )
    conn = op.get_bind()
    res = conn.execute(sa.text("SELECT code, id FROM indice_schema.departement"))
    results = res.fetchall()
    departements = dict(results)

    op.execute("TRUNCATE indice_schema.epci")

    with open("migrations/versions/epci.csv") as f:
        reader = csv.reader(f)
        next(reader)
        bucket = []
        epcis = set()
        for row in reader:
            if not row[2] in epcis:
                bucket.append(row)
                epcis.add(row[2])
            if len(bucket) < 100:
                continue
            op.bulk_insert(epci_table, [
                    {
                        "code": r[2],
                        "label": r[3],
                        "code_dep": departements[f"{int(r[4]):02}"] if r[4] not in ("2A", "2B") else departements[r[4]]
                    }
                    for r in bucket
                ]
            )
            bucket = []
        op.bulk_insert(epci_table, [
                {
                    "code": r[2],
                    "label": r[3],
                    "code_dep": departements[f"{int(r[4]):02}"] if r[4] not in ("2A", "2B") else departements[r[4]]
                }
                for r in bucket
            ]
        )

def downgrade():
    op.drop_table('epci', schema='indice_schema')
    op.drop_table('zone', schema='indice_schema')
