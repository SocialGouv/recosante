#!/bin/sh
# Load the environment variables from .env file
export $(grep -v '^#' .env | xargs)

.venv/bin/celery -A ecosante.celery_worker.celery worker --loglevel=INFO -E
