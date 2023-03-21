#!/bin/bash
flask db upgrade
exec uwsgi --socket 0.0.0.0:8080 --wsgi wsgi:app --enable-threads --master --processes 4