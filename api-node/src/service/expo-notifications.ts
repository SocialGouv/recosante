import { Expo } from 'expo-server-sdk';
import { capture } from '~/third-parties/sentry';
import type { ExpoPushMessage } from 'expo-server-sdk';
import prisma from '~/prisma';
import type { IndicatorsSlugEnum, User } from '@prisma/client';

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

type SendPushNotificationParams = {
  user: User;
  title: string;
  body: string;
  data: Record<IndicatorsSlugEnum, { id: string; text?: string } | undefined>;
};

type SendPushNotificationResult = {
  notificationSent: boolean;
  notificationInDb: boolean;
  error: string;
};

// BE CAREFUL: only 600 notifications per second can be sent
// https://docs.expo.dev/push-notifications/faq/#limit-of-sending-notifications
export async function sendPushNotification({
  user,
  title,
  body,
  data,
}: SendPushNotificationParams): Promise<SendPushNotificationResult> {
  // Check that all your push tokens appear to be valid Expo push tokens
  let push_notif_token: string = '';
  try {
    push_notif_token =
      user.push_notif_token && JSON.parse(user.push_notif_token).data;
  } catch (error: string | unknown) {
    capture('Push token is not a valid Expo push token', {
      user,
      extra: { error, push_notif_token, title, body, data },
    });
    return {
      notificationSent: false,
      notificationInDb: true,
      error: 'Push token is not a valid Expo push token',
    };
  }
  if (!push_notif_token || !Expo.isExpoPushToken(push_notif_token)) {
    capture('Push token is not a valid Expo push token', {
      user,
      extra: { push_notif_token, title, body, data },
    });
    return {
      notificationSent: false,
      notificationInDb: true,
      error: 'Push token is not a valid Expo push token',
    };
  }

  // Create a message
  const message: ExpoPushMessage = {
    to: push_notif_token,
    sound: 'default',
    title,
    body,
    data,
  };

  // Send the message
  return await expo
    .sendPushNotificationsAsync([message])
    .then(async (ticket) => {
      console.log('TICKET', ticket);
      return await prisma.notification
        .create({
          // @ts-expect-error TODO: check Arnaud : )
          data: {
            title,
            body,
            data: JSON.stringify(data), // later data can be different
            push_notif_token,
            appversion: user.appversion,
            appbuild: user.appbuild,
            appdevice: user.appdevice,
            user: { connect: { id: user.id } },
            ticket: JSON.stringify(ticket),
          },
        })
        .then((notification) => {
          console.log('NOTIFICATION', notification);
          return { notificationSent: true, notificationInDb: true, error: '' };
        })
        .catch((error) => {
          console.log('ERROR', error);
          return {
            notificationSent: true,
            notificationInDb: false,
            error,
          };
        });
    })
    .catch(async (error: any) => {
      console.log('ERROR', error);
      return await prisma.notification
        .create({
          // @ts-expect-error TODO: check Arnaud : )
          data: {
            title,
            body,
            data: JSON.stringify(data), // later data can be different
            push_notif_token,
            appversion: user.appversion,
            appbuild: user.appbuild,
            appdevice: user.appdevice,
            user: { connect: { id: user.id } },
            error: JSON.stringify(error),
          },
        })
        .then((notification) => {
          console.log('NOTIFICATION', notification);
          return { notificationSent: false, notificationInDb: true, error: '' };
        })
        .catch((error) => {
          console.log('ERROR', error);
          return {
            notificationSent: false,
            notificationInDb: false,
            error,
          };
        });
    });
}
