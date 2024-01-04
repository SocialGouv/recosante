import React from 'react';
import { View } from 'react-native';
import Button from '~/components/ui/button';
import MyText from '~/components/ui/my-text';
import { Skip } from '../skip';
import { Illu_2 } from '~/assets/onboarding/illu_2';
import { OnboardingRouteEnum } from '~/constants/route';

export function Screen2({ navigation }: { navigation: any }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-primary">
      <Skip navigation={navigation} target={3} />
      <MyText
        font="MarianneExtraBold"
        className="text-center text-3xl text-white"
      >
        📍 Activez la{'\n'} localisation
      </MyText>
      <Illu_2 />

      <MyText
        font="MarianneRegular"
        className="px-4 text-center text-xl text-white"
      >
        Ainsi, nous pouvons vous fournir des informations précises sur la
        qualité de l'air et les risques environnementaux spécifiques à votre
        emplacement.
      </MyText>
      <View>
        <Button
          onPress={() => {
            navigation.navigate(OnboardingRouteEnum.SCREEN_3);
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
