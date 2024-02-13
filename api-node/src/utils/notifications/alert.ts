// import { IndicatorsSlugEnum, type User } from '@prisma/client';
// import prisma from '~/prisma';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import { capture } from '~/third-parties/sentry';
// import {
//   getAlertValueByColorId,
//   getSortedPhenomenonsByValue,
//   getWeatherAlertDotColor,
// } from '~/utils/weather_alert';
// import { sendPushNotification } from '~/service/expo-notifications';
// import { getIndiceUVForJ } from '~/getters/indice_uv';
// import { getIndiceAtmoForJ1 } from '~/getters/indice_atmo';
// import { getPollensForJ1 } from '~/getters/pollens';
// import { getWeatherAlertForJ1 } from '~/getters/weather_alert';
// import type { IndiceUVNumber } from '~/types/api/indice_uv';
// import { WeatherAlertPhenomenonEnum } from '~/types/api/weather_alert';
// import { getIndiceUVDotColor, getIndiceUVStatus } from '~/utils/indice_uv';
// import { getPollensDotColor, getPollensStatus } from '~/utils/pollens';
// import {
//   getIndiceAtmoDotColor,
//   getIndiceAtmoStatus,
// } from '~/utils/indice_atmo';
// dayjs.extend(utc);

// type IndicatorRow =
//   | IndiceUv
//   | PollenAllergyRisk
//   | WeatherAlert
//   | IndiceAtmospheric;

// export async function sendAlertNotification(
//   indicatorSlug: IndicatorsSlugEnum,
//   indicatorRow: IndicatorRow,
// ) {
//   let indicatorValue = null;
//   let indicatorStatus = null;
//   const recommandationId = null;
//   let typeWeatherAlert: WeatherAlertPhenomenonEnum | null = null;
//   let typeWeatherAlertId: WeatherAlertPhenomenonIdEnum | null = null;
//   const phenomenons: Phenomenon[] = [];

//   if (indicatorSlug === 'weather_alert') {
//     indicatorRow = indicatorRow as WeatherAlert;
//     const phenomenons = getSortedPhenomenonsByValue(indicatorRow);
//     const maxColorCodeId = phenomenons[0].value;
//     const worstPhenomenonCodeId = phenomenons[0].id;

//     const isAlert = maxColorCodeId >= WeatherAlertColorIdEnum.ORANGE;
//     if (!isAlert) return;
//     indicatorValue = maxColorCodeId;
//     indicatorStatus = getAlertValueByColorId(indicatorValue);
//     typeWeatherAlertId = worstPhenomenonCodeId;
//     typeWeatherAlert = phenomenons[0].name;
//   }

//   if (indicatorSlug === 'indice_uv') {
//     indicatorRow = indicatorRow as IndiceUv;
//     const isAlert = !!indicatorRow.uv_j0 && indicatorRow.uv_j0 >= 8;
//     if (!isAlert) return;
//     indicatorValue = indicatorRow.uv_j0;
//     indicatorStatus = getIndiceUVStatus(indicatorRow.uv_j0 as IndiceUVNumber);
//   }

//   if (indicatorSlug === 'indice_atmospheric') {
//     indicatorRow = indicatorRow as IndiceAtmospheric;
//     const isAlert =
//       !!indicatorRow.code_qual &&
//       indicatorRow.code_qual >= PolluantQualificatifsNumberEnum.POOR;
//     if (!isAlert) return;
//     indicatorValue = indicatorRow.code_qual;
//     indicatorStatus = getIndiceAtmoStatus(indicatorRow.code_qual ?? 0);
//   }

//   if (indicatorSlug === 'pollen_allergy') {
//     indicatorRow = indicatorRow as PollenAllergyRisk;
//     const isAlert =
//       !!indicatorRow.total && indicatorRow.total >= PollensRiskNumberEnum.HIGH;
//     if (!isAlert) return;
//     indicatorValue = indicatorRow.total;
//     indicatorStatus = getPollensStatus(indicatorRow.total ?? 0);
//   }

//   if (indicatorValue === null) {
//     capture('No indicatorValue found for alert notification', {
//       extra: {
//         indicatorSlug,
//         indicatorRow,
//       },
//     });
//     return;
//   }

//   console.log('indicatorValue', indicatorValue);
//   console.log('indicatorStatus', indicatorStatus);
//   console.log('typeWeatherAlertId', typeWeatherAlertId);
//   console.log('phenomenons', phenomenons);
//   console.log('recommandationId', recommandationId);

//   const users = await prisma.user.findMany({
//     where: {
//       notifications_preference: {
//         has: 'alert',
//       },
//       municipality_insee_code: indicatorRow.municipality_insee_code,
//       push_notif_token: {
//         not: null,
//       },
//     },
//   });

//   let notificationsSent = 0;
//   let notificationsInDb = 0;

//   if (phenomenons.length > 0) {
//     for (const phenomenon of phenomenons) {
//       const title = `Alerte ${phenomenon.name}: ${getAlertValueByColorId(
//         phenomenon.value,
//       )}`;

//       const recommandation = await prisma.recommandation.findFirst({
//         where: {
//           indicator: IndicatorsSlugEnum.weather_alert,
//           indicator_value: indicatorValue,
//           type_weather_alert: typeWeatherAlertId,
//         },
//         select: {
//           unique_key: true,
//           recommandation_content: true,
//         },
//       });

//       const body = recommandation?.recommandation_content ?? '';

//       for (const user of users) {
//         const { notificationSent, notificationInDb } =
//           await sendPushNotification({
//             user,
//             title,
//             body,
//             data: {
//               indicatorSlug,
//               indicatorId: indicatorRow.id,
//               recommandationId,
//               indicatorValue,
//               typeWeatherAlert,
//             },
//           });
//         if (notificationSent) notificationsSent++;
//         if (notificationInDb) notificationsInDb++;
//       }
//     }
//   } else {
//     const title = `${getNotificationTitle(
//       indicatorSlug,
//       indicatorValue,
//       typeWeatherAlert,
//     )}: ${indicatorStatus}`;

//     const recommandation = await prisma.recommandation.findFirst({
//       where: {
//         indicator: indicatorSlug,
//         indicator_value: indicatorValue,
//       },
//       select: {
//         unique_key: true,
//         recommandation_content: true,
//       },
//     });

//     const body = recommandation?.recommandation_content ?? '';

//     for (const user of users) {
//       const { notificationSent, notificationInDb } = await sendPushNotification(
//         {
//           user,
//           title,
//           body,
//           data: {
//             indicatorSlug,
//             indicatorId: indicatorRow.id,
//             recommandationId,
//             indicatorValue,
//             typeWeatherAlert,
//           },
//         },
//       );
//       if (notificationSent) notificationsSent++;
//       if (notificationInDb) notificationsInDb++;
//     }
//   }

//   console.log('EVENING NOTIFICATIONS SENT');
//   console.log('number of users', users.length);
//   console.log('notifications sent', notificationsSent);
//   console.log('notifications in db', notificationsInDb);
// }

// function getNotificationTitle(
//   indicatorSlug: IndicatorsSlugEnum,
//   indicatorValue: number,
//   typeWeatherAlert: WeatherAlertPhenomenonEnum | null,
// ) {
//   switch (indicatorSlug) {
//     case IndicatorsSlugEnum.indice_atmospheric:
//       return "💨 Qualité de l'air";
//     case IndicatorsSlugEnum.indice_uv:
//       return '☀️ Indice UV';
//     case IndicatorsSlugEnum.weather_alert:
//       if (indicatorValue <= 2) return '☔ Vigilance Météo';
//       switch (typeWeatherAlert) {
//         case WeatherAlertPhenomenonEnum.VIOLENT_WIND:
//           return '🌪️ Alerte Vent violent';
//         case WeatherAlertPhenomenonEnum.RAIN_FLOOD:
//           return '🌧️ Alerte Pluie-Inondation';
//         case WeatherAlertPhenomenonEnum.STORM:
//           return '🌩️ Alerte Orages';
//         case WeatherAlertPhenomenonEnum.FLOOD:
//           return '🌊 Alerte Crues';
//         case WeatherAlertPhenomenonEnum.SNOW_ICE:
//           return '⛸️ Alerte Neige-verglas';
//         case WeatherAlertPhenomenonEnum.HEAT_WAVE:
//           return '🥵 Alerte Canicule';
//         case WeatherAlertPhenomenonEnum.COLD_WAVE:
//           return '🥶 Alerte Grand Froid';
//         case WeatherAlertPhenomenonEnum.AVALANCHE:
//           return '🌨️ Alerte Avalanches';
//         case WeatherAlertPhenomenonEnum.WAVES_SUBMERSION:
//           return '🌊 Alerte Vagues-Submersion';
//         default:
//           return '☔ Vigilance Météo';
//       }
//     case IndicatorsSlugEnum.bathing_water:
//       return '🐳 Eaux de baignade';
//     case IndicatorsSlugEnum.pollen_allergy:
//       return '🌿 Risque pollens';
//   }
// }
