"""Ajout IndiceATMO

Revision ID: 8c5a93b87183
Revises: 93549de7374d
Create Date: 2021-05-17 15:12:58.200581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c5a93b87183'
down_revision = '93549de7374d'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('indiceATMO',
    sa.Column('zone_id', sa.Integer(), nullable=False),
    sa.Column('date_ech', sa.DateTime(), nullable=False),
    sa.Column('date_dif', sa.DateTime(), nullable=False),
    sa.Column('no2', sa.Integer(), nullable=True),
    sa.Column('so2', sa.Integer(), nullable=True),
    sa.Column('o3', sa.Integer(), nullable=True),
    sa.Column('pm10', sa.Integer(), nullable=True),
    sa.Column('pm25', sa.Integer(), nullable=True),
    sa.Column('libelle', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], ),
    sa.PrimaryKeyConstraint('zone_id', 'date_ech', 'date_dif'),
    schema='indice_schema'
    )


def downgrade():
    op.drop_table('indiceATMO', schema='indice_schema')
