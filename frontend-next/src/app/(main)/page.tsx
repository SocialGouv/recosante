import { CallToAction } from '@/components/CallToAction';
import { Hero } from '@/components/hero-banner';
import { PrimaryFeatures } from '@/components/primary-features';
import { Reviews } from '@/components/Reviews';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';
import { Carousel } from '@/components/carousel';
import { Meta } from '@/components/head';
import BlogPreview from '@/components/blog-preview';

export default function Home() {
  return (
    <>
      <Meta
        title="Recosanté - Voyez l'impact de l'environnement sur votre santé, et agissez."
        description='Télécharger l’application Recosanté.'
      />
      <Hero />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Carousel />
      <Incentive />
      <BlogPreview />
      <Reviews />
    </>
  );
}
