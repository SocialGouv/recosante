"""Use JSON in indice_pollution.features

Revision ID: e943dae30f00
Revises: 1f4ee7fce9a5
Create Date: 2021-01-20 18:39:11.395437

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e943dae30f00'
down_revision = '1f4ee7fce9a5'
branch_labels = None
depends_on = None

def upgrade():
    op.alter_column('indice_history', 'features', type_=sa.JSON(), postgresql_using=' features::json', schema='indice_schema')

def downgrade():
    op.alter_column('indice_history', 'features', type_=sa.String(), schema='indice_schema')