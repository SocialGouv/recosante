import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Risque d\'exposition aux allergènes polliniques - Recosanté',
  description: 'RAEP - Risque d\'exposition aux allergènes polliniques',
};

export default function RaepPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Risque d'exposition aux allergènes polliniques</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Le risque d'exposition aux allergènes polliniques (RAEP) est un indice qui permet de prévoir comment va évoluer le risque allergénique dans les jours à venir. Sa valeur varie de 1 (risque faible) à 5 (risque élevé).
          </p>

          <p>
            Il est calculé à partir des concentrations polliniques passées, d'informations phénologiques (observations des végétaux), des prévisions météorologiques et du réseau de médecins sentinelles qui coopèrent avec le RNSA.
          </p>

          <h2>Échelle de risque</h2>
          <ul>
            <li><strong>Niveau 1 : Risque faible</strong> - Pas de symptômes attendus</li>
            <li><strong>Niveau 2 : Risque faible à modéré</strong> - Symptômes légers possibles</li>
            <li><strong>Niveau 3 : Risque modéré</strong> - Symptômes modérés probables</li>
            <li><strong>Niveau 4 : Risque élevé</strong> - Symptômes marqués probables</li>
            <li><strong>Niveau 5 : Risque très élevé</strong> - Symptômes très marqués probables</li>
          </ul>

          <h2>Facteurs influençant le RAEP</h2>
          <ul>
            <li><strong>Concentrations polliniques passées</strong> : Mesures des pollens dans l'air</li>
            <li><strong>Informations phénologiques</strong> : Observations de la floraison des végétaux</li>
            <li><strong>Prévisions météorologiques</strong> : Vent, pluie, température</li>
            <li><strong>Réseau de médecins sentinelles</strong> : Retour d'expérience clinique</li>
          </ul>

          <h2>Principales familles de pollens</h2>
          <ul>
            <li><strong>Graminées</strong> : Herbes, céréales, gazon</li>
            <li><strong>Bétulacées</strong> : Bouleau, aulne, charme</li>
            <li><strong>Ombellifères</strong> : Carotte, céleri, persil</li>
            <li><strong>Urticacées</strong> : Ortie, pariétaire</li>
            <li><strong>Composées</strong> : Ambroisie, pissenlit, marguerite</li>
          </ul>

          <h2>Symptômes de l'allergie pollinique</h2>
          <ul>
            <li><strong>Rhinite allergique</strong> : Éternuements, écoulement nasal, obstruction nasale</li>
            <li><strong>Conjonctivite allergique</strong> : Démangeaisons, larmoiement, rougeur des yeux</li>
            <li><strong>Asthme</strong> : Toux, sifflements, difficultés respiratoires</li>
            <li><strong>Fatigue</strong> : Sensation de fatigue générale</li>
          </ul>

          <h2>Recommandations selon le niveau de risque</h2>
          
          <h3>Niveaux 1-2 (Risque faible à modéré)</h3>
          <ul>
            <li>Activités normales possibles</li>
            <li>Surveillance des symptômes</li>
            <li>Préparation des traitements si nécessaire</li>
          </ul>

          <h3>Niveaux 3-4 (Risque modéré à élevé)</h3>
          <ul>
            <li>Limiter les activités en extérieur</li>
            <li>Éviter les promenades en forêt</li>
            <li>Fermer les fenêtres en voiture</li>
            <li>Prendre les traitements prescrits</li>
          </ul>

          <h3>Niveau 5 (Risque très élevé)</h3>
          <ul>
            <li>Éviter les sorties non essentielles</li>
            <li>Rester à l'intérieur si possible</li>
            <li>Utiliser un purificateur d'air</li>
            <li>Consulter un médecin si symptômes sévères</li>
          </ul>

          <h2>Mesures préventives</h2>
          <ul>
            <li>Surveiller les bulletins polliniques</li>
            <li>Adapter ses activités selon le niveau de risque</li>
            <li>Prendre ses traitements préventifs</li>
            <li>Éviter de faire sécher le linge à l'extérieur</li>
            <li>Se rincer les cheveux après une sortie</li>
          </ul>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://www.pollens.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site du RNSA (Réseau National de Surveillance Aérobiologique)
            </a>
          </p>

          <h2>Consulter les recommandations associées</h2>
          <p>
            <a href="/recommandations?selected=pollens" className="text-blue-600 hover:text-blue-800 underline">
              Voir les recommandations pour les allergies polliniques
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
