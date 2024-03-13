'use client';

import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { setGTag } from './utils';
import { Button } from '../Button';

export function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  function hideBanner() {
    sessionStorage.setItem('hideCookieBanner', 'true');
    closeBanner();
  }
  function closeBanner() {
    setShowCookieBanner(false);
  }
  function allowCookies() {
    setGTag();
    hideBanner();
  }

  useEffect(() => {
    const hideCookieBanner = sessionStorage.getItem('hideCookieBanner');
    if (!hideCookieBanner) {
      setShowCookieBanner(true);
    }
  }, []);

  return (
    <div
      className={`${
        showCookieBanner ? 'translate-y-0' : 'translate-y-[100%]'
      } duration-200 transition-all bg-white md:p-12 p-4 fixed bottom-0 right-0 z-[99999] max-w-3xl text-black `}
    >
      <h3 className='text-xl font-bold mb-4'>Ce site utilise des cookies</h3>
      <div className='absolute top-4 right-4'>
        <XMarkIcon className='w-6 h-6 cursor-pointer' onClick={closeBanner} />
      </div>
      <div className='mb-4 '>
        Les cookies nous permettent de vous offrir des fonctionnalités utiles et
        de mesurer les performances afin d’améliorer votre expérience. Veuillez
        consulter notre politique de confidentialité pour en savoir plus.
        <Link
          className='underline ml-1 font-bold '
          href='/cookies'
          target='_blank'
        >
          Cookies et mesure d’audience
        </Link>
      </div>

      <div>
        <Button
          className='rounded-none'
          variant='outline'
          onClick={allowCookies}
        >
          Accepter les cookies
        </Button>
        <Button
          className=' ml-4 rounded-none'
          variant='outline'
          onClick={hideBanner}
        >
          Reffuser les cookies
        </Button>
      </div>
    </div>
  );
}
