import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Recommandations - Recosanté',
  description: 'Recommandations pour protéger votre santé face aux impacts environnementaux',
};

export default function RecommandationsPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Recommandations</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Cette page présente les recommandations pour vous aider à protéger votre santé face aux différents impacts environnementaux.
          </p>

          <h2>Indicateurs disponibles</h2>
          <p>
            Recosanté vous propose des recommandations personnalisées basées sur plusieurs indicateurs environnementaux :
          </p>

          <h3>Qualité de l'air</h3>
          <p>
            <strong>Indice ATMO</strong> : Mesure la qualité de l'air ambiant en fonction des concentrations de polluants (dioxyde de soufre, dioxyde d'azote, ozone, particules fines).
          </p>
          <p>
            <a href="/indice-atmo" className="text-blue-600 hover:text-blue-800 underline">En savoir plus sur l'indice ATMO</a>
          </p>

          <h3>Rayonnement ultraviolet</h3>
          <p>
            <strong>Indice UV</strong> : Évalue le niveau de risque d'exposition au soleil sur une échelle de 1 à 11+.
          </p>
          <p>
            <a href="/indice-uv" className="text-blue-600 hover:text-blue-800 underline">En savoir plus sur l'indice UV</a>
          </p>

          <h3>Allergènes polliniques</h3>
          <p>
            <strong>Risque d'exposition aux allergènes polliniques (RAEP)</strong> : Évalue le risque allergénique sur une échelle de 1 (risque faible) à 5 (risque élevé).
          </p>
          <p>
            <a href="/raep" className="text-blue-600 hover:text-blue-800 underline">En savoir plus sur le RAEP</a>
          </p>

          <h3>Vigilance météo</h3>
          <p>
            <strong>Vigilance météo</strong> : Informe sur les phénomènes météorologiques dangereux (vent violent, vagues-submersion, pluie-inondation, crues, orages, neige-verglas, avalanches, canicule, grand froid).
          </p>
          <p>
            <a href="/vigilance-meteo" className="text-blue-600 hover:text-blue-800 underline">En savoir plus sur la vigilance météo</a>
          </p>

          <h3>Qualité des eaux de baignade</h3>
          <p>
            <strong>Qualité des eaux de baignade</strong> : Évalue la qualité microbiologique des eaux de baignade en mer et en eau douce.
          </p>
          <p>
            <a href="/baignades" className="text-blue-600 hover:text-blue-800 underline">En savoir plus sur la qualité des eaux de baignade</a>
          </p>

          <h3>Potentiel radon</h3>
          <p>
            <strong>Potentiel radon</strong> : Évalue le niveau de risque relatif à l'échelle d'une commune concernant la présence de ce gaz radioactif naturel.
          </p>
          <p>
            <a href="/potentiel-radon" className="text-blue-600 hover:text-blue-800 underline">En savoir plus sur le potentiel radon</a>
          </p>

          <h2>Personnalisation des recommandations</h2>
          <p>
            Pour recevoir des recommandations personnalisées, vous pouvez :
          </p>
          <ul>
            <li>Vous inscrire à notre newsletter en indiquant vos activités et préférences</li>
            <li>Spécifier votre commune de résidence</li>
            <li>Indiquer si vous faites partie des populations vulnérables ou sensibles</li>
          </ul>

          <h2>Populations vulnérables et sensibles</h2>
          <p>
            <strong>Population vulnérable</strong> : Femmes enceintes, nourrissons et jeunes enfants, personnes de plus de 65 ans, personnes souffrant de pathologies cardiovasculaires, insuffisants cardiaques ou respiratoires, personnes asthmatiques.
          </p>
          <p>
            <strong>Population sensible</strong> : Personnes se reconnaissant comme sensibles lors des pics de pollution et/ou dont les symptômes apparaissent ou sont amplifiés lors des pics (personnes diabétiques, immunodéprimées, souffrant d'affections neurologiques ou à risque cardiaque, respiratoire, infectieux).
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant nos recommandations, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
