from celery import Celery
import os

# Load environment variables
if os.path.exists('.env'):
    with open('.env') as f:
        for line in f:
            if line.strip() and not line.startswith('#'):
                key, value = line.strip().replace('export ', '').split('=', 1)
                os.environ[key] = value.strip("'").strip('"')

# Configure Celery
celery = Celery('test_indices')
celery.conf.broker_url = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379')
celery.conf.result_backend = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

# Define a simple task
@celery.task
def test_task():
    print("Test task executed successfully!")
    return "Task completed"

if __name__ == '__main__':
    celery.start()
