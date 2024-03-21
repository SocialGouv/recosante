'use client';

import { useId } from 'react';
import { LandingMobileScreen } from '@/components/app-demo';
import { Container } from '@/components/Container';
import { PhoneFrame } from '@/components/PhoneFrame';
import { GouvLogo } from '@/images/logos/gouv';
import qrCode from '@/images/qr-code-iframe.svg';
import Image from 'next/image';
import { AppStoreLink } from '../AppStoreLink';
import { GoogleStoreLink } from '../GoogleStoreLink';
import { MatomoService } from '@/services/matomo';
import { Logo } from '../Logo';

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
  function handleClick() {
    MatomoService.trackClick('link-in-iframe');
  }
  return (
    <div className='overflow-hidden pt-2 lg:pb-32 xl:pb-36 '>
      <header>
        <nav>
          <Container className='relative z-50  md:py-8'>
            <div
              aria-label='Home'
              className='flex items-center  w-full justify-between '
            >
              <div className='flex items-center space-x-6 justify-between  md:w-fit w-full'>
                <a
                  onClick={handleClick}
                  href='https://recosante.beta.gouv.fr'
                  target='_blank'
                >
                  <GouvLogo className='h-14 md:h-32 w-auto -ml-2 md:-ml-4 ' />
                </a>

                <a
                  onClick={handleClick}
                  href='https://recosante.beta.gouv.fr'
                  target='_blank'
                >
                  <Logo className='h-6  md:h-16 -mr-12 -mt-4 md:mr-0 md:mt-0' />
                </a>
              </div>
              <div className='hidden md:mb-0 group relative md:flex sm:self-auto sm:rounded-2xl space-x-6'>
                <div className='flex flex-col  justify-center mx-auto items-end '>
                  <p className='text-md text-app-primary '>
                    Scannez ici
                    <br /> pour télécharger l'application.
                  </p>
                  <Arrow className='rotate-[280deg] -mr-6 ' />
                </div>
                <div className='relative flex flex-none items-center justify-center '>
                  <QrCodeBorder className='absolute inset-0 h-full w-full stroke-black   ' />
                  <Image
                    src={qrCode}
                    alt='qr code'
                    unoptimized
                    className='animate-pulse scale-[0.8]'
                  />
                </div>
              </div>
            </div>
            <div className='relative z-10 flex md:flex-row flex-col-reverse items-start w-full justify-between mt-4 md:mt-8'>
              <h1 className='md:text-5xl w-full text-md  md:mt-4 -mt-2  text-dark font-app'>
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
            <p className='mt-2 md:mt-4 text-xs md:text-xl text-gray-700'>
              Une application gratuite pour protéger votre santé et celle de
              votre famille.
            </p>
            <div className=' flex items-center justify-center md:hidden mt-4'>
              <div className='flex  justify-center mx-auto items-start  w-full '>
                <p className='text-xs text-app-primary '>
                  Scannez ici
                  <br /> pour télécharger l'application.
                </p>
                <Arrow className='rotate-[280deg]' />
              </div>
              <Image
                src={qrCode}
                alt='qr code'
                unoptimized
                className='animate-pulse w-[120px] -mt-2'
              />
            </div>
          </Container>
        </nav>
      </header>
      <Container>
        <div>
          <div className='relative z-50  mx-auto  lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6'>
            <div
              className='z-50 scale-[0.7] md:scale-100 flex items-center space-x-4  md:mt-6 mt-2 mx-auto justify-center'
              onClick={handleClick}
            >
              <AppStoreLink />
              <GoogleStoreLink />
            </div>
          </div>
          <a href='https://recosante.beta.gouv.fr' target='_blank'>
            <div className='relative z-10 left-0 right-0 mt-8 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6'>
              <BackgroundIllustration className='absolute  left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0' />
              <div className='-mx-4  px-9  [mask-image:linear-gradient(to_bottom,white_20%,transparent)] sm:mx-0  lg:-inset-x-10 lg:-bottom-20 lg:-top-4 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32'>
                <PhoneFrame className='mx-auto  max-w-[266px] ' priority>
                  <LandingMobileScreen />
                </PhoneFrame>
              </div>
            </div>
          </a>
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
      height='50'
      viewBox='0 0 102 148'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_3_224)'>
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
