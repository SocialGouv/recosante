#!/bin/sh
flask db upgrade
exec uwsgi --http 0.0.0.0:8080 --wsgi wsgi:app --enable-threads --master --processes 10 --http-timeout 1800 --attach-daemon './start_celery.sh' --attach-daemon './start_beat.sh'