#!/usr/bin/env python
import sys
import os
from datetime import datetime

# Add the libs directory to the Python path so we can import indice_pollution
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'libs'))

# Import the save_indicator function directly from the module where it's defined
from indice_pollution.indice_pollution import save_indicator

def test_save_indicator():
    """
    Test the save_indicator function with a specific indicator.
    
    Example usage:
    python test_save_indicator.py indice_pollution.history.models.indice_uv IndiceUv paris
    """
    if len(sys.argv) < 4:
        print("Usage: python test_save_indicator.py <module_name> <class_name> <indicator_name>")
        print("Example: python test_save_indicator.py indice_pollution.history.models.indice_uv IndiceUv paris")
        return
    
    module_name = sys.argv[1]
    class_name = sys.argv[2]
    indicator_name = sys.argv[3]
    scheduled_datetime = datetime.now().isoformat()
    
    print(f"Testing save_indicator with:")
    print(f"  module_name: {module_name}")
    print(f"  class_name: {class_name}")
    print(f"  indicator_name: {indicator_name}")
    print(f"  scheduled_datetime: {scheduled_datetime}")
    
    # Call the save_indicator function directly (not as a Celery task)
    result = save_indicator(module_name, class_name, indicator_name, scheduled_datetime)
    
    print(f"Result: {result}")

if __name__ == "__main__":
    test_save_indicator()
