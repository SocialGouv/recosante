#!/bin/bash
flask db upgrade
exec uwsgi