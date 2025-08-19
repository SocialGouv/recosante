import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Accessibilité - Recosanté',
  description: 'Déclaration d\'accessibilité de la plateforme Recosanté',
};

export default function AccessibilitePage() {
  return (
    <Layout>
      <div className="px-6 pt-10 xl:pt-20 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Accessibilité</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Cette page n'est pas une page d'aide.
          </p>
          <p>
            Elle vise à présenter notre engagement en matière d'accessibilité numérique puis à définir le niveau de conformité de ce présent site à la réglementation et aux référentiels en vigueur.
          </p>

          <h2>Qu'est-ce que l'accessibilité numérique ?</h2>
          <p>
            L'accessibilité numérique est un ensemble de règles et de bonnes pratiques qui couvrent notamment les aspects fonctionnels, graphiques, techniques et éditoriaux.
          </p>
          <p>
            Le suivi de ces règles et bonnes pratiques permet de s'assurer que les supports numériques (sites web, applications mobiles, documents PDF, etc.) sont accessibles aux personnes en situation de handicap.
          </p>
          <p>Un site accessible permet par exemple de :</p>
          <ul>
            <li>Personnaliser son affichage via le système d'exploitation et/ou le navigateur (agrandissement ou rétrécissement des caractères, changement de la typographie, modification des couleurs, arrêt des animations, etc.).</li>
            <li>Naviguer à l'aide de technologies d'assistance comme une synthèse vocale ou une plage braille.</li>
            <li>Naviguer sans utiliser la souris, avec le clavier uniquement, des contacteurs ou via un écran tactile.</li>
            <li>Consulter les vidéos et les contenus audio à l'aide de sous-titres et/ou de transcriptions.</li>
            <li>Etc.</li>
          </ul>

          <h2>Engagement d'accessibilité numérique</h2>
          <p>
            La direction interministérielle du numérique s'engage à rendre accessibles ses sites web (internet, intranet et extranet), ses applications mobiles, ses progiciels et son mobilier urbain numérique conformément à l'<a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037388867" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">article 47 de la loi n°2005-102 du 11 février 2005</a>.
          </p>

          <h2>Déclaration de conformité au RGAA</h2>
          <p>
            Cette déclaration d'accessibilité s'applique au site « <a href="https://recosante.beta.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Recosanté</a> ».
          </p>

          <h3>État de conformité</h3>
          <p>
            Ce présent site est partiellement conforme avec le <a href="https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">RGAA (Référentiel Général d'Amélioration de l'Accessibilité) - version 4.1</a> en raison des non-conformités énumérées ci-après.
          </p>

          <h3>Résultats des tests</h3>
          <p>
            L'audit de conformité au RGAA version 4.1 réalisé en janvier 2023 par la société <a href="https://ideance.net/fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Ideance</a> révèle que sur l'échantillon :
          </p>
          <ul>
            <li><strong>Le taux de conformité global est de 80,9%.</strong> (Obtenu en divisant le nombre de critères conformes par le nombre de critères applicables.)</li>
            <li><strong>Le taux de conformité moyen est de 86,8%.</strong> (Obtenu en faisant la moyenne des taux de conformité de chaque page.)</li>
          </ul>

          <h3>Contenus non accessibles</h3>
          <h4>Non-conformités</h4>
          <p>Liste des critères non conformes :</p>
          <ul>
            <li>3.1 - Des informations sont données uniquement par la couleur.</li>
            <li>7.1 - Des scripts ne sont pas compatibles avec les technologies d'assistance.</li>
            <li>7.3 - Des scripts ne sont pas contrôlables par le clavier et par tout dispositif de pointage.</li>
            <li>9.3 - Des listes ne sont pas correctement structurées.</li>
            <li>10.4 - Des textes ne sont pas lisibles lorsque la taille des caractères est augmentée jusqu'à 200%, au moins.</li>
            <li>10.7 - La prise de focus d'éléments interactifs n'est pas visible.</li>
            <li>10.8 - Des contenus cachés n'ont pas vocation à être ignorés par les technologies d'assistance.</li>
            <li>10.11 - Des contenus ne peuvent pas être présentés sans avoir recours à un défilement horizontal pour une fenêtre ayant une largeur de 320px.</li>
            <li>13.8 - Des contenus en mouvement ou clignotants ne sont pas contrôlables.</li>
          </ul>

          <h3>Établissement de cette déclaration de conformité au RGAA</h3>
          <p>Cette déclaration a été établie le 20/03/2023.</p>

          <h4>Technologies utilisées pour la réalisation du site</h4>
          <ul>
            <li>HTML5</li>
            <li>SVG</li>
            <li>ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>

          <h4>Environnement de test</h4>
          <p>Les tests ont été effectués avec les combinaisons de navigateur web et lecteur d'écran suivantes :</p>
          <ul>
            <li>Firefox (108.0.1) et NVDA 2022.3.2</li>
            <li>Firefox (108.0.1) et JAWS 2022</li>
            <li>Safari et VoiceOver (macOS 12.6)</li>
            <li>Safari et VoiceOver (iOS 16)</li>
          </ul>

          <h4>Outils pour évaluer l'accessibilité</h4>
          <ul>
            <li>Colour Contrast Analyser</li>
            <li>Outils de développement Firefox</li>
            <li>Web Developer (extension Firefox)</li>
          </ul>

          <h4>Pages du site ayant fait l'objet de la vérification de conformité</h4>
          <ul>
            <li><a href="https://recosante.beta.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Accueil</a></li>
            <li><a href="https://recosante.beta.gouv.fr/place/75056/paris/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Parcours d'abonnement (fenêtre modale)</a></li>
            <li><a href="https://recosante.beta.gouv.fr/place/75056/paris/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Page d'une ville</a></li>
            <li><a href="https://recosante.beta.gouv.fr/recommandations" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Recommandations</a></li>
            <li><a href="https://recosante.beta.gouv.fr/articles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Articles</a></li>
            <li><a href="https://recosante.beta.gouv.fr/mentions-legales" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Mentions légales</a></li>
          </ul>

          <h2>Retour d'information et contact</h2>
          <p>
            Si vous n'arrivez pas à accéder à un contenu ou à un service de ce site, vous pouvez nous contacter via un des moyens ci-dessous pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
          </p>
          <p>
            Écrivez-nous à l'adresse email : <a href="mailto:contact@recosante.beta.gouv.fr" className="text-blue-600 hover:text-blue-800 underline">contact@recosante.beta.gouv.fr</a>
          </p>

          <h2>Voies de recours</h2>
          <p>Cette procédure est à utiliser dans le cas suivant.</p>
          <p>
            Vous avez signalé au responsable du site internet un défaut d'accessibilité qui vous empêche d'accéder à un contenu ou à un des services et vous n'avez pas obtenu de réponse satisfaisante.
          </p>
          <ul>
            <li><a href="https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Écrire un message au Défenseur des droits</a>.</li>
            <li><a href="https://www.defenseurdesdroits.fr/saisir/delegues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Contacter le délégué du Défenseur des droits dans votre région</a>.</li>
            <li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) à l'adresse suivante :<br />
              Défenseur des droits<br />
              Libre réponse 71120<br />
              75342 Paris CEDEX 07</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
