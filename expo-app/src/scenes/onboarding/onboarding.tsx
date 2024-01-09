import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Welcome } from './screens/welcome';
import { Geolocation } from './screens/geolocation';
import { Notifications } from './screens/notifications';
import { Screen4 } from './screens/screen_4';
import { Screen5 } from './screens/screen_5';

import { OnboardingRouteEnum } from '~/constants/route';

const OnboardingStack = createNativeStackNavigator();
export function Onboarding() {
  return (
    <SafeAreaView className="flex flex-1 bg-app-primary px-4">
      <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.WELCOME}
          component={Welcome}
        />
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.GEOLOCATION}
          component={Geolocation}
        />
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.NOTIFICATIONS}
          component={Notifications}
        />
      </OnboardingStack.Navigator>
    </SafeAreaView>
  );
}
