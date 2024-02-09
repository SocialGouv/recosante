import {
  IndicatorsSlugEnum,
  type IndiceUv,
  type PollenAllergyRisk,
  type WeatherAlert,
  type IndiceAtmospheric,
  type User,
} from '@prisma/client';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
import {
  getAlertValueByColorId,
  getSortedPhenomenonsByValue,
} from './weather_alert';
import { sendPushNotification } from '~/service/expo-notifications';
import { getIndiceUVForJ } from '~/getters/indice_uv';
import { getIndiceAtmoForJ0, getIndiceAtmoForJ1 } from '~/getters/indice_atmo';
import { getPollensForJ0, getPollensForJ1 } from '~/getters/pollens';
import {
  getWeatherAlertForJ0,
  getWeatherAlertForJ1,
} from '~/getters/weather_alert';
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import { PolluantQualificatifsNumberEnum } from '~/types/api/indice_atmo';
import {
  WeatherAlertPhenomenonEnum,
  WeatherAlertColorIdEnum,
  type WeatherAlertPhenomenonIdEnum,
  type Phenomenon,
} from '~/types/api/weather_alert';
import { PollensRiskNumberEnum } from '~/types/api/pollens';
import { getIndiceUVStatus } from './indice_uv';
import { getPollensStatus } from './pollens';
import { getIndiceAtmoStatus } from './indice_atmo';
dayjs.extend(utc);

async function sendMorningNotification() {
  console.log('MORNING NOTIFICATIONS START', dayjs().toISOString());
  const users = await prisma.user.findMany({
    where: {
      notifications_preference: {
        has: 'morning',
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
    let indicatorValue = null;
    let indicatorStatus = null;
    let indicatorId = null;
    let recommandationId = null;
    let typeWeatherAlert: WeatherAlertPhenomenonEnum | null = null;
    let typeWeatherAlertId: WeatherAlertPhenomenonIdEnum | null = null;

    if (indicatorSlug === 'indice_uv') {
      const indice_uv = await getIndiceUVForJ({
        municipality_insee_code,
        date_UTC_ISO: dayjs().toISOString(),
      });

      if (indice_uv?.uv_j0 == null) {
        capture('No indice_uv found for morning notification', {
          extra: {
            municipality_insee_code,
            indicatorSlug,
            date: dayjs().utc().startOf('day').toISOString(),
          },
        });
        continue;
      }
      indicatorValue = indice_uv.uv_j0;
      indicatorStatus = getIndiceUVStatus(indice_uv.uv_j0 as IndiceUVNumber);
      indicatorId = indice_uv.id;
    }

    if (indicatorSlug === 'indice_atmospheric') {
      const indice_atmo_j0 = await getIndiceAtmoForJ0({
        municipality_insee_code,
        date_UTC_ISO: dayjs().toISOString(),
      });

      if (indice_atmo_j0?.code_qual == null) {
        capture('No indice_atmo_j0 found for morning notification', {
          extra: {
            municipality_insee_code,
            indicatorSlug,
            date: dayjs().utc().startOf('day').toISOString(),
          },
        });
        continue;
      }
      indicatorValue = indice_atmo_j0.code_qual;
      indicatorStatus = getIndiceAtmoStatus(indice_atmo_j0.code_qual);
      indicatorId = indice_atmo_j0.id;
    }

    if (indicatorSlug === 'pollen_allergy') {
      const pollensJ0 = await getPollensForJ0({
        municipality_insee_code,
        date_UTC_ISO: dayjs().toISOString(),
      });

      if (!pollensJ0) {
        capture('No pollensJ0 found for morning notification', {
          extra: {
            municipality_insee_code,
            indicatorSlug,
            date: dayjs().utc().startOf('day').toISOString(),
          },
        });
        continue;
      }
      indicatorValue = pollensJ0.total ?? 0;
      indicatorStatus = getPollensStatus(pollensJ0.total ?? 0);
      indicatorId = pollensJ0.id;
    }

    if (indicatorSlug === 'weather_alert') {
      const weatherAlertJ0 = await getWeatherAlertForJ0({
        municipality_insee_code,
        date_UTC_ISO: dayjs().toISOString(),
      });

      if (!weatherAlertJ0) {
        capture('No weatherAlertJ0 found for morning notification', {
          extra: {
            municipality_insee_code,
            indicatorSlug,
            date: dayjs().utc().startOf('day').toISOString(),
          },
        });
        continue;
      }
      const phenomenonsJ0 = getSortedPhenomenonsByValue(weatherAlertJ0);
      const maxColorCodeIdJ0 = phenomenonsJ0[0].value;
      const worstPhenomenonCodeIdJ0 = phenomenonsJ0[0].id;

      indicatorValue = maxColorCodeIdJ0;
      indicatorStatus = getAlertValueByColorId(maxColorCodeIdJ0);
      typeWeatherAlertId = worstPhenomenonCodeIdJ0;
      typeWeatherAlert = phenomenonsJ0[0].name;
      indicatorId = weatherAlertJ0.id;
    }

    if (indicatorValue === null) {
      capture('No indicatorValue found for morning notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
      });
      continue;
    }

    if (indicatorId === null) {
      capture('No indicatorId found for morning notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
      });
      continue;
    }

    const title = `${getNotificationTitle(
      indicatorSlug,
      indicatorValue,
      typeWeatherAlert,
    )}: ${indicatorStatus}`;

    const recommandation = await prisma.recommandation.findFirst({
      where:
        indicatorSlug === 'weather_alert' && indicatorValue > 2
          ? {
              indicator: IndicatorsSlugEnum.weather_alert,
              indicator_value: indicatorValue,
              type_weather_alert: typeWeatherAlertId,
            }
          : {
              indicator: indicatorSlug,
              indicator_value: indicatorValue,
            },
      select: {
        unique_key: true,
        recommandation_content: true,
      },
    });

    recommandationId = recommandation?.unique_key ?? null;

    const body = recommandation?.recommandation_content ?? '';

    for (const user of users) {
      const { notificationSent, notificationInDb } = await sendPushNotification(
        {
          user,
          title,
          body,
          data: {
            indicatorSlug,
            indicatorId,
            recommandationId,
            indicatorValue,
            typeWeatherAlert,
          },
        },
      );
      if (notificationSent) notificationsSent++;
      if (notificationInDb) notificationsInDb++;
    }
  }

  console.log('MORNING NOTIFICATIONS SENT');
  console.log('number of users', users.length);
  console.log('notifications sent', notificationsSent);
  console.log('notifications in db', notificationsInDb);
}

async function sendEveningNotification() {
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
    let indicatorValue = null;
    let indicatorStatus = null;
    let indicatorId = null;
    let recommandationId = null;
    let typeWeatherAlert: WeatherAlertPhenomenonEnum | null = null;
    let typeWeatherAlertId: WeatherAlertPhenomenonIdEnum | null = null;

    if (indicatorSlug === 'indice_uv') {
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
        });
        continue;
      }
      indicatorValue = indice_uv.uv_j1;
      indicatorStatus = getIndiceUVStatus(indice_uv.uv_j1 as IndiceUVNumber);
      indicatorId = indice_uv.id;
    }

    if (indicatorSlug === 'indice_atmospheric') {
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
        });
        continue;
      }
      indicatorValue = indice_atmo_j1.code_qual;
      indicatorStatus = getIndiceAtmoStatus(indice_atmo_j1.code_qual);
      indicatorId = indice_atmo_j1.id;
    }

    if (indicatorSlug === 'pollen_allergy') {
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
        });
        continue;
      }
      indicatorValue = pollensJ1.total ?? 0;
      indicatorStatus = getPollensStatus(pollensJ1.total ?? 0);
      indicatorId = pollensJ1.id;
    }

    if (indicatorSlug === 'weather_alert') {
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
        });
        continue;
      }
      const phenomenonsJ1 = getSortedPhenomenonsByValue(weatherAlertJ1);
      const maxColorCodeIdJ1 = phenomenonsJ1[0].value;
      const worstPhenomenonCodeIdJ1 = phenomenonsJ1[0].id;

      indicatorValue = maxColorCodeIdJ1;
      indicatorStatus = getAlertValueByColorId(maxColorCodeIdJ1);
      typeWeatherAlertId = worstPhenomenonCodeIdJ1;
      typeWeatherAlert = phenomenonsJ1[0].name;
      indicatorId = weatherAlertJ1.id;
    }

    if (indicatorValue === null) {
      capture('No indicatorValue found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
      });
      continue;
    }

    if (indicatorId === null) {
      capture('No indicatorId found for evening notification', {
        extra: {
          municipality_insee_code,
          indicatorSlug,
          date: dayjs().utc().startOf('day').toISOString(),
        },
      });
      continue;
    }

    const title = `${getNotificationTitle(
      indicatorSlug,
      indicatorValue,
      typeWeatherAlert,
    )}: ${indicatorStatus}`;

    const recommandation = await prisma.recommandation.findFirst({
      where:
        indicatorSlug === 'weather_alert' && indicatorValue > 2
          ? {
              indicator: IndicatorsSlugEnum.weather_alert,
              indicator_value: indicatorValue,
              type_weather_alert: typeWeatherAlertId,
            }
          : {
              indicator: indicatorSlug,
              indicator_value: indicatorValue,
            },
      select: {
        unique_key: true,
        recommandation_content: true,
      },
    });

    recommandationId = recommandation?.unique_key ?? null;

    const body = recommandation?.recommandation_content ?? '';

    for (const user of users) {
      const { notificationSent, notificationInDb } = await sendPushNotification(
        {
          user,
          title,
          body,
          data: {
            indicatorSlug,
            indicatorId,
            recommandationId,
            indicatorValue,
            typeWeatherAlert,
          },
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

type IndicatorRow =
  | IndiceUv
  | PollenAllergyRisk
  | WeatherAlert
  | IndiceAtmospheric;

async function sendAlertNotification(
  indicatorSlug: IndicatorsSlugEnum,
  indicatorRow: IndicatorRow,
) {
  let indicatorValue = null;
  let indicatorStatus = null;
  const recommandationId = null;
  let typeWeatherAlert: WeatherAlertPhenomenonEnum | null = null;
  let typeWeatherAlertId: WeatherAlertPhenomenonIdEnum | null = null;
  const phenomenons: Phenomenon[] = [];

  if (indicatorSlug === 'weather_alert') {
    indicatorRow = indicatorRow as WeatherAlert;
    const phenomenons = getSortedPhenomenonsByValue(indicatorRow);
    const maxColorCodeId = phenomenons[0].value;
    const worstPhenomenonCodeId = phenomenons[0].id;

    const isAlert = maxColorCodeId >= WeatherAlertColorIdEnum.ORANGE;
    if (!isAlert) return;
    indicatorValue = maxColorCodeId;
    indicatorStatus = getAlertValueByColorId(indicatorValue);
    typeWeatherAlertId = worstPhenomenonCodeId;
    typeWeatherAlert = phenomenons[0].name;
  }

  if (indicatorSlug === 'indice_uv') {
    indicatorRow = indicatorRow as IndiceUv;
    const isAlert = !!indicatorRow.uv_j0 && indicatorRow.uv_j0 >= 8;
    if (!isAlert) return;
    indicatorValue = indicatorRow.uv_j0;
    indicatorStatus = getIndiceUVStatus(indicatorRow.uv_j0 as IndiceUVNumber);
  }

  if (indicatorSlug === 'indice_atmospheric') {
    indicatorRow = indicatorRow as IndiceAtmospheric;
    const isAlert =
      !!indicatorRow.code_qual &&
      indicatorRow.code_qual >= PolluantQualificatifsNumberEnum.POOR;
    if (!isAlert) return;
    indicatorValue = indicatorRow.code_qual;
    indicatorStatus = getIndiceAtmoStatus(indicatorRow.code_qual ?? 0);
  }

  if (indicatorSlug === 'pollen_allergy') {
    indicatorRow = indicatorRow as PollenAllergyRisk;
    const isAlert =
      !!indicatorRow.total && indicatorRow.total >= PollensRiskNumberEnum.HIGH;
    if (!isAlert) return;
    indicatorValue = indicatorRow.total;
    indicatorStatus = getPollensStatus(indicatorRow.total ?? 0);
  }

  if (indicatorValue === null) {
    capture('No indicatorValue found for alert notification', {
      extra: {
        indicatorSlug,
        indicatorRow,
      },
    });
    return;
  }

  console.log('indicatorValue', indicatorValue);
  console.log('indicatorStatus', indicatorStatus);
  console.log('typeWeatherAlertId', typeWeatherAlertId);
  console.log('phenomenons', phenomenons);
  console.log('recommandationId', recommandationId);

  const users = await prisma.user.findMany({
    where: {
      notifications_preference: {
        has: 'alert',
      },
      municipality_insee_code: indicatorRow.municipality_insee_code,
      push_notif_token: {
        not: null,
      },
    },
  });

  let notificationsSent = 0;
  let notificationsInDb = 0;

  if (phenomenons.length > 0) {
    for (const phenomenon of phenomenons) {
      const title = `Alerte ${phenomenon.name}: ${getAlertValueByColorId(
        phenomenon.value,
      )}`;

      const recommandation = await prisma.recommandation.findFirst({
        where: {
          indicator: IndicatorsSlugEnum.weather_alert,
          indicator_value: indicatorValue,
          type_weather_alert: typeWeatherAlertId,
        },
        select: {
          unique_key: true,
          recommandation_content: true,
        },
      });

      const body = recommandation?.recommandation_content ?? '';

      for (const user of users) {
        const { notificationSent, notificationInDb } =
          await sendPushNotification({
            user,
            title,
            body,
            data: {
              indicatorSlug,
              indicatorId: indicatorRow.id,
              recommandationId,
              indicatorValue,
              typeWeatherAlert,
            },
          });
        if (notificationSent) notificationsSent++;
        if (notificationInDb) notificationsInDb++;
      }
    }
  } else {
    const title = `${getNotificationTitle(
      indicatorSlug,
      indicatorValue,
      typeWeatherAlert,
    )}: ${indicatorStatus}`;

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

    const body = recommandation?.recommandation_content ?? '';

    for (const user of users) {
      const { notificationSent, notificationInDb } = await sendPushNotification(
        {
          user,
          title,
          body,
          data: {
            indicatorSlug,
            indicatorId: indicatorRow.id,
            recommandationId,
            indicatorValue,
            typeWeatherAlert,
          },
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

function getNotificationTitle(
  indicatorSlug: IndicatorsSlugEnum,
  indicatorValue: number,
  typeWeatherAlert: WeatherAlertPhenomenonEnum | null,
) {
  switch (indicatorSlug) {
    case IndicatorsSlugEnum.indice_atmospheric:
      return "💨 Qualité de l'air";
    case IndicatorsSlugEnum.indice_uv:
      return '☀️ Indice UV';
    case IndicatorsSlugEnum.weather_alert:
      if (indicatorValue <= 2) return '☔ Vigilance Météo';
      switch (typeWeatherAlert) {
        case WeatherAlertPhenomenonEnum.VIOLENT_WIND:
          return '🌪️ Alerte Vent violent';
        case WeatherAlertPhenomenonEnum.RAIN_FLOOD:
          return '🌧️ Alerte Pluie-Inondation';
        case WeatherAlertPhenomenonEnum.STORM:
          return '🌩️ Alerte Orages';
        case WeatherAlertPhenomenonEnum.FLOOD:
          return '🌊 Alerte Crues';
        case WeatherAlertPhenomenonEnum.SNOW_ICE:
          return '⛸️ Alerte Neige-verglas';
        case WeatherAlertPhenomenonEnum.HEAT_WAVE:
          return '🥵 Alerte Canicule';
        case WeatherAlertPhenomenonEnum.COLD_WAVE:
          return '🥶 Alerte Grand Froid';
        case WeatherAlertPhenomenonEnum.AVALANCHE:
          return '🌨️ Alerte Avalanches';
        case WeatherAlertPhenomenonEnum.WAVES_SUBMERSION:
          return '🌊 Alerte Vagues-Submersion';
        default:
          return '☔ Vigilance Météo';
      }
    case IndicatorsSlugEnum.bathing_water:
      return '🐳 Eaux de baignade';
    case IndicatorsSlugEnum.pollen_allergy:
      return '🌿 Risque pollens';
  }
}

export {
  sendMorningNotification,
  sendEveningNotification,
  sendAlertNotification,
};
