import unittest
import os
import requests

class TestGetCommuneSitesIntegration(unittest.TestCase):
    def test_get_commune_sites_integration(self):
        # Définir l'URL de l'environnement
        os.environ['BAIGNADES_COMMUNE_SITES_URL'] = "https://baignades.sante.gouv.fr/baignades/siteList.do?idCarte={0}&insee_com={1}&code_dept={2}&f=json"
        
        # https://baignades.sante.gouv.fr/baignades/siteList.do?idCarte={0}&insee_com={1}&code_dept={2}&f=json

        # https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=013&site=013000808&annee=2023&plv=all

        # Appeler la fonction avec des paramètres de test
        id_carte = 'fra'
        insee_com = '64122'
        code_dept = '64'
        url = os.environ['BAIGNADES_COMMUNE_SITES_URL'].format(id_carte, insee_com, code_dept)

        print(url)
        
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            sites = response.json().get('sites', [])

            print(sites)
            
            # Vérifier que la réponse contient des sites
            self.assertIsInstance(sites, list)
            self.assertGreater(len(sites), 0, "Aucun site de baignade trouvé, vérifier la source de données.")
        
        except requests.exceptions.RequestException as e:
            self.fail(f"Erreur lors de la requête à l'API: {e}")

if __name__ == '__main__':
    unittest.main()