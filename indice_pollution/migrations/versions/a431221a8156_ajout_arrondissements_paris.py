"""Ajout arrondissements Paris

Revision ID: a431221a8156
Revises: 17dfd71fe755
Create Date: 2021-05-25 16:49:47.666089

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a431221a8156'
down_revision = '17dfd71fe755'
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

    zone_id = op.get_bind().execute(sa.text("SELECT id FROM indice_schema.zone WHERE id = (SELECT zone_id FROM indice_schema.commune WHERE insee = '75056');")).first()
    departement_id = op.get_bind().execute(sa.text("SELECT id FROM indice_schema.departement WHERE code ='75'")).first()

    arrondissements_lyon = [f"751{i:02}" for i in range(1, 21)]
    op.bulk_insert(
        commune_table,
        [
            {
                "insee": insee,
                "nom": "Paris",
                "departement_id": departement_id[0],
                "zone_id": zone_id[0]
            }
            for insee in arrondissements_lyon
        ]
    )


def downgrade():
    pass