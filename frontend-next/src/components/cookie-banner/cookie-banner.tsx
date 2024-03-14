'use client';

import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { setGTag } from './utils';
import { Button } from '../Button';

export function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showPreference, setShowPreference] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  function hideBanner() {
    sessionStorage.setItem('hideCookieBanner', 'true');
    closeBanner();
  }
  function closeBanner() {
    setShowCookieBanner(false);
  }

  function handleChangePreference() {
    setShowPreference((showPreference) => !showPreference);
  }

  function handleGtagChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }

  function allowAllCookies() {
    setGTag();
    hideBanner();
  }

  function acceptSelection() {
    if (isSelected) {
      setGTag();
    }
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
        <br />
        <p
          onClick={handleChangePreference}
          className='underline cursor-pointer'
        >
          Voir la sélection
        </p>
      </div>
      {showPreference ? (
        <div className='my-4 '>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={isSelected}
              onChange={handleGtagChange}
            />
            <p className='text-sm'>Google Tag Manager</p>
          </label>
        </div>
      ) : null}
      <div>
        <Button
          className='rounded-none'
          variant='outline'
          onClick={allowAllCookies}
        >
          Accepter tous les cookies
        </Button>
        <Button
          className=' ml-4 rounded-none'
          variant='outline'
          onClick={acceptSelection}
        >
          Accepter la sélection
        </Button>
        <Button
          className=' ml-4 rounded-none'
          variant='outline'
          onClick={hideBanner}
        >
          Refuser tous les cookies
        </Button>
      </div>
    </div>
  );
}
