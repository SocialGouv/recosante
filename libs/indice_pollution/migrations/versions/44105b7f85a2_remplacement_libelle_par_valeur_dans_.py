"""Remplacement libelle par valeur dans IndiceATMO

Revision ID: 44105b7f85a2
Revises: e261b2818830
Create Date: 2021-05-17 17:29:57.286575

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44105b7f85a2'
down_revision = 'e261b2818830'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('indiceATMO', sa.Column('valeur', sa.Integer(), nullable=True), schema='indice_schema')
    op.drop_column('indiceATMO', 'libelle', schema='indice_schema')


def downgrade():
    op.add_column('indiceATMO', sa.Column('libelle', sa.VARCHAR(), autoincrement=False, nullable=True), schema='indice_schema')
    op.drop_column('indiceATMO', 'valeur', schema='indice_schema')
