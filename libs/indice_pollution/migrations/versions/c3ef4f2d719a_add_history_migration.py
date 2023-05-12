"""Add history migration

Revision ID: c3ef4f2d719a
Revises: 
Create Date: 2020-09-28 16:48:30.092425

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3ef4f2d719a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('indice_history',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('date_', sa.Date(), nullable=False),
        sa.Column('insee', sa.String(), nullable=False),
        sa.Column('features', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        schema='indice_schema'
    )


def downgrade():
    op.drop_table('indice_history', schema='indice_schema')
