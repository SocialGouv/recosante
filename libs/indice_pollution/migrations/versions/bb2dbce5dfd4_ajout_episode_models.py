"""Ajout episode models

Revision ID: bb2dbce5dfd4
Revises: c3ef4f2d719a
Create Date: 2020-11-26 14:48:55.134519

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb2dbce5dfd4'
down_revision = 'c3ef4f2d719a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('episode_history',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date_', sa.Date(), nullable=False),
    sa.Column('insee', sa.String(), nullable=False),
    sa.Column('features', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    schema='indice_schema'
    )


def downgrade():
    op.drop_table('episode_history', schema='indice_schema')
