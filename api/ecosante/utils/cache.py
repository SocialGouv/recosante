import time
from contextlib import contextmanager

from ecosante.extensions import cache


@contextmanager
def cache_lock(lock_id, oid):
    lock_expire = 60 * 60
    timeout_at = time.monotonic() + lock_expire - 180
    status = cache.add(lock_id, oid, lock_expire)
    try:
        yield status
    finally:
        if time.monotonic() < timeout_at and status:
            cache.delete(lock_id)


def cache_unlock(lock_id):
    cache.delete(lock_id)
