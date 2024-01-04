import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen1 } from './screens/screen_1';
import { Screen2 } from './screens/screen_2';
import { Screen3 } from './screens/screen_3';
import { Screen4 } from './screens/screen_4';
import { Screen5 } from './screens/screen_5';

import { OnboardingRouteEnum } from '~/constants/route';

const OnboardingStack = createNativeStackNavigator();
export function Onboarding() {
  return (
    <SafeAreaView className="bg-app-primary flex flex-1">
      <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.SCREEN_1}
          component={Screen1}
        />
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.SCREEN_2}
          component={Screen2}
        />
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.SCREEN_3}
          component={Screen3}
        />
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.SCREEN_4}
          component={Screen4}
        />
        <OnboardingStack.Screen
          name={OnboardingRouteEnum.SCREEN_5}
          component={Screen5}
        />
      </OnboardingStack.Navigator>
    </SafeAreaView>
  );
}
