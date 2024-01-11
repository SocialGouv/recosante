import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '~/components/ui/my-text';
import Button from '~/components/ui/button';
import * as Location from 'expo-location';
import AutoComplete from '~/components/autocomplete-french-cities/autocomplete';
import { useAddress } from '~/zustand/address/useAddress';
import { Address } from '~/types/location';
import { LocationService } from '~/services/location';

interface LocationPageProps {
  navigation: any;
  route: any;
}
export function LocationPage(props: LocationPageProps) {
  const { setAddress } = useAddress((state) => state);

  function handleSelect(address: Address) {
    setAddress(address);
    props.navigation.goBack();
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="none"
      className="w-full flex-1 bg-app-100"
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView className="flex flex-1 items-center justify-start bg-app-100">
        <KeyboardAvoidingView
          enabled
          behavior={
            Platform.select({ ios: 'padding', android: null }) ?? 'padding'
          }
          className="w-full flex-1 flex-col items-center justify-start pt-8"
        >
          <View className="items-center justify-start bg-app-primary p-4">
            <Pressable onPress={() => props.navigation.goBack()}>
              <MyText font="MarianneRegular">← back</MyText>
            </Pressable>
            <View className="flex items-start justify-start">
              <MyText
                font="MarianneBold"
                className="te mb-4  ml-4 w-full text-xl text-white"
              >
                Rechercher
              </MyText>
            </View>
            <View className="z-10 flex-row items-center px-4">
              <AutoComplete setAddress={handleSelect} />
            </View>
          </View>
          <View className="mt-4 flex w-full items-center justify-center ">
            <Button
              onPress={async () => {
                Location.requestForegroundPermissionsAsync().then(
                  async ({ status }) => {
                    if (status !== 'granted') {
                      Alert.alert(
                        'Permission not granted to access your location',
                        'You can change that in your settings',
                        [
                          {
                            text: 'Open Settings',
                            onPress: () => Linking.openSettings(),
                          },
                          {
                            text: 'OK',
                            style: 'cancel',
                            onPress: () => {},
                          },
                        ],
                      );
                      return;
                    }
                    const location = await Location.getCurrentPositionAsync({});
                    const { latitude, longitude } = location.coords;

                    const formatedAdress =
                      await LocationService.getAdressByCoordinates(
                        latitude,
                        longitude,
                      );
                    if (formatedAdress) {
                      handleSelect(formatedAdress);
                    }
                  },
                );
              }}
              viewClassName="bg-app-yellow"
              textClassName="text-black text-sm"
            >
              Suivre le lieu le plus proche
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
}
