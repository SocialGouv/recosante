import NetInfo from '@react-native-community/netinfo';
import * as Sentry from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Matomo from './matomo';
import { MATOMO_URL, MATOMO_IDSITE } from '../config';
import API from './api';

// storage.delete('STORAGE_MATOMO_USER_ID');
export const initMatomo = async () => {
  let userId = await AsyncStorage.getItem('STORAGE_MATOMO_USER_ID');
  if (!userId) {
    userId = Matomo.makeid();
    AsyncStorage.setItem('STORAGE_MATOMO_USER_ID', userId);
    API.post({
      path: '/user',
      body: {
        matomoId: userId,
      },
    });
  }
  Sentry.setUser({ id: userId });
  // TODO: userId does not exist on API :/
  // @ts-ignore
  API.userId = userId;

  const prevVisits = await AsyncStorage.getItem('STORAGE_MATOMO_VISITS');
  const newVisits = prevVisits ? Number(prevVisits) + 1 : 1;
  AsyncStorage.setItem('STORAGE_MATOMO_VISITS', `${newVisits}`);

  Matomo.init({
    baseUrl: MATOMO_URL,
    idsite: MATOMO_IDSITE,
    userId,
    _idvc: newVisits,
  });

  // Matomo.setCustomDimensions({
  //   [1]: "",
  //   [2]: "",
  //   [3]: "",
  //   [4]: "",
  //   [5]: "",
  // });
};

const checkNetwork = async () => {
  const networkState = await NetInfo.fetch();
  if (!networkState.isConnected) return false;
  return true;
};

interface LogEventProps {
  category: string;
  action: string;
  name?: string;
  value?: number | null | undefined;
}
export const logEvent = async ({
  category,
  action,
  name,
  value,
}: LogEventProps) => {
  try {
    const canSend = await checkNetwork();
    if (!canSend) throw new Error('no network');
    // TODO: type Matomo.logEvent
    // @ts-ignore
    Matomo.logEvent({ category, action, name, value });
    const body = {
      event: { category, action, name, value },
      userId: Matomo.userId,
      dimensions: Matomo.dimensions,
    };
    API.post({
      path: '/event',
      body,
    });
  } catch (e) {
    console.log('logEvent error', e);
    console.log('logEvent error', { category, action, name, value });
  }
};
