#!/bin/sh
.venv/bin/celery -A indice_pollution.celery_worker.celery beat --loglevel=INFO