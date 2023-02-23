"""Ajout TNCC

Revision ID: 9d4e63014385
Revises: b793e65bf1e5
Create Date: 2022-03-23 17:25:54.953681

"""
from alembic import op
import sqlalchemy as sa
import csv

# revision identifiers, used by Alembic.
revision = '9d4e63014385'
down_revision = 'b793e65bf1e5'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('tncc', sa.Integer(), nullable=True), schema='indice_schema')
    table_commune = sa.Table(
        "commune",
        sa.MetaData(),
        sa.Column("id", sa.Integer),
        sa.Column("insee", sa.String()),
        sa.Column("tncc", sa.Integer),
        schema="indice_schema"
    )
    table_commune_temp = op.create_table('commune_temp',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('tncc', sa.Integer, nullable=True),
        prefixes=['TEMPORARY']
    )
    dict_communes = {i[1]: i[0] for i in op.get_bind().execute(table_commune.select())}
    with open('migrations/data/commune_2022.csv') as f:
        reader = csv.reader(f)
        next(reader)
        op.bulk_insert(table_commune_temp, [{"id": dict_communes[l[1]], "tncc": l[6]} for l in reader if l[1] in dict_communes])
    op.execute(sa.text("""
    UPDATE indice_schema.commune c 
    SET tncc = ct.tncc
    FROM commune_temp ct
    WHERE c.id = ct.id
    """))

    op.add_column('departement', sa.Column('tncc', sa.Integer(), nullable=True), schema='indice_schema')
    table_departement = sa.Table(
        "departement",
        sa.MetaData(),
        sa.Column("code", sa.String()),
        sa.Column("tncc", sa.Integer),
        schema="indice_schema"
    )
    with open('migrations/data/departement_2022.csv') as f:
        reader = csv.reader(f)
        stmt = table_departement.update()\
            .where(table_departement.c.code == sa.bindparam('b_code'))\
            .values({"tncc": sa.bindparam("tncc")})
        next(reader)
        op.get_bind().execute(stmt, [{"b_code": l[0], "tncc": l[3]} for l in reader])

    op.add_column('region', sa.Column('tncc', sa.Integer(), nullable=True), schema='indice_schema')
    table_region = sa.Table(
        "region",
        sa.MetaData(),
        sa.Column("code", sa.String()),
        sa.Column("tncc", sa.Integer),
        schema="indice_schema"
    )
    with open('migrations/data/region_2022.csv') as f:
        reader = csv.reader(f)
        stmt = table_region.update()\
            .where(table_region.c.code == sa.bindparam('b_code'))\
            .values({"tncc": sa.bindparam("tncc")})
        next(reader)
        op.get_bind().execute(stmt, [{"b_code": l[0], "tncc": l[2]} for l in reader])

    


def downgrade():
    op.drop_column('region', 'tncc', schema='indice_schema')
    op.drop_column('departement', 'tncc', schema='indice_schema')
    op.drop_column('commune', 'tncc', schema='indice_schema')
