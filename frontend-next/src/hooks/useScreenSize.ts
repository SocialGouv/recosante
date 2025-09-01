'use client';

import { useState, useEffect } from 'react';

export function useScreenSize() {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Fonction pour mettre à jour la taille d'écran
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 1024); // Breakpoint lg de Tailwind
    };

    // Mise à jour initiale
    updateScreenSize();

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', updateScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return {
    isMobile,
    screenWidth,
    isDesktop: !isMobile
  };
}
