"""Ajout des zones d’épisode de pollution

Revision ID: 95374aa73395
Revises: 7d4f661278f5
Create Date: 2021-05-26 14:32:22.810608

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95374aa73395'
down_revision = '7d4f661278f5'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('zone_pollution_id', sa.Integer(), nullable=True), schema='indice_schema')
    op.create_foreign_key(None, 'commune', 'zone', ['zone_pollution_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')


def downgrade():
    op.drop_constraint(None, 'commune', schema='indice_schema', type_='foreignkey')
    op.drop_column('commune', 'zone_pollution_id', schema='indice_schema')
