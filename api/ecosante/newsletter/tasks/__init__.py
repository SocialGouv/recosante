from celery.schedules import crontab

from ecosante.extensions import celery
from ecosante.newsletter.tasks.import_in_sb import \
    import_send_and_report  # noqa
from ecosante.newsletter.tasks.send_webpush_notifications import \
    send_webpush_notifications  # noqa


@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    _ = kwargs
    if sender.conf.env != "production":
        return
    sender.add_periodic_task(
        crontab(minute='30', hour='06-10', day_of_week='*/1'),
        # this cron is sending the daily newsletter
        # the newsletter is sent only if all the indicators exists
        # it's repeated every hour to try again if an indicator was missing in the previous run
        # -> check import_send_and_report comments for the details of the process
        import_send_and_report.s(type_='quotidien'),
        queue='send_newsletter',
        routing_key='send_newsletter.import_send_and_report'
    )
    sender.add_periodic_task(
        crontab(minute='30', hour='11', day_of_week='*/1'),
        # this cron is the final call to send the daily newsletter
        # the newsletter is sent even if some indicators are missing
        import_send_and_report.s(
            type_='quotidien', force_send=True, report=True),
        queue='send_newsletter',
        routing_key='send_newsletter.import_send_and_report'
    )
    sender.add_periodic_task(
        crontab(minute='0', hour='11', day_of_week='4'),
        import_send_and_report.s(type_='hebdomadaire',
                                 force_send=True, report=True),
        queue='send_newsletter',
        routing_key='send_newsletter.import_send_and_report'
    )
    sender.add_periodic_task(
        crontab(minute='30', hour='06-13', day_of_week='*/1'),
        send_webpush_notifications.s(),
        queue='send_newsletter',
        routing_key='send_newsletter.send_webpush_notifications'
    )
    sender.add_periodic_task(
        crontab(minute='30', hour='14', day_of_week='*/1'),
        send_webpush_notifications.s(force_send=True),
        queue='send_newsletter',
        routing_key='send_newsletter.send_webpush_notifications'
    )
