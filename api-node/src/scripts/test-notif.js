import { Expo } from 'expo-server-sdk';

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

// const body = '💨: 🔴\n ☀️: 🟡\n ☔: 🟤\n 🐳: 🟠\n 🌿: 🟢';
// const body =
//   '🌬️ Vent violent: 🔴\n🌧️ Indice UV: 🟡\n⛸️ Eaux de baignade: 🟢\n🌊 Pollens: 🟠';
// const title = 'Notif du matin :';
// const body = '💨 Indice ATMO : Moyen 🟡\n🌪️ Vent violent : Attentif 🔴';

/*
Notif du matin
const body = '💨 Indice ATMO : Moyen 🟢';
const title = 'Vos nouvelles matinales';
*/

/*
Notif du soir
const body = '💨 Indice ATMO : Moyen 🟢';
const title = 'Vos prévisions pour demain';
*/

/*
Notif du soir
const title = 'ALERTE';
const body = '☀️ Indice UV : Extrême 🟣';
*/

// '🌬️ Alerte Vent violent';
// '🌧️ Alerte Pluie-Inondation';
// '🌩️ Alerte Orages';
// '🌊 Alerte Crues';
// '⛸️ Alerte Neige-verglas';
// '🥵 Alerte Canicule';
// '🥶 Alerte Grand Froid';
// '🌨️ Alerte Avalanches';
// '🌊 Alerte Vagues-Submersion';
const message = {
  sound: 'default',
  title,
  body,
  badge: 0,
};

// expo.sendPushNotificationsAsync([
//   { ...message, to: 'ExponentPushToken[XXXXXX]' },
//   { ...message, to: 'ExponentPushToken[XXXXXX]' },
//   { ...message, to: 'ExponentPushToken[XXXXXX]' },
// ]);
