#!/bin/sh
alembic upgrade head
celery -A indice_pollution.celery_worker.celery purge -Q save_indices --force
exec uwsgi --http 0.0.0.0:8080 --wsgi wsgi:application --enable-threads --master --processes 1 --attach-daemon './start_celery.sh' 