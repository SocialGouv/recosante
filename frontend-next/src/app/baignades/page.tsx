import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Qualité des eaux de baignade - Recosanté',
  description: 'Qualité des eaux de baignade en mer et en eau douce',
};

export default function BaignadesPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Qualité des eaux de baignade</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Connaître la qualité de l'eau de baignade en eau de mer ou en eau douce est un moyen pour prévenir tout risque pour la santé des baigneurs.
          </p>

          <p>
            Dans l'évaluation de cette qualité, il convient de distinguer :
          </p>

          <h2>Qualité instantanée</h2>
          <p>
            Le résultat d'analyse du dernier prélèvement d'un échantillon d'eau qualifié de « bon », « moyen » ou « mauvais » en fonction de sa qualité microbiologique (Escherichia coli et entérocoques intestinaux).
          </p>

          <h2>Qualité au terme de la saison balnéaire</h2>
          <p>
            Le classement en catégorie « excellente », « bonne », « suffisante » ou « insuffisante » calculé de manière statistique à la fin de la saison balnéaire en prenant en compte les résultats obtenus sur les quatre dernières années.
          </p>

          <h2>Mesures de gestion</h2>
          <p>
            Des mesures de gestion telles que des interdictions de baignades temporaires ou permanentes peuvent être prises de manière à éviter que les baigneurs soient exposés à une pollution.
          </p>

          <h2>Paramètres analysés</h2>
          <ul>
            <li><strong>Escherichia coli</strong> : Bactérie indicatrice de contamination fécale</li>
            <li><strong>Entérocoques intestinaux</strong> : Bactéries résistantes dans l'environnement</li>
            <li><strong>Transparence</strong> : Visibilité dans l'eau</li>
            <li><strong>Présence d'algues</strong> : Prolifération d'algues visibles</li>
            <li><strong>Déchets flottants</strong> : Présence de déchets visibles</li>
          </ul>

          <h2>Fréquence des contrôles</h2>
          <p>
            Les contrôles sont effectués régulièrement pendant la saison balnéaire (généralement de juin à septembre) avec une fréquence minimale de :
          </p>
          <ul>
            <li>1 prélèvement par mois pour les sites à faible fréquentation</li>
            <li>1 prélèvement par quinzaine pour les sites à forte fréquentation</li>
          </ul>

          <h2>Recommandations en cas de mauvaise qualité</h2>
          <ul>
            <li>Éviter la baignade</li>
            <li>Ne pas avaler d'eau</li>
            <li>Se doucher après la baignade</li>
            <li>Surveiller les enfants</li>
            <li>Respecter les consignes des autorités locales</li>
          </ul>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://baignades.sante.gouv.fr/baignades/editorial/fr/controle/organisation.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site du ministère de la Santé
            </a>
          </p>

          <h2>Consulter les recommandations associées</h2>
          <p>
            <a href="/recommandations?selected=baignades" className="text-blue-600 hover:text-blue-800 underline">
              Voir les recommandations pour la baignade
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
