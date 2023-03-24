#!/bin/sh
celery -A indice_pollution.celery_worker.celery worker --loglevel=INFO