"""Ajout arrondissements Lyon

Revision ID: 17dfd71fe755
Revises: ebbb024ff679
Create Date: 2021-05-25 15:30:47.790408

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17dfd71fe755'
down_revision = 'ebbb024ff679'
branch_labels = None
depends_on = None


def upgrade():
    commune_table = sa.Table(
        "commune",
        sa.MetaData(),
        sa.Column("insee", sa.String()),
        sa.Column("nom", sa.String()),
        sa.Column("departement_id", sa.Integer),
        sa.Column("zone_id"),
        schema="indice_schema"
    )

    zone_id = op.get_bind().execute(sa.text("SELECT id FROM indice_schema.zone WHERE id = (SELECT zone_id FROM indice_schema.commune WHERE insee = '69123');")).first()
    departement_id = op.get_bind().execute(sa.text("SELECT id FROM indice_schema.departement WHERE code ='69'")).first()

    arrondissements_lyon = [f"6938{i}" for i in range(1, 10)]
    op.bulk_insert(
        commune_table,
        [
            {
                "insee": insee,
                "nom": "Lyon",
                "departement_id": departement_id[0],
                "zone_id": zone_id[0]
            }
            for insee in arrondissements_lyon
        ]
    )


def downgrade():
    pass