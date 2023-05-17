import logging

from celery import Celery

celery = Celery(__name__)
logger = logging.getLogger(__name__)
