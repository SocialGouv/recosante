"""Ajout nom et site AASQA

Revision ID: b8a8b4c98b23
Revises: bf3b994e205e
Create Date: 2021-11-04 07:28:36.460734

"""
from importlib import import_module
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b8a8b4c98b23'
down_revision = 'bf3b994e205e'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('region', sa.Column('aasqa_website', sa.String(), nullable=True), schema='indice_schema')
    op.add_column('region', sa.Column('aasqa_nom', sa.String(), nullable=True), schema='indice_schema')
    regions = [
        'Auvergne-Rhône-Alpes',
        'Bourgogne-Franche-Comté',
        'Bretagne',
        'Centre-Val de Loire',
        'Corse',
        'Grand Est',
        'Guadeloupe',
        'Guyane',
        'Hauts-de-France',
        'Île-de-France',
        'La Réunion',
        'Martinique',
        'Mayotte',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Réunion",
        "Provence-Alpes-Côte d'Azur"
    ]
    for region in regions:
        module = import_module(f"indice_pollution.regions.{region}")
        op.get_bind().execute(
            sa.text(
                """
                UPDATE indice_schema.region
                SET aasqa_nom = :aasqa_nom, aasqa_website = :aasqa_website
                WHERE nom = :nom
                """
            ).bindparams(
                aasqa_nom=str(module.Service.nom_aasqa),
                aasqa_website=str(module.Service.website),
                nom=region
            )
        )


def downgrade():
    op.drop_column('region', 'aasqa_nom', schema='indice_schema')
    op.drop_column('region', 'aasqa_website', schema='indice_schema')
