import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Vigilance météo - Recosanté',
  description: 'Vigilance météorologique et phénomènes dangereux',
};

export default function VigilanceMeteoPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Vigilance météo</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            La vigilance météo est conçue pour informer en cas de phénomènes météorologiques dangereux en métropole dans les prochaines 24 heures. Elle complète les prévisions météorologiques et vise à attirer l'attention de tous sur les dangers potentiels d'une situation météorologique et à faire connaître les précautions pour se protéger.
          </p>

          <h2>Phénomènes surveillés</h2>
          <p>La vigilance couvre 9 phénomènes :</p>
          <ul>
            <li><strong>Vent violent</strong> : Rafales supérieures à 100 km/h</li>
            <li><strong>Vagues-submersion</strong> : Vagues de plus de 3 mètres</li>
            <li><strong>Pluie-inondation</strong> : Précipitations importantes</li>
            <li><strong>Crues</strong> : Risque de débordement des cours d'eau</li>
            <li><strong>Orages</strong> : Activité électrique intense</li>
            <li><strong>Neige-verglas</strong> : Accumulation de neige et verglas</li>
            <li><strong>Avalanches</strong> : Risque d'avalanche en montagne</li>
            <li><strong>Canicule</strong> : Températures élevées sur plusieurs jours</li>
            <li><strong>Grand froid</strong> : Températures très basses</li>
          </ul>

          <h2>Niveaux de vigilance</h2>
          <p>Il existe 4 niveaux de risque, traduit par une couleur :</p>
          <ul>
            <li><strong>Vert</strong> : Pas de vigilance particulière</li>
            <li><strong>Jaune</strong> : Situation nécessitant une attention particulière</li>
            <li><strong>Orange</strong> : Situation dangereuse, soyez très vigilant</li>
            <li><strong>Rouge</strong> : Une vigilance absolue s'impose</li>
          </ul>

          <h2>Critères de choix</h2>
          <p>
            Pour déterminer ce niveau de risque, des critères de choix ont été définis pour chaque phénomène et pour chaque département. Ils tiennent compte de la sensibilité locale aux phénomènes météorologiques, en se basant sur les événements passés, les conséquences observées et le niveau d'acclimatation du département.
          </p>

          <p>
            Ainsi, quelques centimètres de neige peuvent suffire à perturber le trafic routier et le réseau de transports en commun à Marseille ou Paris, alors qu'ils n'ont que peu de conséquences dans les zones de montagne plus accoutumées.
          </p>

          <h2>Recommandations selon les phénomènes</h2>
          
          <h3>Vent violent</h3>
          <ul>
            <li>Éviter les promenades en forêt</li>
            <li>Ranger les objets susceptibles d'être emportés</li>
            <li>Limiter les déplacements</li>
          </ul>

          <h3>Canicule</h3>
          <ul>
            <li>Boire régulièrement de l'eau</li>
            <li>Éviter les efforts physiques</li>
            <li>Rester dans des endroits frais</li>
            <li>Surveiller les personnes âgées et les enfants</li>
          </ul>

          <h3>Grand froid</h3>
          <ul>
            <li>Se couvrir chaudement</li>
            <li>Éviter les efforts physiques intenses</li>
            <li>Surveiller les personnes âgées et les enfants</li>
            <li>Maintenir une température suffisante dans le logement</li>
          </ul>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://vigilance.meteofrance.fr/fr/guide-vigilance-meteo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le guide de vigilance météo de Météo-France
            </a>
          </p>

          <h2>Consulter les recommandations associées</h2>
          <p>
            <a href="/recommandations?selected=vigilance_meteo" className="text-blue-600 hover:text-blue-800 underline">
              Voir les recommandations pour la vigilance météo
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
