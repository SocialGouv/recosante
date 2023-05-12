"""Suppression VigilanceMeteo.to_show

Revision ID: c5d4c9360062
Revises: 901a31d192ad
Create Date: 2021-12-02 15:34:16.405718

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c5d4c9360062'
down_revision = '901a31d192ad'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('vigilance_meteo', 'to_show', schema='indice_schema')


def downgrade():
    op.add_column('vigilance_meteo', sa.Column('to_show', postgresql.DATERANGE(), autoincrement=False, nullable=False), schema='indice_schema')
