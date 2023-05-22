import csv

from flask import current_app

from .models import Recommandation, db


@current_app.cli.command('import-recommandations')
def import_recommandations():
    current_app.logger.info("Removing all recommandations")
    Recommandation.query.delete()
    current_app.logger.info("Reading recommandations file")
    with open('data/recommandations.csv', encoding="utf-8") as file:
        csv_reader = csv.DictReader(file)
        i = 0
        for line in csv_reader:
            # pylint: disable-next=unexpected-keyword-arg
            db.session.add(Recommandation(
                recommandation=line['Recommandation'],
                precisions=line['Précisions'],
                qa_mauvaise=line['QA mauvaise'],
                menage=line['Ménage'],
                bricolage=line['Bricolage'],
                chauffage_a_bois=line['Chauffage à bois'],
                jardinage=line['Jardinage'],
                balcon_terasse=line['Balcon/Terrasse'],
                velo_trott_skate=line['Vélo/trottinette/skateboard'],
                transport_en_commun=line['Transports en commun'],
                voiture=line['Voiture'],
                activite_physique=line['Activité physique'],
                allergies=line['Allergies'],
                enfants=line['Enfants'],
                personnes_sensibles=line['Personne sensibles'],
                sources=line['Sources'],
                categorie=line['Catégorie'],
            ))
            i += 1
    db.session.commit()
    current_app.logger.info(f"{i} recommandations were added")
