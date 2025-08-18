import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Potentiel Radon - Recosanté',
  description: 'Potentiel radon et risques pour la santé',
};

export default function PotentielRadonPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Potentiel Radon</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Le radon est un gaz radioactif naturel présent dans le sol et les roches. Il est produit par la désintégration du radium issu de la famille de l'uranium, présent partout dans les sols et plus fortement dans les sous-sols granitiques et volcaniques. Le radon est classé cancérigène certain pour le poumon par le Centre international de recherche sur le cancer depuis 1987.
          </p>

          <p>
            Le potentiel radon fournit un niveau de risque relatif à l'échelle d'une commune. Toutefois, il ne présage en rien des concentrations en radon présentes dans votre habitation : celles-ci dépendent de multiples autres facteurs (étanchéité de l'interface entre le bâtiment et le sol, taux de renouvellement de l'air intérieur, etc.).
          </p>

          <h2>Cartographie du potentiel radon</h2>
          <p>
            La cartographie du potentiel du radon à partir des formations géologiques est établie par l'Institut de radioprotection et de sûreté nucléaire (IRSN). Elle conduit à classer les communes en 3 catégories :
          </p>

          <h3>Catégorie 1</h3>
          <p>
            Ces communes sont localisées sur les formations géologiques présentant les teneurs en uranium les plus faibles. Sur ces formations, une grande majorité de bâtiments présente des concentrations en radon faibles.
          </p>

          <h3>Catégorie 2</h3>
          <p>
            Ces communes sont localisées sur des formations géologiques présentant des teneurs en uranium faibles mais sur lesquelles des facteurs géologiques particuliers peuvent faciliter le transfert du radon vers les bâtiments.
          </p>

          <h3>Catégorie 3</h3>
          <p>
            Ces communes sont celles qui, sur au moins une partie de leur superficie, présentent des formations géologiques dont les teneurs en uranium sont estimées plus élevées comparativement aux autres formations. La probabilité de présence de radon dans les bâtiments de ces communes est plus importante.
          </p>

          <h2>Facteurs influençant la concentration en radon</h2>
          <ul>
            <li><strong>Géologie locale</strong> : Teneur en uranium du sous-sol</li>
            <li><strong>Étanchéité du bâtiment</strong> : Interface entre le bâtiment et le sol</li>
            <li><strong>Ventilation</strong> : Taux de renouvellement de l'air intérieur</li>
            <li><strong>Pression atmosphérique</strong> : Différence de pression entre l'intérieur et l'extérieur</li>
            <li><strong>Saison</strong> : Plus élevé en hiver (fenêtres fermées)</li>
          </ul>

          <h2>Mesures de prévention</h2>
          <ul>
            <li><strong>Ventilation</strong> : Aérer régulièrement les pièces</li>
            <li><strong>Étanchéité</strong> : Colmater les fissures dans les murs et sols</li>
            <li><strong>Ventilation mécanique</strong> : Installer un système de ventilation</li>
            <li><strong>Mesures</strong> : Faire mesurer la concentration en radon</li>
          </ul>

          <h2>Seuils réglementaires</h2>
          <ul>
            <li><strong>Seuil de référence</strong> : 300 Bq/m³ (Becquerel par mètre cube)</li>
            <li><strong>Seuil d'alerte</strong> : 1000 Bq/m³</li>
            <li><strong>Action obligatoire</strong> : Au-delà de 1000 Bq/m³</li>
          </ul>

          <h2>Mesure du radon</h2>
          <p>
            La mesure du radon dans l'habitation peut être effectuée par des laboratoires agréés. Elle consiste généralement à placer des dosimètres dans les pièces principales pendant plusieurs mois.
          </p>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://www.irsn.fr/FR/connaissances/Environnement/expertises-radioactivite-naturelle/radon/Pages/5-cartographie-potentiel-radon-commune.aspx#.YZet_vnMK70" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site de l'IRSN
            </a>
          </p>

          <h2>Consulter les recommandations associées</h2>
          <p>
            <a href="/recommandations?selected=radon" className="text-blue-600 hover:text-blue-800 underline">
              Voir les recommandations pour le radon
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
