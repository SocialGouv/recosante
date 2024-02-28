import { CallToAction } from '@/components/CallToAction';
import { Hero } from '@/components/hero-banner';
import { PrimaryFeatures } from '@/components/primary-features';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';
import BlogPreview from '@/components/blog-preview';
import { ResolvingMetadata, Metadata } from 'next';

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

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Incentive />
      <BlogPreview />
    </>
  );
}
