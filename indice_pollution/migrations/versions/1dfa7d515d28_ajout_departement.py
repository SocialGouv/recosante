"""Ajout departement

Revision ID: 1dfa7d515d28
Revises: 1c2343422336
Create Date: 2021-04-06 16:37:49.442534

"""
from alembic import op
import sqlalchemy as sa
import requests

# revision identifiers, used by Alembic.
revision = '1dfa7d515d28'
down_revision = '1c2343422336'
branch_labels = None
depends_on = None


def upgrade():
    departement_table = op.create_table('departement',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('nom', sa.String(), nullable=True),
        sa.Column('code', sa.String(), nullable=True),
        sa.Column('region_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['region_id'], ['indice_schema.region.id'], ),
        sa.PrimaryKeyConstraint('id'),
        schema='indice_schema'
    )
    r = requests.get('https://geo.api.gouv.fr/departements?fields=nom,code,codeRegion', headers={"Accept": "application/json"})
    op.bulk_insert(departement_table, r.json())
    for departement in r.json():
        op.execute(f"UPDATE indice_schema.departement SET region_id=(SELECT id FROM indice_schema.region WHERE code='{departement['codeRegion']}') WHERE code='{departement['code']}'")
    op.add_column('commune', sa.Column('departement_id', sa.Integer(), nullable=True), schema='indice_schema')
    op.create_foreign_key('departement_commune_id_fk', 'commune', 'departement', ['departement_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')
    op.execute('update indice_schema.commune set departement_id = (select id from indice_schema.departement where code=indice_schema.commune.code_departement)')

    op.drop_column('commune', 'code_region', schema='indice_schema')
    op.drop_column('commune', 'nom_region', schema='indice_schema')
    op.drop_column('commune', 'code_departement', schema='indice_schema')


def downgrade():
    op.add_column('commune', sa.Column('code_departement', sa.VARCHAR(), autoincrement=False, nullable=True), schema='indice_schema')
    op.add_column('commune', sa.Column('nom_region', sa.VARCHAR(), autoincrement=False, nullable=True), schema='indice_schema')
    op.add_column('commune', sa.Column('code_region', sa.VARCHAR(), autoincrement=False, nullable=True), schema='indice_schema')
    op.drop_constraint('departement_commune_id_fk', 'commune', schema='indice_schema', type_='foreignkey')
    op.drop_column('commune', 'departement_id', schema='indice_schema')
    op.drop_table('departement', schema='indice_schema')
