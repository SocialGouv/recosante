import React from 'react';
import { View } from 'react-native';
import Button from '~/components/ui/button';
import MyText from '~/components/ui/my-text';
import { Skip } from '../skip';
import { OnboardingRouteEnum, RouteEnum } from '~/constants/route';
import { Illu_4 } from '~/assets/onboarding/illu_4';

export function Screen4({ navigation }: { navigation: any }) {
  return (
    <View className="bg-app-primary flex flex-1 items-center justify-around">
      <Skip navigation={navigation} target={3} />
      <MyText
        font="MarianneExtraBold"
        className="text-center text-3xl text-white"
      >
        🔔 Accepter les {'\n'}
        notification
      </MyText>
      <Illu_4 />

      <MyText
        font="MarianneRegular"
        className="px-4 text-center text-xl text-white"
      >
        Activez les notifications pour recevoir des alertes et des
        recommandations personnalisées, vous permettant de prendre des mesures
        préventives en temps réel.
      </MyText>
      <View>
        <Button
          onPress={() => {
            navigation.navigate(OnboardingRouteEnum.SCREEN_5);
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