import json
from copy import deepcopy
from time import sleep

from flask import current_app
from pywebpush import WebPushException, webpush

from ecosante.extensions import celery, db
from ecosante.newsletter.models import Newsletter, NewsletterDB
from ecosante.utils.healthchecksio import ping

vapid_claims = {"sub": "mailto:contact@recosante.beta.gouv.fr"}


def send_webpush_notification(nldb: NewsletterDB, claims, retry=0):
    if retry >= 3:
        return None
    try:
        webpush(
            nldb.webpush_subscription_info.data,
            data=json.dumps(nldb.webpush_data),
            vapid_private_key=current_app.config['VAPID_PRIVATE_KEY'],
            vapid_claims=deepcopy(claims)
        )
        current_app.logger.info(
            f"Notification sent to {nldb.inscription.mail}")
        return nldb
    except WebPushException as ex:
        if ex.response and ex.response.status_code == 429:
            retry_after = ex.response.headers.get('retry-after')
            try:
                retry_after_int = int(retry_after)
                sleep(retry_after_int)
                return send_webpush_notification(nldb, claims, retry+1)
            except ValueError:
                current_app.logger.error(
                    f"Unable to retry after: {retry_after}")
                return None
        else:
            current_app.logger.warn(
                f"Error sending push notification to {nldb.inscription.mail}. Exception: {ex}")
            return None


@celery.task(bind=True)
def send_webpush_notifications(self, only_to=None, filter_already_sent=True, force_send=False):
    _ = self
    ping("envoi-webpush-quotidien", "start")
    newsletters = Newsletter.export(
        media='notifications_web',
        only_to=only_to,
        filter_already_sent=filter_already_sent,
        force_send=force_send
    )
    for newsletter in newsletters:
        nldb = NewsletterDB(newsletter)
        nldb = send_webpush_notification(
            nldb, vapid_claims)
        if nldb:
            db.session.add(nldb)
    db.session.commit()
    ping("envoi-webpush-quotidien", "success")
