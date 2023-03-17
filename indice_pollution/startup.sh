#!/bin/sh
alembic upgrade head
celery -A indice_pollution.celery_worker.celery purge -Q save_indices --force
celery -A indice_pollution.celery_worker.celery worker --loglevel=INFO