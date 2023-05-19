import sib_api_v3_sdk
from flask import current_app
from sib_api_v3_sdk.rest import ApiException

from ecosante.extensions import sib


def send_log_mail(subject, text_content, name="Technique recosanté", email="technique@recosante.beta.gouv.fr"):
    if current_app.config['ENV'] != 'production':
        print(f"""
        Mail
        Subject: {subject}
        content:
        {text_content}
        """)
        return

    contact_dict = {
        "name": name,
        "email": email
    }
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib)
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        sender=sib_api_v3_sdk.SendSmtpEmailSender(**contact_dict),
        to=[sib_api_v3_sdk.SendSmtpEmailTo(**contact_dict)],
        reply_to=sib_api_v3_sdk.SendSmtpEmailReplyTo(**contact_dict),
        subject=subject,
        text_content=text_content
    )
    try:
        api_response = api_instance.send_transac_email(send_smtp_email)
        current_app.logger.debug(api_response)
    except ApiException as exception:
        current_app.logger.error(
            "Exception when calling TransactionalEmailsApi->send_transac_email: %s\n", exception)
