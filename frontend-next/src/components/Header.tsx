'use client';

import Link from 'next/link';

import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { GouvLogo } from '@/images/logos/gouv';

export function Header() {
  return (
    <header>
      <nav>
        <Container className='relative z-50 flex justify-between py-8'>
          <div className='relative z-10 flex items-center gap-16 w-full justify-between'>
            <Link
              href='/'
              aria-label='Home'
              className='flex items-center  w-full  justify-between'
            >
              <GouvLogo className='h-32 w-auto -ml-4' />
              <Logo className='h-20 w-auto' />
            </Link>
          </div>
        </Container>
      </nav>
    </header>
  );
}
