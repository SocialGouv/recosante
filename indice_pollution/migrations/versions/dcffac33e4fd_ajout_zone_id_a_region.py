"""Ajout zone_id a region

Revision ID: dcffac33e4fd
Revises: ead68e6c4f59
Create Date: 2021-11-15 16:34:54.502752

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dcffac33e4fd'
down_revision = 'ead68e6c4f59'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('region', sa.Column('zone_id', sa.Integer(), nullable=True), schema='indice_schema')
    op.create_foreign_key('region_zone_id_fkey', 'region', 'zone', ['zone_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')

    connection = op.get_bind()

    connection.execute(sa.text("""
    INSERT INTO indice_schema.zone (type, code)
        SELECT 'region', code FROM indice_schema.region
        WHERE code NOT IN (SELECT code FROM indice_schema.zone where type = 'region')
    """))

    connection.execute(sa.text("""
    UPDATE indice_schema.region r
    SET zone_id = (SELECT id FROM indice_schema.zone WHERE type='region' AND code=r.code)
    """))


def downgrade():
    op.drop_constraint('region_zone_id_fkey', 'region', schema='indice_schema', type_='foreignkey')
    op.drop_column('region', 'zone_id', schema='indice_schema')
