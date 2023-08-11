import os
from datetime import datetime, timedelta
from uuid import uuid4

import sib_api_v3_sdk
from flask import current_app
from sib_api_v3_sdk.api.lists_api import ListsApi
from sib_api_v3_sdk.rest import ApiException

from ecosante.extensions import celery, db, sib
from ecosante.inscription.models import Inscription
from ecosante.newsletter.models import Newsletter, NewsletterDB
from ecosante.utils.cache import cache_lock, cache_unlock
from ecosante.utils.healthchecksio import ping
from ecosante.utils.send_log_mail import send_log_mail


# how to send the daily newsletter ?
# 1. start the task in `import_send_and_report` - if the task is still ongoing, it will do nothing
# 2. get all the contacts from sendinblue in `get_all_contacts`
# 3. deactivate the contacts that are blacklisted in sendinblue in `deactivate_contacts`
# 4. delete lists of contacts created before yesterday in sendinblue in `delete_lists`
#       (don't try to understand now, it will make sens at the end of the explanation)
# 5. create the newsletters "templates" to send in `Newsletter.export` - by day, by location and by user's parameters
#       (if the indicators are not all ready, the news letter won't be created)
# 6. create the list of contacts to send the newsletters to in `get_mail_list_id`
# 7. every 1000 newsletter "template", save it in `NewsletterDB.__table__.insert`
# 8. update the contacts in sendinblue in `import_contacts_in_sb` with the new `mail_list_id`
# 9. create the campaign in sendinblue in `create_campaign` for each `mail_list_id` and `template_id` associated
#      (it seems that it's only one template_id and one mail_list_id
#        per task `import_send_and_report`... but not 100% sure)
# 10. send the campaign in sendinblue in `send_email_campaign_now`
# 11. repeat the process every hour, to see if t=some indicators are now ready
# 12. the last repetition will have `force_send=True` and `report=True`,
#         so that it's sent even if all the indicators are not ready



def get_all_contacts(limit=100):
    contacts_api = sib_api_v3_sdk.ContactsApi(sib)
    contacts = []
    offset = 0
    while True:
        try:
            result = contacts_api.get_contacts(limit=100, offset=offset)
        # Le SDK raise cette exception s’il n’y a pas de contacts,
        # par exemple si on a une 100aine pile,
        # on ne le catch pas deux lignes en dessous
        except ValueError:
            break
        contacts += result.contacts
        if len(result.contacts) < limit:
            break
        offset += limit
    return contacts


def get_blacklisted_contacts(contacts):
    return [c for c in contacts if c['emailBlacklisted']]


def deactivate_contacts(task, contacts):
    if task:
        task.update_state(
            state='STARTED',
            meta={
                "progress": 0,
                "details": "Prise en compte de la désincription des membres"
            }
        )
    for contact in get_blacklisted_contacts(contacts):
        db_contact = Inscription.active_query().filter(
            Inscription.mail == contact['email']).first()
        if not db_contact or not db_contact.is_active:
            continue
        db_contact.unsubscribe()


def delete_lists(task):
    if task:
        task.update_state(
            state='STARTED',
            meta={
                "progress": 0,
                "details": "Suppression des anciennes listes"
            }
        )
    list_ids_to_delete = get_lists_ids_to_delete()
    contacts_api = sib_api_v3_sdk.ContactsApi(sib)
    for i, list_id in enumerate(list_ids_to_delete, 1):
        contacts_api.delete_list(list_id)
        if task:
            task.update_state(
                state='STARTED',
                meta={
                    "progress": 0,
                    "details": f"Suppression des anciennes listes ({i}/{len(list_ids_to_delete)})"
                }
            )


def import_and_send(task, type_='quotidien', force_send=False):
    send_in_blue_contacts = get_all_contacts()
    deactivate_contacts(task, send_in_blue_contacts)
    delete_lists(task)
    result = import_(task, type_=type_, force_send=force_send,
                     send_in_blue_contacts=send_in_blue_contacts)
    result['progress'] = 100
    if current_app.config['ENV'] == 'production':
        db.session.commit()
    return result


def send(task, campaign_id, type_, test=False):
    if current_app.config['ENV'] == 'production' or test:
        current_app.logger.info(
            f"Envoi en cours de la campagne: {campaign_id}")
        send_email_api = sib_api_v3_sdk.EmailCampaignsApi(sib)
        try:
            send_email_api.send_email_campaign_now(campaign_id=campaign_id)
        except ApiException as exception:
            current_app.logger.error(
                "Impossible d’envoyer la campagne %s\n", exception)
            ping(make_nom_ping(type_), "fail")
            task.update_state(
                state='FAILURE',
                meta={
                    "progress": 100,
                    "details": f"Impossible d’envoyer la campagne {exception}\n",
                }
            )
            raise exception
        current_app.logger.info(f"Envoi terminé de la campagne: {campaign_id}")


def create_mail_list(now, test):
    lists_api = ListsApi(sib)
    liste = lists_api.create_list(
        sib_api_v3_sdk.CreateList(
            name=f'{now} - mail',
            folder_id=int(os.getenv('SIB_FOLDERID', "5")) if not test else int(
                os.getenv('SIB_FOLDERID', "1653"))
        )
    )
    current_app.logger.info(f"Création de la liste send in blue '{liste.id}'")
    return liste.id


def get_mail_list_id(newsletter, template_id_mail_list_id, now, test):
    template_sib_id = newsletter.newsletter_hebdo_template.sib_id if newsletter.newsletter_hebdo_template else None
    if not template_sib_id in template_id_mail_list_id:
        template_id_mail_list_id[template_sib_id] = create_mail_list(now, test)
    # basically, for the daily newsletter, template_id_mail_list_id is a dictionary with a unique key/value
    # we'll have
    # key: template_id == None
    # value: mail_list_id == 1234 (the id of the mail list in sendinblue)
    return template_id_mail_list_id[template_sib_id]


# pylint: disable-next=too-many-arguments
def import_(
        task,
        type_='quotidien',
        force_send=False,
        test=False,
        mail_list_id=None,
        newsletters=None,
        activate_webhook=True,
        filter_already_sent=True,
        send_in_blue_contacts=None):

    if send_in_blue_contacts is None:
        send_in_blue_contacts = []

    now = datetime.now()
    errors, template_id_mail_list_id = import_in_db(
        task, now, type_, force_send, test, mail_list_id, newsletters, filter_already_sent)
    import_contacts_in_sb_all(task, template_id_mail_list_id,
                              now, type_, test, activate_webhook, send_in_blue_contacts)

    return {
        "state": "STARTED",
        "progress": 100,
        "details": "Terminé",
        "errors": errors
    }


# pylint: disable-next=too-many-arguments
def import_in_db(
        task, now,
        type_='quotidien',
        force_send=False,
        test=False,
        mail_list_id=None,
        newsletters=None,
        filter_already_sent=True):

    errors = []
    template_id_mail_list_id = {}
    if mail_list_id:
        template_id_mail_list_id[None] = mail_list_id
    if task:
        task.update_state(
            state='STARTED',
            meta={
                "details": "Création de la liste"
            }
        )

    def row2dict(row):
        return {
            c.name: getattr(row, c.name) for c in row.__table__.columns if not c.name in ["id", "short_id"]
        }

    to_add = []
    # pylint: disable-next=line-too-long
    for newsletter in (newsletters or Newsletter.export(type_=type_, force_send=force_send, filter_already_sent=filter_already_sent)):
        nldb = NewsletterDB(newsletter, get_mail_list_id(
            newsletter, template_id_mail_list_id, now, test))
        errors.extend(newsletter.errors)
        if current_app.config['ENV'] == 'production':
            to_add.append(nldb)
            current_app.logger.info(
                # pylint: disable-next=line-too-long
                f"Création de l’objet NewsletterDB pour {nldb.inscription_id}, template: {nldb.newsletter_hebdo_template_id}, mail_list_id: {nldb.mail_list_id} ")
            if len(to_add) % 1000 == 0:
                db.engine.execute(NewsletterDB.__table__.insert(),
                                  list(map(row2dict, to_add)))
                to_add = []

    if current_app.config['ENV'] == 'production' or test:
        db.engine.execute(NewsletterDB.__table__.insert(),
                          list(map(row2dict, to_add)))
        current_app.logger.info(
            "Commit des newsletters dans la base de données")
    return errors, template_id_mail_list_id


def import_contacts_in_sb(task, mail_list_id, send_in_blue_contacts, type_):
    contact_api = sib_api_v3_sdk.ContactsApi(sib)
    window_size = 100  # or whatever limit you like
    window_idx = 0
    send_in_blue_mails = {c['email'] for c in send_in_blue_contacts}
    while True:
        start, stop = window_size*window_idx, window_size*(window_idx+1)
        attributes = [
            nl.attributes()
            for nl in NewsletterDB.query.filter_by(mail_list_id=mail_list_id).slice(start, stop).all()
            if nl.inscription.mail in send_in_blue_mails
        ]
        if attributes is None or len(attributes) == 0:
            break
        window_idx += 1
        update_batch_contacts = sib_api_v3_sdk.UpdateBatchContacts(
            [
                sib_api_v3_sdk.UpdateBatchContactsContacts(
                    email=a['EMAIL'],
                    list_ids=[mail_list_id],
                    attributes=a,
                    email_blacklisted=False,
                    sms_blacklisted=False
                )
                for a in attributes
            ]
        )
        current_app.logger.info("About to update contacts with params")
        try:
            contact_api.update_batch_contacts(update_batch_contacts)
            current_app.logger.info("contacts updated")
        except ApiException as exception:
            current_app.logger.error(
                "Exception when calling ContactsApi->import_contacts: %s\n", exception)
            ping(make_nom_ping(type_), "fail")
            task.update_state(
                state='FAILURE',
                meta={
                    "progress": 100,
                    "details": f"Exception when calling ContactsApi->import_contacts: {exception}\n",
                }
            )
            raise exception


# pylint: disable-next=too-many-arguments
def import_contacts_in_sb_all(
        task,
        template_id_mail_list_id,
        now,
        type_,
        test,
        activate_webhook,
        send_in_blue_contacts):

    _ = activate_webhook
    if current_app.config['ENV'] == 'production' or test:
        for template_id, mail_list_id in template_id_mail_list_id.items():
            # basically, for the daily newsletter, template_id_mail_list_id is a dictionary with a unique key/value
            # template_id == None
            # mail_list_id == 1234 (the id of the mail list in sendinblue)
            import_contacts_in_sb(task, mail_list_id,
                                  send_in_blue_contacts, type_)
            campaign_id = create_campaign(
                task, now, mail_list_id=mail_list_id, template_id=template_id, type_=type_)
            send(task, campaign_id, type_)


def check_campaign_already_sent(email_campaign_api, mail_list_id):
    api_response = email_campaign_api.get_email_campaigns(limit=20)
    return any(
        mail_list_id in c['recipients']['lists']
        for c in api_response.campaigns
        if 'recipients' in c and 'lists' in c['recipients'] and isinstance(c['recipients']['lists'], list)
    )


def create_campaign(task, now, mail_list_id, template_id=None, type_='quotidien', test=False):
    def get_tag(test, type_):
        if test:
            return "test_newsletter"
        if type_ == 'hebdomadaire':
            return "newsletter_hebdo"
        return "newsletter"

    if current_app.config['ENV'] == 'production' or test:
        template_id = template_id or int(
            os.getenv('SIB_EMAIL_TEMPLATE_ID', "526"))
        email_campaign_api = sib_api_v3_sdk.EmailCampaignsApi(sib)
        if check_campaign_already_sent(email_campaign_api, mail_list_id):
            current_app.logger.info(
                f"Campagne déjà envoyée pour la liste {mail_list_id}")
            return None
        transactional_api = sib_api_v3_sdk.TransactionalEmailsApi(sib)
        template = transactional_api.get_smtp_template(int(template_id))
        current_app.logger.info(
            # pylint: disable-next=line-too-long
            f"Appel à Send in blue pour l’envoi de la campagne avec la liste {mail_list_id}, now: {now}, template_id:{template_id}")
        try:
            campagne = email_campaign_api.create_email_campaign(
                sib_api_v3_sdk.CreateEmailCampaign(
                    sender=sib_api_v3_sdk.CreateEmailCampaignSender(
                        email=template.sender.email,
                        name=template.sender.name
                    ),
                    name=f'{now}',
                    template_id=template_id,
                    subject=template.subject,
                    reply_to="newsletter@recosante.beta.gouv.fr",
                    recipients=sib_api_v3_sdk.CreateEmailCampaignRecipients(
                        list_ids=[mail_list_id]
                    ),
                    # pylint: disable-next=line-too-long
                    header="Aujourd’hui, la qualité de l’air autour de chez vous est…" if type_ == 'quotidien' else "Découvrez les bons gestes de Recosanté",
                    tag=get_tag(test, type_)
                )
            )
        except ApiException as exception:
            task.update_state(
                state='FAILURE',
                meta={
                    "progress": 100,
                    "details": f"Erreur lors de la création de la campagne. {exception}",
                }
            )
            ping(make_nom_ping(type_), "fail")
            current_app.logger.error(
                f"Impossible de créer la campagne {exception}")
            raise exception
        email_campaign_id = campagne.id
    else:
        email_campaign_id = 0
    current_app.logger.info(
        f"Campagne créée {email_campaign_id} avec la liste {mail_list_id}, now: {now}, template_id:{template_id}")
    return email_campaign_id


def format_errors(errors):
    if not errors:
        return ''
    response = ''
    response_2 = ''
    regions = {}
    errors_types = {
        "no_air_quality": "Pas de qualité de l’air",
        "nothing_to_show": "Aucune donnée à montrer",
        "no_template_weekly_nl": "Pas de template pour la newsletter hebdomadaire"
    }
    for error in errors:
        if error['type'] == 'no_template_weekly_nl':
            # pylint: disable-next=line-too-long
            response += f"Pas de template de newsletter hebdomadaire pour {error['mail']} (Inscription[{error['inscription_id']})"
            continue
        # pylint: disable-next=line-too-long
        response += f"{errors_types.get(error['type'], error['type'])} pour la ville de {error['ville']} ({error['insee']}) région: '{error['region']}'\n"
        response_2 += f"{error['ville']}, {error['insee']}, {error['region']}\n"
        regions.setdefault(error['region'], 0)
        regions[error['region']] += 1
    response += '\n'
    for region, i in regions.items():
        response += f'La région {region} a eu {i} erreurs\n'
    response += '\n'
    response += response_2

    return response


def make_nom_ping(type_):
    return "envoi-email-quotidien" if type_ == "quotidien" else "envoi-email-hebdomadaire"


@celery.task(bind=True)
def import_send_and_report(self, type_='quotidien', force_send=False, report=False):
    nom_ping = make_nom_ping(type_)
    ping(nom_ping, "start")
    current_app.logger.info("Début !")
    lock_id = f"type={type_}"
    with cache_lock(lock_id, self.app.oid) as aquired:
        if not aquired:
            current_app.logger.error(
                f"Import et envoi déjà en cours (type: {type_})")
            ping(nom_ping, "fail")
            self.update_state(
                state='FAILURE',
                meta={
                    "progress": 100,
                    "details": "Fin en erreur, un autre envoi est déjà en cours.",
                }
            )
            return None
    new_task_id = str(uuid4())
    self.update_state(
        state='STARTED',
        meta={
            "progress": 0,
            "details": f"Lancement de la tache: '{new_task_id}'",
        }
    )
    result = import_and_send(self, type_=type_, force_send=force_send)
    if report:
        errors = format_errors(result['errors'])
        body = """
Bonjour,
Il n’y a pas eu d’erreur lors de l’envoi de la newsletter
Bonne journée !
""" if not errors else f"""
Bonjour,
Il y a eu des erreurs lors de l’envoi de la newsletter :
{errors}

Bonne journée
    """
        send_log_mail("Rapport d’envoi de la newsletter", body,
                      name="Rapport recosante", email="rapport-envoi@recosante.beta.gouv.fr")
    self.update_state(
        state='SUCCESS',
        meta={
            "progress": 100,
            "details": "Fin",
        }
    )
    cache_unlock(lock_id)
    ping(nom_ping, "success")
    return result


def get_lists_ids_to_delete():
    api_instance = sib_api_v3_sdk.ContactsApi(sib)
    offset = 0
    api_response = api_instance.get_lists(limit=10, offset=offset)
    ids = []
    the_day_before_yesterday = datetime.today() - timedelta(days=2)
    while True:
        for liste in api_response.lists:
            try:
                date_time = datetime.fromisoformat(liste['name'][:26])
            except ValueError:
                # We don't have a datetime, we use min as a default one to be able to compare
                date_time = datetime.max
            if date_time <= the_day_before_yesterday:
                ids.append(liste['id'])
        if not api_response.lists:
            break
        offset += 10
        api_response = api_instance.get_lists(limit=10, offset=offset)
    return ids
