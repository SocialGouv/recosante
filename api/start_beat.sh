#!/bin/sh
celery -A ecosante.celery_worker.celery beat --loglevel=INFO