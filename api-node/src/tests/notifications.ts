import { PollensRiskNumberEnum } from '~/types/api/pollens';
import { PolluantQualificatifsNumberEnum } from '~/types/api/indice_atmo';
import {
  WeatherAlertColorIdEnum,
  WeatherAlertPhenomenonIdEnum,
} from '~/types/api/weather_alert';
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import { getPollensDotColor, getPollensStatus } from '~/utils/pollens';
import {
  getIndiceAtmoDotColor,
  getIndiceAtmoStatus,
} from '~/utils/indice_atmo';
import { getIndiceUVDotColor, getIndiceUVStatus } from '~/utils/indice_uv';
import {
  getAlertValueByColorId,
  getWeatherAlertDotColor,
} from '~/utils/weather_alert';

async function displayAllPossiblesValuesAndColorsForEachIndicator() {
  for (const pollenValue of Object.keys(PollensRiskNumberEnum).filter(
    (v) => !isNaN(Number(v)),
  )) {
    const status = getPollensStatus(Number(pollenValue));
    const dotColor = getPollensDotColor(Number(pollenValue));
    const text = `🌿 Risque pollens : ${status} ${dotColor}`;
    if (dotColor) {
      console.log('POLLENS', pollenValue, text);
    } else {
      console.log('POLLENS', pollenValue, 'Pas de notification');
    }
  }
  for (const indiceAtmoValue of Object.keys(
    PolluantQualificatifsNumberEnum,
  ).filter((v) => !isNaN(Number(v)))) {
    const status = getIndiceAtmoStatus(Number(indiceAtmoValue));
    const dotColor = getIndiceAtmoDotColor(Number(indiceAtmoValue));
    const text = `💨 Indice ATMO : ${status} ${dotColor}`;
    if (dotColor) {
      console.log('INDICE ATMO', indiceAtmoValue, text);
    } else {
      console.log('INDICE ATMO', indiceAtmoValue, 'Pas de notification');
    }
  }
  for (const weatherAlert of Object.keys(WeatherAlertColorIdEnum).filter(
    (v) => !isNaN(Number(v)),
  )) {
    const weatherAlertDotColor = getWeatherAlertDotColor(Number(weatherAlert));
    const weatherAlertStatus = getAlertValueByColorId(Number(weatherAlert));
    if (Number(weatherAlert) <= 2) {
      if (weatherAlertDotColor) {
        const text = `☔ Vigilance Météo : ${weatherAlertStatus} ${weatherAlertDotColor}`;
        console.log('VIGILANCE MÉTÉO', weatherAlert, text);
      } else {
        console.log('VIGILANCE MÉTÉO', weatherAlert, 'Pas de notification');
      }
    } else {
      for (const typeWeatherAlert of Object.values(
        WeatherAlertPhenomenonIdEnum,
      ).filter((v) => !isNaN(Number(v)))) {
        let weatherAlertText = '';
        switch (typeWeatherAlert) {
          case WeatherAlertPhenomenonIdEnum.VIOLENT_WIND:
            weatherAlertText = `🌪️ Alerte Vent violent : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.RAIN_FLOOD:
            weatherAlertText = `🌧️ Alerte Pluie-Inondation : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.STORM:
            weatherAlertText = `🌩️ Alerte Orages : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.FLOOD:
            weatherAlertText = `🌊 Alerte Crues : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.SNOW_ICE:
            weatherAlertText = `⛸️ Alerte Neige-verglas : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.HEAT_WAVE:
            weatherAlertText = `🥵 Alerte Canicule : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.COLD_WAVE:
            weatherAlertText = `🥶 Alerte Grand Froid : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.AVALANCHE:
            weatherAlertText = `🌨️ Alerte Avalanches : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
          case WeatherAlertPhenomenonIdEnum.WAVES_SUBMERSION:
            weatherAlertText = `🌊 Alerte Vagues-Submersion : ${weatherAlertStatus} ${weatherAlertDotColor}`;
            console.log('VIGILANCE MÉTÉO', weatherAlert, weatherAlertText);
            break;
        }
      }
    }
  }
  for (const indiceUvValue of [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]) {
    const status = getIndiceUVStatus(indiceUvValue as IndiceUVNumber);
    const dotColor = getIndiceUVDotColor(indiceUvValue as IndiceUVNumber);
    const text = `☀️ Indice UV : ${status} ${dotColor}`;
    if (dotColor) {
      console.log('INDICE UV', indiceUvValue, text);
    } else {
      console.log('INDICE UV', indiceUvValue, 'Pas de notification');
    }
  }
}

displayAllPossiblesValuesAndColorsForEachIndicator();
