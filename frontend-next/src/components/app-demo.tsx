'use client';

import Image from 'next/image';
import { AppScreen } from '@/components/AppScreen';
import ScreenShot from '@/images/screenshot/hp.webp';

export function LandingMobileScreen() {
  return (
    <AppScreen>
      <Image src={ScreenShot} alt='App demo' priority className='z-50' />
    </AppScreen>
  );
}
