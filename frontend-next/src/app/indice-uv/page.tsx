import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Indice UV - Recosanté',
  description: 'Indice UV et risques d\'exposition au soleil',
};

export default function IndiceUvPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Indice UV</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Les ultraviolets naturels (UV) font partie des rayonnements émis par le soleil. Si une exposition occasionnelle présente un effet bénéfique (vitamine D), une exposition trop importante peut engendrer des risques immédiats (coups de soleil) ou de long terme (cancer de la peau).
          </p>

          <p>
            Pour communiquer sur le niveau de risque d'une exposition au soleil, l'Organisation mondiale de la météorologie et l'Organisation mondiale de la santé recommandent d'utiliser une échelle universelle appelée « Indice UV ».
          </p>

          <p>
            Cet indice chiffré (de 1 à 11+) reflète l'intensité du rayonnement ultraviolet et son impact sanitaire sur la peau. En général, l'information communiquée est la valeur maximale de l'indice sur la journée, atteinte dans une tranche de 2 à 4 heures autour du midi solaire. Plus l'indice UV est élevé, plus le risque de lésions cutanées et oculaires est important.
          </p>

          <h2>Échelle de risque</h2>
          <ul>
            <li><strong>1-2 : Faible</strong> - Protection solaire non nécessaire</li>
            <li><strong>3-5 : Modéré</strong> - Protection solaire recommandée</li>
            <li><strong>6-7 : Élevé</strong> - Protection solaire nécessaire</li>
            <li><strong>8-10 : Très élevé</strong> - Protection solaire impérative</li>
            <li><strong>11+ : Extrême</strong> - Protection solaire maximale</li>
          </ul>

          <h2>Facteurs influençant l'indice UV</h2>
          <ul>
            <li><strong>L'heure de la journée</strong> : Maximum entre 12h et 16h</li>
            <li><strong>La saison</strong> : Plus élevé en été</li>
            <li><strong>La latitude</strong> : Plus élevé près de l'équateur</li>
            <li><strong>L'altitude</strong> : Augmente avec l'altitude</li>
            <li><strong>La couverture nuageuse</strong> : Réduit partiellement l'exposition</li>
            <li><strong>La réverbération</strong> : Neige, sable, eau augmentent l'exposition</li>
          </ul>

          <h2>Protection recommandée</h2>
          <ul>
            <li>Port de vêtements couvrants</li>
            <li>Chapeau à large bord</li>
            <li>Lunettes de soleil avec protection UV</li>
            <li>Crème solaire avec indice de protection élevé (SPF 30+)</li>
            <li>Éviter l'exposition entre 12h et 16h</li>
            <li>Rechercher l'ombre</li>
          </ul>

          <h2>Populations à risque</h2>
          <p>
            Les enfants, les personnes à peau claire, les personnes ayant des antécédents familiaux de cancer de la peau et celles prenant certains médicaments photosensibilisants sont particulièrement vulnérables.
          </p>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://meteofrance.com/comprendre-la-meteo/atmosphere/les-ultraviolets" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site de Météo-France
            </a>
          </p>

          <h2>Consulter les recommandations associées</h2>
          <p>
            <a href="/recommandations?selected=indice_uv" className="text-blue-600 hover:text-blue-800 underline">
              Voir les recommandations pour l'exposition au soleil
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
