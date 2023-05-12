"""Ajout commune

Revision ID: b7075f801cf2
Revises: bb2dbce5dfd4
Create Date: 2020-12-03 11:58:53.939446

"""
from alembic import op
import sqlalchemy as sa

revision = 'b7075f801cf2'
down_revision = 'bb2dbce5dfd4'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('commune',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('insee', sa.String(), nullable=True),
        sa.Column('nom', sa.String(), nullable=True),
        sa.Column('code_departement', sa.String(), nullable=True),
        sa.Column('code_region', sa.String(), nullable=True),
        sa.Column('nom_region', sa.String(), nullable=True),
        sa.Column('centre', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        schema='indice_schema'
    )


def downgrade():
    op.drop_table('commune', schema='indice_schema')
