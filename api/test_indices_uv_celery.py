#!/usr/bin/env python
import sys
import os
from datetime import datetime
from importlib import import_module

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'libs'))

from indice_pollution.history.models.indice_uv import IndiceUv
from test_indices_uv import get_indicator, get_indicators

if not hasattr(IndiceUv, 'get_indicator'):
    IndiceUv.get_indicator = classmethod(get_indicator)
if not hasattr(IndiceUv, 'get_indicators'):
    IndiceUv.get_indicators = classmethod(get_indicators)

from indice_pollution.indice_pollution import save_indicator, save_all_indices

def test_save_indicator_celery():
    """
    Test the save_indicator Celery task with the IndiceUv class.
    
    Example usage:
    python test_indices_uv_celery.py save_indicator paris
    python test_indices_uv_celery.py save_indicator save_all
    """
    if len(sys.argv) < 3:
        print("Usage for save_indicator: python test_indices_uv_celery.py save_indicator <indicator_name>")
        return
    
    indicator_name = sys.argv[2]
    module_name = "indice_pollution.history.models.indice_uv"
    class_name = "IndiceUv"
    scheduled_datetime = datetime.now().isoformat()
    
    print(f"Testing save_indicator Celery task with:")
    print(f"  module_name: {module_name}")
    print(f"  class_name: {class_name}")
    print(f"  indicator_name: {indicator_name}")
    print(f"  scheduled_datetime: {scheduled_datetime}")
    
   result = save_indicator(module_name, class_name, indicator_name, scheduled_datetime)
    
    print(f"Result: {result}")
    print("Check the Celery worker output for task execution details.")

def test_save_all_indices_celery():
    """
    Test the save_all_indices Celery task with the IndiceUv class.
    
    Example usage:
    python test_indices_uv_celery.py save_all_indices
    """
    module_name = "indice_pollution.history.models.indice_uv"
    class_name = "IndiceUv"
    scheduled_datetime = datetime.now().isoformat()
    
    print(f"Testing save_all_indices Celery task with:")
    print(f"  module_name: {module_name}")
    print(f"  class_name: {class_name}")
    print(f"  scheduled_datetime: {scheduled_datetime}")
    
    result = save_all_indices(module_name, class_name, scheduled_datetime)
    
    print(f"Result: {result}")
    print("Check the Celery worker output for task execution details.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_indices_uv_celery.py <command>")
        print("Commands:")
        print("  save_indicator <indicator_name> - Test the save_indicator Celery task")
        print("  save_all_indices - Test the save_all_indices Celery task")
        sys.exit(1)
    
    command = sys.argv[1]
    if command == "save_indicator":
        test_save_indicator_celery()
    elif command == "save_all_indices":
        test_save_all_indices_celery()
    else:
        print(f"Unknown command: {command}")
        print("Commands:")
        print("  save_indicator <indicator_name> - Test the save_indicator Celery task")
        print("  save_all_indices - Test the save_all_indices Celery task")
