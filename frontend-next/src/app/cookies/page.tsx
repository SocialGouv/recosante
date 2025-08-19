import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Cookies et mesure d\'audience - Recosanté',
  description: 'Gestion des cookies et mesure d\'audience sur Recosanté',
};

export default function CookiesPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cookies et mesure d'audience</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Cookies</h2>
          <p>
            Ce site dépose un petit fichier texte (un « cookie ») sur votre ordinateur lorsque vous le consultez. Cela nous permet de mesurer le nombre de visites et de comprendre quelles sont les pages les plus consultées.
          </p>
          <p>
            Nous n'affichons pas de banière de consentement aux cookies car nos outils de suivi d'audience sont correctement configurés pour respecter la vie privée des utilisateurs. Certains cookies sont dispensés du recueil préalable de votre consentement dans la mesure où ils sont strictement nécessaires à la fourniture du service. Les traceurs ont vocation à être conservés sur le poste informatique de l'internaute pour une durée allant jusqu'à 13 mois.
          </p>

          <h2>Mesure d'audience</h2>
          <p>
            Certains cookies permettent d'établir des mesures statistiques de fréquentation et d'utilisation du site pouvant être utilisées à des fins de suivi et d'amélioration du service :
          </p>
          <ul>
            <li>Les données collectées ne sont pas recoupées avec d'autres traitements.</li>
            <li>Le cookie déposé sert uniquement à la production de statistiques anonymes.</li>
            <li>Le cookie ne permet pas de suivre la navigation de l'internaute sur d'autres sites.</li>
          </ul>
          <p>
            La mesure d'audience (nombre de visites, pages consultées) est réalisée via un outil libre intitulé <a href="https://matomo.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Matomo</a> spécifiquement paramétré, respectant les conditions d'exemption du consentement de l'internaute définies par la recommandation « Cookies » de la Commission nationale informatique et libertés (CNIL). Cela signifie que votre adresse IP, par exemple, est anonymisée avant d'être enregistrée. Il est donc impossible d'associer les visites sur ce site à une personne.
          </p>
          <p>
            Les statistiques d'usage sont disponibles en accès libre <a href="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreHome&action=index&date=yesterday&period=day&idSite=157&updated=1#?idSite=157&period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">ici</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
