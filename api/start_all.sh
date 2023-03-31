#!/bin/sh
flask db upgrade
exec uwsgi --http 0.0.0.0:8080 --wsgi wsgi:app --enable-threads --master --processes 4 --attach-daemon './start_celery.sh' --attach-daemon './start_beat.sh'