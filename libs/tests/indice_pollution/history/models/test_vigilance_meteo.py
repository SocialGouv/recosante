import unittest
import celery as celery 
from datetime import datetime
from libs.indice_pollution.indice_pollution.history.models.vigilance_meteo import VigilanceMeteo, db

class TestVigilanceMeteoIntegration(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
     
        cls.session = db.Session()

    
        db.Base.metadata.create_all(cls.engine)

    @classmethod
    def tearDownClass(cls):
    
        db.Base.metadata.drop_all(cls.engine)
        cls.session.close()

    def test_save_all_integration(self):
     
        VigilanceMeteo.save_all()
        result = self.session.query(VigilanceMeteo).first()
        self.assertIsNotNone(result)
        self.assertIsInstance(result.date_export, datetime)

if __name__ == '__main__':
    unittest.main()