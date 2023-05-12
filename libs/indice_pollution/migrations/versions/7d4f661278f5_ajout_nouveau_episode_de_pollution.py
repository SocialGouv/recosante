"""Ajout nouveau episode de pollution

Revision ID: 7d4f661278f5
Revises: a431221a8156
Create Date: 2021-05-25 18:12:34.228174

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7d4f661278f5'
down_revision = 'a431221a8156'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('episode_pollution',
    sa.Column('zone_id', sa.Integer(), nullable=False),
    sa.Column('date_ech', sa.DateTime(), nullable=False),
    sa.Column('date_dif', sa.DateTime(), nullable=False),
    sa.Column('code_pol', sa.Integer(), nullable=True),
    sa.Column('etat', sa.String(), nullable=True),
    sa.Column('com_court', sa.String(), nullable=True),
    sa.Column('com_long', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], ),
    sa.PrimaryKeyConstraint('zone_id', 'date_ech', 'date_dif'),
    schema='indice_schema'
    )


def downgrade():
    op.drop_table('episode_pollution', schema='indice_schema')
