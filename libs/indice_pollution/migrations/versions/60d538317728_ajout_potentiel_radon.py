"""Ajout potentiel radon

Revision ID: 60d538317728
Revises: 9b77c8fe3dbe
Create Date: 2021-06-21 10:35:06.527470

"""
from alembic import op
import sqlalchemy as sa
import requests
import csv


# revision identifiers, used by Alembic.
revision = '60d538317728'
down_revision = '9b77c8fe3dbe'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('potentiel_radon',
    sa.Column('zone_id', sa.Integer(), nullable=False),
    sa.Column('classe_potentiel', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], ),
    sa.PrimaryKeyConstraint('zone_id'),
    schema='indice_schema'
    )



def downgrade():
    op.drop_table('potentiel_radon', schema='indice_schema')
