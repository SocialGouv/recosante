#!/bin/sh
poetry install
dotenv -e .env /bin/sh -c '.venv/bin/alembic upgrade head'
dotenv -e .env /bin/sh -c '.venv/bin/uwsgi --http 0.0.0.0:8080 --wsgi wsgi:application --enable-threads --master --processes 1 --attach-daemon ".venv/bin/celery -A indice_pollution.celery_worker.celery worker --loglevel=INFO -E" --attach-daemon ".venv/bin/celery -A indice_pollution.celery_worker.celery beat --loglevel=INFO"'
