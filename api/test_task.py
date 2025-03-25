#!/usr/bin/env python
from test_indices import test_task

if __name__ == '__main__':
    print("Sending test task to Celery...")
    result = test_task.delay()
    print(f"Task sent with ID: {result.id}")
    print("Check the worker output to see the task execution.")
