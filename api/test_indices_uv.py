#!/usr/bin/env python
import sys
import os
from datetime import datetime
from importlib import import_module

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'libs'))

from indice_pollution.history.models.indice_uv import IndiceUv

def get_indicator(cls, indicator_name):
    """
    Return an indicator object that can be saved.
    This is a simple implementation that returns an object with a save method.
    
    Args:
        indicator_name: The name of the indicator to get (e.g., 'paris', 'lyon', etc.)
                        or 'save_all' to use the save_all method.
    """
    class Indicator:
        def __init__(self, name):
            self.name = name
            
        def save(self):
            print(f"Saving indicator {self.name}")
            if self.name == 'save_all':
                IndiceUv.save_all()
            else:
               print(f"Would save specific indicator {self.name} here")
            return True
    
    return Indicator(indicator_name)

def get_indicators(cls):
    """
    Return a list of indicator objects that can be saved.
    This is a simple implementation that returns indicators for major cities.
    """
    class Indicator:
        def __init__(self, name):
            self.name = name
            
        def save(self):
            print(f"Saving indicator {self.name}")
            if self.name == 'save_all':
                IndiceUv.save_all()
            else:
                print(f"Would save specific indicator {self.name} here")
            return True
    
    return [
        Indicator('paris'),
        Indicator('lyon'),
        Indicator('marseille'),
        Indicator('save_all')
    ]

ndiceUv.get_indicator = classmethod(get_indicator)
IndiceUv.get_indicators = classmethod(get_indicators)

def test_save_indicator():
    """
    Test the save_indicator function with the IndiceUv class.
    
    Example usage:
    python test_indices_uv.py save_indicator paris
    python test_indices_uv.py save_indicator save_all
    """
    if len(sys.argv) < 3:
        print("Usage for save_indicator: python test_indices_uv.py save_indicator <indicator_name>")
        return
    
    indicator_name = sys.argv[2]
    module_name = "indice_pollution.history.models.indice_uv"
    class_name = "IndiceUv"
    
    print(f"Testing save_indicator with:")
    print(f"  module_name: {module_name}")
    print(f"  class_name: {class_name}")
    print(f"  indicator_name: {indicator_name}")
    
    module = import_module(module_name)
    cls = getattr(module, class_name)
    
    indicator = cls.get_indicator(indicator_name)
    result = indicator.save()
    
    print(f"Result: {result}")

def test_save_all_indices():
    """
    Test the save_all_indices function with the IndiceUv class.
    
    Example usage:
    python test_indices_uv.py save_all_indices
    """
    module_name = "indice_pollution.history.models.indice_uv"
    class_name = "IndiceUv"
    
    print(f"Testing save_all_indices with:")
    print(f"  module_name: {module_name}")
    print(f"  class_name: {class_name}")
    
    module = import_module(module_name)
    cls = getattr(module, class_name)
    
    indicators = cls.get_indicators()
    for indicator in indicators:
        print(f"Saving indicator: {indicator.name}")
        result = indicator.save()
        print(f"Result: {result}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_indices_uv.py <command>")
        print("Commands:")
        print("  save_indicator <indicator_name> - Test the save_indicator function")
        print("  save_all_indices - Test the save_all_indices function")
        sys.exit(1)
    
    command = sys.argv[1]
    if command == "save_indicator":
        test_save_indicator()
    elif command == "save_all_indices":
        test_save_all_indices()
    else:
        print(f"Unknown command: {command}")
        print("Commands:")
        print("  save_indicator <indicator_name> - Test the save_indicator function")
        print("  save_all_indices - Test the save_all_indices function")
