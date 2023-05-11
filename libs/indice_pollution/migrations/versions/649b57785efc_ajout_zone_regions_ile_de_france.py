"""Ajout zone regions ile de france

Revision ID: 649b57785efc
Revises: 610650eeb71e
Create Date: 2021-05-27 15:52:35.592770

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '649b57785efc'
down_revision = '610650eeb71e'
branch_labels = None
depends_on = None


def upgrade():
    zone_id = op.get_bind().execute(sa.text("INSERT INTO indice_schema.zone (code, type) VALUES ('11', 'region') RETURNING id")).fetchone()

    op.get_bind().execute(sa.text("""
        UPDATE indice_schema.commune
        SET zone_pollution_id = :zone
        WHERE departement_id IN (select d.id FROM indice_schema.departement d JOIN indice_schema.region r on d.region_id = r.id WHERE r.code = '11')
    """).bindparams(zone=zone_id[0]))


def downgrade():
    pass
