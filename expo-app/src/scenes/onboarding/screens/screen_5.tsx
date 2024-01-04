import { OnboardingRouteEnum, RouteEnum } from '~/constants/route';
import { View } from 'react-native';
import Button from '~/components/ui/button';
import { Skip } from '../skip';
import { useEffect } from 'react';
import { ExpoPushNotificationService } from '~/services/expo-push-notifs';
import * as Notifications from 'expo-notifications';

export function Screen5({ navigation }: { navigation: any }) {
  async function getNotificationToken() {
    return await Notifications.getExpoPushTokenAsync().then((token) => {
      if (!token) return false;
      return Boolean(token.data);
    });
  }

  useEffect(() => {
    // ask for notification permission
    ExpoPushNotificationService.registerForPushNotificationsAsync();
    // When the user has already granted permission, we can navigate to the home screen
    getNotificationToken().then((hasToken) => {
      if (hasToken) {
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
