import URI from "urijs";
import { Alert, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as Application from "expo-application";
import { navigationRef } from "./navigation";
import { API_HOST, API_SCHEME } from "../config";

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
  host = API_HOST;
  scheme = API_SCHEME;
  getUrl = (path, query) => {
    return new URI().host(this.host).scheme(this.scheme).path(path).setSearch(query).toString();
  };
  execute = async ({ method = "GET", path = "", query = {}, headers = {}, body = null }) => {
    try {
      if (path === "/event" && body) {
        body.newFeaturesLastShownId = NewFeaturePop.lastShownId;
      }

      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          appversion: Application.nativeBuildVersion,
          appdevice: Platform.OS,
          currentroute: navigationRef?.getCurrentRoute?.()?.name,
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
          if (readableRes.sendInApp) this?.handleInAppMessage(readableRes.sendInApp);
          return readableRes;
        } catch (e) {
          console.log("ERROR IN RESPONSE JSON", response);
          console.log(e);
        }
      }

      return response;
    } catch (e) {
      console.log(" error in api");
      console.log(e);
      return {
        ok: false,
        error:
          "Veuillez nous excuser, cette erreur est inattendue : l'équipe technique a été prévenue. Veuillez retenter dans quelques instants ou nous contacter si l'erreur persiste.",
      };
    }
  };

  get = async (args) => this.execute({ method: "GET", ...args });
  post = async (args) => this.execute({ method: "POST", ...args });
  put = async (args) => this.execute({ method: "PUT", ...args });
  delete = async (args) => this.execute({ method: "DELETE", ...args });
}

const API = new ApiService();
export default API;
