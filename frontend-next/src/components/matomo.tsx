'use client';

import { MatomoService } from '@/services/matomo';
import { useEffect } from 'react';

export function Matomo() {
  useEffect(() => {
    MatomoService.initialize();
  }, []);
  return null;
}
