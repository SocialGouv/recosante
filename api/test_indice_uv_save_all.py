#!/usr/bin/env python
import sys
import os
from datetime import datetime

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'libs'))

from indice_pollution.history.models.indice_uv import IndiceUv

def test_indice_uv_save_all():
    """
    Test the save_all method of the IndiceUv class directly.
    
    Example usage:
    python test_indice_uv_save_all.py
    """
    print(f"Testing IndiceUv.save_all method at {datetime.now().isoformat()}")
    
    try:
        IndiceUv.save_all()
        print("IndiceUv.save_all() executed successfully")
    except Exception as e:
        print(f"Error executing IndiceUv.save_all(): {e}")

if __name__ == "__main__":
    test_indice_uv_save_all()
