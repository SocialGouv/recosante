import { CallToAction } from '@/components/CallToAction';
import BlogPreview from '@/components/blog-preview';
import { HeroCity } from '@/components/hero-city';
import { Incentive } from '@/components/incentive';
import { Notification } from '@/components/notifications';
import { Meta } from '@/components/meta';
import { PrimaryFeatures } from '@/components/primary-features';
import { PageBuilderService } from '@/services/page-builder';
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { IndicatorService } from '@/services/indicator';

const municipalitesParam = PageBuilderService.getMunicipalitiesParams();
const cities = municipalitesParam.map((param) => param.params.city);
const indicators = municipalitesParam.map((param) => param.params.indicator);

type Props = {
  params: { city: string; indicator: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const indicatorName = IndicatorService.getNameBySlug(params.indicator);

  return {
    title: `Obtenez des informations sur ${indicatorName} à ${params.city}  `,
    description: `Télécharger l’application Recosanté, pour obtenir des informations sur ${indicatorName} à ${params.city}.`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default function Page(props: {
  params: { city: string; indicator: string };
}) {
  if (!cities.includes(props.params.city)) {
    redirect('/not-found');
  }
  if (!indicators.includes(props.params.indicator)) {
    redirect('/not-found');
  }

  return (
    <>
      <Meta
        title={`${props.params.city} sur l'indicateur ${props.params.indicator}`}
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

// export async function generateStaticParams() {
//   return municipalitesParam.map((param) => ({
//     city: param.params.city,
//     indicator: param.params.indicator,
//   }));
// }
