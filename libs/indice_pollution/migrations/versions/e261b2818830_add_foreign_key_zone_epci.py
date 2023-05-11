"""add foreign key zone epci

Revision ID: e261b2818830
Revises: 8c5a93b87183
Create Date: 2021-05-17 15:46:59.823918

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e261b2818830'
down_revision = '8c5a93b87183'
branch_labels = None
depends_on = None


def upgrade():
    op.create_foreign_key('epci_zone_id_fkey', 'epci', 'zone', ['zone_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')
    op.execute(
        """
        UPDATE indice_schema.epci e
        SET zone_id = (SELECT id FROM indice_schema.zone WHERE code = e.code)
        """
    )



def downgrade():
    op.drop_constraint('epci_zone_id_fkey', 'epci', schema='indice_schema', type_='foreignkey')
