import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, Alert, Linking } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

export async function registerForPushNotificationsAsync({ force = false, expo = false } = {}) {
  let token;
  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  console.log("existingStatus", existingStatus);
  if (existingStatus !== "granted") {
    console.log("force", force);
    if (!force) return null;
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  console.log("finalStatus", finalStatus);
  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission for Push notifications not granted",
      "You can change that in your settings",
      [
        { text: "Open Settings", onPress: () => Linking.openSettings() },
        { text: "OK", style: "cancel", onPress: () => {} },
      ]
    );
    return;
  }
  token = expo
    ? await Notifications.getExpoPushTokenAsync()
    : await Notifications.getDevicePushTokenAsync();
  // } else {
  //   // alert("Must use physical device for Push Notifications");
  // }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  console.log("token", token);
  return token;
}

export default function ExpoPushNotifToken() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    </View>
  );
}
