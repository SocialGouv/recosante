// fetch from localhost not working, need to use IP instead
// Fill in your IP address here
const IP = '192.168.1.13';

export const API_SCHEME = process.env.EXPO_PUBLIC_API_SCHEME;
export const API_HOST =
  process.env.NODE_ENV === 'development'
    ? `${IP}:3636/`
    : process.env.EXPO_PUBLIC_API_HOST;
export const MATOMO_IDSITE = null;
export const MATOMO_URL = 'https://matomo.fabrique.social.gouv.fr';
