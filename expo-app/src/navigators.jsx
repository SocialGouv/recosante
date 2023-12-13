import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
// import { useHeaderHeight } from "@react-navigation/elements";
import * as SplashScreen from "expo-splash-screen";
import { navigationRef } from "~/services/navigation";
import Onboarding from "~/scenes/Onboarding";
import IndicatorsList from "~/scenes/IndicatorsList";
import OnboardingGeolocation from "~/scenes/OnboardingGeolocation";
import { initMatomo, logEvent } from "./services/logEventsWithMatomo";

const BottomTab = createBottomTabNavigator();
function Home() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="INDICATORS_LIST" component={IndicatorsList} />
      <BottomTab.Screen name="SETTINGS" component={OnboardingGeolocation} />
    </BottomTab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();
function Navigators() {
  const onReady = async () => {
    await initMatomo();
    await SplashScreen.hideAsync();
    await logEvent({ category: "APP", action: "APP_OPEN" });
  };

  const prevCurrentRouteName = useRef(null);
  const onNavigationStateChange = async () => {
    if (!navigationRef.isReady()) return;
    const route = navigationRef.getCurrentRoute();
    if (route.name === prevCurrentRouteName.current) return;
    prevCurrentRouteName.current = route.name;
    logEvent({ category: "NAVIGATION", action: route.name });
  };

  return (
    <AutocompleteDropdownContextProvider>
      <NavigationContainer
        onStateChange={onNavigationStateChange}
        onReady={onReady}
        ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="ONBOARDING" component={Onboarding} />
          <RootStack.Screen name="ONBOARDING_GEOLOCATION" component={OnboardingGeolocation} />
          <RootStack.Screen name="HOME" component={Home} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AutocompleteDropdownContextProvider>
  );
}

export default Navigators;
