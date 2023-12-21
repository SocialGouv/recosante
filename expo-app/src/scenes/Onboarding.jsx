import * as React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "~/components/MyText";
import Button from "~/components/Button";

const OnboardingStack = createNativeStackNavigator();
function Onboarding() {
  return (
    <SafeAreaView className="flex flex-1 bg-app-100">
      <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnboardingStack.Screen name="ONBOARDINSCREEN_1" component={OnboardinScreen1} />
        <OnboardingStack.Screen name="ONBOARDINSCREEN_2" component={OnboardinScreen2} />
        <OnboardingStack.Screen name="ONBOARDINSCREEN_3" component={OnboardinScreen3} />
        <OnboardingStack.Screen name="ONBOARDINSCREEN_4" component={OnboardinScreen4} />
      </OnboardingStack.Navigator>
    </SafeAreaView>
  );
}

function OnboardinScreen1({ navigation }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-100">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        Bienvenue{"\u000A"}sur{"\u000A"}Recosanté !
      </MyText>
      <View className="mt-4">
        <Button
          onPress={() => {
            navigation.navigate("ONBOARDINSCREEN_2");
          }}
          viewClassName="bg-app-900">
          Commencer
        </Button>
      </View>
    </View>
  );
}

function OnboardinScreen2({ navigation }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-100">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        Suivez les indicateurs environnementaux{"\u000A"}de votre choix
      </MyText>
      <View className="mt-4">
        <Button
          onPress={() => {
            navigation.navigate("ONBOARDINSCREEN_3");
          }}
          viewClassName="bg-app-900">
          Suivant
        </Button>
        <Button
          onPress={navigation.goBack}
          viewClassName="mt-8"
          textClassName="underline text-black text-sm">
          Précédent
        </Button>
      </View>
    </View>
  );
}

function OnboardinScreen3({ navigation }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-100">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        En fonction{"\u000A"}de votre localisation
      </MyText>
      <View className="mt-4">
        <Button
          onPress={() => {
            navigation.navigate("ONBOARDINSCREEN_4");
          }}
          viewClassName="bg-app-900">
          Suivant
        </Button>
        <Button
          onPress={navigation.goBack}
          viewClassName="mt-8"
          textClassName="underline text-black text-sm">
          Précédent
        </Button>
      </View>
    </View>
  );
}

function OnboardinScreen4({ navigation }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-100">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        Recevez des recommandations{"\u000A"}lors d'alertes
      </MyText>
      <View className="mt-4">
        <Button
          onPress={() => {
            navigation.navigate("ONBOARDING_GEOLOCATION");
          }}
          viewClassName="bg-app-900">
          Suivant
        </Button>
        <Button
          onPress={navigation.goBack}
          viewClassName="mt-8"
          textClassName="underline text-black text-sm">
          Précédent
        </Button>
      </View>
    </View>
  );
}

export default Onboarding;
