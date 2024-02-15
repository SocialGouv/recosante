import { AppStoreLink } from '@/components/AppStoreLink';
import { Button } from '@/components/Button';
import { CallToAction } from '@/components/CallToAction';
import { CirclesBackground } from '@/components/CirclesBackground';
import { Container } from '@/components/Container';
import { GoogleStoreLink } from '@/components/GoogleStoreLink';
import { Layout } from '@/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <Container className='relative isolate flex h-full flex-col items-center justify-center py-20 text-center sm:py-32'>
        <CirclesBackground className='absolute left-1/2 top-1/2 -z-10 mt-44 w-[68.125rem] -translate-x-1/2 -translate-y-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]' />
        <p className='text-3xl font-semibold text-gray-900'>404</p>
        <h1 className='mt-2 text-3xl font-medium tracking-tight text-gray-900'>
          Cette page n’existe pas
        </h1>
        <p className='mt-2 text-lg text-gray-600'>
          La page que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <Button href='/' variant='outline' className='mt-8'>
          Retournez à l’accueil
        </Button>
        <div className=' text-center sm:text-left mt-8 border-t'>
          <p className='mt-2 text-lg text-gray-600'>
            Avez-vous téléchargé l’application Recosanté ?
          </p>
          <div className='mt-8  flex mx-auto items-center space-y-2 md:space-y-0 justify-center lg:justify-start md:space-x-4 md:flex-row flex-col '>
            <AppStoreLink />
            <GoogleStoreLink />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
