import os
from functools import wraps

from flask import abort, current_app, request, session


def webhook_capability_url(callback):
    @wraps(callback)
    def wrapper(*args, **kwargs):
        env_key = 'CAPABILITY_WEBHOOK_TOKEN'
        if (capability_token := os.getenv(env_key)) is None:
            current_app.logger.error(
                f"La variable d'environnement {env_key} n'existe pas")
            abort(500)
        secret_slug = session.get('secret_slug') or kwargs.get('secret_slug')
        if secret_slug != capability_token:
            current_app.logger.error(
                f"L'url \"{request.url}\" a été accédée avec un mauvais token")
            abort(401)
        return callback(*args, **kwargs)
    return wrapper
