import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  type NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import * as SplashScreen from 'expo-splash-screen';
import { navigationRef } from '~/services/navigation';

import { initMatomo, logEvent } from './services/logEventsWithMatomo';
import { HomeIcon } from '~/assets/icons/home';
import { SettingsIcon } from '~/assets/icons/settings';
import { ShareIcon } from '~/assets/icons/share';

import MyText from './components/ui/my-text';
import { DashboardPage } from './scenes/dashboard/dashboard';
import { RouteEnum, type RootStackParamList } from './constants/route';
import { Onboarding } from './scenes/onboarding/onboarding';
import { SharePage } from './scenes/share';
import { SettingsPage } from './scenes/settings/settings';
import { LocationPage } from '~/scenes/location';
import { useAddress } from './zustand/address/useAddress';
import { IndicatorSelectorSheet } from './scenes/dashboard/indicator-selector-sheet';
import { useIndicatorsList } from './zustand/indicator/useIndicatorsList';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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

type HomeProps = NativeStackScreenProps<RootStackParamList, RouteEnum.HOME>;
const HomeBottomTab = createBottomTabNavigator();
function Home(props: HomeProps) {
  const { favoriteIndicator } = useIndicatorsList((state) => state);

  useEffect(() => {
    if (!favoriteIndicator) {
      console.log('navigate to indicator selector');
      props.navigation.navigate(RouteEnum.INDICATORS_SELECTOR);
    }
  }, []);

  return (
    <HomeBottomTab.Navigator
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
          position: 'absolute',
          overflow: 'hidden',
          zIndex: 100,
        },
        lazy: false,
      }}
    >
      <HomeBottomTab.Screen
        name={RouteEnum.DASHBOARD}
        options={{
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>Dashboard</TabBarLabel>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <HomeIcon size={size} color={color} focused={focused} />
          ),
        }}
        component={DashboardPage}
      />
      <HomeBottomTab.Screen
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
      <HomeBottomTab.Screen
        name={RouteEnum.SETTINGS}
        component={SettingsPage}
        options={{
          tabBarLabel: (props) => (
            <TabBarLabel {...props}>Paramètres</TabBarLabel>
          ),
          tabBarIcon: ({ size, color, focused }) => (
            <SettingsIcon size={size} color={color} focused={focused} />
          ),
        }}
      />
    </HomeBottomTab.Navigator>
  );
}
// AsyncStorage.clear();
const RootStack = createNativeStackNavigator();
export function Navigators() {
  const { _hasHydrated, address } = useAddress((state) => state);
  const hasAddress = !!address?.citycode;

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
  if (!_hasHydrated) return null;

  return (
    <AutocompleteDropdownContextProvider>
      <BottomSheetModalProvider>
        <NavigationContainer
          onStateChange={onNavigationStateChange}
          onReady={onReady}
          ref={navigationRef}
        >
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={
              hasAddress ? RouteEnum.HOME : RouteEnum.ONBOARDING
            }
          >
            <RootStack.Screen
              name={RouteEnum.ONBOARDING}
              component={Onboarding}
            />
            <RootStack.Screen
              name={RouteEnum.LOCATION}
              component={LocationPage}
              initialParams={{
                isOnboarding: true,
              }}
            />
            <RootStack.Screen name={RouteEnum.HOME} component={Home} />
            <RootStack.Screen name={RouteEnum.SHARE} component={SharePage} />
            <RootStack.Screen
              name={RouteEnum.INDICATORS_SELECTOR}
              component={IndicatorSelectorSheet}
              options={() => ({
                headerShown: false,
                presentation: 'transparentModal',
                //  animation non on enter, fade on exit
                animation: prevCurrentRouteName.current?.includes(
                  RouteEnum.INDICATORS_SELECTOR,
                )
                  ? 'fade'
                  : 'none',
              })}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </AutocompleteDropdownContextProvider>
  );
}
