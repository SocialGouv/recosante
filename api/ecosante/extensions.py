import sib_api_v3_sdk
from celery import Celery
from flask_assets import Environment
from flask_caching import Cache
from flask_cors import CORS
from flask_migrate import Migrate
from flask_rebar import Rebar
from flask_sqlalchemy import SQLAlchemy
from markdown import Markdown
from markdown_link_attr_modifier import LinkAttrModifierExtension

from ecosante.utils.authenticator import AdminAuthenticator, APIAuthenticator

db = SQLAlchemy()
migrate = Migrate()
celery = Celery(__name__)
assets_env = Environment()
sib = sib_api_v3_sdk.ApiClient()
cors = CORS()
rebar = Rebar()
markdown = Markdown(
    extensions=[LinkAttrModifierExtension(new_tab='on')]
)
cache = Cache()
authenticator = APIAuthenticator()
admin_authenticator = AdminAuthenticator()
