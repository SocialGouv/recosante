import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Population vulnérable et sensible - Recosanté',
  description: 'Définitions des populations vulnérables et sensibles aux impacts environnementaux',
};

export default function PopulationVulnerableSensiblePage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Population vulnérable et sensible</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Population vulnérable</h2>
          <p>
            La population des personnes vulnérables comprend :
          </p>
          <ul>
            <li><strong>Femmes enceintes</strong> : Sensibles aux polluants et aux variations environnementales</li>
            <li><strong>Nourrissons et jeunes enfants</strong> : Système immunitaire en développement</li>
            <li><strong>Personnes de plus de 65 ans</strong> : Capacités d'adaptation réduites</li>
            <li><strong>Personnes souffrant de pathologies cardiovasculaires</strong> : Cœur et vaisseaux fragilisés</li>
            <li><strong>Insuffisants cardiaques</strong> : Fonction cardiaque altérée</li>
            <li><strong>Personnes asthmatiques</strong> : Voies respiratoires sensibles</li>
          </ul>

          <h2>Population sensible</h2>
          <p>
            La population des personnes sensibles comprend les personnes se reconnaissant comme sensibles lors des pics de pollution et/ou dont les symptômes apparaissent ou sont amplifiés lors des pics :
          </p>
          <ul>
            <li><strong>Personnes diabétiques</strong> : Métabolisme altéré</li>
            <li><strong>Personnes immunodéprimées</strong> : Défenses immunitaires affaiblies</li>
            <li><strong>Personnes souffrant d'affections neurologiques</strong> : Système nerveux fragilisé</li>
            <li><strong>Personnes à risque cardiaque</strong> : Antécédents ou facteurs de risque</li>
            <li><strong>Personnes à risque respiratoire</strong> : Affections pulmonaires chroniques</li>
            <li><strong>Personnes à risque infectieux</strong> : Susceptibilité aux infections</li>
          </ul>

          <h2>Facteurs de vulnérabilité</h2>
          <ul>
            <li><strong>Âge</strong> : Jeunes enfants et personnes âgées</li>
            <li><strong>État de santé</strong> : Maladies chroniques ou aiguës</li>
            <li><strong>Médicaments</strong> : Traitements pouvant aggraver la sensibilité</li>
            <li><strong>Conditions de vie</strong> : Logement, alimentation, accès aux soins</li>
            <li><strong>Exposition professionnelle</strong> : Travail en extérieur ou exposé</li>
          </ul>

          <h2>Recommandations spécifiques</h2>
          
          <h3>Pour les populations vulnérables</h3>
          <ul>
            <li>Surveiller les bulletins de qualité de l'air</li>
            <li>Adapter les activités selon les conditions environnementales</li>
            <li>Consulter un médecin en cas de symptômes</li>
            <li>Respecter les traitements prescrits</li>
            <li>Éviter les expositions prolongées</li>
          </ul>

          <h3>Pour les populations sensibles</h3>
          <ul>
            <li>Reconnaître les signes d'aggravation</li>
            <li>Adapter le niveau d'activité physique</li>
            <li>Utiliser des équipements de protection si nécessaire</li>
            <li>Maintenir un suivi médical régulier</li>
            <li>Éviter les facteurs aggravants</li>
          </ul>

          <h2>Surveillance et prévention</h2>
          <ul>
            <li><strong>Surveillance continue</strong> : Suivi des indicateurs environnementaux</li>
            <li><strong>Prévention primaire</strong> : Réduction des expositions</li>
            <li><strong>Prévention secondaire</strong> : Dépistage et diagnostic précoce</li>
            <li><strong>Prévention tertiaire</strong> : Limitation des complications</li>
          </ul>

          <h2>Contact et accompagnement</h2>
          <p>
            Si vous vous reconnaissez dans ces catégories, n'hésitez pas à :
          </p>
          <ul>
            <li>En parler à votre médecin traitant</li>
            <li>Consulter les recommandations spécifiques sur Recosanté</li>
            <li>Adapter vos activités selon les conditions environnementales</li>
            <li>Participer aux programmes de surveillance si disponibles</li>
          </ul>

          <h2>En savoir plus</h2>
          <p>
            Pour plus d'informations sur les recommandations spécifiques, consultez notre <a href="/recommandations" className="text-blue-600 hover:text-blue-800 underline">page des recommandations</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant votre situation, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
