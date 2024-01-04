import React, { useEffect } from 'react';
import { Linking, View, Alert } from 'react-native';
import Button from '~/components/ui/button';
import { Skip } from '../skip';
import * as Location from 'expo-location';

import { OnboardingRouteEnum } from '~/constants/route';
import useCommune from '~/zustand/municipality/useMunicipality';
import { LocationService } from '~/services/location';
import { CommuneService } from '~/services/commune';

export function Screen3({ navigation }: { navigation: any }) {
  const saveCommune = useCommune((state) => state.setCommune);
  useEffect(() => {
    LocationService.requestLocation().then((location) => {
      CommuneService.getCommuneByLocation(location).then((commune) => {
        if (!commune) {
          return;
        }
        saveCommune(commune);
      });
    });
  }, []);

  return (
    <View className="flex flex-1 items-center justify-around bg-app-primary">
      <Skip navigation={navigation} target={3} />
      <View className="absolute bottom-20">
        <Button
          onPress={() => {
            navigation.navigate(OnboardingRouteEnum.SCREEN_4);
          }}
          viewClassName="bg-app-yellow p-4"
          textClassName="text-black"
          font="MarianneMedium"
        >
          C'est parti !
        </Button>
      </View>
    </View>
  );
}
