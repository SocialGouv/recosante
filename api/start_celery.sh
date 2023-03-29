#!/bin/sh
celery -A ecosante.celery_worker.celery worker --loglevel=INFO