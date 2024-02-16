import { CallToAction } from '@/components/CallToAction';
import { PrimaryFeatures } from '@/components/primary-features';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';
import { Meta } from '@/components/meta';
import BlogPreview from '@/components/blog-preview';
import { PageBuilderService } from '@/services/page-builder';
import { HeroCity } from '@/components/hero-city';

interface PageProps {
  params: {
    inseeCode: string;
    city: string;
    indicator: string;
  };
}
export default function Home(props: PageProps) {
  return (
    <>
      <Meta
        title={`Recosanté - Des recommandations pour votre santé à ${props.params.city} sur l'indicateur ${props.params.indicator}`}
        description='Télécharger l’application Recosanté.'
      />
      <HeroCity city={props.params.city} indicator={props.params.indicator} />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Incentive />
      <BlogPreview />
    </>
  );
}

export async function getStaticPaths() {
  const params = PageBuilderService.getMunicipalitiesParams();

  return {
    paths: params,
    fallback: false,
  };
}
