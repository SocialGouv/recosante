# Setting up Celery for Recosante

This document explains how to set up and run Celery workers for the Recosante project outside of Docker.

## Prerequisites

- Python 3.9+
- Redis server running (for message broker)
- PostgreSQL database (for result backend)

## Environment Setup

Make sure your `.env` file contains the necessary environment variables:

```
AUTHENTICATOR_SECRET=your_secret_key
ADMINS_LIST=your_email@example.com
CELERY_BROKER_URL=redis://localhost:6379
CELERY_RESULT_BACKEND=redis://localhost:6379
SQLALCHEMY_DATABASE_URI=postgresql://postgres:postgres@localhost:5432/recosante
```

## Running Celery Workers

### Main Application Worker

To run the main Celery worker for the ecosante application:

```bash
cd api
./start_celery.sh
```

or manually:

```bash
cd api
source .env
.venv/bin/celery -A ecosante.celery_worker.celery worker --loglevel=INFO
```

### Test Indices Worker

To run the Celery worker for test_indices:

```bash
cd api
./run_test_indices_worker.sh
```

or manually:

```bash
cd api
source .env
.venv/bin/celery -A test_indices worker --loglevel=INFO
```

## Testing Task Execution

### Testing Basic Task

To test basic task execution, run:

```bash
cd api
source .env
.venv/bin/python test_task.py
```

This will send a test task to the Celery worker and you should see the task execution in the worker's output.

### Testing save_indicator Function

To test the `save_indicator` function directly (not as a Celery task):

```bash
cd api
source .env
.venv/bin/python test_save_indicator.py <module_name> <class_name> <indicator_name>
```

Example:
```bash
.venv/bin/python test_save_indicator.py indice_pollution.history.models.indice_uv IndiceUv paris
```

### Testing save_indicator with IndiceUv

Since the IndiceUv class doesn't have a `get_indicators` method, you can use the `test_save_indicator_uv.py` script which is specifically designed to work with the IndiceUv class:

```bash
cd api
source .env
.venv/bin/python test_save_indicator_uv.py
```

This script uses the `save_all` method of the IndiceUv class instead of the `get_indicators` method.

### Testing save_all_indices Function

To test the `save_all_indices` function which dispatches multiple `save_indicator` tasks:

```bash
cd api
source .env
.venv/bin/python test_save_all_indices.py <module_name> <class_name>
```

Example:
```bash
.venv/bin/python test_save_all_indices.py indice_pollution.history.models.indice_uv IndiceUv
```

Note: This will only work with classes that have a `get_indicators` method. The IndiceUv class doesn't have this method, so you should use the `test_indice_uv_save_all.py` script instead.

### Testing IndiceUv.save_all Method Directly

If you encounter issues with Celery dependencies, you can use the `test_indice_uv_save_all.py` script which directly calls the `save_all` method of the IndiceUv class without using Celery:

```bash
cd api
source .env
.venv/bin/python test_indice_uv_save_all.py
```

This script is the simplest way to test the IndiceUv class's functionality without any Celery dependencies.

### Testing with get_indicator and get_indicators Methods

To properly test the Celery tasks with the IndiceUv class, you can use the new scripts that add the required methods to the class:

#### test_indices_uv.py

This script adds the `get_indicator` and `get_indicators` methods to the IndiceUv class and provides functions to test them directly:

```bash
cd api
source .env
.venv/bin/python test_indices_uv.py save_indicator save_all  # Test save_indicator with save_all method
.venv/bin/python test_indices_uv.py save_indicator paris      # Test save_indicator with a specific city
.venv/bin/python test_indices_uv.py save_all_indices         # Test save_all_indices
```

#### test_indices_uv_celery.py

This script uses the methods added by `test_indices_uv.py` to test the Celery tasks:

```bash
cd api
source .env
.venv/bin/python test_indices_uv_celery.py save_indicator save_all  # Test save_indicator Celery task with save_all method
.venv/bin/python test_indices_uv_celery.py save_indicator paris      # Test save_indicator Celery task with a specific city
.venv/bin/python test_indices_uv_celery.py save_all_indices         # Test save_all_indices Celery task
```

Available modules and classes:
- `indice_pollution.history.models.indice_uv IndiceUv` (use test_indices_uv.py or test_indices_uv_celery.py)
- `indice_pollution.history.models.indice_atmo IndiceATMO`
- `indice_pollution.history.models.vigilance_meteo VigilanceMeteo`
- `indice_pollution.history.models.raep RAEP`
- `indice_pollution.regions.Occitanie Forecast`
- `indice_pollution.regions.Occitanie Episode`

## Troubleshooting

1. **Command not found: celery** - Make sure you're using the virtual environment's Celery by using `.venv/bin/celery` instead of just `celery`.

2. **Connection errors** - Ensure Redis is running and accessible at the URL specified in your `.env` file.

3. **Authentication errors** - Check that your `.env` file is being properly loaded and contains the required environment variables.

4. **Database errors** - Verify that your PostgreSQL database is running and accessible with the credentials specified in your `.env` file.

5. **AttributeError: type object has no attribute 'get_indicators'** - This error occurs when trying to use the `save_all_indices` function with a class that doesn't have a `get_indicators` method. Use the `test_indices_uv.py` or `test_indices_uv_celery.py` script which adds this method to the class.

6. **ModuleNotFoundError: No module named 'celery'** - This error occurs when the celery module is not installed in your virtual environment. You can either install celery with `pip install celery` or use the `test_indice_uv_save_all.py` script which doesn't depend on celery.
