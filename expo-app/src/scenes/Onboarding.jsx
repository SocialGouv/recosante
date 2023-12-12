// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/MyText";

const OnboardingStack = createNativeStackNavigator();
function Onboarding() {
  return (
    <SafeAreaView className="flex flex-1 bg-app-100">
      <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnboardingStack.Screen name="OnboardinScreen1" component={OnboardinScreen1} />
      </OnboardingStack.Navigator>
    </SafeAreaView>
  );
}

function OnboardinScreen1() {
  return (
    <View className="flex flex-1 items-center justify-center bg-app-100">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        Bienvenue{"\u000A"}sur{"\u000A"}Recosanté !
      </MyText>
    </View>
  );
}

export default Onboarding;
