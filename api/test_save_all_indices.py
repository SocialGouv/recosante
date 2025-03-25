#!/usr/bin/env python
import sys
import os
import importlib
from datetime import datetime

# Add the libs directory to the Python path so we can import indice_pollution
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'libs'))

# Import the save_all_indices function directly from the module where it's defined
from indice_pollution import save_all_indices

def test_save_all_indices():
    """
    Test the save_all_indices function which dispatches multiple save_indicator tasks.
    
    Example usage:
    python test_save_all_indices.py indice_pollution.history.models.indice_uv IndiceUv
    """
    if len(sys.argv) < 3:
        print("Usage: python test_save_all_indices.py <module_name> <class_name>")
        print("Example: python test_save_all_indices.py indice_pollution.history.models.indice_uv IndiceUv")
        print("\nAvailable modules and classes:")
        print("  indice_pollution.history.models.indice_uv IndiceUv")
        print("  indice_pollution.history.models.indice_atmo IndiceATMO")
        print("  indice_pollution.history.models.vigilance_meteo VigilanceMeteo")
        print("  indice_pollution.history.models.raep RAEP")
        print("  indice_pollution.regions.Occitanie Forecast")
        print("  indice_pollution.regions.Occitanie Episode")
        return
    
    module_name = sys.argv[1]
    class_name = sys.argv[2]
    
    # Check if the class has a get_indicators method
    try:
        module = importlib.import_module(module_name)
        cls = getattr(module, class_name)
        if not hasattr(cls, 'get_indicators'):
            print(f"Error: The class {class_name} in module {module_name} does not have a get_indicators method.")
            print(f"Please use test_save_indicator_uv.py for IndiceUv class or another class that has a get_indicators method.")
            return
    except (ImportError, AttributeError) as e:
        print(f"Error: Could not import {class_name} from {module_name}: {e}")
        return
    
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
    test_save_all_indices()
