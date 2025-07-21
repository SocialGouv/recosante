'use client';

import { Container } from '@/components/Container';
import Logo from '@/components/Logo';
import { GouvLogo } from '@/images/logos/gouv';

export function Header() {
  return (
    <header>
      <nav>
        <Container className='relative z-50 flex justify-between py-8'>
          <div className='relative z-10 flex items-center gap-16 w-full justify-between'>
            <div
              aria-label='Home'
              className='flex items-center  w-full  justify-between'
            >
              <Logo className='h-20 w-auto' />
              <GouvLogo className='h-32 w-auto ' />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
