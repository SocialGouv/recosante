"""ajout zone_id a departement

Revision ID: b8b45efb0283
Revises: 22ce7dda587b
Create Date: 2021-10-21 16:18:46.201106

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b8b45efb0283'
down_revision = '22ce7dda587b'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('departement', sa.Column('zone_id', sa.Integer(), nullable=True), schema='indice_schema')
    op.create_foreign_key(None, 'departement', 'zone', ['zone_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')
    op.get_bind().execute(sa.text("""
    UPDATE indice_schema.departement
    SET zone_id = z.id
    FROM (
        SELECT id, code from indice_schema.zone WHERE type='departement'
    ) AS z
    WHERE departement.code = z.code
    """))

def downgrade():
    op.drop_constraint(None, 'departement', schema='indice_schema', type_='foreignkey')
    op.drop_column('departement', 'zone_id', schema='indice_schema')
