"""Ajout preposition

Revision ID: 384e24f8d9e5
Revises: 1dfa7d515d28
Create Date: 2021-04-06 17:13:06.959464

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '384e24f8d9e5'
down_revision = '1dfa7d515d28'
branch_labels = None
depends_on = None

prepositions = {
    "Ain": "dans l’",
    "Aisne": "dans l’",
    "Allier": "dans l’",
    "Alpes-de-Haute-Provence": "dans les",
    "Hautes-Alpes": "dans les",
    "Alpes-Maritimes": "dans les",
    "Ardèche": "en",
    "Ardennes": "dans les",
    "Ariège": "en",
    "Aube": "dans l’",
    "Aude": "dans l’",
    "Aveyron": "en",
    "Bouches-du-Rhône": "dans les",
    "Calvados": "dans le",
    "Cantal": "dans le",
    "Charente": "en",
    "Charente-Maritime": "en",
    "Cher": "dans le",
    "Corrèze": "en",
    "Corse-du-Sud": "en",
    "Haute-Corse": "en",
    "Côte-d'Or": "en",
    "Côtes-d'Armor": "dans les",
    "Creuse": "dans la",
    "Dordogne": "en",
    "Doubs": "dans le",
    "Drôme": "dans la",
    "Eure": "dans l'",
    "Eure-et-Loir": "en",
    "Finistère": "dans le",
    "Gard": "dans le",
    "Haute-Garonne": "en",
    "Gers": "dans le",
    "Gironde": "en",
    "Hérault": "dans l'",
    "Ille-et-Vilaine": "en",
    "Indre": "dans l'",
    "Indre-et-Loire": "en",
    "Isère": "en",
    "Jura": "dans le",
    "Landes": "dans les",
    "Loir-et-Cher": "dans le",
    "Loire": "dans la",
    "Haute-Loire": "en",
    "Loire-Atlantique": "en",
    "Loiret": "dans le",
    "Lot": "dans le",
    "Lot-et-Garonne": "en",
    "Lozère": "en",
    "Maine-et-Loire": "dans le",
    "Manche": "dans la",
    "Marne": "dans la",
    "Haute-Marne": "en",
    "Mayenne": "en",
    "Meurthe-et-Moselle": "en",
    "Meuse": "dans la",
    "Morbihan": "dans le",
    "Moselle": "en",
    "Nièvre": "dans la",
    "Nord": "dans le",
    "Oise": "dans l’",
    "Orne": "dans l’",
    "Pas-de-Calais": "dans le",
    "Puy-de-Dôme": "dans le",
    "Pyrénées-Atlantiques": "dans les",
    "Hautes-Pyrénées": "dans les",
    "Pyrénées-Orientales": "dans les",
    "Bas-Rhin": "dans le",
    "Haut-Rhin": "dans le",
    "Rhône": "dans le",
    "Haute-Saône": "en",
    "Saône-et-Loire": "en",
    "Sarthe": "dans la",
    "Savoie": "en",
    "Haute-Savoie": "en",
    "Paris": "à",
    "Seine-Maritime": "en",
    "Seine-et-Marne": "en",
    "Yvelines": "dans les",
    "Deux-Sèvres": "dans les",
    "Somme": "dans la",
    "Tarn": "dans le",
    "Tarn-et-Garonne": "dans le",
    "Var": "dans le",
    "Vaucluse": "dans le",
    "Vendée": "en",
    "Vienne": "dans la",
    "Haute-Vienne": "en",
    "Vosges": "dans les",
    "Yonne": "dans l’",
    "Territoire de Belfort": "dans le",
    "Essonne": "en",
    "Hauts-de-Seine": "dans les",
    "Seine-Saint-Denis": "en",
    "Val-de-Marne": "dans le",
    "Val-d'Oise": "dans le",
    "Guadeloupe": "en",
    "Martinique": "en",
    "Guyane": "en",
    "La Réunion": "à",
    "Mayotte": "à",
}

def upgrade():
    op.add_column('departement', sa.Column('preposition', sa.String(), nullable=True), schema='indice_schema')

    for nom, prep in prepositions.items():
        op.execute(
            sa.text("UPDATE indice_schema.departement SET preposition=:prep WHERE nom=:nom")\
                .bindparams(prep=prep, nom=nom)
        )

def downgrade():
    op.drop_column('departement', 'preposition', schema='indice_schema')
