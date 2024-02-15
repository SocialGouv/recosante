import { init, push } from '@socialgouv/matomo-next';
const MATOMO_URL =
  process.env.NEXT_PUBLIC_MATOMO_URL ||
  'https://matomo.fabrique.social.gouv.fr';
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '108';

export namespace MatomoService {
  export function initialize() {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID, disableCookies: true });
  }
  export function trackClick(action: string) {
    push(['trackEvent', action, 'click']);
  }
}
