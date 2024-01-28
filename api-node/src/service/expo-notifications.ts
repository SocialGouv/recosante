import { Expo } from 'expo-server-sdk';
import { capture } from '~/third-parties/sentry';
import type { ExpoPushMessage } from 'expo-server-sdk';

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

console.log(process.env.EXPO_ACCESS_TOKEN);

type SendPushNotificationParams = {
  pushToken: string;
  title: string;
  body: string;
  data: any;
};

export function sendPushNotification({
  pushToken,
  title,
  body,
  data,
}: SendPushNotificationParams) {
  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(pushToken)) {
    capture('Push token is not a valid Expo push token', {
      extra: { pushToken, title, body, data },
    });
    return;
  }

  // Create a message
  const message: ExpoPushMessage = {
    to: pushToken,
    sound: 'default',
    title,
    body,
    data,
  };

  // Send the message
  expo
    .sendPushNotificationsAsync([message])
    .then((ticket) => {
      console.log({ ticket });
    })
    .catch((error) => {
      console.error(error);
    });
}
