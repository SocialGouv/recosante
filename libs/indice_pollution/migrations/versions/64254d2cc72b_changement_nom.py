"""Changement nom

Revision ID: 64254d2cc72b
Revises: 9d4e63014385
Create Date: 2022-03-31 12:21:22.976192

"""
from alembic import op
import sqlalchemy as sa
import csv

# revision identifiers, used by Alembic.
revision = '64254d2cc72b'
down_revision = '9d4e63014385'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('nccenr', sa.String(), nullable=True), schema='indice_schema')
    table_commune = sa.Table(
        "commune",
        sa.MetaData(),
        sa.Column("id", sa.Integer),
        sa.Column("insee", sa.String()),
        sa.Column("nccenr", sa.String()),
        schema="indice_schema"
    )
    op.execute("DROP TABLE IF EXISTS commune_temp")
    table_commune_temp = op.create_table('commune_temp',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('nccenr', sa.String(), nullable=True),
        prefixes=['TEMPORARY']
    )
    dict_communes = {i[1]: i[0] for i in op.get_bind().execute(table_commune.select())}
    with open('migrations/data/commune_2022.csv') as f:
        reader = csv.reader(f)
        next(reader)
        op.bulk_insert(table_commune_temp, [{"id": dict_communes[l[1]], "nccenr": l[8]} for l in reader if l[1] in dict_communes])
    op.execute(sa.text("""
    UPDATE indice_schema.commune c 
    SET nccenr = ct.nccenr
    FROM commune_temp ct
    WHERE c.id = ct.id
    """))

    op.add_column('departement', sa.Column('nccenr', sa.String(), nullable=True), schema='indice_schema')
    table_departement = sa.Table(
        "departement",
        sa.MetaData(),
        sa.Column("code", sa.String()),
        sa.Column("nccenr", sa.String()),
        schema="indice_schema"
    )
    with open('migrations/data/departement_2022.csv') as f:
        reader = csv.reader(f)
        stmt = table_departement.update()\
            .where(table_departement.c.code == sa.bindparam('b_code'))\
            .values({"nccenr": sa.bindparam("nccenr")})
        next(reader)
        op.get_bind().execute(stmt, [{"b_code": l[0], "nccenr": l[5]} for l in reader])

    op.add_column('region', sa.Column('nccenr', sa.String(), nullable=True), schema='indice_schema')
    table_region = sa.Table(
        "region",
        sa.MetaData(),
        sa.Column("code", sa.String()),
        sa.Column("nccenr", sa.String()),
        schema="indice_schema"
    )
    with open('migrations/data/region_2022.csv') as f:
        reader = csv.reader(f)
        stmt = table_region.update()\
            .where(table_region.c.code == sa.bindparam('b_code'))\
            .values({"nccenr": sa.bindparam("nccenr")})
        next(reader)
        op.get_bind().execute(stmt, [{"b_code": l[0], "nccenr": l[4]} for l in reader])


def downgrade():
    op.drop_column('region', 'nccenr', schema='indice_schema')
    op.drop_column('departement', 'nccenr', schema='indice_schema')
    op.drop_column('commune', 'nccenr', schema='indice_schema')
