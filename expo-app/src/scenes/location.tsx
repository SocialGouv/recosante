import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import { Alert, Linking, Pressable, View } from 'react-native';
import MyText from '~/components/ui/my-text';
import * as Location from 'expo-location';
import AutoComplete from '~/components/autocomplete-french-cities/autocomplete';
import { useAddress } from '~/zustand/address/useAddress';
import { type Address } from '~/types/location';
import { LocationService } from '~/services/location';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { LocationIcon } from '~/assets/icons/location';

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
  const bottomSheetRef = useRef<BottomSheet>(null);

  const navigation = useNavigation();
  const snapPoints = useMemo(() => ['20%', '50%', '90%'], []);
  const isOpenedRef = useRef(false);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      isOpenedRef.current = false;
    }
  }, []);

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    isOpenedRef.current = false;
    navigation.goBack();
  }

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={() => {
        closeBottomSheet();
      }}
      handleStyle={{
        backgroundColor: '#3343BD',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#3343BD',
      }}
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
          <Pressable
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
                          onPress: async () => {
                            await Linking.openSettings();
                          },
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
            className="mx-4 rounded-full bg-app-yellow p-4"
          >
            <LocationIcon />
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}
