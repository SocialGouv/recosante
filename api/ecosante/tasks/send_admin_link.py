import sib_api_v3_sdk
from celery.utils.log import get_task_logger
from flask import current_app, url_for
from sib_api_v3_sdk.rest import ApiException

from ecosante.extensions import admin_authenticator, celery, sib

logger = get_task_logger(__name__)


@celery.task()
def send_admin_link(email):
    if email not in admin_authenticator.admin_emails:
        logger.error("%s not in admin list", email)
        return

    token = admin_authenticator.make_token(email)
    email_api = sib_api_v3_sdk.TransactionalEmailsApi(sib)

    # Use fake request context as otherwise SERVER_NAME is required to be set for a call to url_for
    # and using it results in 404 all over the place.
    with current_app.test_request_context('/', base_url=current_app.config['ROOT_URL']):
        authentication_link = url_for(
            "pages.authenticate", _external=True, token=token)
        logger.info("Admin link: %s", authentication_link)
        try:
            email_api.send_transac_email(
                sib_api_v3_sdk.SendSmtpEmail(
                    subject='Lien connexion recosanté',
                    sender=sib_api_v3_sdk.SendSmtpEmailSender(
                        name="Recosanté",
                        email="hi@recosante.beta.gouv.fr"
                    ),
                    to=[sib_api_v3_sdk.SendSmtpEmailTo(email=email)],
                    reply_to=sib_api_v3_sdk.SendSmtpEmailReplyTo(
                        name="Recosanté",
                        email="hi@recosante.beta.gouv.fr"
                    ),
                    html_content=f"""
                    Bonjour,
                    Voici votre <a href="{ authentication_link }">lien pour aller sur l’administration</a>
                    Bonne journée
                    """,
                    text_content=f"""
                    Bonjour,
                    Voici votre lien pour aller sur l’administration : { authentication_link }
                    Bonne journée
                    """
                )
            )
        except ApiException as exception:
            logger.error("Error: %s", exception)
            raise exception
        logger.info(
            "Mail d’authentication à l’administration envoyé à %s", email)
