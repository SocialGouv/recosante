// https://developer.matomo.org/api-reference/tracking-api
const fetch = require("node-fetch");
const { MATOMO_URL, MATOMO_IDSITE_1 } = require("../config");
const { capture } = require("./sentry");

const __DEV__ = process.env.NODE_ENV === "development";

class _MatomoBackend {
  init({ baseUrl, idsite, _idvc }) {
    this.baseUrl = baseUrl;
    this.idsite = idsite;
    // this._idvc = _idvc;
    this.initDone = true;
  }

  makeid(length = 16) {
    var result = "";
    var characters = "01234567890abcdefABCDEF";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  setCustomDimensions(newDimensions) {
    this.dimensions = {
      ...(this.dimensions || {}),
      ...newDimensions,
    };
  }

  computeCustomDimensions(dimensions) {
    // Get something like this:
    const d = {};
    for (let [key, value] of Object.entries(dimensions)) {
      d[`dimension${key}`] = value;
    }
    return d;
  }

  computeParams(params, idsite) {
    params = {
      idsite,
      rec: 1,
      rand: Date.now(),
      // _idvc: this._idvc,
      ...params,
      //...this.computeCustomDimensions(this.dimensions),
    };
    return Object.keys(params).reduce((paramString, key, index) => {
      const computedParam = `${key}=${params[key]}`;
      if (index === 0) return computedParam;
      return `${paramString}&${computedParam}`;
    }, "");
  }

  async logEvent({ userId, category, action, name = "", value = null }) {
    // e_c — The event category. Must not be empty. (eg. Videos, Music, Games...)
    // e_a — The event action. Must not be empty. (eg. Play, Pause, Duration, Add Playlist, Downloaded, Clicked...)
    // e_n — The event name. (eg. a Movie name, or Song name, or File name...)
    // e_v — The event value. Must be a float or integer value (numeric), not a string.
    const params = {
      e_c: category,
      e_a: action,
      uid: userId,
      _id: userId,
    };
    if (name !== "") params.e_n = name;
    if (value !== null && !isNaN(Number(value))) params.e_v = Number(value);
    await this.execute(params);
  }

  async execute(params) {
    try {
      if (!this.initDone) throw new Error("matomo not initialized yet");
      const url = `${this.baseUrl}?${this.computeParams(params, this.idsite)}`;
      if (__DEV__) {
        // console.log(params, this.dimensions);
        return;
      }
      const res = await fetch(encodeURI(url));

      if (__DEV__ && res.status !== 200) {
        console.log(res);
        throw new Error("error fetching matomo");
      }
    } catch (e) {
      capture("matomo api error", e);
    }
  }
}

const matomo = new _MatomoBackend();
matomo.init({
  baseUrl: MATOMO_URL,
  idsite: MATOMO_IDSITE_1,
});

module.exports = matomo;
