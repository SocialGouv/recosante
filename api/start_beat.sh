#!/bin/sh
.venv/bin/celery -A ecosante.celery_worker.celery beat --loglevel=INFO