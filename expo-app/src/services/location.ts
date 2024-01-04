import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export namespace LocationService {
  export async function requestLocation(): Promise<
    Location.LocationObject | undefined
  > {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted to access your location',
        'You can change that in your settings',
        [
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => {},
          },
        ],
      );
      return;
    }
    return await Location.getCurrentPositionAsync({});
  }
}
