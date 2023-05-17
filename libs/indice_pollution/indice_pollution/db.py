from sqlalchemy import MetaData
from sqlalchemy.orm import declarative_base

metadata = MetaData(schema="indice_schema")

Base = declarative_base(metadata=metadata)

# This module property should be set by configure_db see __init__.py
# pylint: disable-next=invalid-name
engine = None

# This module property should be set by configure_db see __init__.py
# pylint: disable-next=invalid-name
session = None
