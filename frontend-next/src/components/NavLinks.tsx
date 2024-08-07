'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MatomoService } from '@/services/matomo';

export function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  let timeoutRef = useRef<number | null>(null);

  return [
    ['Mentions légales', '/mentions-legales/'],
    ['Données personnelles', '/donnees-personnelles/'],
    ['Partenaires', '/partenaires/'],
    ['Articles', '/articles/'],
    ['Gestion des cookies', '/cookies/'],
    ['Statistiques', '/stats/'],
    ['Contactez-nous', 'mailto:contact@recosante.beta.gouv.fr'],
    ['', ''],
    ['Accessibilité : partiellement conforme', '/accessibilite'],
  ].map(([label, href], index) => {
    if (!label) {
      return <span key={index} className='text-xs' />;
    }
    return (
      <Link
        onClick={() => MatomoService.trackClick(`footer-link-${href}`)}
        key={label}
        href={href}
        target='_blank'
        className=' relative text-nowrap -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0'
        onMouseEnter={() => {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
          }
          setHoveredIndex(index);
        }}
        onMouseLeave={() => {
          timeoutRef.current = window.setTimeout(() => {
            setHoveredIndex(null);
          }, 200);
        }}
      >
        <AnimatePresence>
          {hoveredIndex === index && (
            <motion.span
              className='absolute inset-0 rounded-lg bg-gray-100'
              layoutId='hoverBackground'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15 },
              }}
            />
          )}
        </AnimatePresence>
        <span className='relative z-10 text-xs'>{label}</span>
      </Link>
    );
  });
}
