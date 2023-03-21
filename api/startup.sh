#!/bin/bash
flask db upgrade
exec uwsgi --http 0.0.0.0:8080 --wsgi wsgi:app --enable-threads --master --processes 4