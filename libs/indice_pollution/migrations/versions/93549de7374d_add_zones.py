"""Add zones

Revision ID: 93549de7374d
Revises: a73a6070a957
Create Date: 2021-05-14 14:58:50.187075

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '93549de7374d'
down_revision = 'a73a6070a957'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("INSERT INTO indice_schema.zone (code, type) SELECT insee, 'commune' FROM indice_schema.commune")
    op.execute("INSERT INTO indice_schema.zone (code, type) SELECT code, 'departement' FROM indice_schema.departement")
    op.execute("INSERT INTO indice_schema.zone (code, type) SELECT code, 'epci' FROM indice_schema.epci")


def downgrade():
    op.execute("TRUNCATE TABLE indice_schema.zone")
