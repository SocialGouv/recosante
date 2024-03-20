import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';

import { NavLinks } from '@/components/NavLinks';
import { GouvLogo } from '@/images/logos/gouv';

export function Footer() {
  return (
    <footer className='border-t border-gray-200'>
      <Container>
        <nav className='lg:flex mt-4 gap-4 w-full grid grid-cols-2 px-2 '>
          <NavLinks />
        </nav>
        <div className='flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16'>
          <div className='flex items-center justify-between w-full md:flex-row flex-col-reverse'>
            <div className='flex items-center   justify-between  w-full'>
              <Logo />
              <GouvLogo className='h-40 w-auto' />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
