"""created_at and updated_at

Revision ID: e6bd21eb460d
Revises: 64254d2cc72b
Create Date: 2023-09-21 15:37:35.257001

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e6bd21eb460d'
down_revision = '64254d2cc72b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('epci', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('epci', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('episode_pollution', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('episode_pollution', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('indiceATMO', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('indiceATMO', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('indice_uv', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('indice_uv', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('potentiel_radon', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('potentiel_radon', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('raep', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('raep', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('vigilance_meteo', sa.Column('created_at', sa.DateTime(), nullable=True), schema='indice_schema')
    op.add_column('vigilance_meteo', sa.Column('updated_at', sa.DateTime(), nullable=True), schema='indice_schema')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('vigilance_meteo', 'updated_at', schema='indice_schema')
    op.drop_column('vigilance_meteo', 'created_at', schema='indice_schema')
    op.drop_column('raep', 'updated_at', schema='indice_schema')
    op.drop_column('raep', 'created_at', schema='indice_schema')
    op.drop_column('potentiel_radon', 'updated_at', schema='indice_schema')
    op.drop_column('potentiel_radon', 'created_at', schema='indice_schema')
    op.drop_column('indice_uv', 'updated_at', schema='indice_schema')
    op.drop_column('indice_uv', 'created_at', schema='indice_schema')
    op.drop_column('indiceATMO', 'updated_at', schema='indice_schema')
    op.drop_column('indiceATMO', 'created_at', schema='indice_schema')
    op.drop_column('episode_pollution', 'updated_at', schema='indice_schema')
    op.drop_column('episode_pollution', 'created_at', schema='indice_schema')
    op.drop_column('epci', 'updated_at', schema='indice_schema')
    op.drop_column('epci', 'created_at', schema='indice_schema')
    # ### end Alembic commands ###