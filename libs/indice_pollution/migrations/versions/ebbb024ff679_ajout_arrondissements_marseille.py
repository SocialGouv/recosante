"""Ajout arrondissements Marseille

Revision ID: ebbb024ff679
Revises: aa157cdf821e
Create Date: 2021-05-19 17:57:29.702999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebbb024ff679'
down_revision = 'aa157cdf821e'
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

    zone_id = op.get_bind().execute(sa.text("SELECT id FROM indice_schema.zone WHERE id = (SELECT zone_id FROM indice_schema.commune WHERE insee = '13055');")).first()
    departement_id = op.get_bind().execute(sa.text("SELECT id FROM indice_schema.departement WHERE code ='13'")).first()

    arrondissements_marseille = [f"132{i:02}" for i in range(1, 17)]
    op.bulk_insert(
        commune_table,
        [
            {
                "insee": insee,
                "nom": "Marseille",
                "departement_id": departement_id[0],
                "zone_id": zone_id[0]
            }
            for insee in arrondissements_marseille
        ]
    )


def downgrade():
    pass
