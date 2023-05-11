"""Ajout bassin d’air

Revision ID: ead68e6c4f59
Revises: b8a8b4c98b23
Create Date: 2021-11-15 16:02:17.969375

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ead68e6c4f59'
down_revision = 'b8a8b4c98b23'
branch_labels = None
depends_on = None


def upgrade():
    table = op.create_table('bassin_d_air',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nom', sa.String(), nullable=True),
    sa.Column('code', sa.String(), nullable=True),
    sa.Column('zone_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], ),
    sa.PrimaryKeyConstraint('id'),
    schema='indice_schema'
    )
    data = [('2000', 'Bassin Grenoblois'), ('2001', 'Bassin Lémanique'), ('2002', 'Bassin Stéphanois'), ('2003', 'Bassin Lyon Nord-Isère'), ('2004', 'Contreforts Massif Central'), ('2005', 'Est Drôme'), ('2006', 'Ouest Ain'), ('2007', 'Ouest Ardèche'), ('2008', "Vallée de l'Arve"), ('2009', 'Vallée du Rhône'), ('2010', 'Vallée Maurienne Tarentaise'), ('2011', 'Zone des Coteaux'), ('2012', 'Zone urbaine des Pays de Savoie'), ('2013', 'Zone Alpine Isère'), ('2014', 'Zone Alpine Savoie'), ('2015', 'Zone Alpine Haute-Savoie'), ('2016', 'Zone Alpine Ain'), ('2017', 'Haute-Loire'), ('2018', 'Puy-de-Dôme'), ('2019', 'Cantal'), ('2020', 'Allier')]
    op.bulk_insert(table,
        [{"code": v[0], "nom": v[1]} for v in data]
    )
    connection = op.get_bind()
    connection.execute(sa.text("""
    UPDATE indice_schema.bassin_d_air b
    SET zone_id = (SELECT id FROM indice_schema.zone WHERE type='bassin_dair' AND code=b.code)
    """))


def downgrade():
    op.drop_table('bassin_d_air', schema='indice_schema')
