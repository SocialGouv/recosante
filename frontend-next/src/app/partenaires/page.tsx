import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Partenaires - Recosanté',
  description: 'Nos partenaires et collaborateurs sur la plateforme Recosanté',
};

export default function PartenairesPage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Partenaires</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Recosanté collabore avec de nombreux partenaires pour fournir des informations fiables et à jour sur la qualité de l'environnement et ses impacts sur la santé.
          </p>

          <h2>Partenaires institutionnels</h2>
          <ul>
            <li><strong>Direction générale de la Santé (DGS)</strong> - Responsable du traitement des données</li>
            <li><strong>Direction générale de la prévention des risques (DGPR)</strong> - Responsable du traitement des données</li>
            <li><strong>Direction interministérielle du numérique (DINUM)</strong> - Supervision de l'équipe produit</li>
          </ul>

          <h2>Sous-traitants et prestataires</h2>
          <ul>
            <li><strong>CleverCloud</strong> - Hébergement du site</li>
            <li><strong>Scopyleft</strong> - Développement et design</li>
            <li><strong>Sendinblue</strong> - Envoi des lettres d'information aux utilisateurs</li>
            <li><strong>Little Big Connection</strong> - Accès aux infrastructures de production</li>
          </ul>

          <h2>Sources de données</h2>
          <ul>
            <li><strong>Atmo France</strong> - Indice ATMO de la qualité de l'air</li>
            <li><strong>Météo-France</strong> - Vigilance météo et indice UV</li>
            <li><strong>RNSA</strong> - Risque d'exposition aux allergènes polliniques</li>
            <li><strong>IRSN</strong> - Potentiel radon</li>
            <li><strong>Santé publique France</strong> - Qualité des eaux de baignade</li>
          </ul>

          <h2>Programme beta.gouv.fr</h2>
          <p>
            Recosanté est conçu selon l'approche Startup d'État dans le cadre du programme beta.gouv.fr, qui vise à améliorer le service public grâce à l'innovation numérique.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant nos partenariats, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
