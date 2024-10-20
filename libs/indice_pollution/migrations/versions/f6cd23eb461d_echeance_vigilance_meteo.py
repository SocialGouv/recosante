"""created_at and updated_at

Revision ID: f6cd23eb461d
Revises: e6bd21eb460d
Create Date: 2023-09-21 15:37:35.257001

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'f6cd23eb461d'
down_revision = 'e6bd21eb460d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('vigilance_meteo', sa.Column(
        'echeance', sa.String(), nullable=True, default='J'), schema='indice_schema')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('vigilance_meteo', 'echeance', schema='indice_schema')
    # ### end Alembic commands ###
