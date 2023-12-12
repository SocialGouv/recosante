// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { navigationRef } from "./services/navigation";
import Onboarding from "./scenes/Onboarding";

const Stack = createNativeStackNavigator();

function Navigators() {
  return (
    <NavigationContainer onReady={SplashScreen.hideAsync} ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ONBOARDING" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigators;
