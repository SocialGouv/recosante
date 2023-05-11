from sqlalchemy import Column, Integer, String

class TNCC:
    tncc = Column(Integer)
    nccenr = Column(String)
    tncc_codes= {
        0: {"article": " ",    "charniere": "de "},
        1: {"article": " ", 	  "charniere": "d'"},
        2: {"article": "le ",  "charniere": "du "},
        3: {"article": "la ",  "charniere": "de la "},
        4: {"article": "les ", "charniere": "des "},
        5: {"article": "l’",  "charniere": "de l’"},
        6: {"article": "aux ", "charniere": "des "},
        7: {"article": "las ", "charniere": "de las "},
        8: {"article": "los ", "charniere": "de los "}
    }

    @property
    def charniere(self):
        return self.tncc_codes[self.tncc]['charniere']

    @property
    def article(self):
        return self.tncc_codes[self.tncc]['article']

    @property
    def nom_charniere(self):
        return f"{self.charniere}{self.nccenr}"

    @property
    def nom_article(self):
        return f"{self.article}{self.nccenr}"