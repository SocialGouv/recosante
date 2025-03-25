import os

# Print environment variables
print("AUTHENTICATOR_SECRET:", os.environ.get('AUTHENTICATOR_SECRET'))
print("ADMINS_LIST:", os.environ.get('ADMINS_LIST'))
print("CELERY_BROKER_URL:", os.environ.get('CELERY_BROKER_URL'))
print("CELERY_RESULT_BACKEND:", os.environ.get('CELERY_RESULT_BACKEND'))
print("SQLALCHEMY_DATABASE_URI:", os.environ.get('SQLALCHEMY_DATABASE_URI'))
