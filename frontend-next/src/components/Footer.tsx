import { Container } from '@/components/Container';
import Logo from '@/components/Logo';
import Links from '@/components/layout/footer/Links';
import { GouvLogo } from '@/images/logos/gouv';

export function Footer() {
  return (
    <footer className='relative border-t-2 border-main bg-background pt-8'>
      <Container>
        <div className='mx-auto mb-8 flex max-w-6xl flex-col items-start justify-between px-4 py-0 xl:flex-row xl:items-center xl:gap-x-6'>
          <p className='my-8 max-w-2xl text-center xl:mt-0'>
            Recosanté est un service public qui vous aide à connaître votre
            environnement et à agir pour protéger votre santé.
          </p>
          <div className='flex items-center justify-between w-full md:flex-row flex-col-reverse'>
            <div className='flex items-center justify-between w-full'>
              <Logo />
              <GouvLogo className='h-40 w-auto' />
            </div>
          </div>
        </div>
        <Links />
      </Container>
    </footer>
  );
}
