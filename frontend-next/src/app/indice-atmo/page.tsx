import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Indice ATMO - Recosanté',
  description: 'Indice ATMO de la qualité de l\'air ambiant',
};

export default function IndiceAtmoPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Indice ATMO de la qualité de l'air</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            L'indice ATMO est un indicateur journalier de la qualité de l'air calculé à partir des concentrations dans l'air de polluants réglementés tels que le dioxyde de soufre (SO2), le dioxyde d'azote (NO2), l'ozone (O3) et les particules fines.
          </p>
          
          <p>
            Il qualifie la qualité de l'air sur une échelle de « bon à extrêmement mauvais » pour informer les citoyens. En cas de données insuffisantes, il affichera « indisponible » ; en cas d'incident engendrant des émissions atmosphériques spécifiques, il affichera « événement ».
          </p>

          <h2>Polluants mesurés</h2>
          <ul>
            <li><strong>Dioxyde de soufre (SO2)</strong> : Émis principalement par la combustion de combustibles fossiles</li>
            <li><strong>Dioxyde d'azote (NO2)</strong> : Issu des transports et de la combustion</li>
            <li><strong>Ozone (O3)</strong> : Polluant secondaire formé sous l'effet du soleil</li>
            <li><strong>Particules fines</strong> : PM10 et PM2.5, d'origine naturelle ou anthropique</li>
          </ul>

          <h2>Échelle de qualité</h2>
          <ul>
            <li><strong>Bon</strong> : Qualité de l'air satisfaisante</li>
            <li><strong>Moyen</strong> : Qualité de l'air acceptable</li>
            <li><strong>Dégradé</strong> : Qualité de l'air médiocre</li>
            <li><strong>Mauvais</strong> : Qualité de l'air mauvaise</li>
            <li><strong>Très mauvais</strong> : Qualité de l'air très mauvaise</li>
            <li><strong>Extrêmement mauvais</strong> : Qualité de l'air extrêmement mauvaise</li>
          </ul>

          <h2>Recommandations</h2>
          <p>
            En fonction de l'indice ATMO, des recommandations spécifiques sont proposées pour protéger votre santé, particulièrement pour les populations vulnérables et sensibles.
          </p>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://www.atmo-france.org/article/lindice-atmo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site d'Atmo France
            </a>
          </p>

          <h2>Consulter les recommandations associées</h2>
          <p>
            <a href="/recommandations?selected=indice_atmo" className="text-blue-600 hover:text-blue-800 underline">
              Voir les recommandations pour la qualité de l'air
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
