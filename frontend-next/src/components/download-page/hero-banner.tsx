import { useId } from 'react';
import { LandingMobileScreen } from '@/components/app-demo';
import { Container } from '@/components/Container';
import { PhoneFrame } from '@/components/PhoneFrame';
import { GouvLogo } from '@/images/logos/gouv';
import { Logo } from '../Logo';
import { AppStoreLink } from '../AppStoreLink';
import { GoogleStoreLink } from '../GoogleStoreLink';

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
    <div className='overflow-hidden py-8 sm:py-8 lg:pb-32 xl:pb-36 '>
      <Container>
        <div className='md:grid lg:grid-cols-12 lg:gap-x-8 grid-cols-2 lg:gap-y-12'>
          <div className='relative z-10 mx-auto  lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6'>
            <h1 className='lg:text-5xl text-4xl  font-bold  tracking-tight text-app-primary  font-app uppercase'>
              Votre nouvelle application de santé au quotidien.
            </h1>
            <p className='mt-6 text-lg text-gray-600 '>
              Une application gratuite et personnalisable pour protéger votre
              santé et celle de votre famille.
            </p>
            <div className='mt-12 flex md:justify-start space-x-2 justify-center '>
              <AppStoreLink />
              <GoogleStoreLink />
            </div>
            <p className='text-center text-sm mt-8 text-gray-500 lg:text-left'>
              Les recommandations sont issues de sources fiables et validés par
              le Haut conseil de santé publique et Santé publique France.
            </p>

            <div className='relative mt-24 space-x-4  flex justify-start items-center'>
              <GouvLogo className='h-32 w-auto -ml-4' />
              <Logo className='h-20 w-auto' />
            </div>
          </div>
          <div className='relative hidden md:block  mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6'>
            <BackgroundIllustration className='absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0' />
            <div className='-mx-4  px-9 [mask-image:linear-gradient(to_bottom,white_20%,transparent)] sm:mx-0  lg:-inset-x-10 lg:-bottom-20 lg:-top-4 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32'>
              <PhoneFrame className='mx-auto max-w-[466px]' priority>
                <LandingMobileScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}