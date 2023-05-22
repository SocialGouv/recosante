import functools
import os
from hmac import compare_digest
from time import time

from flask import abort, current_app, redirect, request, session, url_for
from flask_rebar import errors, messages
from flask_rebar.authenticators.base import Authenticator
from jose import jwt


class BaseAuthenticator:
    def __init__(self) -> None:
        self.secret = os.getenv('AUTHENTICATOR_SECRET')
        if self.secret is None:
            raise Exception("AUTHENTICATOR_SECRET var env is required")

    def decode_token(self, encoded_token):
        return jwt.decode(encoded_token, self.secret, options={"require_exp": True, "leeway": 0})

    def make_token(self, claims, time_=None):
        time_ = time_ or time() + \
            current_app.config['TEMP_AUTHENTICATOR_EXP_TIME']
        return jwt.encode(
            {
                **{'exp': time_},
                **claims
            },
            self.secret,
            'HS256'
        )


class APIAuthenticator(Authenticator, BaseAuthenticator):
    # pylint: disable-next=arguments-renamed
    def make_token(self, uid, time_=None):
        return super().make_token({"uid": uid}, time_)

    def authenticate(self):
        encoded_token = request.args.get('token')
        if not encoded_token:
            raise errors.Unauthorized(messages.required_field_missing('token'))
        view_uid = request.view_args.get('uid')
        if not view_uid:
            raise errors.Unauthorized(messages.required_field_missing('uid'))
        try:
            decoded_token = self.decode_token(encoded_token)
        except (jwt.ExpiredSignatureError, jwt.JWTClaimsError, jwt.JWTError) as exception:
            raise errors.Unauthorized(
                messages.invalid_auth_token) from exception

        if not compare_digest(view_uid, decoded_token.get('uid')):
            raise errors.Unauthorized(messages.invalid_auth_token)


class AdminAuthenticator(BaseAuthenticator):
    def __init__(self) -> None:
        super().__init__()
        self._set_admin_list()

    def _set_admin_list(self):
        if (admin_str := os.getenv('ADMINS_LIST')) is not None:
            self.admin_emails = [v for v in admin_str.split(' ') if v]
            if len(self.admin_emails) < 1:
                raise Exception("ADMINS_LIST can not be empty")
        else:
            raise Exception("ADMINS_LIST var env is required")

    # pylint: disable-next=arguments-renamed
    def make_token(self, email, time_=None):
        return super().make_token({"email": email}, time_)

    def authenticate(self):
        admin_email = session.get('admin_email')
        if admin_email is None:
            raise errors.Unauthorized(messages.missing_auth_token)
        if admin_email not in self.admin_emails:
            raise errors.Unauthorized(messages.invalid_auth_token)

    def route(self, callback):
        @functools.wraps(callback)
        def wrapper(*args, **kwargs):
            admin_email = session.get('admin_email')
            if admin_email is None:
                return redirect(url_for('pages.admin_login'))
            if admin_email not in self.admin_emails:
                abort(401)
            else:
                return callback(*args, **kwargs)
        return wrapper
