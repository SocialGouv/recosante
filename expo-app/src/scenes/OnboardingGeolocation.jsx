import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "~/components/MyText";
import Button from "~/components/Button";
import AutoCompleteFrenchCities from "../components/AutoCompleteFrenchCities";
import * as Location from "expo-location";

export default function OnboardingGeolocation({ navigation }) {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="none"
      className="w-full flex-1 bg-app-100"
      contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView className="flex flex-1 items-center justify-start bg-app-100">
        <KeyboardAvoidingView
          enabled
          behavior={Platform.select({ ios: "padding", android: null })}
          className="w-full flex-1 flex-col items-center justify-start pt-8">
          <MyText font="MarianneExtraBold" className="px-4 text-center text-3xl">
            Des indicateurs près de chez vous
          </MyText>

          {!selectedCity ? (
            <View className="w-full flex-1 items-center justify-center">
              <View>
                <Button
                  onPress={async () => {
                    Location.requestForegroundPermissionsAsync().then(async ({ status }) => {
                      if (status !== "granted") {
                        Alert.alert(
                          "Permission not granted to access your location",
                          "You can change that in your settings",
                          [
                            { text: "Open Settings", onPress: () => Linking.openSettings() },
                            { text: "OK", style: "cancel", onPress: () => {} },
                          ]
                        );
                        return;
                      }
                      const location = await Location.getCurrentPositionAsync({});
                      const { latitude, longitude } = location.coords;
                      const url = new URL("https://geo.api.gouv.fr/communes");
                      url.searchParams.append("boost", "population");
                      url.searchParams.append("limit", "1");
                      url.searchParams.append("fields", "nom,code,codesPostaux");
                      url.searchParams.append("lon", longitude);
                      url.searchParams.append("lat", latitude);
                      const response = await fetch(url).then((res) => res.json());
                      if (response?.length) setSelectedCity(response[0]);
                      if (!response?.length)
                        Alert.alert("Erreur", "Impossible de trouver votre ville");
                    });
                  }}
                  viewClassName="bg-app-900">
                  Accéder à ma position
                </Button>
              </View>
              <View className="my-4">
                <MyText className="text-center">ou rentrez votre ville ici</MyText>
              </View>
              <View className="z-10 flex-row items-center px-4">
                <AutoCompleteFrenchCities setSelectedCity={setSelectedCity} />
              </View>
            </View>
          ) : (
            <View className="w-full flex-1 items-center justify-center">
              <MyText font="MarianneBold" className="text-center text-3xl">
                {selectedCity.nom}
              </MyText>
              <MyText font="MarianneMedium" className="mt-4 text-lg">
                (
                {selectedCity.codesPostaux.length > 2
                  ? `${selectedCity.codesPostaux[0]}..${selectedCity.codesPostaux.at(-1)}`
                  : selectedCity.codesPostaux.length === 2
                  ? `${selectedCity.codesPostaux[0]}, ${selectedCity.codesPostaux[1]}`
                  : selectedCity.codesPostaux[0]}
                )
              </MyText>
            </View>
          )}

          <View>
            <Button
              onPress={() => {
                navigation.navigate("HOME");
              }}
              disabled={!selectedCity}
              viewClassName="bg-app-900">
              Suivant
            </Button>
            <Button
              onPress={() => {
                if (selectedCity) {
                  setSelectedCity(null);
                } else {
                  navigation.goBack();
                }
              }}
              viewClassName="mt-8"
              textClassName="underline text-black text-sm">
              {selectedCity ? "Choisir une autre ville" : "Précédent"}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
}
