import { CallToAction } from '@/components/CallToAction';
import { Hero } from '@/components/hero-banner';
import { PrimaryFeatures } from '@/components/primary-features';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';
import BlogPreview from '@/components/blog-preview';
import { Metadata } from 'next';
import { MetadataService } from '@/services/metadatas';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Recosanté - Voyez l'impact de l'environnement sur votre santé, et agissez.`,
    description: `Télécharger l’application Recosanté.`,
    itunes: {
      appId: '6476136888',
      appArgument: `https://recosante.beta.gouv.fr/`,
    },
  };
}
const jsonLd = MetadataService.getJsonLd();
export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Incentive />
      <BlogPreview />
    </>
  );
}
