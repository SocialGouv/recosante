from . import create_app
import sentry_sdk
from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.redis import RedisIntegration
import os

if os.getenv('SENTRY_DSN'):
    sentry_sdk.init(
        dsn=os.getenv('SENTRY_DSN'),
        integrations=[CeleryIntegration(), RedisIntegration()],
        traces_sample_rate=1.0,
        environment=os.getenv('ENVIRONMENT'),
        attach_stacktrace=True,
    )
app = create_app()

from .extensions import celery #noqa