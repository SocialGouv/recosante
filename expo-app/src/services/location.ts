import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
import { type Address, type Property } from '~/types/location';

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
            onPress: async () => {
              await Linking.openSettings();
            },
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

  export function formatPropertyToAddress(property: Property): Address {
    return {
      id: property.id,
      title: property.label,
      label: property.label,
      city: property.city,
      citycode: property.citycode,
      postcode: property.postcode,
      context: property.context,
    };
  }

  export async function getAdressByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<Address | undefined> {
    const url = new URL('https://api-adresse.data.gouv.fr/reverse/');

    url.searchParams.append('lon', longitude.toString());
    url.searchParams.append('lat', latitude.toString());
    const response = await fetch(url).then(async (res) => await res.json());
    const currentAdress = response?.features[0]?.properties as Property;

    if (!currentAdress) {
      Alert.alert('Erreur', 'Impossible de trouver votre ville');
    } else {
      const formatedAdress =
        LocationService.formatPropertyToAddress(currentAdress);
      return formatedAdress;
    }
  }
}
