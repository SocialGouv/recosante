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
import useCommune from "./zustand/useCommune";
import Cloud from "./assets/images/Cloud";
import MyText from "./components/MyText";
import InfosIcon from "./assets/images/Infos";

const TabBarLabel = ({ children, focused }) => (
  <MyText
    font={focused ? "MarianneBold" : "MarianneRegular"}
    className={["-mt-1 mb-1 text-xs", focused ? "text-app-950" : "text-gray-500"].join(" ")}>
    {children}
  </MyText>
);

const BottomTab = createBottomTabNavigator();
function Home() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000091",
        tabBarInactiveTintColor: "#767676",
        keyboardHidesTabBar: true,
        lazy: false,
      }}>
      <BottomTab.Screen
        name="INDICATORS_LIST"
        options={{
          tabBarLabel: (props) => <TabBarLabel {...props}>Indicateurs</TabBarLabel>,
          tabBarIcon: ({ size, color }) => <Cloud size={size} color={color} />,
        }}
        component={IndicatorsList}
      />
      <BottomTab.Screen
        name="SETTINGS"
        component={OnboardingGeolocation}
        options={{
          tabBarLabel: (props) => <TabBarLabel {...props}>Paramètres</TabBarLabel>,
          tabBarIcon: ({ size, color }) => <InfosIcon size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();
function Navigators() {
  const hasHydrated = useCommune((state) => state._hasHydrated);
  const hasCommune = useCommune((state) => !!state.commune?.nom && !!state.commune?.code);

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

  if (!hasHydrated) return null;

  return (
    <AutocompleteDropdownContextProvider>
      <NavigationContainer
        onStateChange={onNavigationStateChange}
        onReady={onReady}
        ref={navigationRef}>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={hasCommune ? "HOME" : "ONBOARDING"}>
          <RootStack.Screen name="ONBOARDING" component={Onboarding} />
          <RootStack.Screen
            name="ONBOARDING_GEOLOCATION"
            component={OnboardingGeolocation}
            initialParams={{
              isOnboarding: true,
            }}
          />
          <RootStack.Screen name="HOME" component={Home} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AutocompleteDropdownContextProvider>
  );
}

export default Navigators;
