import { OnboardingRouteEnum, RouteEnum } from '~/constants/route';
import { View } from 'react-native';
import Button from '~/components/ui/button';
import { Skip } from '../skip';
import { useEffect } from 'react';
import { ExpoPushNotificationService } from '~/services/expo-push-notifs';

export function Screen5({ navigation }: { navigation: any }) {
  useEffect(() => {
    ExpoPushNotificationService.registerForPushNotificationsAsync({
      force: true,
    }).then((token) => {
      if (token) {
        navigation.navigate(RouteEnum.HOME);
      }
    });
  }, []);
  return (
    <View className="bg-app-primary flex flex-1 items-center justify-around">
      <Skip navigation={navigation} target={3} />

      <View className="absolute bottom-20">
        <Button
          onPress={() => {
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
