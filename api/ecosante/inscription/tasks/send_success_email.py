import json
import os
from time import sleep

import sib_api_v3_sdk
from flask import current_app
from sib_api_v3_sdk.rest import ApiException

from ecosante.extensions import celery, db, sib
from ecosante.inscription.models import Inscription
from ecosante.newsletter.models import Newsletter, NewsletterDB


@celery.task()
def send_success_email(inscription_id, new_version=False):
    inscription = Inscription.query.get(inscription_id)
    if not inscription:
        current_app.logger.error(
            f"Unable to send success email to inscription[{inscription_id}] there's no such id"
        )
        return
    if not new_version:
        success_template_id = int(os.getenv('SIB_SUCCESS_TEMPLATE_ID', "108"))
    else:
        if inscription.recommandations_actives == ['oui']:
            success_template_id = int(
                os.getenv('SIB_SUCCESS_RECOMMANDATIONS_TEMPLATE_ID', "1453"))
        else:
            success_template_id = int(
                os.getenv('SIB_SUCCESS_INDICATEURS_TEMPLATE_ID', "1452"))
    if not success_template_id:
        current_app.logger.error(
            f"Unable to find template id to send a success email to {inscription.mail}"
        )
        return

    contact_api = sib_api_v3_sdk.ContactsApi(sib)

    try:
        response = contact_api.get_contact_info(inscription.mail)
        if response.email_blacklisted:
            contact_api.update_contact(
                inscription.mail, {'emailBlacklisted': False})
    except ApiException:
        try:
            contact_api.create_contact(
                sib_api_v3_sdk.CreateContact(email=inscription.mail)
            )
        except ApiException as exception2:
            if json.loads(exception2.body)['code'] != 'duplicate_parameter':
                current_app.logger.error(
                    f"Unable to create_contact: {exception2}"
                )
                raise exception2

    newsletter = NewsletterDB(Newsletter(inscription=inscription))
    sleep(0.5)
    try:
        contact_api.update_contact(
            newsletter.inscription.mail,
            sib_api_v3_sdk.UpdateContact(
                attributes=newsletter.attributes()
            )
        )
    except ApiException as exception:
        current_app.logger.error(
            f"Error: {exception}"
        )
        raise exception

    sleep(0.5)
    email_api = sib_api_v3_sdk.TransactionalEmailsApi(sib)
    try:
        email_api.send_transac_email(
            sib_api_v3_sdk.SendSmtpEmail(
                sender=sib_api_v3_sdk.SendSmtpEmailSender(
                    name="Recosanté",
                    email="hi@recosante.beta.gouv.fr"
                ),
                to=[sib_api_v3_sdk.SendSmtpEmailTo(
                    email=newsletter.inscription.mail)],
                reply_to=sib_api_v3_sdk.SendSmtpEmailReplyTo(
                    name="Recosanté",
                    email="hi@recosante.beta.gouv.fr"
                ),
                template_id=success_template_id
            )
        )
    except ApiException as exception1:
        current_app.logger.error(
            f"Error: {exception1}"
        )
        raise exception1
    db.session.add(newsletter)
    db.session.commit()
    current_app.logger.info(
        f"Mail de confirmation d'inscription envoyé à {newsletter.inscription.mail}"
    )
