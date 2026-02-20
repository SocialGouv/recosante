'use client';

import { Container } from '@/components/Container';
import Logo from '@/components/Logo';
import { GouvLogo } from '@/images/logos/gouv';
import Link from 'next/link';

interface LandingHeaderProps {
  indicatorName: string;
  city: string;
}

export function LandingHeader(props: LandingHeaderProps) {
  return (
    <header>
      <nav>
        <Container className='relative z-50  py-8'>
          <div
            aria-label='Home'
            className='flex items-center  w-full justify-between'
          >
            <Link href='/'>
              <GouvLogo className='h-[80px] md:h-32 w-auto -ml-4 ' />
            </Link>

            <Link href='/'>
              <Logo className='h-8  md:h-16 -mr-10 md:mr-0' />
            </Link>
          </div>
          <div className='relative z-10 mt-12'>
            <h1 className='md:text-3xl w-full text-xl mt-4 md:mt-0 text-dark font-bold'>
              Fermeture du service Recosanté
            </h1>
            <div className='mt-4 md:mt-6 text-sm md:text-base text-gray-700 space-y-4 max-w-3xl'>
              <p>
                Recosanté est un service public numérique conçu dans une démarche d'expérimentation, avec pour objectif de proposer aux citoyens une information fiable, utile et compréhensible, dans le respect des principes du service public.
              </p>
              <p>
                À l'issue de cette phase d'expérimentation, l'évaluation du service montre que celui-ci n'a pas atteint un niveau d'usage et de valeur suffisant pour justifier sa poursuite.
              </p>
              <p>
                Dans ce contexte, et dans une démarche de responsabilité et de bonne gestion, la décision a été prise de mettre fin à l'expérimentation du service Recosanté, dont la poursuite ne se justifie pas au regard de nos exigences de qualité et d'utilité pour les citoyens.
              </p>
              <p className='font-semibold'>
                L'arrêt du service Recosanté sera effectif à compter du 5 mars 2026.
              </p>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
