"""Ajout indice UV

Revision ID: b793e65bf1e5
Revises: c5d4c9360062
Create Date: 2022-01-24 12:59:00.155438

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b793e65bf1e5'
down_revision = 'c5d4c9360062'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('indice_uv',
    sa.Column('zone_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('uv_j0', sa.Integer(), nullable=True),
    sa.Column('uv_j1', sa.Integer(), nullable=True),
    sa.Column('uv_j2', sa.Integer(), nullable=True),
    sa.Column('uv_j3', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], ),
    sa.PrimaryKeyConstraint('zone_id', 'date', 'date'),
    schema='indice_schema'
    )


def downgrade():
    op.drop_table('indice_uv', schema='indice_schema')
