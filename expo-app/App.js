import { StyleSheet, Platform, Linking, Alert, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import * as DeepLinking from "expo-linking";
import { registerForPushNotificationsAsync } from "./src/services/expo-push-notifs";

const APP_URL = __DEV__ ? "http://192.168.178.198:8000" : "https://recosante.beta.gouv.fr";
// const APP_URL = "https://recosante.beta.gouv.fr";

SplashScreen.preventAutoHideAsync();

const initScript = `window.ENV = {};window.ENV.APP_PLATFORM = "native";`;
function App() {
  // const onNavigationStateChange = (navState) => {
  //   console.log("onNavigationStateChange", navState);
  // };
  const deepLink = DeepLinking.useURL();
  const source = useMemo(() => {
    const receivedUrl = deepLink?.includes("recosante.beta.gouv.fr") ? deepLink : APP_URL;
    const { hostname, path, queryParams } = DeepLinking.parse(receivedUrl);
    const url = `${APP_URL}/${path || ""}`;
    return { url };
  }, [deepLink]);
  const ref = useRef(null);

  const onLoadEnd = () => {
    ref.current.injectJavaScript(`window.ENV.PLATFORM_OS = "${Platform.OS}";`);
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  };

  const onPushNotification = (event) => {
    console.log("onPushNotification", event.nativeEvent.data);
    const requestPush = event.nativeEvent.data === "request-native-push-permission";
    const requestExpoPush = event.nativeEvent.data === "request-native-expo-push-permission";
    // const readToken = event.nativeEvent.data === "request-native-get-token-if-exists";
    const readExpoToken = event.nativeEvent.data === "request-native-get-expo-token";
    registerForPushNotificationsAsync({
      force: requestPush || requestExpoPush,
      expo: readExpoToken || requestExpoPush,
    }).then((token) => {
      if (!token) {
        return;
      }
      ref.current.injectJavaScript(`window.onNativePushToken('${JSON.stringify(token)}');`);
    });
  };

  const onRequestLocation = (event) => {
    const eventName = event.nativeEvent.data;
    Location.requestForegroundPermissionsAsync().then(async ({ status }) => {
      if (status !== "granted") {
        if (eventName === "request-native-force-current-position") {
          Alert.alert(
            "La géolocalisation est désactivée",
            "Pour activer la géolocalisation, veuillez vous rendre dans les paramètres de votre téléphone.",
            [
              { text: "Aller dans les paramètres", onPress: () => Linking.openSettings() },
              { text: "OK", style: "cancel", onPress: () => {} },
            ]
          );
        }
        const centerOfTheWorld = { coords: { latitude: 0, longitude: 0 } };
        ref.current.injectJavaScript(
          `window.onGetCurrentPosition('${JSON.stringify(centerOfTheWorld)}');`
        );
        ref.current.injectJavaScript(`window.onUnZoom();`);
        return null;
      }
      const location = await Location.getCurrentPositionAsync({});
      ref.current.injectJavaScript(`window.onGetCurrentPosition('${JSON.stringify(location)}');`);
    });
  };

  const onAndroidBackPress = () => {
    if (ref.current) {
      ref.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
      };
    }
  }, []);

  const [backgroundColor, setBackgroundColor] = useState("#000091");
  const insets = useSafeAreaInsets();

  const style = useMemo(
    () => ({
      flex: 1,
      backgroundColor,
    }),
    [backgroundColor]
  );

  const onMessage = useCallback(
    (event) => {
      console.log("onMessage", event.nativeEvent.data);
      switch (event.nativeEvent.data) {
        case "request-native-set-safe-background-blue":
          setBackgroundColor("#000091");
          break;
        case "request-native-set-safe-background-white":
          setBackgroundColor("#fff");
          break;
        case "request-native-get-inset-bottom-height":
          ref.current.injectJavaScript(`window.onGetInsetBottomHeight('${insets.bottom}');`);
          break;
        case "request-native-get-current-position":
        case "request-native-force-current-position":
          onRequestLocation(event);
          break;
        case "request-native-push-permission":
        case "request-native-expo-push-permission":
        case "request-native-get-token-if-exists":
        case "request-native-get-expo-token":
          console.log("BIM");
          onPushNotification(event);
          break;
        default:
          break;
      }
    },
    [setBackgroundColor, onRequestLocation, onPushNotification, insets]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style} edges={["left", "right", "top"]}>
        <WebView
          ref={ref}
          style={styles.container}
          startInLoadingState
          onLoadEnd={onLoadEnd}
          source={source}
          pullToRefreshEnabled
          allowsBackForwardNavigationGestures
          // onNavigationStateChange={onNavigationStateChange}
          onMessage={onMessage}
          injectedJavaScript={initScript}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function () {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000",
    // backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    // backgroundColor: "#000",
  },
});
