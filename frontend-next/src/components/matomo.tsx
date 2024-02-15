'use client';

const MATOMO_URL =
  process.env.NEXT_PUBLIC_MATOMO_URL ||
  'https://matomo.fabrique.social.gouv.fr';
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '108';
import { init } from '@socialgouv/matomo-next';
import { useEffect } from 'react';

export function Matomo() {
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID, disableCookies: true });
  }, []);
  return null;
}
