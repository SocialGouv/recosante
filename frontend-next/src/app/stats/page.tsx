import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Statistiques - Recosanté',
  description: 'Statistiques d\'usage et de fréquentation de la plateforme Recosanté',
};

export default function StatsPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Statistiques</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Cette page présente les statistiques d'usage et de fréquentation de la plateforme Recosanté.
          </p>

          <h2>Mesure d'audience</h2>
          <p>
            La mesure d'audience de Recosanté est réalisée via l'outil libre <a href="https://matomo.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Matomo</a>, spécifiquement paramétré pour respecter les conditions d'exemption du consentement de l'internaute définies par la recommandation « Cookies » de la Commission nationale informatique et libertés (CNIL).
          </p>

          <h3>Données collectées</h3>
          <ul>
            <li>Nombre de visites</li>
            <li>Pages consultées</li>
            <li>Durée de visite</li>
            <li>Pays d'origine des visiteurs</li>
            <li>Type de navigateur et appareil</li>
          </ul>

          <h3>Respect de la vie privée</h3>
          <p>
            Les données collectées sont anonymisées et ne permettent pas d'identifier les utilisateurs individuellement. Votre adresse IP est anonymisée avant d'être enregistrée.
          </p>

          <h2>Accès aux statistiques</h2>
          <p>
            Les statistiques d'usage sont disponibles en accès libre sur notre instance Matomo :
          </p>
          <p>
            <a 
              href="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=157&updated=1#?idSite=157&period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Consulter les statistiques en temps réel
            </a>
          </p>

          <h2>Cookies de mesure d'audience</h2>
          <p>
            Les cookies utilisés pour la mesure d'audience sont dispensés du recueil préalable de votre consentement car ils sont strictement nécessaires à la fourniture du service et respectent les conditions d'exemption de la CNIL.
          </p>

          <h3>Durée de conservation</h3>
          <p>
            Les traceurs ont vocation à être conservés sur le poste informatique de l'internaute pour une durée allant jusqu'à 13 mois.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant nos statistiques ou notre politique de mesure d'audience, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>

          <h2>Plus d'informations</h2>
          <p>
            Pour plus de détails sur notre politique de gestion des cookies et de mesure d'audience, consultez notre <a href="/cookies" className="text-blue-600 hover:text-blue-800 underline">page dédiée aux cookies</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
