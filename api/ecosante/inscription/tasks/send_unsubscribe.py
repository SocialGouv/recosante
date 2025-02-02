import os

import sib_api_v3_sdk
from flask import current_app
from sib_api_v3_sdk.rest import ApiException

from ecosante.extensions import celery, sib
from ecosante.utils.send_log_mail import send_log_mail


@celery.task()
def call_sib_unsubscribe(mail):
    contact_api = sib_api_v3_sdk.ContactsApi(sib)
    try:
        response = contact_api.get_contact_info(mail)
        if not response.email_blacklisted:
            contact_api.update_contact(
                mail, sib_api_v3_sdk.UpdateContact(email_blacklisted=True)
            )
    except ApiException as exception:
        print(
            f"Exception when calling ContactsApi->update_contact: {exception}\n")


@celery.task()
def send_unsubscribe(mail, send_mail=True):
    if not send_mail:
        return
    send_log_mail(
        "Désinscription de la liste de diffusion",
        f"""
Bonjour,

L'utilisateur {mail} s'est désinscrit de la newsletter

Bonne journée !
""")
    unsubscribe_template_id = int(
        os.getenv('SIB_UNSUBSCRIBE_TEMPLATE_ID', "1594"))
    email_api = sib_api_v3_sdk.TransactionalEmailsApi(sib)
    try:
        email_api.send_transac_email(
            sib_api_v3_sdk.SendSmtpEmail(
                sender=sib_api_v3_sdk.SendSmtpEmailSender(
                    name="Recosanté",
                    email="hi@recosante.beta.gouv.fr"
                ),
                to=[sib_api_v3_sdk.SendSmtpEmailTo(email=mail)],
                reply_to=sib_api_v3_sdk.SendSmtpEmailReplyTo(
                    name="Recosanté",
                    email="hi@recosante.beta.gouv.fr"
                ),
                template_id=unsubscribe_template_id
            )
        )
    except ApiException as exception:
        current_app.logger.error(
            f"Error: {exception}"
        )


@celery.task()
def send_unsubscribe_error(mail):
    send_log_mail(
        "Erreur lors de la désinscription à la liste de diffusion",
        f"""
Bonjour,

L'utilisateur {mail} a tenté de se désinscrire mais nous n'avons pas trouvé son mail en base.
Il pourrait être opportun que l'équipe technique comprenne ce qui s'est passé

Bonne journée !
""")
