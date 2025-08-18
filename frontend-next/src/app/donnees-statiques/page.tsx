import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Données statiques - Recosanté',
  description: 'Informations sur les données statiques de la plateforme',
};

export default function DonneesStatiquesPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Données statiques</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Le potentiel radon ne fluctue pas dans le temps. Le potentiel radon a été cartographié en 2010 par l'Institut de Radioprotection et de Sûreté Nucléaire.
          </p>

          <h2>Qu'est-ce qu'une donnée statique ?</h2>
          <p>
            Une donnée statique est une information qui ne change pas ou très peu dans le temps. Contrairement aux données dynamiques qui évoluent quotidiennement (comme la qualité de l'air ou la météo), les données statiques restent constantes sur de longues périodes.
          </p>

          <h2>Exemples de données statiques sur Recosanté</h2>
          <ul>
            <li><strong>Potentiel radon</strong> : Cartographie géologique établie en 2010</li>
            <li><strong>Zones de vigilance</strong> : Délimitations administratives</li>
            <li><strong>Seuils réglementaires</strong> : Valeurs limites définies par la réglementation</li>
            <li><strong>Informations géographiques</strong> : Localisation des stations de mesure</li>
          </ul>

          <h2>Pourquoi des données statiques ?</h2>
          <p>
            Les données statiques sont importantes car elles fournissent :
          </p>
          <ul>
            <li><strong>Un cadre de référence</strong> : Base stable pour l'évaluation des risques</li>
            <li><strong>Une planification</strong> : Possibilité d'anticiper les expositions</li>
            <li><strong>Une comparaison</strong> : Référence pour évaluer les évolutions</li>
            <li><strong>Une information permanente</strong> : Accessible en permanence</li>
          </ul>

          <h2>Mise à jour des données statiques</h2>
          <p>
            Bien que statiques, ces données peuvent être mises à jour :
          </p>
          <ul>
            <li><strong>Nouvelles études</strong> : Amélioration des connaissances scientifiques</li>
            <li><strong>Évolution réglementaire</strong> : Changement des seuils ou critères</li>
            <li><strong>Nouvelles technologies</strong> : Amélioration des méthodes de mesure</li>
            <li><strong>Nouvelles zones</strong> : Extension de la couverture géographique</li>
          </ul>

          <h2>Utilisation des données statiques</h2>
          <p>
            Les données statiques sont utilisées pour :
          </p>
          <ul>
            <li><strong>L'évaluation des risques</strong> : Base de calcul des expositions</li>
            <li><strong>La planification urbaine</strong> : Prise en compte dans l'aménagement</li>
            <li><strong>L'information des citoyens</strong> : Connaissance des risques locaux</li>
            <li><strong>La réglementation</strong> : Base des obligations légales</li>
          </ul>

          <h2>En savoir plus</h2>
          <p>
            <a href="https://solidarites-sante.gouv.fr/sante-et-environnement/batiments/article/radon" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              Consulter le site du ministère de la Santé
            </a>
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant les données statiques, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>

          <h2>Évolutions futures</h2>
          <p>
            Nous travaillons à enrichir notre base de données statiques avec :
          </p>
          <ul>
            <li>De nouvelles cartographies de risques</li>
            <li>Des informations sur d'autres polluants</li>
            <li>Des données géographiques plus détaillées</li>
            <li>Des liens vers d'autres sources d'information</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
