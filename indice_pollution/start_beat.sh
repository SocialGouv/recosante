#!/bin/sh
celery -A indice_pollution.celery_worker.celery beat --scheduler=redbeat.RedBeatScheduler --loglevel=INFO