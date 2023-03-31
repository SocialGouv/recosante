#!/bin/sh
celery beat -scheduler=redbeat.RedBeatScheduler --loglevel=INFO