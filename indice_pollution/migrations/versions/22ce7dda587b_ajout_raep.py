"""Ajout RAEP

Revision ID: 22ce7dda587b
Revises: cf0a66204a5b
Create Date: 2021-10-21 16:12:19.339854

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '22ce7dda587b'
down_revision = 'cf0a66204a5b'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('raep',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('zone_id', sa.Integer(), nullable=False),
    sa.Column('validity', postgresql.DATERANGE(), nullable=False),
    sa.Column('cypres', sa.Integer(), nullable=True),
    sa.Column('noisetier', sa.Integer(), nullable=True),
    sa.Column('aulne', sa.Integer(), nullable=True),
    sa.Column('peuplier', sa.Integer(), nullable=True),
    sa.Column('saule', sa.Integer(), nullable=True),
    sa.Column('frene', sa.Integer(), nullable=True),
    sa.Column('charme', sa.Integer(), nullable=True),
    sa.Column('bouleau', sa.Integer(), nullable=True),
    sa.Column('platane', sa.Integer(), nullable=True),
    sa.Column('chene', sa.Integer(), nullable=True),
    sa.Column('olivier', sa.Integer(), nullable=True),
    sa.Column('tilleul', sa.Integer(), nullable=True),
    sa.Column('chataignier', sa.Integer(), nullable=True),
    sa.Column('rumex', sa.Integer(), nullable=True),
    sa.Column('graminees', sa.Integer(), nullable=True),
    sa.Column('plantain', sa.Integer(), nullable=True),
    sa.Column('urticacees', sa.Integer(), nullable=True),
    sa.Column('armoises', sa.Integer(), nullable=True),
    sa.Column('ambroisies', sa.Integer(), nullable=True),
    sa.Column('total', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], ),
    sa.PrimaryKeyConstraint('id'),
    schema='indice_schema'
    )
    op.create_index('raep_zone_validity_idx', 'raep', ['zone_id', 'validity'], unique=False, schema='indice_schema')

def downgrade():
    op.drop_index('raep_zone_validity_idx', table_name='raep', schema='indice_schema')
    op.drop_table('raep', schema='indice_schema')
