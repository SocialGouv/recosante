'use client';

import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { GouvLogo } from '@/images/logos/gouv';

export function Header() {
  return (
    <header>
      <nav>
        <Container className='relative z-50 flex justify-between py-8'>
          <div className='relative z-10 flex md:flex-row flex-col-reverse items-center w-full justify-between '>
            <h1 className='md:text-4xl text-3xl font-bold  mt-4 md:mt-0 tracking-tight leading-10 text-app-primary   font-app uppercase'>
              Votre nouvelle application de santé au quotidien.
            </h1>
            <div
              aria-label='Home'
              className='flex items-center  w-full  justify-between md:justify-end space-x-2'
            >
              <Logo className='h-12  md:h-16' />
              <GouvLogo className='h-24 md:h-32 w-auto ' />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
