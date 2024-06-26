'use client';

import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { GouvLogo } from '@/images/logos/gouv';
import Link from 'next/link';

export function Header() {
  return (
    <header>
      <nav>
        <Container className='relative z-50  py-8'>
          <div
            aria-label='Home'
            className='flex items-center  w-full justify-between'
          >
            <Link href='/'>
              <GouvLogo className='h-24 md:h-32 w-auto -ml-4 ' />
            </Link>

            <Link href='/'>
              <Logo className='h-12  md:h-16' />
            </Link>
          </div>
          <div className='relative z-10 flex md:flex-row flex-col-reverse items-start w-full justify-between mt-12'>
            <h1 className='md:text-5xl w-full text-3xl  mt-4 md:mt-0  text-dark font-app'>
              Suivez <span className='text-app-primary'>les pollens</span>,
              <br />
              <span className='text-app-primary'>
                la qualité de l'air
              </span> et{' '}
              <span className='text-app-primary'>la qualité de l'eau</span>{' '}
              <br />
              en temps réel dans votre ville.
            </h1>
          </div>
          <p className='mt-4 text-xl text-gray-700'>
            Une application gratuite pour protéger votre santé et celle de votre
            famille.
          </p>
        </Container>
      </nav>
    </header>
  );
}
