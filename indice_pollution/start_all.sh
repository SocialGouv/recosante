#!/bin/sh
exec uwsgi --http 0.0.0.0:8080 --wsgi wsgi:application --uid app --plugins python3 --protocol uwsgi --enable-threads --attach-daemon './start_celery.sh' 