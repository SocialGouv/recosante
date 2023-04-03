#!/bin/sh
alembic upgrade head
exec uwsgi --http 0.0.0.0:8080 --wsgi wsgi:application --enable-threads --master --processes 1 --attach-daemon './start_celery.sh' --attach-daemon './start_beat.sh'