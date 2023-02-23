"""better episode model

Revision ID: 1f4ee7fce9a5
Revises: 8dcd79ba9657
Create Date: 2021-01-20 16:15:29.225523

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f4ee7fce9a5'
down_revision = '8dcd79ba9657'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('episode_history', sa.Column('polluant', sa.String(), nullable=True), schema='indice_schema')
    op.alter_column('episode_history', 'features', type_=sa.JSON(), postgresql_using=' features::json', schema='indice_schema')



def downgrade():
    op.drop_column('episode_history', 'polluant', schema='indice_schema')
    op.alter_column('episode_history', 'features', type_=sa.String(), schema='indice_schema')