import { CallToAction } from '@/components/CallToAction';
import { Hero } from '@/components/hero-banner';
import { PrimaryFeatures } from '@/components/primary-features';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';
import BlogPreview from '@/components/blog-preview';
import Search from '@/components/Search';
import { Metadata } from 'next';
import { MetadataService } from '@/services/metadatas';

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
export default function Home() {
  return (
    <div className='flex h-full flex-col font-app font-medium'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Search />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Incentive />
      <BlogPreview />
    </div>
  );
}
