import React from 'react';
import { View } from 'react-native';
import { Illu_1 } from '~/assets/onboarding/illu_1';
import { Logo } from '~/assets/onboarding/logo';
import Button from '~/components/ui/button';
import MyText from '~/components/ui/my-text';
import { Skip } from '../skip';
import { OnboardingRouteEnum } from '~/constants/route';

export function Screen1({ navigation }: { navigation: any }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-primary">
      <Skip navigation={navigation} target={2} />
      <Logo />
      <Illu_1 />

      <MyText
        font="MarianneExtraBold"
        className="text-center text-xl text-white"
      >
        Connaitre son environnement {'\n'} Agir pour protéger sa santé
      </MyText>
      <View className="mt-4">
        <Button
          onPress={() => {
            navigation.navigate(OnboardingRouteEnum.SCREEN_2);
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
