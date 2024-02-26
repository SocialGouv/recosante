import type { IndicatorsSlugEnum, User } from '@prisma/client';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
import {
  getAlertValueByColorId,
  getSortedPhenomenonsByValue,
  getWeatherAlertDotColor,
} from '~/utils/weather_alert';
import { sendPushNotification } from '~/service/expo-notifications';
import { getIndiceUVForJ } from '~/getters/indice_uv';
import { getIndiceAtmoForJ1 } from '~/getters/indice_atmo';
import { getPollensForJ1 } from '~/getters/pollens';
import { getWeatherAlertForJ1 } from '~/getters/weather_alert';
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import { WeatherAlertPhenomenonEnum } from '~/types/api/weather_alert';
import { getIndiceUVDotColor, getIndiceUVStatus } from '~/utils/indice_uv';
import { getPollensDotColor, getPollensStatus } from '~/utils/pollens';
import {
  getIndiceAtmoDotColor,
  getIndiceAtmoStatus,
} from '~/utils/indice_atmo';
dayjs.extend(utc);

export async function sendEveningNotification() {
  console.log('EVENING NOTIFICATIONS START', dayjs().toISOString());
  const users = await prisma.user.findMany({
    where: {
      notifications_preference: {
        has: 'evening',
      },
      favorite_indicator: {
        not: null,
      },
      municipality_insee_code: {
        not: null,
      },
      push_notif_token: {
        not: null,
      },
      deleted_at: null,
    },
  });

  // group users by municipality_insee_code and favorite_indicator
  const groupedByMunicipalityAndIndicator: Record<string, User[]> = {};
  for (const user of users) {
    const key = `${user.municipality_insee_code}:${user.favorite_indicator}`;
    if (!groupedByMunicipalityAndIndicator[key]) {
      groupedByMunicipalityAndIndicator[key] = [];
    }
    groupedByMunicipalityAndIndicator[key].push(user);
  }

  let notificationsSent = 0;
  let notificationsInDb = 0;

  for (const [key, users] of Object.entries(
    groupedByMunicipalityAndIndicator,
  )) {
    const [municipality_insee_code, indicatorSlug]: [
      string,
      IndicatorsSlugEnum,
    ] = key.split(':') as [string, IndicatorsSlugEnum];
    const body: Array<string> = [];
    const data: Record<
      IndicatorsSlugEnum,
      { id: string; text?: string } | undefined
    > = {
      indice_uv: undefined,
      indice_atmospheric: undefined,
      pollen_allergy: undefined,
      weather_alert: undefined,
      bathing_water: undefined,
    };

    /*
    Indice UV
    */
    const indice_uv = await getIndiceUVForJ({
      municipality_insee_code,
      date_UTC_ISO: dayjs().toISOString(),
    });
    if (indice_uv?.uv_j1 == null) {
      capture('No indice_uv found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
        tags: {
          municipality_insee_code,
        },
        user: municipality_insee_code, // to be able to "ignore until one more user is affected" in sentry
      });
    } else {
      data.indice_uv = {
        id: indice_uv.id,
      };
      const indiceUvValue = indice_uv.uv_j1 as IndiceUVNumber;
      const indiceUvStatus = getIndiceUVStatus(indiceUvValue);
      const indiceUvDotColor = getIndiceUVDotColor(indiceUvValue);

      if (indiceUvDotColor) {
        const indiceUvText = `☀️ Indice UV : ${indiceUvStatus} ${indiceUvDotColor}`;
        body[indicatorSlug === 'indice_uv' ? 0 : 1] = indiceUvText;
        data.indice_uv.text = indiceUvText;
      }
    }

    /*
    Indice ATMO
    */
    const indice_atmo_j1 = await getIndiceAtmoForJ1({
      municipality_insee_code,
      date_UTC_ISO: dayjs().toISOString(),
    });

    if (indice_atmo_j1?.code_qual == null) {
      capture('No indice_atmo_j1 found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
        tags: {
          municipality_insee_code,
        },
        user: municipality_insee_code, // to be able to "ignore until one more user is affected" in sentry
      });
    } else {
      data.indice_atmospheric = {
        id: indice_atmo_j1.id,
      };
      const indiceAtmoValue = indice_atmo_j1.code_qual;
      const indiceAtmoStatus = getIndiceAtmoStatus(indiceAtmoValue);
      const indiceAtmoDotColor = getIndiceAtmoDotColor(indiceAtmoValue);
      if (indiceAtmoDotColor) {
        const indiceAtmoText = `💨 Indice ATMO : ${indiceAtmoStatus} ${indiceAtmoDotColor}`;
        body[indicatorSlug === 'indice_atmospheric' ? 0 : 2] = indiceAtmoText;
        data.indice_atmospheric.text = indiceAtmoText;
      }
    }

    /*
    Pollens
    */
    const pollensJ1 = await getPollensForJ1({
      municipality_insee_code,
      date_UTC_ISO: dayjs().toISOString(),
    });

    if (!pollensJ1) {
      capture('No pollensJ1 found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
        tags: {
          municipality_insee_code,
        },
        user: municipality_insee_code, // to be able to "ignore until one more user is affected" in sentry
      });
    } else {
      data.pollen_allergy = {
        id: pollensJ1.id,
      };
      const pollensValue = pollensJ1.total ?? 0;
      const pollensStatus = getPollensStatus(pollensValue);
      const pollensDotColor = getPollensDotColor(pollensValue);
      if (pollensDotColor) {
        const pollensText = `🌿 Risque pollens : ${pollensStatus} ${pollensDotColor}`;
        body[indicatorSlug === 'pollen_allergy' ? 0 : 3] = pollensText;
        data.pollen_allergy.text = pollensText;
      }
    }

    /*
    Weather Alert
    */
    const weatherAlertJ1 = await getWeatherAlertForJ1({
      municipality_insee_code,
      date_UTC_ISO: dayjs().toISOString(),
    });

    if (!weatherAlertJ1) {
      capture('No weatherAlertJ1 found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
        tags: {
          municipality_insee_code,
        },
        user: municipality_insee_code, // to be able to "ignore until one more user is affected" in sentry
      });
    } else {
      const phenomenonsJ1 = getSortedPhenomenonsByValue(weatherAlertJ1);
      const maxColorCodeIdJ1 = phenomenonsJ1[0].value;

      const weatherAlertValue = maxColorCodeIdJ1;
      const weatherAlertStatus = getAlertValueByColorId(maxColorCodeIdJ1);
      const weatherAlertDotColor = getWeatherAlertDotColor(maxColorCodeIdJ1);
      const typeWeatherAlert = phenomenonsJ1[0].name;

      data.weather_alert = {
        id: weatherAlertJ1.id,
      };
      if (weatherAlertDotColor) {
        let weatherAlertText = `☔ Vigilance Météo : ${weatherAlertStatus} ${weatherAlertDotColor}`;
        if (weatherAlertValue > 2) {
          switch (typeWeatherAlert) {
            case WeatherAlertPhenomenonEnum.VIOLENT_WIND:
              weatherAlertText = `🌪️ Alerte Vent violent : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.RAIN_FLOOD:
              weatherAlertText = `🌧️ Alerte Pluie-Inondation : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.STORM:
              weatherAlertText = `🌩️ Alerte Orages : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.FLOOD:
              weatherAlertText = `🌊 Alerte Crues : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.SNOW_ICE:
              weatherAlertText = `⛸️ Alerte Neige-verglas : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.HEAT_WAVE:
              weatherAlertText = `🥵 Alerte Canicule : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.COLD_WAVE:
              weatherAlertText = `🥶 Alerte Grand Froid : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.AVALANCHE:
              weatherAlertText = `🌨️ Alerte Avalanches : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
            case WeatherAlertPhenomenonEnum.WAVES_SUBMERSION:
              weatherAlertText = `🌊 Alerte Vagues-Submersion : ${weatherAlertStatus} ${weatherAlertDotColor}`;
              break;
          }
        }
        body[indicatorSlug === 'weather_alert' ? 0 : 4] = weatherAlertText;
        data.weather_alert.text = weatherAlertText;
      }
    }

    if (!body.length) {
      capture('No indicators found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
        tags: {
          municipality_insee_code,
        },
        user: municipality_insee_code, // to be able to "ignore until one more user is affected" in sentry
      });
      continue;
    }

    for (const user of users) {
      const { notificationSent, notificationInDb } = await sendPushNotification(
        {
          user,
          title: 'Vos prévisions pour demain',
          body: body.filter(Boolean).join('\n'),
          data,
        },
      );
      if (notificationSent) notificationsSent++;
      if (notificationInDb) notificationsInDb++;
    }
  }

  console.log('EVENING NOTIFICATIONS SENT');
  console.log('number of users', users.length);
  console.log('notifications sent', notificationsSent);
  console.log('notifications in db', notificationsInDb);
}
