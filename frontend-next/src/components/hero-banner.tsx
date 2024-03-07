'use client';

import { useId } from 'react';
import Image from 'next/image';
import { LandingMobileScreen } from '@/components/app-demo';
import { Container } from '@/components/Container';
import { PhoneFrame } from '@/components/PhoneFrame';
import atmoLogo from '@/images/logos/atmo.png';
import meteoLogo from '@/images/logos/meteo.png';
import rnsaLogo from '@/images/logos/rnsa.png';
import irsnLogo from '@/images/logos/irsn.png';
import { AppStoreLink } from './AppStoreLink';
import { GoogleStoreLink } from './GoogleStoreLink';
import { MatomoService } from '@/services/matomo';
import qrCode from '@/images/qr-code.svg';
import Link from 'next/link';

function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  let id = useId();

  return (
    <div {...props}>
      <svg
        viewBox='0 0 1026 1026'
        fill='none'
        aria-hidden='true'
        className='absolute inset-0 h-full w-full animate-spin-slow'
      >
        <path
          d='M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z'
          stroke='#F2D072'
          strokeOpacity='0.7'
        />
        <path
          d='M513 1025C230.23 1025 1 795.77 1 513'
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap='round'
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1='1'
            y1='513'
            x2='1'
            y2='1025'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3343BD' />
            <stop offset='1' stopColor='#3343BD' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox='0 0 1026 1026'
        fill='none'
        aria-hidden='true'
        className='absolute inset-0 h-full w-full animate-spin-reverse-slower'
      >
        <path
          d='M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z'
          stroke='#F2D072'
        />
        <path
          d='M913 513c0 220.914-179.086 400-400 400'
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap='round'
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1='913'
            y1='513'
            x2='913'
            y2='913'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3343BD' />
            <stop offset='1' stopColor='#3343BD' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <div className='overflow-hidden py-4 sm:py-2 lg:pb-32 xl:pb-36 '>
      <Container>
        <div className='lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12'>
          <div className='relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6'>
            <div className='hidden mb-12 md:mb-0 group relative md:flex sm:self-auto sm:rounded-2xl space-x-6'>
              <div className=' relative flex flex-none items-center justify-center '>
                <QrCodeBorder className='absolute inset-0 h-full w-full stroke-black   ' />
                <Image
                  src={qrCode}
                  alt='qr code'
                  unoptimized
                  className='animate-pulse'
                />
              </div>
              <div className='flex flex-col  justify-center mx-auto items-start'>
                <p className='text-md text-app-primary '>
                  Scannez ici
                  <br /> pour télécharger l'application.
                </p>
                <Arrow className='rotate-[100deg]    ' />
              </div>
            </div>
            <p className='mt-12 text-lg text-gray-600'>
              Une application gratuite et personnalisable pour protéger votre
              santé et celle de votre famille.
            </p>
            <div className=' text-center sm:text-left'>
              <div className='md:mt-4 mt-8 flex mx-auto items-center space-y-2 md:space-y-0 justify-center lg:justify-start md:space-x-4 md:flex-row flex-col '>
                <AppStoreLink />
                <GoogleStoreLink />
              </div>
            </div>
          </div>
          <div className='relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6'>
            <BackgroundIllustration className='absolute left-1/2   h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:top-0 lg:ml-12  xl:ml-0' />
            <div className='-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32'>
              <PhoneFrame className='mx-auto max-w-[366px]' priority>
                <LandingMobileScreen />
              </PhoneFrame>
            </div>
          </div>
          <div className='relative lg:col-span-7 lg:mt-0 xl:col-span-6'>
            <ul
              role='list'
              className=' mx-auto mt-8 grid md:grid-cols-4 grid-cols-2 items-center grayscale flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start'
            >
              {[
                ['meteoLogo', meteoLogo],
                ['atmoLogo', atmoLogo],
                ['rnsaLogo', rnsaLogo],
                ['irsnLogo', irsnLogo],
              ].map(([name, logo]) => (
                <li key={name as string} className=' flex justify-center'>
                  <Image
                    src={logo}
                    alt={name as string}
                    unoptimized
                    className='md:max-w-[80px] max-w-[60px]'
                  />
                </li>
              ))}
            </ul>
            <p className='text-left md:text-center text-sm mt-4 mb-4 md:mb-0 text-gray-500 lg:text-left'>
              Les recommandations sont issues de sources fiables et validés par
              le Haut conseil de santé publique et Santé publique France.
            </p>
            <Link
              onClick={() => MatomoService.trackClick('go-to-web-version')}
              href='/'
              target='_blank'
              className='border-b text-center text-sm  text-gray-500 lg:text-left '
            >
              Accéder à la version web
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 96 96' fill='none' aria-hidden='true' {...props}>
      <path
        d='M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8'
        strokeWidth='2'
        strokeLinecap='round'
        stroke='#3343BD'
      />
    </svg>
  );
}

function Arrow(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      width='102'
      height='88'
      viewBox='0 0 102 148'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_3_224)'>
        <path
          d='M0 2.65037C6.14938 -1.37392 12.2988 -0.103094 17.812 1.80315C25.4458 4.55662 32.8674 8.1573 39.6529 12.3934C70.3998 32.7267 88.8479 61.744 96.4816 97.539C98.39 106.647 99.0262 116.178 100.299 126.556C108.78 121.685 113.233 112.154 121.715 106.647C122.776 110.883 120.655 113.636 118.959 115.966C111.961 125.497 104.752 135.028 97.3299 144.348C93.7251 148.796 90.9684 149.219 87.1515 145.407C79.0937 137.57 74.2167 128.039 72.7323 117.025C72.7323 116.601 73.3684 115.966 74.2166 114.907C83.3347 117.237 81.2142 128.886 89.06 133.122C92.4527 118.508 89.9082 104.529 86.0913 90.973C82.0624 76.7821 76.7612 63.2266 68.2793 51.1537C60.0095 39.2926 49.6191 29.7614 38.1686 20.8656C26.93 11.758 14.2072 6.03925 0 2.65037Z'
          fill='#3343BD'
        />
      </g>
      <defs>
        <clipPath id='clip0_3_224'>
          <rect width='122' height='148' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
