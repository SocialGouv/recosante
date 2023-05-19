import os

import sentry_sdk
from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.redis import RedisIntegration

from . import create_app

if os.getenv('SENTRY_DSN'):
    sentry_sdk.init(
        dsn=os.getenv('SENTRY_DSN'),
        integrations=[CeleryIntegration(), RedisIntegration()],
        traces_sample_rate=1.0,
        environment=os.getenv('ENVIRONMENT'),
        attach_stacktrace=True,
    )
app = create_app()

# pylint: disable-next=unused-import,wrong-import-position
from .extensions import celery  # noqa
