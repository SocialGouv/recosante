import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Données à accès restreint - Recosanté',
  description: 'Informations sur les données à accès restreint',
};

export default function DonneesRestreintesPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Données à accès restreint</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            L'accès aux données de qualité des eaux de baignade est pour le moment restreint et ne nous permet pas de vous proposer cet indicateur sous forme d'abonnement.
          </p>

          <h2>Pourquoi cet accès restreint ?</h2>
          <p>
            Certaines données environnementales peuvent être soumises à des restrictions d'accès pour différentes raisons :
          </p>
          <ul>
            <li><strong>Confidentialité</strong> : Données sensibles ou protégées</li>
            <li><strong>Accords de partage</strong> : Contrats avec les fournisseurs de données</li>
            <li><strong>Qualité des données</strong> : Données en cours de validation</li>
            <li><strong>Ressources techniques</strong> : Capacités de traitement limitées</li>
          </ul>

          <h2>Données concernées</h2>
          <p>
            Actuellement, les données suivantes sont à accès restreint :
          </p>
          <ul>
            <li><strong>Qualité des eaux de baignade</strong> : Données microbiologiques détaillées</li>
            <li><strong>Données en temps réel</strong> : Certains indicateurs de pollution</li>
            <li><strong>Données historiques</strong> : Archives complètes de certains paramètres</li>
          </ul>

          <h2>Alternatives disponibles</h2>
          <p>
            Même si certaines données sont restreintes, nous vous proposons :
          </p>
          <ul>
            <li><strong>Indicateurs agrégés</strong> : Résumés et tendances</li>
            <li><strong>Recommandations générales</strong> : Conseils de prévention</li>
            <li><strong>Liens vers les sources</strong> : Accès direct aux données officielles</li>
            <li><strong>Alertes qualitatives</strong> : Notifications en cas de problème</li>
          </ul>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://baignades.sante.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site officiel des baignades
            </a>
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant l'accès aux données, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>

          <h2>Évolutions futures</h2>
          <p>
            Nous travaillons continuellement à étendre l'accès aux données environnementales. Les restrictions actuelles peuvent évoluer selon :
          </p>
          <ul>
            <li>L'évolution des accords de partage</li>
            <li>L'amélioration de nos capacités techniques</li>
            <li>La demande des utilisateurs</li>
            <li>Les priorités de santé publique</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
