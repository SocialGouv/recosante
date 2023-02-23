from sqlalchemy import Column, Integer, String, select
from indice_pollution import db
from importlib import import_module
from functools import cached_property

class Zone(db.Base):
    __tablename__ = "zone"

    id = Column(Integer, primary_key=True)
    type = Column(String)
    code = Column(String)

    libtypes = {
        "region": {"article": "la ", "preposition": "région", "module": "region", "clsname": "Region"},
        "epci": {"article": "l’", "preposition": "EPCI" , "module": "epci", "clsname": "EPCI"},
        "departement": {"article": "le ", "preposition": "département", "module": "departement", "clsname": "Departement"},
        "bassin_dair": {"article": "le ", "preposition": "bassin d’air", "module": "bassin_dair", "clsname": "BassinDAir"},
        "commune": {"article": "la ", "preposition": "commune", "module": "commune", "clsname": "Commune"},
    }

    @classmethod
    def get(cls, code, type_):
        return Zone.query.filter_by(code=code, type=type_).first()

    @cached_property
    def lib(self, with_preposition=True, with_article=True, nom_charniere=True):
        t = self.libtypes.get(self.type)
        if not t:
            return ""
        o = self.attached_obj
        if not o:
            return ""
        r = ""
        if with_preposition:
            if with_article:
                r = t["article"]
            r += t["preposition"] + " "
        if nom_charniere and hasattr(o, 'nom_charniere'):
            return r + o.nom_charniere
        if hasattr(o, "preposition"):
            r += (o.preposition or "") + " "
        r += o.nom or ""
        return r

    @cached_property
    def attached_obj(self, with_preposition=True, with_article=True):
        t = self.libtypes.get(self.type)
        if not t:
            return None
        m = import_module(f"indice_pollution.history.models.{t['module']}")
        c = getattr(m, t["clsname"])
        stmt = select(c).where(c.zone_id == self.id)
        if r := db.session.execute(stmt).first():
            return r[0]