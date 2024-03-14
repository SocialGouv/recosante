import {
  IndicatorsSlugEnum,
  type IndiceUv,
  type PollenAllergyRisk,
  type WeatherAlert,
  type IndiceAtmospheric,
  type BathingWater,
  type DrinkingWater,
} from '@prisma/client';
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
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import { PolluantQualificatifsNumberEnum } from '~/types/api/indice_atmo';
import { PollensRiskNumberEnum } from '~/types/api/pollens';
import { WeatherAlertPhenomenonEnum } from '~/types/api/weather_alert';
import { getIndiceUVDotColor, getIndiceUVStatus } from '~/utils/indice_uv';
import { getPollensDotColor, getPollensStatus } from '~/utils/pollens';
import {
  getIndiceAtmoDotColor,
  getIndiceAtmoStatus,
} from '~/utils/indice_atmo';
import { AlertStatusThresholdEnum } from '~/utils/alert_status';
import { NotificationDotColor } from '~/types/notifications';
import { BathingWaterStatusEnum } from '~/types/api/bathing_water';
import {
  ConformityEnum,
  ConformityNumberEnum,
} from '~/types/api/drinking_water';
import { getBathingWaterSummaryValue } from '~/utils/bathing_water/bathing_water';
import { checkPrelevementConformity } from '~/utils/drinking_water';

dayjs.extend(utc);

type IndicatorRow =
  | IndiceUv
  | PollenAllergyRisk
  | WeatherAlert
  | IndiceAtmospheric
  | BathingWater
  | DrinkingWater;

export async function sendAlertNotification(
  indicatorSlug: IndicatorsSlugEnum,
  indicatorRow: IndicatorRow,
): Promise<boolean> {
  let indicatorValue = null;

  let users = [];
  if (indicatorSlug === IndicatorsSlugEnum.drinking_water) {
    const row = indicatorRow as DrinkingWater;
    users = await prisma.user.findMany({
      where: {
        notifications_preference: {
          has: 'alert',
        },
        udi: row.udi,
        push_notif_token: {
          not: null,
        },
        deleted_at: null,
      },
    });
  } else {
    const row = indicatorRow as Exclude<IndicatorRow, DrinkingWater>;
    users = await prisma.user.findMany({
      where: {
        notifications_preference: {
          has: 'alert',
        },
        municipality_insee_code: row.municipality_insee_code,
        push_notif_token: {
          not: null,
        },
        deleted_at: null,
      },
    });
  }

  if (!users.length) return false;

  if (indicatorSlug === IndicatorsSlugEnum.weather_alert) {
    const weatherAlert = indicatorRow as WeatherAlert;
    const phenomenons = getSortedPhenomenonsByValue(weatherAlert).filter(
      (phenomenon) =>
        phenomenon.value >= AlertStatusThresholdEnum.WEATHER_ALERT,
    );
    if (!phenomenons.length) return false;
    const rawBody: Array<string> = [];
    const data: Record<
      IndicatorsSlugEnum,
      { id: string; text?: string } | undefined
    > = {
      indice_uv: undefined,
      indice_atmospheric: undefined,
      pollen_allergy: undefined,
      weather_alert: undefined,
      bathing_water: undefined,
      drinking_water: undefined,
    };
    let notificationsSent = 0;
    let notificationsInDb = 0;
    for (const phenomenon of phenomenons) {
      const weatherAlertStatus = getAlertValueByColorId(phenomenon.value);
      const weatherAlertDotColor = getWeatherAlertDotColor(phenomenon.value);
      const typeWeatherAlert = phenomenon.name;

      data.weather_alert = {
        id: weatherAlert.id,
      };
      if (!weatherAlertDotColor) continue;
      let weatherAlertText = '';
      switch (typeWeatherAlert) {
        case WeatherAlertPhenomenonEnum.VIOLENT_WIND:
          weatherAlertText = `🌪️ Vent violent : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.RAIN_FLOOD:
          weatherAlertText = `🌧️ Pluie-Inondation : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.STORM:
          weatherAlertText = `🌩️ Orages : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.FLOOD:
          weatherAlertText = `🌊 Crues : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.SNOW_ICE:
          weatherAlertText = `⛸️ Neige-verglas : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.HEAT_WAVE:
          weatherAlertText = `🥵 Canicule : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.COLD_WAVE:
          weatherAlertText = `🥶 Grand Froid : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.AVALANCHE:
          weatherAlertText = `🌨️ Avalanches : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
        case WeatherAlertPhenomenonEnum.WAVES_SUBMERSION:
          weatherAlertText = `🌊 Vagues-Submersion : ${weatherAlertStatus} ${weatherAlertDotColor}`;
          break;
      }
      rawBody.push(weatherAlertText);
      // I know data won't have all the phenomenons, but I don't care
      data.weather_alert.text = weatherAlertText;

      const recommandation = await prisma.recommandation.findFirst({
        where: {
          indicator: IndicatorsSlugEnum.weather_alert,
          indicator_value: phenomenon.value,
          type_weather_alert: phenomenon.id,
        },
        select: {
          unique_key: true,
          recommandation_content: true,
        },
      });

      if (recommandation?.recommandation_content) {
        rawBody.push(recommandation?.recommandation_content);
      }

      const title = 'ALERTE';
      const body = rawBody.filter(Boolean).join('\n');

      for (const user of users) {
        const alreadySentNotification = await prisma.notification.findFirst({
          where: {
            user_id: user.id,
            title,
            body,
            created_at: {
              gte: dayjs().utc().startOf('day').toDate(),
            },
          },
        });
        if (alreadySentNotification) {
          console.log('already sent notification', alreadySentNotification);
          continue;
        }
        const { notificationSent, notificationInDb } =
          await sendPushNotification({
            user,
            title,
            body,
            data,
          });
        if (notificationSent) notificationsSent++;
        if (notificationInDb) notificationsInDb++;
      }
    }
    console.log('ALERT NOTIFICATIONS SENT');
    console.log('number of users', users.length);
    console.log('notifications sent', notificationsSent);
    console.log('notifications in db', notificationsInDb);
    return true;
  }

  const rawBody: Array<string> = [];
  const data: Record<
    IndicatorsSlugEnum,
    { id: string; text?: string } | undefined
  > = {
    indice_uv: undefined,
    indice_atmospheric: undefined,
    pollen_allergy: undefined,
    weather_alert: undefined,
    bathing_water: undefined,
    drinking_water: undefined,
  };

  if (indicatorSlug === IndicatorsSlugEnum.indice_uv) {
    const indice_uv = indicatorRow as IndiceUv;
    const indiceUvValue = indice_uv.uv_j0 as IndiceUVNumber;
    const isAlert = !!indiceUvValue && indiceUvValue >= 8;
    if (!isAlert) return false;
    data.indice_uv = {
      id: indice_uv.id,
    };
    const indiceUvStatus = getIndiceUVStatus(indiceUvValue);
    const indiceUvDotColor = getIndiceUVDotColor(indiceUvValue);
    if (indiceUvDotColor) {
      const indiceUvText = `☀️ Indice UV : ${indiceUvStatus} ${indiceUvDotColor}`;
      rawBody.push(indiceUvText);
      data.indice_uv.text = indiceUvText;
      indicatorValue = indiceUvValue;
    }
  }

  if (indicatorSlug === IndicatorsSlugEnum.indice_atmospheric) {
    const indice_atmo = indicatorRow as IndiceAtmospheric;
    const indiceAtmoValue = indice_atmo.code_qual;
    const isAlert =
      !!indiceAtmoValue &&
      indiceAtmoValue >= PolluantQualificatifsNumberEnum.POOR;
    if (!isAlert) return false;
    data.indice_atmospheric = {
      id: indice_atmo.id,
    };
    const indiceAtmoStatus = getIndiceAtmoStatus(indiceAtmoValue);
    const indiceAtmoDotColor = getIndiceAtmoDotColor(indiceAtmoValue);
    if (indiceAtmoDotColor) {
      const indiceAtmoText = `💨 Indice ATMO : ${indiceAtmoStatus} ${indiceAtmoDotColor}`;
      rawBody.push(indiceAtmoText);
      data.indice_atmospheric.text = indiceAtmoText;
      indicatorValue = indiceAtmoValue;
    }
  }

  if (indicatorSlug === IndicatorsSlugEnum.pollen_allergy) {
    const pollens = indicatorRow as PollenAllergyRisk;
    const pollensValue = pollens.total ?? 0;
    const isAlert =
      !!pollensValue && pollensValue >= PollensRiskNumberEnum.HIGH;
    if (!isAlert) return false;
    data.pollen_allergy = {
      id: pollens.id,
    };
    const pollensStatus = getPollensStatus(pollensValue);
    const pollensDotColor = getPollensDotColor(pollensValue);
    if (pollensDotColor) {
      const pollensText = `🌿 Risque pollens : ${pollensStatus} ${pollensDotColor}`;
      rawBody.push(pollensText);
      data.pollen_allergy.text = pollensText;
      indicatorValue = pollensValue;
    }
  }

  if (indicatorSlug === IndicatorsSlugEnum.bathing_water) {
    const bathingWater = indicatorRow as BathingWater;
    const isAlert =
      bathingWater.current_year_grading ===
      AlertStatusThresholdEnum.BATHING_WATER;
    if (!isAlert) return false;
    data.bathing_water = {
      id: bathingWater.id,
    };
    const { value } = getBathingWaterSummaryValue([bathingWater]);
    const bathingWaterDotColor = NotificationDotColor.EXTREMELY_POOR;
    const bathingWaterText = `🐳 Eaux de baignade : ${BathingWaterStatusEnum.PROHIBITION} ${bathingWaterDotColor}`;
    rawBody.push(bathingWaterText);
    data.bathing_water.text = bathingWaterText;
    indicatorValue = value;
  }

  if (indicatorSlug === IndicatorsSlugEnum.drinking_water) {
    const drinkingWater = indicatorRow as DrinkingWater;
    const isAlert =
      checkPrelevementConformity(drinkingWater) === ConformityEnum.NOT_CONFORM;
    if (!isAlert) return false;
    data.drinking_water = {
      id: drinkingWater.id,
    };
    const drinkingWaterDotColor = NotificationDotColor.EXTREMELY_POOR;
    const bathingWaterText = `🚰 Eaux du robinet : Non conforme ${drinkingWaterDotColor}`;
    rawBody.push(bathingWaterText);
    data.drinking_water.text = bathingWaterText;
    if (drinkingWater.conclusion_conformite_prelevement) {
      rawBody.push(drinkingWater.conclusion_conformite_prelevement);
    }
    indicatorValue = ConformityNumberEnum.NOT_CONFORM;
  }

  if (indicatorValue === null) {
    capture('No indicatorValue found for alert notification', {
      extra: {
        indicatorSlug,
        indicatorRow,
      },
    });
    return false;
  }

  let notificationsSent = 0;
  let notificationsInDb = 0;

  if (indicatorSlug !== IndicatorsSlugEnum.drinking_water) {
    // drinking water recommandation is included with the row as a test conclusion
    const recommandation = await prisma.recommandation.findFirst({
      where: {
        indicator: indicatorSlug,
        indicator_value: indicatorValue,
      },
      select: {
        unique_key: true,
        recommandation_content: true,
      },
    });

    if (recommandation?.recommandation_content) {
      rawBody.push(recommandation.recommandation_content);
    }
  }

  const title = 'ALERTE';
  const body = rawBody.filter(Boolean).join('\n');

  for (const user of users) {
    const alreadySentNotification = await prisma.notification.findFirst({
      where: {
        user_id: user.id,
        title,
        body,
        created_at: {
          gte: dayjs().utc().startOf('day').toDate(),
        },
      },
    });
    if (alreadySentNotification) {
      console.log('already sent notification', alreadySentNotification);
      continue;
    }
    const { notificationSent, notificationInDb } = await sendPushNotification({
      user,
      title,
      body,
      data,
    });
    if (notificationSent) notificationsSent++;
    if (notificationInDb) notificationsInDb++;
  }

  console.log('ALERT NOTIFICATIONS SENT');
  console.log('number of users', users.length);
  console.log('notifications sent', notificationsSent);
  console.log('notifications in db', notificationsInDb);
  return true;
}
