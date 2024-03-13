import type express from 'express';

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const {
    // appversion,
    appbuild,
    appdevice,
    // currentroute,
    // authorization,
  } = req.headers;

  if (!appbuild) {
    res.status(403).send({
      ok: false,
      sendInApp: ['Veuillez mettre à jour votre application!'],
    });
    return;
  }

  const ANDROID_APP_ID = 'com.recosante.recosante';
  const IOS_APP_ID = '6476136888';
  const ANDROID_URL = `https://play.google.com/store/apps/details?id=${ANDROID_APP_ID}`;
  const IOS_URL = `https://apps.apple.com/fr/app/id${IOS_APP_ID}`;

  const deviceIsIOS = appdevice === 'ios';
  const storeLink = deviceIsIOS ? IOS_URL : ANDROID_URL;

  const MINIMUM_MOBILE_APP_VERSION = deviceIsIOS ? 48 : 60;

  if (Number(appbuild) < MINIMUM_MOBILE_APP_VERSION) {
    res.status(403).send({
      ok: false,
      sendInApp: [
        'Nouvelle version disponible',
        "Nous avons corrigé des bugs et ajouté de nouvelles fonctionnalités qui nécessite une mise à jour de l'application.",
        [{ text: 'Mettre à jour', link: storeLink }],
        { cancelable: true },
      ],
    });
    return;
  }
  next();
}
