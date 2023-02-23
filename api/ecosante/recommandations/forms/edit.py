from jinja2.nodes import Mul
from wtforms.fields import IntegerField, SelectField
from ecosante.utils.form import RadioField, BaseForm, OuiNonField, MultiCheckboxField, IntegerField, coerce_int
from wtforms import TextAreaField, HiddenField

class FormAdd(BaseForm):
    status = RadioField(
        "Statut",
        choices=[
            ('draft', 'Brouillon'),
            ('published', 'Publiée'),
            ('hidden', 'Non publiée')
        ]
    )
    recommandation = TextAreaField('Recommandation')
    precisions = TextAreaField('Précisions')
    type_ = RadioField(
        'Type',
        choices=[
            ("indice_atmo", "Indice ATMO"),
            ("episode_pollution", "Épisode de pollution"),
            ("pollens", "Pollens"),
            ("radon", "Radon"),
            ("vigilance_meteo", "Vigilance météo"),
            ("indice_uv", "Indice UV"),
            ("baignades", "Eaux de baignade")
        ]
    )
    saison = MultiCheckboxField("Montrer la recommandation que durant les saisons :",
        choices=[
            ('hiver', 'Hiver'),
            ('printemps', 'Printemps'),
            ('ete', 'Été'),
            ('automne', 'Automne'),
        ]
    )
    qa = MultiCheckboxField(
        "Montrer en cas d’indice ATMO :",
        choices=[('bonne', 'bon à moyen'), ('mauvaise', 'dégradé à extrêment mauvais'), ('evenement', 'Évévement')]
    )
    polluants = MultiCheckboxField(
        "Montrer en cas d’épisode de pollution :",
        description="seuil «information ou recommandation» ou «alerte»",
        choices=[
            ('ozone', 'à l’ozone'),
            ('dioxyde_azote', 'au dioxyde d’azote'),
            ('dioxyde_soufre', 'au dioxyde de soufre'),
            ('particules_fines', 'aux particules fines')
        ]
    )
    min_raep = SelectField(
        'Montrer pour un raep',
        choices=[(0, "de 0"), (1, "de 1 à 3"), (4, "4 à 6")],
        coerce=int
    )
    population = MultiCheckboxField(
        "Montrer aux populations suivantes :",
        choices=[
            ('enfants', 'Enfants (de moins de 6 ans)'),
            ('personnes_sensibles', 'personnes sensibles/vulnérables à la QA'),
            ('autres', 'Autres')
        ]
    )
    activites = MultiCheckboxField(
        "Montrer pour les activités suivantes :",
        choices=[
            ('menage', 'Ménage'),
            ('bricolage', 'Bricolage'),
            ('jardinage', 'Jardinage'),
            ('activite_physique', 'Activité physique')
        ]
    )
    deplacement = MultiCheckboxField(
        "Montrer pour les modes de déplacement suivants :",
        choices=[
            ("velo", "Vélo"),
            ("tec", "Transport en commun"),
            ("voiture", "Voiture")
        ]
    )
    chauffage = MultiCheckboxField(
        "Chauffage",
        choices=[
            ("bois", "Cheminée, insert ou poêle à bois"),
            ("chaudiere", "Chaudière au fioul, au gaz ou électrique"),
            ("appoint", "Chauffage mobile d’appoint au fioul"),
        ]
    )
    animal_de_compagnie = OuiNonField("Animal de compagnie")
    sources = TextAreaField("Sources")
    categorie = TextAreaField("Catégorie")
    ordre = IntegerField("Ordre", description="Si renseigné, une recommandation avec un ordre plus petit sera donnée à l’utilisateur avant celle d’un ordre plus grand. Si pour une journée deux recommandations avec le même ordre sont possibles, l’une ou l’autre sera donnée.")
    potentiel_radon = MultiCheckboxField(
        "Potentiel Radon associé",
        choices=[
            ("", "Aucun"),
            (1, "Catégorie 1"),
            (2, "Catégorie 2"),
            (3, "Catégorie 3")
        ],
        coerce=coerce_int
    )

    vigilance_couleur_ids = MultiCheckboxField(
        "Niveau de vigilance",
        choices=[
            (1, "Verte"),
            (2, "Jaune"),
            (3, "Orange"),
            (4, "Rouge")
        ],
        coerce=coerce_int
    )

    vigilance_phenomene_ids = MultiCheckboxField(
        "Phénomène",
        choices=[
            (1, "Vent"),
            (2, "Pluie-Inondantion"),
            (3, "Orages"),
            (4, "Crues"),
            (5, "Neige"),
            (6, "Canicule"),
            (7, "Grand Froid"),
            (8, "Avalanches"),
            (9, "Vagues-Submersion")
        ],
        coerce=coerce_int
    )

    min_indice_uv = SelectField(
        'Montrer pour un indice UV',
        choices=[(0, "de 0") ,(1, "de 1 à 2"),  (3, "de 3 à 5"), (6, "de 6 à 7"), (8, "de 8 à 10"), (11, "de 11 et plus")],
        coerce=int
    )

    def validate(self, extra_validators=[]):
        rv = super().validate(extra_validators=extra_validators)
        if not self.qa.data and not self.polluants.data and self.type_.data == "indice_atmo":# and not self.raep.data:
            rv = False
            self.qa.errors = ["Vous devez remplir soit une qualité de l’air, soit un pic de pollution, sinon la recommandation n’est jamais envoyée"]
        return rv


class FormEdit(FormAdd):
    id = HiddenField("id")
