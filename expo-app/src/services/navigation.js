// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getRoute(name, params) {
  if (navigationRef.isReady()) {
    return navigationRef?.getCurrentRoute?.()?.name;
  } else {
    return 'INIT';
  }
}

// add other navigation functions that you need and export them
