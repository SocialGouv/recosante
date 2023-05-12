from sqlalchemy import MetaData
from sqlalchemy.orm import declarative_base

global engine, Session

metadata = MetaData(schema="indice_schema")

Base = declarative_base(metadata=metadata)

engine = None
session = None