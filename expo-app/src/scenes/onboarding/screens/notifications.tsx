import React from 'react';
import { View } from 'react-native';
import Button from '~/components/ui/button';
import MyText from '~/components/ui/my-text';
import { Skip } from '../skip';
import { Illu_4 } from '~/assets/onboarding/illu_4';
import { registerForPushNotificationsAsync } from '~/services/expo-push-notifs';
import { RouteEnum } from '~/constants/route';
import API from '~/services/api';

export function Notifications({ navigation }: { navigation: any }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-primary">
      <Skip onPress={() => navigation.navigate(RouteEnum.HOME)} />
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
        className=" text-center text-xl text-white"
      >
        Activez les notifications pour recevoir des alertes et des
        recommandations personnalisées, vous permettant de prendre des mesures
        préventives en temps réel.
      </MyText>
      <View>
        <Button
          onPress={async () => {
            const token = await registerForPushNotificationsAsync({
              force: true,
              expo: true,
            });
            if (token) {
              API.put({
                path: '/user',
                body: { push_notif_token: JSON.stringify(token) },
              });
            }
            navigation.navigate(RouteEnum.HOME);
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
