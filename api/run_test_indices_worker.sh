#!/bin/bash

source .env

.venv/bin/celery -A test_indices worker --loglevel=INFO
