"""Ajout codes postaux

Revision ID: cf0a66204a5b
Revises: 86740594ef44
Create Date: 2021-09-15 17:02:53.780143

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import requests

# revision identifiers, used by Alembic.
revision = 'cf0a66204a5b'
down_revision = '86740594ef44'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('codes_postaux', postgresql.ARRAY(sa.String()), nullable=True), schema='indice_schema')
    r = requests.get('https://geo.api.gouv.fr/communes/')
    for c in r.json():
        op.execute(sa.text('UPDATE indice_schema.commune SET codes_postaux = :codes_postaux WHERE insee= :code').bindparams(
            codes_postaux=c['codesPostaux'],
            code=c['code']
        ))


def downgrade():
    op.drop_column('commune', 'codes_postaux', schema='indice_schema')
