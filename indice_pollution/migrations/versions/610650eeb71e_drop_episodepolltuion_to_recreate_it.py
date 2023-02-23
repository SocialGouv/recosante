"""drop episodepolltuion to recreate it

Revision ID: 610650eeb71e
Revises: 12c481be6cd3
Create Date: 2021-05-26 16:20:08.766594

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '610650eeb71e'
down_revision = '12c481be6cd3'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('episode_pollution', schema='indice_schema')

    op.create_table('episode_pollution',
        sa.Column('zone_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('date_ech', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('date_dif', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('code_pol', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('etat', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('com_court', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('com_long', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(['zone_id'], ['indice_schema.zone.id'], name='episode_pollution_zone_id_fkey'),
        sa.PrimaryKeyConstraint('zone_id', 'date_ech', 'date_dif', 'code_pol', name='episode_pollution_pkey'),
        schema='indice_schema'
    )


def downgrade():
    pass
