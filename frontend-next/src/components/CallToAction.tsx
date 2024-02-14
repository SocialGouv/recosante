import { AppStoreLink } from '@/components/AppStoreLink';
import { CircleBackground } from '@/components/CircleBackground';
import { Container } from '@/components/Container';
import { GoogleStoreLink } from './GoogleStoreLink';

export function CallToAction() {
  return (
    <section
      id='get-free-shares-today'
      className='relative overflow-hidden bg-white py-20 sm:py-28'
    >
      <div className='absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2'>
        <CircleBackground color='#F2D072' className='animate-spin-slower' />
      </div>
      <Container className='relative'>
        <div className='mx-auto max-w-md sm:text-center'>
          <h2 className='text-3xl font-marianneBold tracking-tight text-brand sm:text-4xl'>
            Rejoignez des milliers d’utilisateurs
          </h2>
          <p className='mt-4 text-lg text-gray-700'>
            Reprenez le contrôle de votre santé et accompagnez vos proches dans
            leur vie de tous les jours.
          </p>
          <div className=' text-center sm:text-left'>
            <div className='md:mt-4 mt-8 flex mx-auto items-center space-y-2 md:space-y-0 justify-center lg:justify-start md:space-x-4 md:flex-row flex-col '>
              <AppStoreLink />
              <GoogleStoreLink />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
