import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';

import { NavLinks } from '@/components/NavLinks';
import qrCode from '@/images/qr-code.png';
import { GouvLogo } from '@/images/logos/gouv';

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 96 96' fill='none' aria-hidden='true' {...props}>
      <path
        d='M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className='border-t border-gray-200'>
      <Container>
        <nav className='lg:flex lg:overflow-scroll  mt-4 gap-8 w-full grid grid-cols-2 px-2 '>
          <NavLinks />
        </nav>
        <div className='flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16'>
          <div className='flex items-center justify-between w-full md:flex-row flex-col-reverse'>
            <div className='flex items-center  md:justify-start justify-between  w-full'>
              <Logo />
              <GouvLogo className='h-40 w-auto' />
            </div>
            <div className='mb-12 md:mb-0 group relative -mx-4 flex items-center self-stretch p-4 transition-colors  sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6'>
              <div className='relative flex h-24 w-24 flex-none items-center justify-center '>
                <QrCodeBorder className='absolute inset-0 h-full w-full stroke-gray-300 transition-colors ' />
                <Image src={qrCode} alt='qr code' unoptimized />
              </div>
              <div className='ml-8 lg:w-64'>
                <p className='text-base font-semibold text-gray-900'>
                  <span className='absolute inset-0 sm:rounded-2xl' />
                  Télécharger l'application
                </p>
                <p className='mt-1 text-sm text-gray-700'>
                  Scannez le code QR pour télécharger l'application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
