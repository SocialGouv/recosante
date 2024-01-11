export enum RouteEnum {
  DASHBOARD = 'DASHBOARD',
  INDICATORS_SELECTOR = 'INDICATORS_SELECTOR',
  SETTINGS = 'SETTINGS',
  HOME = 'HOME',
  ONBOARDING = 'ONBOARDING',
  LOCATION = 'LOCATION',
  SHARE = 'SHARE',
}

export type RootStackParamList = {
  [RouteEnum.LOCATION]: undefined;
  [RouteEnum.HOME]: undefined;
  [RouteEnum.SHARE]: undefined;
  [RouteEnum.INDICATORS_SELECTOR]: undefined;
};

export enum OnboardingRouteEnum {
  WELCOME = 'WELCOME',
  GEOLOCATION = 'GEOLOCATION',
  NOTIFICATIONS = 'NOTIFICATIONS',
}
