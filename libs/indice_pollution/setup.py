from setuptools import setup
from time import time

def time_scheme(version):
        res = ".".join([
                str(version.tag),
                str(int(time()))
            ]
        )
        return res
if __name__ == '__main__':
    setup(
        use_scm_version = {
            "write_to": "indice_pollution/_version.py",
            "version_scheme": time_scheme,
            "local_scheme": "no-local-version"
        },
        include_package_data=True
    )
