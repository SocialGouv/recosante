'use client';

import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { GouvLogo } from '@/images/logos/gouv';
import Link from 'next/link';

export function SimpleHeader() {
  return (
    <header className='bg-white'>
      <nav>
        <Container className='relative z-50  py-8 bg-white'>
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
        </Container>
      </nav>
    </header>
  );
}
