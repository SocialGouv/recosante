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
        crontab(minute='00', hour='18', day_of_week='*/1'),
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
        crontab(minute='15', hour='09', day_of_week='*/1'),
        send_webpush_notifications.s(force_send=True),
        queue='send_newsletter',
        routing_key='send_newsletter.send_webpush_notifications'
    )
