from functools import cached_property
from importlib import import_module

from sqlalchemy import Column, Integer, String, select

from indice_pollution import db


class Zone(db.Base):
    __tablename__ = "zone"

    id = Column(Integer, primary_key=True)
    type = Column(String)
    code = Column(String)

    libtypes = {
        "region": {
            "article": "la ",
            "preposition": "région",
            "module": "region",
            "clsname": "Region"
        },
        "epci": {
            "article": "l’",
            "preposition": "EPCI",
            "module": "epci",
            "clsname": "EPCI"
        },
        "departement": {
            "article": "le ",
            "preposition": "département",
            "module": "departement",
            "clsname": "Departement"
        },
        "bassin_dair": {
            "article": "le ",
            "preposition": "bassin d’air",
            "module": "bassin_dair",
            "clsname": "BassinDAir"
        },
        "commune": {
            "article": "la ",
            "preposition": "commune",
            "module": "commune",
            "clsname": "Commune"
        },
    }

    @classmethod
    def get(cls, code, type_):
        return Zone.query.filter_by(code=code, type=type_).first()

    @cached_property
    def lib(self, with_preposition=True, with_article=True, nom_charniere=True):
        self_type = self.libtypes.get(self.type)
        if not self_type:
            return ""
        self_obj = self.attached_obj
        if not self_obj:
            return ""
        fullname = ""
        if with_preposition:
            if with_article:
                fullname = self_type["article"]
            fullname += self_type["preposition"] + " "
        if nom_charniere and hasattr(self_obj, 'nom_charniere'):
            return fullname + self_obj.nom_charniere
        if hasattr(self_obj, "preposition"):
            fullname += (self_obj.preposition or "") + " "
        fullname += self_obj.nom or ""
        return fullname

    @cached_property
    def attached_obj(self, with_preposition=True, with_article=True):
        _ = (with_preposition, with_article)
        self_type = self.libtypes.get(self.type)
        if not self_type:
            return None
        self_module = import_module(
            f"indice_pollution.history.models.{self_type['module']}")
        command = getattr(self_module, self_type["clsname"])
        stmt = select(command).where(command.zone_id == self.id)
        if request := db.session.execute(stmt).first():
            return request[0]
        return None
