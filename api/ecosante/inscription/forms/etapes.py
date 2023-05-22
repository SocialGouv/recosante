import requests
from wtforms import HiddenField, ValidationError, validators
from wtforms.fields import EmailField, SelectField

from ecosante.inscription.models import Inscription
from ecosante.utils.form import BaseForm, MultiCheckboxField


class FormPremiereEtape(BaseForm):
    class Meta:
        csrf = False
    mail = EmailField(
        'Adresse email',
        [validators.InputRequired(), validators.Email(check_deliverability=True)],
        # pylint: disable-next=line-too-long
        description='(attention, les mails Ecosanté peut se retrouver dans vos SPAM ou dans le dossier "Promotions" de votre boîte mail !)'
    )


class OptionalEmailValidator(validators.Email):
    def __call__(self, form, field):
        if not field.data:
            return None
        return super().__call__(form, field)


class FormDeuxiemeEtape(BaseForm):
    class Meta:
        csrf = False

    mail = EmailField(
        'Adresse email',
        [OptionalEmailValidator(check_deliverability=True)],
        # pylint: disable-next=line-too-long
        description='(attention, les mails Ecosanté peut se retrouver dans vos SPAM ou dans le dossier "Promotions" de votre boîte mail !)'
    )
    ville_insee = HiddenField('ville_insee')
    deplacement = MultiCheckboxField(
        choices=[('velo', ''), ('tec', ''), ('voiture', ''), ('aucun', '')])
    activites = MultiCheckboxField(
        choices=[('jardinage', ''), ('bricolage', ''),
                 ('menage', ''), ('sport', ''), ('aucun', '')]
    )
    animaux_domestiques = MultiCheckboxField(
        choices=[('chat', ''), ('chien', ''), ('aucun', '')])
    chauffage = MultiCheckboxField(
        choices=[('bois', ''), ('chaudiere', ''), ('appoint', ''), ('aucun', '')])
    connaissance_produit = MultiCheckboxField(
        choices=[
            ('medecin', ''),
            ('association', ''),
            ('reseaux_sociaux', ''),
            ('publicite', ''),
            ('ami', ''),
            ('autrement', '')
        ])
    population = MultiCheckboxField(
        choices=[('pathologie_respiratoire', ''), ('allergie_pollens', ''), ('aucun', '')])
    enfants = SelectField(choices=[
                          'oui', 'non', 'aucun', None], coerce=lambda v: None if v is None else str(v))
    recommandations = MultiCheckboxField(
        choices=[('quotidien', ''), ('hebdomadaire', '')])
    notifications = MultiCheckboxField(
        choices=[('quotidien', ''), ('aucun', '')])

    def validate_ville_insee(self, field):
        request = requests.get(
            f'https://geo.api.gouv.fr/communes/{field.data}', timeout=10)
        try:
            request.raise_for_status()
        except requests.HTTPError as exception:
            raise ValidationError("Unable to get ville") from exception

    def validate_mail(self, field):
        if field.data:
            inscription = Inscription.query.filter_by(mail=field.data).all()
            if inscription:
                raise ValidationError(
                    "A user is already registered with this mail")
