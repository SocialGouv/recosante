const SCHEME = process.env.NODE_ENV === "development" ? "http" : "https";
const API_HOST = process.env.GATSBY_API_NODE_BASE_URL || "localhost:3000";

class ApiService {
  host = API_HOST;
  scheme = SCHEME;
  getUrl = (path, query) => {
    const url = new URL(path, this.scheme + "://" + this.host);
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key])
    );
    return url.toString();
  };
  execute = async ({
    method = "GET",
    path = "",
    query = {},
    headers = {},
    body = null,
  }) => {
    try {
      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // appversion: deviceInfoModule.getBuildNumber(),
          // appdevice: Platform.OS,
          // currentroute: this.navigation?.getCurrentRoute?.()?.name,
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      };

      const url = this.getUrl(path, query);

      const response = await fetch(url, config);

      if (response.json) {
        try {
          const readableRes = await response.json();
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

const APIV2 = new ApiService();
export default APIV2;
