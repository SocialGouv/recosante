#!/bin/bash
pip install -e .
celery -A indice_pollution.celery_worker.celery call indice_pollution.save_all_indices 