import * as Location from 'expo-location';
import { Alert } from 'react-native';

export namespace CommuneService {
  export async function getCommuneByLocation(
    location: Location.LocationObject | undefined,
  ) {
    if (!location) {
      throw new Error('Location is undefined');
    }
    const url = new URL('https://geo.api.gouv.fr/communes');
    url.searchParams.append('boost', 'population');
    url.searchParams.append('limit', '1');
    url.searchParams.append('fields', 'nom,code,codesPostaux');
    url.searchParams.append('lon', location.coords.longitude.toString());
    url.searchParams.append('lat', location.coords.latitude.toString());
    const response = await fetch(url).then((res) => res.json());
    // if (response?.length) setSelectedCommune(response[0]);
    if (!response?.length) {
      Alert.alert('Erreur', 'Impossible de trouver votre ville');
    }

    return response[0];
  }
}
