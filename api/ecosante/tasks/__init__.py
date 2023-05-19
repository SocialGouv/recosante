from celery.schedules import crontab
from flask import current_app

from ecosante.extensions import celery
from ecosante.tasks.import_from_production import import_from_production
from ecosante.tasks.inscriptions_patients import inscription_patients_task
from ecosante.tasks.send_admin_link import send_admin_link


@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    _ = kwargs
    if sender.conf.env != "staging":
        return
    sender.add_periodic_task(
        crontab(minute='00', hour='03', day_of_week='*/1'),
        import_from_production.s(),
        queue='staging'
    )
