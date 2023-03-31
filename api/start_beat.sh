#!/bin/sh
celery -A ecosante.celery_worker.celery beat --scheduler=redbeat.RedBeatScheduler --loglevel=INFO