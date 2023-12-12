import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';
import Matomo from './matomo';
import { MATOMO_IDSITE_1, MATOMO_IDSITE_2, MATOMO_URL, MATOMO_URL_2 } from '../config';
import { mapOnboardingResultToMatomoProfile } from '../scenes/Quizzs/QuizzOnboarding/utils';
import { storage } from './storage';
import CONSTANTS from '../reference/constants';
import API from './api';

// https://docs.google.com/spreadsheets/d/1FzFrt-JsNK-OXqBz8f5sop3BcHhcvjGieZUF4gXHBJg/edit#gid=367769533

const parseStringMaybeStringified = (string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

// storage.delete('@UserIdv2');
export const initMatomo = async () => {
  let userId = storage.getString('@UserIdv2');
  if (!userId) {
    userId = Matomo.makeid();
    storage.set('@UserIdv2', userId);
    API.put({
      path: '/user',
      body: {
        matomoId: userId,
      },
    });
  }
  Sentry.setUser({ id: userId });
  API.userId = userId;

  const prevVisits = storage.getString('@NumberOfVisits');
  const newVisits = prevVisits ? Number(prevVisits) + 1 : 1;
  storage.set('@NumberOfVisits', `${newVisits}`);

  Matomo.init({
    baseUrl: MATOMO_URL,
    idsite: MATOMO_IDSITE_1,
    userId,
    _idvc: newVisits,
  });

  Matomo.init2({
    baseUrl: MATOMO_URL_2,
    idsite: MATOMO_IDSITE_2,
  });

  const resultKey = parseStringMaybeStringified(storage.getString('@Quizz_result') ?? '""');
  const betterEval = storage.getString('@QuizzEvaluateConso_result');
  const result = betterEval ? JSON.parse(betterEval)?.scoreAddiction : resultKey;
  const gender = parseStringMaybeStringified(storage.getString('@Gender'));
  const age = storage.getNumber('@Age');

  Matomo.setCustomDimensions({
    [CONSTANTS.MATOMO_CUSTOM_DIM_VERSION]: DeviceInfo.getVersion(),
    [CONSTANTS.MATOMO_CUSTOM_DIM_SYSTEM]: Platform.OS,
    [CONSTANTS.MATOMO_CUSTOM_DIM_PROFILE]: mapOnboardingResultToMatomoProfile(result),
    [CONSTANTS.MATOMO_CUSTOM_DIM_GENDER]: gender,
    [CONSTANTS.MATOMO_CUSTOM_DIM_AGE]: age,
  });
};

const checkNetwork = async () => {
  const networkState = await NetInfo.fetch();
  if (!networkState.isConnected) return false;
  return true;
};

export const logEvent = async ({ category, action, name, value, dimension6 }) => {
  try {
    const canSend = await checkNetwork();
    if (!canSend) throw new Error('no network');
    Matomo.logEvent({ category, action, name, value, dimension6 });
    const body = {
      event: { category, action, name, value, dimension6 },
      userId: Matomo.userId,
      dimensions: Matomo.dimensions,
    };
    API.post({
      path: '/event',
      body,
    });
  } catch (e) {
    console.log('logEvent error', e);
    console.log('logEvent error', { category, action, name, value, dimension6 });
  }
};
