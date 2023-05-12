"""Ajout pollinarium sentinelle

Revision ID: 86740594ef44
Revises: 51c45c33b356
Create Date: 2021-06-29 15:57:36.687557

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '86740594ef44'
down_revision = '51c45c33b356'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('commune', sa.Column('pollinarium_sentinelle', sa.Boolean(), nullable=True), schema='indice_schema')
    insees = ['44117',  '44074',  '44108',  '44114',  '44142',  '44016',  '85021',  '44143',  '44111',  '44214',  '44165',  '44178',  '44102',  '44089',  '44029',  '44158',  '44023',  '85262',  '85024',  '44109',  '44077',  '44113',  '49069',  '44194',  '44205',  '44043',  '44027',  '44083',  '44071',  '44174',  '44162',  '44127',  '44149',  '44037',  '44070',  '44156',  '44088',  '44188',  '44118',  '44066',  '44115',  '44172',  '44220',  '44020',  '44203',  '44001',  '44090',  '44096',  '44202',  '44179',  '44018',  '44215',  '44166',  '44221',  '44216',  '44021',  '44212',  '44201',  '44150',  '44157',  '44138',  '44079',  '44155',  '44015',  '44171',  '44141',  '44144',  '44217',  '44209',  '44062',  '44101',  '44024',  '44003',  '44002',  '44028',  '44164',  '44204',  '44073',  '44145',  '44159',  '44047',  '44186',  '44198',  '44009',  '44169',  '44224',  '44094',  '44064',  '44026',  '44133',  '44173',  '44119',  '44041',  '44056',  '44048',  '44082',  '44039',  '44120',  '44107',  '44207',  '44087',  '44110',  '44035',  '44190',  '44122',  '44130',  '44223',  '44084',  '44014',  '44032',  '44100']
    op.execute(sa.text("UPDATE indice_schema.commune SET pollinarium_sentinelle = true WHERE insee = ANY(:insees)").bindparams(insees=insees))


def downgrade():
    op.drop_column('commune', 'pollinarium_sentinelle', schema='indice_schema')
