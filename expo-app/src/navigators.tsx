import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import * as SplashScreen from 'expo-splash-screen';
import { navigationRef } from '~/services/navigation';

import IndicatorsList from '~/scenes/indicators-list/indicators-list';
import OnboardingGeolocation from '~/scenes/onboarding-geolocation';
import { initMatomo, logEvent } from './services/logEventsWithMatomo';
import useMunicipality from './zustand/municipality/useMunicipality';
import { HomeIcon } from '~/assets/icons/home';
import { SettingsIcon } from '~/assets/icons/settings';
import { ShareIcon } from '~/assets/icons/share';

import MyText from './components/ui/my-text';
import { IndicatorPage } from './scenes/indicator.page';
import { RouteEnum } from './constants/route';
import { Onboarding } from './scenes/onboarding';
import { SharePage } from './scenes/share.page';

interface TabBarLabelProps {
  children: React.ReactNode;
  focused: boolean;
}
function TabBarLabel(props: TabBarLabelProps) {
  return (
    <MyText
      font={props.focused ? 'MarianneBold' : 'MarianneRegular'}
      className={[
        '-mt-1 mb-1 text-xs',
        props.focused ? 'text-app-950' : 'text-gray-500',
      ].join(' ')}
    >
      {props.children}
    </MyText>
  );
}

const BottomTab = createBottomTabNavigator();
function Home() {
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: '#3343BD' }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#3343BD',
          borderTopWidth: 0,
          borderRadius: 500,
          paddingBottom: -10,
          margin: 12,
        },
        lazy: false,
      }}
    >
      <BottomTab.Screen
        name={RouteEnum.INDICATOR_SCENE}
        options={{
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>Indicateurs</TabBarLabel>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <HomeIcon size={size} color={color} focused={focused} />
          ),
        }}
        component={IndicatorsList}
      />
      <BottomTab.Screen
        name={RouteEnum.SHARE}
        options={{
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>Partager</TabBarLabel>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <ShareIcon size={size} color={color} focused={focused} />
          ),
        }}
        component={SharePage}
      />
      <BottomTab.Screen
        name={RouteEnum.SETTINGS}
        component={OnboardingGeolocation}
        options={{
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>Paramètres</TabBarLabel>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <SettingsIcon size={size} color={color} focused={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

export function Navigators() {
  const hasHydrated = useMunicipality((state) => state._hasHydrated);
  const hasCommune = useMunicipality(
    (state) => !!state.municipality?.nom && !!state.municipality?.code,
  );

  async function onReady() {
    await initMatomo();
    await SplashScreen.hideAsync();
    await logEvent({ category: 'APP', action: 'APP_OPEN' });
  }

  const prevCurrentRouteName = useRef(null);
  async function onNavigationStateChange() {
    if (!navigationRef.isReady()) return;
    const route = navigationRef.getCurrentRoute();
    if (route?.name === prevCurrentRouteName.current) return;
    if (!prevCurrentRouteName) return;
    if (!route?.name) return;
    // TODO: check this
    // @ts-ignore
    prevCurrentRouteName.current = route.name;
    logEvent({ category: 'NAVIGATION', action: route.name });
  }

  if (!hasHydrated) return null;

  return (
    <AutocompleteDropdownContextProvider>
      <NavigationContainer
        onStateChange={onNavigationStateChange}
        onReady={onReady}
        ref={navigationRef}
      >
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={hasCommune ? RouteEnum.HOME : RouteEnum.ONBOARDING}
        >
          <RootStack.Screen
            name={RouteEnum.ONBOARDING}
            component={Onboarding}
          />
          <RootStack.Screen
            name={RouteEnum.ONBOARDING_GEOLOCATION}
            component={OnboardingGeolocation}
            initialParams={{
              isOnboarding: true,
            }}
          />
          <RootStack.Screen name={RouteEnum.HOME} component={Home} />
          <RootStack.Screen
            name={RouteEnum.INDICATOR_SCENE}
            component={IndicatorPage}
          />
          <RootStack.Screen name={RouteEnum.SHARE} component={SharePage} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AutocompleteDropdownContextProvider>
  );
}
