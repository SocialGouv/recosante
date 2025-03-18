import unittest
from marshmallow import ValidationError
from api.ecosante.api.schemas.potentiel_radon import PotentielRadonSchema, FullPotentielRadonSchema

class TestPotentielRadonSchema(unittest.TestCase):
    def setUp(self):
        self.schema = PotentielRadonSchema()
        self.full_schema = FullPotentielRadonSchema()

    def test_potentiel_radon_schema_valid(self):
        data = {'classe_potentiel': 3}
        result = self.schema.load(data)
        self.assertEqual(result['classe_potentiel'], 3)

    def test_potentiel_radon_schema_invalid(self):
        data = {'classe_potentiel': 'invalid'}
        with self.assertRaises(ValidationError):
            self.schema.load(data)

    def test_full_potentiel_radon_schema_valid(self):
        data = {'indice': {'classe_potentiel': 2}}
        result = self.full_schema.load(data)
        self.assertEqual(result['indice']['classe_potentiel'], 2)

    def test_full_potentiel_radon_schema_invalid(self):
        data = {'indice': {'classe_potentiel': 'invalid'}}
        with self.assertRaises(ValidationError):
            self.full_schema.load(data)

if __name__ == '__main__':
    unittest.main() 