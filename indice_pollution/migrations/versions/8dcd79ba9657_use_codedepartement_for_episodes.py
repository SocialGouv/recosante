"""Use codeDepartement for episodes

Revision ID: 8dcd79ba9657
Revises: b7075f801cf2
Create Date: 2020-12-03 12:03:25.898296

"""
from alembic import op
import sqlalchemy as sa


revision = '8dcd79ba9657'
down_revision = 'b7075f801cf2'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('episode_history', sa.Column('code_departement', sa.String(), nullable=False), schema='indice_schema')
    op.drop_column('episode_history', 'insee', schema='indice_schema')


def downgrade():
    op.add_column('episode_history', sa.Column('insee', sa.VARCHAR(), autoincrement=False, nullable=False), schema='indice_schema')
    op.drop_column('episode_history', 'code_departement', schema='indice_schema')
