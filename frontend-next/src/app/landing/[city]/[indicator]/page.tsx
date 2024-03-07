import { CallToAction } from '@/components/CallToAction';
import BlogPreview from '@/components/blog-preview';
import { HeroCity } from '@/components/hero-city';
import { Incentive } from '@/components/incentive';
import { Notification } from '@/components/notifications';
import { PrimaryFeatures } from '@/components/primary-features';
import { PageBuilderService } from '@/services/page-builder';
import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { IndicatorService } from '@/services/indicator';
import Head from 'next/head';
import { MetadataService } from '@/services/metadatas';

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
  const previousImages = (await parent).openGraph?.images || [];
  const indicatorName = IndicatorService.getNameBySlug(params.indicator);

  return {
    title: `Obtenez des informations sur ${indicatorName} à ${params.city}  `,
    description: `Télécharger l’application Recosanté, pour obtenir des informations sur ${indicatorName} à ${params.city}.`,
    openGraph: {
      images: [...previousImages],
    },
    itunes: {
      appId: '6476136888',
      appArgument: `https://recosante.beta.gouv.fr/`,
    },
  };
}

export default function Page(props: {
  params: { city: string; indicator: string };
}) {
  const indicatorName = IndicatorService.getNameBySlug(props.params.indicator);

  if (!cities.includes(props.params.city)) {
    redirect('/not-found');
  }
  if (!indicators.includes(props.params.indicator)) {
    redirect('/not-found');
  }
  const jsonLd = MetadataService.getJsonLd(
    `Télécharger l'application officielle du gouvernement français pour suivre en temps réel ${indicatorName} à ${props.params.city}.`,
  );

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Head>
        <meta
          name='apple-itunes-app'
          content='app-id=6476136888, app-argument=https://recosante.beta.gouv.fr/'
        ></meta>
      </Head>

      <HeroCity city={props.params.city} indicator={indicatorName} />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Incentive />
      <BlogPreview />
    </>
  );
}
