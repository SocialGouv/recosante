"""unique constraint raep

Revision ID: bf3b994e205e
Revises: b8b45efb0283
Create Date: 2021-10-21 16:37:49.345216

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'bf3b994e205e'
down_revision = 'b8b45efb0283'
branch_labels = None
depends_on = None

unique_constraint_name = 'raep_unique_zoneid_validity'
def upgrade():
    op.create_unique_constraint(unique_constraint_name, 'raep', ['zone_id', 'validity'], schema='indice_schema')


def downgrade():
    op.drop_constraint(unique_constraint_name, 'raep', schema='indice_schema', type_='unique')