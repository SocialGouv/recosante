"""Ajout zone dans Commune

Revision ID: aa157cdf821e
Revises: 44105b7f85a2
Create Date: 2021-05-17 19:03:44.411841

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa157cdf821e'
down_revision = '44105b7f85a2'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('zone_id', sa.Integer(), nullable=True), schema='indice_schema')
    op.create_foreign_key('commune_zone_id_fkey', 'commune', 'zone', ['zone_id'], ['id'], source_schema='indice_schema', referent_schema='indice_schema')


    op.execute(
        """
        DELETE FROM 
            indice_schema.zone a
                USING indice_schema.zone b
        WHERE
            a.id > b.id
            AND a.code = b.code AND a.type = b.type
        """
    )

    op.execute(
        """
        UPDATE indice_schema.commune c
        SET zone_id = (SELECT id FROM indice_schema.zone WHERE code = c.insee AND type='commune')
        """
    )


def downgrade():
    op.drop_constraint('commune_zone_id_fkey', 'commune', schema='indice_schema', type_='foreignkey')
    op.drop_column('commune', 'zone_id', schema='indice_schema')
