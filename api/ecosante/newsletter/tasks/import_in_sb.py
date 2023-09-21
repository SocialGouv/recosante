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



def get_all_contacts(limit=100):
    return []
    # contacts_api = sib_api_v3_sdk.ContactsApi(sib)
    # contacts = []
    # offset = 0
    # while True:
    #     try:
    #         result = contacts_api.get_contacts(limit=100, offset=offset)
    #     # Le SDK raise cette exception s’il n’y a pas de contacts,
    #     # par exemple si on a une 100aine pile,
    #     # on ne le catch pas deux lignes en dessous
    #     except ValueError:
    #         break
    #     contacts += result.contacts
    #     if len(result.contacts) < limit:
    #         break
    #     offset += limit
    # return contacts


def get_blacklisted_contacts(contacts):
    return [c for c in contacts if c['emailBlacklisted']]


def deactivate_contacts(contacts):
    for contact in get_blacklisted_contacts(contacts):
        db_contact = Inscription.active_query().filter(
            Inscription.mail == contact['email']).first()
        if not db_contact or not db_contact.is_active:
            continue
        db_contact.unsubscribe()




def import_and_send(type_='quotidien', force_send=False):
    send_in_blue_contacts = get_all_contacts()
    deactivate_contacts(send_in_blue_contacts)
    result = import_(type_=type_, force_send=force_send,
                     send_in_blue_contacts=send_in_blue_contacts)
    result['progress'] = 100
    # if current_app.config['ENV'] == 'production':
    db.session.commit()
    return result


def send(campaign_id, type_, test=False):
    # if current_app.config['ENV'] == 'production' or test:
    current_app.logger.info(
        f"Envoi en cours de la campagne: {campaign_id}")
    # send_email_api = sib_api_v3_sdk.EmailCampaignsApi(sib)
    # try:
    #     send_email_api.send_email_campaign_now(campaign_id=campaign_id)
    # except ApiException as exception:
    #     current_app.logger.error(
    #         "Impossible d’envoyer la campagne %s\n", exception)
    #     ping(make_nom_ping(type_), "fail")
    #     raise exception
    current_app.logger.info(f"Envoi terminé de la campagne: {campaign_id}")


def create_mail_list(now, test):
    # lists_api = ListsApi(sib)
    # liste = lists_api.create_list(
    #     sib_api_v3_sdk.CreateList(
    #         name=f'{now} - mail',
    #         folder_id=int(os.getenv('SIB_FOLDERID', "5")) if not test else int(
    #             os.getenv('SIB_FOLDERID', "1653"))
    #     )
    # )
    # current_app.logger.info(f"Création de la liste send in blue '{liste.id}'")
    # return liste.id
    return 71573 # read LISTE


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

    # today is 2023-09-21 but I want now to ALWAYS be is 2023-09-06
    now = datetime.fromisoformat("2021-09-06 10:00:00.000000")
    print(f"now: {now}")
    errors, template_id_mail_list_id = import_in_db(
        now, type_, force_send, test, mail_list_id, newsletters, filter_already_sent)
    import_contacts_in_sb_all(template_id_mail_list_id,
                              now, type_, test, activate_webhook, send_in_blue_contacts)

    return {
        "state": "STARTED",
        "progress": 100,
        "details": "Terminé",
        "errors": errors
    }


# pylint: disable-next=too-many-arguments
def import_in_db(
        now,
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
    def row2dict(row):
        return {
            c.name: getattr(row, c.name) for c in row.__table__.columns if not c.name in ["id", "short_id"]
        }

    to_add = []
    # pylint: disable-next=line-too-long
    for newsletter in (newsletters or Newsletter.export(type_=type_, force_send=force_send, filter_already_sent=filter_already_sent, date_=now)):
        nldb = NewsletterDB(newsletter, get_mail_list_id(
            newsletter, template_id_mail_list_id, now, test))

        errors.extend(newsletter.errors)
        # if current_app.config['ENV'] == 'production':
        to_add.append(nldb)
        print(nldb.inscription_id)
        if (nldb.inscription_id == 4226):
            current_app.logger.info(
                # pylint: disable-next=line-too-long
                f"Création de l’objet NewsletterDB pour {nldb.inscription_id}, template: {nldb.newsletter_hebdo_template_id}, mail_list_id: {nldb.mail_list_id} ")
        if len(to_add) % 1000 == 0:
            db.engine.execute(NewsletterDB.__table__.insert(),
                                list(map(row2dict, to_add)))
            to_add = []

    # if current_app.config['ENV'] == 'production' or test:
    db.engine.execute(NewsletterDB.__table__.insert(),
                        list(map(row2dict, to_add)))
    current_app.logger.info(
        "Commit des newsletters dans la base de données")
    return errors, template_id_mail_list_id


def import_contacts_in_sb(mail_list_id, send_in_blue_contacts, type_):
    # contact_api = sib_api_v3_sdk.ContactsApi(sib)
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
        # update_batch_contacts = sib_api_v3_sdk.UpdateBatchContacts(
        #     [
        #         sib_api_v3_sdk.UpdateBatchContactsContacts(
        #             email=a['EMAIL'],
        #             list_ids=[mail_list_id],
        #             attributes=a,
        #             email_blacklisted=False,
        #             sms_blacklisted=False
        #         )
        #         for a in attributes
        #     ]
        # )
        current_app.logger.info("About to update contacts with params")
        try:
            # contact_api.update_batch_contacts(update_batch_contacts)
            current_app.logger.info("contacts updated")
        except ApiException as exception:
            current_app.logger.error(
                "Exception when calling ContactsApi->import_contacts: %s\n", exception)
            ping(make_nom_ping(type_), "fail")
            raise exception


# pylint: disable-next=too-many-arguments
def import_contacts_in_sb_all(
        template_id_mail_list_id,
        now,
        type_,
        test,
        activate_webhook,
        send_in_blue_contacts):

    # _ = activate_webhook
    # if current_app.config['ENV'] == 'production' or test:
    for template_id, mail_list_id in template_id_mail_list_id.items():
        # basically, for the daily newsletter, template_id_mail_list_id is a dictionary with a unique key/value
        # template_id == None
        # mail_list_id == 1234 (the id of the mail list in sendinblue)
        import_contacts_in_sb(mail_list_id,
                                send_in_blue_contacts, type_)
        campaign_id = create_campaign(
            now, mail_list_id=mail_list_id, template_id=template_id, type_=type_)
        send(campaign_id, type_)


def check_campaign_already_sent(email_campaign_api, mail_list_id):
    api_response = email_campaign_api.get_email_campaigns(limit=20)
    return any(
        mail_list_id in c['recipients']['lists']
        for c in api_response.campaigns
        if 'recipients' in c and 'lists' in c['recipients'] and isinstance(c['recipients']['lists'], list)
    )


def create_campaign(now, mail_list_id, template_id=None, type_='quotidien', test=False):
    def get_tag(test, type_):
        if test:
            return "test_newsletter"
        if type_ == 'hebdomadaire':
            return "newsletter_hebdo"
        return "newsletter"

    template_id = template_id or int(
        os.getenv('SIB_EMAIL_TEMPLATE_ID', "526"))
    current_app.logger.info(
        # pylint: disable-next=line-too-long
        f"Appel à Send in blue pour l’envoi de la campagne avec la liste {mail_list_id}, now: {now}, template_id:{template_id}")
    # try:
    #     campagne = email_campaign_api.create_email_campaign(
    #         sib_api_v3_sdk.CreateEmailCampaign(
    #             sender=sib_api_v3_sdk.CreateEmailCampaignSender(
    #                 email=template.sender.email,
    #                 name=template.sender.name
    #             ),
    #             name=f'{now}',
    #             template_id=template_id,
    #             subject=template.subject,
    #             reply_to="newsletter@recosante.beta.gouv.fr",
    #             recipients=sib_api_v3_sdk.CreateEmailCampaignRecipients(
    #                 list_ids=[mail_list_id]
    #             ),
    #             # pylint: disable-next=line-too-long
    #             header="Aujourd’hui, la qualité de l’air autour de chez vous est…" if type_ == 'quotidien' else "Découvrez les bons gestes de Recosanté",
    #             tag=get_tag(test, type_)
    #         )
    #     )
    # except ApiException as exception:
    #     ping(make_nom_ping(type_), "fail")
    #     current_app.logger.error(
    #         f"Impossible de créer la campagne {exception}")
    #     raise exception
    # email_campaign_id = campagne.id
    email_campaign_id = 647 # read CAMPAGNE
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


def import_send_and_report(type_='quotidien', force_send=False, report=False):
    nom_ping = make_nom_ping(type_)
    ping(nom_ping, "start")
    current_app.logger.info("Début !")
    lock_id = f"type={type_}"
    result = import_and_send(type_=type_, force_send=force_send)
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
    cache_unlock(lock_id)
    ping(nom_ping, "success")
    return result


def get_lists_ids_to_delete():
    # api_instance = sib_api_v3_sdk.ContactsApi(sib)
    offset = 0
    # api_response = api_instance.get_lists(limit=10, offset=offset)
    ids = []
    the_day_before_yesterday = datetime.today() - timedelta(days=2)
    # while True:
    #     for liste in api_response.lists:
    #         try:
    #             date_time = datetime.fromisoformat(liste['name'][:26])
    #         except ValueError:
    #             # We don't have a datetime, we use min as a default one to be able to compare
    #             date_time = datetime.max
    #         if date_time <= the_day_before_yesterday:
    #             ids.append(liste['id'])
    #     if not api_response.lists:
    #         break
    #     offset += 10
    #     api_response = api_instance.get_lists(limit=10, offset=offset)
    return ids
