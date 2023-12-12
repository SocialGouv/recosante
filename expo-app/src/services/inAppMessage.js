import { Alert, Linking } from "react-native";
import { navigationRef } from "./navigation";
import { logEvent } from "./logEventsWithMatomo";
import API from "./api";

async function showInAppMessage(inAppMessage) {
  const [title, subTitle, actions = [], options = {}] = inAppMessage;
  if (!actions || !actions.length) return Alert.alert(title, subTitle);
  const actionsWithNavigation = actions.map((action) => {
    if (action.navigate) {
      action.onPress = () => {
        navigationRef?.navigate(...action.navigate);
        if (action.event) logEvent(action.event);
      };
    }
    if (action.link) {
      action.onPress = () => {
        Linking.openURL(action.link);
        if (action.event) logEvent(action.event);
      };
    }
    return action;
  });
  Alert.alert(title, subTitle, actionsWithNavigation, options);
}

API.showInAppMessage = showInAppMessage;
