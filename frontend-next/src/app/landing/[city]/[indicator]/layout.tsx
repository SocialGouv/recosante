import { Footer } from '@/components/Footer';
import { LandingHeader } from '@/components/LandingHeader';
import { Banner } from '@/components/banner';
import { IndicatorService } from '@/services/indicator';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { city: string; indicator: string };
}) {
  const indicatorName = IndicatorService.getNameBySlug(params.indicator);

  return (
    <>
      <Banner />
      <LandingHeader city={params.city} indicatorName={indicatorName} />
      <main className='flex-auto'>{children}</main>
      <Footer />
    </>
  );
}
