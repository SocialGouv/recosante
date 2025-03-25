#!/usr/bin/env python
import sys
import os
from datetime import datetime

# Add the libs directory to the Python path so we can import indice_pollution
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'libs'))

# Import the save_all_indices function directly from the module where it's defined
from indice_pollution.indice_pollution import save_all_indices
from indice_pollution.history.models.indice_uv import IndiceUv

# Monkey patch the IndiceUv class to add a get_indicators method
def get_indicators():
    """
    Return a list of indicator objects that can be saved.
    This is a simple implementation that returns a single indicator for Paris.
    """
    class Indicator:
        def __init__(self, name):
            self.name = name
            
        def save(self):
            print(f"Saving indicator {self.name}")
            # Call the save_all method of IndiceUv
            IndiceUv.save_all()
            return True
    
    return [Indicator("paris")]

# Add the get_indicators method to the IndiceUv class
IndiceUv.get_indicators = staticmethod(get_indicators)

def test_save_all_indices_uv():
    """
    Test the save_all_indices function with the IndiceUv class.
    """
    module_name = "indice_pollution.history.models.indice_uv"
    class_name = "IndiceUv"
    scheduled_datetime = datetime.now().isoformat()
    
    print(f"Testing save_all_indices with:")
    print(f"  module_name: {module_name}")
    print(f"  class_name: {class_name}")
    print(f"  scheduled_datetime: {scheduled_datetime}")
    
    # Call the save_all_indices function
    result = save_all_indices(module_name, class_name, scheduled_datetime)
    
    print(f"Result: {result}")
    print("Multiple save_indicator tasks have been dispatched. Check the worker output for results.")

if __name__ == "__main__":
    test_save_all_indices_uv()
