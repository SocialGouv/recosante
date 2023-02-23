"""add code_zone

Revision ID: 08cc65297d89
Revises: e943dae30f00
Create Date: 2021-01-21 17:21:25.937372

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '08cc65297d89'
down_revision = 'e943dae30f00'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('code_zone', sa.String(), nullable=True), schema='indice_schema')
    op.alter_column('episode_history', 'code_departement', new_column_name='code_zone', schema='indice_schema')


def downgrade():
    op.alter_column('episode_history', 'code_zone', new_column_name='code_departement', schema='indice_schema')
    op.drop_column('commune', 'code_zone', schema='indice_schema')
