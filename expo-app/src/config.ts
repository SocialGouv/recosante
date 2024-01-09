// BE CAREFUL if you dev on Android Emulator
// don't define `EXPO_PUBLIC_API_HOST` such as `localhost:3000` because
// Android Emulator's connection to local api doesn't work with `localhost`
// you need to use `${ip}:3000` instead
// how ?
// 1. if you are in wifi:
//   a. in your .env.local, replace `EXPO_PUBLIC_API_HOST=localhost:3000` by `EXPO_PUBLIC_API_HOST=0.0.0.0:3636` running `npm run get-ip`
//   a. run `npm run get-ip` that will replace `0.0.0.0` with your local ip
// 2. if you are in ethernet, the script will not work, you need to replace manually

export const API_SCHEME = process.env.EXPO_PUBLIC_API_SCHEME;
export const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
export const MATOMO_IDSITE = null;
export const MATOMO_URL = 'https://matomo.fabrique.social.gouv.fr';
