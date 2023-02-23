from celery import Celery
import logging


celery = Celery(__name__)
logger = logging.getLogger(__name__)