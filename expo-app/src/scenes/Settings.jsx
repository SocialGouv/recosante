import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "~/components/MyText";
import Button from "~/components/Button";

function Settings({ navigation }) {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-start bg-app-100">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        Paramètres
      </MyText>
      <View className="mt-4">
        <Button
          onPress={() => {
            navigation.navigate("OnboardinScreen5");
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
    </SafeAreaView>
  );
}

export default Settings;
