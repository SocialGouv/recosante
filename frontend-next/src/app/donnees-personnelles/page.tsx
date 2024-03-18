import { CallToAction } from '@/components/CallToAction';
import { Hero } from '@/components/hero-banner';
import { PrimaryFeatures } from '@/components/primary-features';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';
import BlogPreview from '@/components/blog-preview';
import { Metadata } from 'next';
import { MetadataService } from '@/services/metadatas';
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Qualité de l'air, qualité de l'eau, alertes pollen, météo et indice UV dans votre ville - Recosanté`,
    description: `Recevez des alertes et prévisions en temps réel sur la qualité de l'air, qualité de l'eau, l'indice UV, le taux de pollen et les conditions météorologiques.`,
    itunes: {
      appId: '6476136888',
      appArgument: `https://recosante.beta.gouv.fr/`,
    },
  };
}
const jsonLd = MetadataService.getJsonLd();
export default function PersonalData() {
  return (
    <div className='flex h-full flex-col font-app font-medium'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='bg-white px-6 py-32 lg:px-8'>
        <div className='mx-auto max-w-3xl text-base leading-7 text-gray-700'>
          <h1 className='mt-2 mb-12 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Politique de confidentialité – Recosanté
          </h1>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
            Quel est l’objectif de Recosanté ?
          </h2>
          <p className='mt-6'>
            Transmettre des informations et des recommandations aux utilisateurs
            pour les aider à se protéger des impacts environnementaux sur leur
            santé.
          </p>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
            Confidentialité
          </h2>
          <p className='mt-6'>
            Recosanté ne traite pas de données à caractère personnel, nous ne
            sommes pas en mesure de vous identifier ou de vous réidentifier.
            <br />
            Sous-traitant : OVH
            <br /> Pays Destinataire : France
            <br /> Traitement réalisé Hébergement <br />
            Garanties :
            <a
              className='text-indigo-600 inline-block'
              href='https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/9e74492-OVH_Data_Protection_Agreement-FR-6.0.pdf'
            >
              https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/9e74492-OVH_Data_Protection_Agreement-FR-6.0.pdf
            </a>
          </p>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
            Cookies et traceurs
          </h2>
          <p className='mt-6'>
            Recosanté dépose des cookies et traceurs à des fins d’analyse, par
            le biais de Google et Meta.
            <br /> Vous pouvez, à tout moment, accepter, refuser et gérer vos
            préférences à l’aide du bandeau cookies conforme au règlement
            ePrivacy et aux recommandations de la CNIL.
            <br /> Les cookies et traceurs ont une durée de vie de 13 mois.
            <br />
            <br /> Nous utilisons Matomo, une solution de mesure d’audience,
            configuré en mode « exempté » et ne nécessitant pas le recueil de
            votre consentement car votre adresse IP est anonymisée, conformément
            aux recommandations de la CNIL.
            <br /> Dès lors, aucune donnée à caractère personnel vous concernant
            n'est traitée.
            <br />
            Pour toute demande, vous pouvez écrire un email à l’équipe
            Recosanté :
            <a
              className='text-indigo-600 inline-block'
              href='mailto:contact@recosante.beta.gouv.fr '
            >
              contact@recosante.beta.gouv.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
