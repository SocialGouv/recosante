import React from 'react';
import { Alert, View } from 'react-native';
import Button from '~/components/ui/button';
import MyText from '~/components/ui/my-text';
import { Skip } from '../skip';
import { Illu_2 } from '~/assets/onboarding/illu_2';
import { LocationService } from '~/services/location';
import useCommune from '~/zustand/municipality/useMunicipality';
import { CommuneService } from '~/services/commune';
import { OnboardingRouteEnum, RouteEnum } from '~/constants/route';
import { registerForPushNotificationsAsync } from '~/services/expo-push-notifs';

export function Geolocation({ navigation }: { navigation: any }) {
  const saveCommune = useCommune((state) => state.setCommune);

  const onNext = async () => {
    const token = await registerForPushNotificationsAsync({
      force: false,
      expo: true,
    });
    if (token) {
      navigation.navigate(RouteEnum.HOME);
    } else {
      navigation.navigate(OnboardingRouteEnum.NOTIFICATIONS);
    }
  };

  return (
    <View className="flex flex-1 items-center justify-around bg-app-primary">
      <Skip onPress={onNext} />
      <MyText
        font="MarianneExtraBold"
        className="text-center text-3xl text-white"
      >
        📍 Activez la{'\n'} localisation
      </MyText>
      <Illu_2 />

      <MyText
        font="MarianneRegular"
        className=" text-center text-xl text-white"
      >
        Ainsi, nous pouvons vous fournir des informations précises sur la
        qualité de l'air et les risques environnementaux spécifiques à votre
        emplacement.
      </MyText>
      <View>
        <Button
          onPress={async () => {
            const location = await LocationService.requestLocation();
            const municipality =
              await CommuneService.getCommuneByLocation(location);
            if (!municipality) {
              Alert.alert('Erreur', 'Impossible de trouver votre commune');
              return;
            }
            saveCommune(municipality);
            onNext();
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
