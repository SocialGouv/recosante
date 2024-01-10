import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Application from 'expo-application';
import { getRoute } from './navigation';
import { API_SCHEME, API_HOST } from '../config';

export const checkNetwork = async (test = false) => {
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!isConnected || test) {
    await new Promise((res) => setTimeout(res, 1500));
    // Alert.alert('Pas de réseau', 'Veuillez vérifier votre connexion');
    return false;
  }
  return true;
};

class ApiService {
  getUrl = (path, query) => {
    const url = new URL(path, `${API_SCHEME}://${API_HOST}`);
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key]),
    );
    return url.toString();
  };
  execute = async ({
    method = 'GET',
    path = '',
    query = {},
    headers = {},
    body = null,
  }) => {
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          appversion: Application.nativeBuildVersion,
          appdevice: Platform.OS,
          currentroute: getRoute(),
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const url = this.getUrl(path, query);
      // console.log('url: ', url);
      const canFetch = await checkNetwork();
      if (!canFetch) return { ok: false };

      const response = await fetch(url, config);

      if (response.json) {
        try {
          const readableRes = await response.json();
          if (readableRes.sendInApp)
            this?.showInAppMessage?.(readableRes.sendInApp);
          return readableRes;
        } catch (e) {
          console.log('ERROR IN RESPONSE JSON', response);
          console.log(e);
        }
      }

      return response;
    } catch (e) {
      console.log(' error in api');
      console.log(e);
      return {
        ok: false,
        error:
          "Veuillez nous excuser, cette erreur est inattendue : l'équipe technique a été prévenue. Veuillez retenter dans quelques instants ou nous contacter si l'erreur persiste.",
      };
    }
  };

  get = async (args) => this.execute({ method: 'GET', ...args });
  post = async (args) => this.execute({ method: 'POST', ...args });
  put = async (args) => this.execute({ method: 'PUT', ...args });
  delete = async (args) => this.execute({ method: 'DELETE', ...args });
}

const API = new ApiService();
export default API;
