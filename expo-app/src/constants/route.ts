import type { DayEnum } from '~/types/day';
import type { IndicatorCommonData } from '~/types/indicator';

export enum RouteEnum {
  DASHBOARD = 'DASHBOARD',
  INDICATORS_SELECTOR = 'INDICATORS_SELECTOR',
  INDICATOR_DETAIL = 'INDICATOR_DETAIL',
  SETTINGS = 'SETTINGS',
  HOME = 'HOME',
  ONBOARDING = 'ONBOARDING',
  LOCATION = 'LOCATION',
  SHARE = 'SHARE',
}

export interface RootStackParamList {
  [RouteEnum.LOCATION]: {
    isOnboarding: true;
  };
  [RouteEnum.HOME]: undefined;
  [RouteEnum.SHARE]: undefined;
  [RouteEnum.INDICATORS_SELECTOR]: {
    enablePanDownToClose: boolean;
  };
  [RouteEnum.INDICATOR_DETAIL]: {
    indicator: IndicatorCommonData;
    day: DayEnum;
  };
}

export enum OnboardingRouteEnum {
  WELCOME = 'WELCOME',
  GEOLOCATION = 'GEOLOCATION',
  NOTIFICATIONS = 'NOTIFICATIONS',
}
