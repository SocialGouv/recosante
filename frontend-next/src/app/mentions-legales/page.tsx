import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Mentions Légales - Recosanté',
  description: 'Mentions légales de la plateforme Recosanté',
};

export default function MentionsLegalesPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Éditeur de la Plateforme</h2>
          <p>
            La Plateforme est éditée par la Fabrique des Ministères sociaux situé :
          </p>
          <p>
            Tour Mirabeau<br />
            39-43 Quai André Citroën<br />
            75015 PARIS<br />
            Tél : 01 40 56 60 00
          </p>

          <h2>Directeur de la publication</h2>
          <p>Anne JeanJean - Directrice du Numérique</p>

          <h2>Hébergement de la Plateforme</h2>
          <p>
            Ce site est hébergé par Microsoft Azure France (région France centre) :
          </p>
          <p>
            Microsoft France<br />
            37 Quai du Président Roosevelt<br />
            92130 ISSY-LES-MOULINEAUX
          </p>

          <h2>Accessibilité</h2>
          <p>
            Voir la <a href="/accessibilite" className="text-blue-600 hover:text-blue-800 underline">page accessibilité</a>
          </p>

          <h2>Signaler un dysfonctionnement</h2>
          <p>
            Si vous rencontrez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou une fonctionnalité du site, merci de nous en faire part à l'adresse : contact@recosanté.beta.gouv.fr.
          </p>
          <p>
            Si vous n'obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.
          </p>

          <h2>Sécurité</h2>
          <p>
            Le site est protégé par un certificat électronique, matérialisé pour la grande majorité des navigateurs par un cadenas. Cette protection participe à la confidentialité des échanges. En aucun cas les services associés à la plateforme ne seront à l'origine d'envoi de courriels pour demander la saisie d'informations personnelles.
          </p>
        </div>
      </div>
    </Layout>
  );
}
