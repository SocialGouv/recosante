import type express from 'express';

const MINIMUM_MOBILE_APP_VERSION = 20;

export default function (
  {
    headers: { appversion, appbuild, appdevice, currentroute, authorization },
  }: {
    headers: {
      appversion: string;
      appbuild: string;
      appdevice: string;
      currentroute: string;
      authorization: string;
    };
  },
  res: express.Response,
  next: express.NextFunction,
) {
  if (!appbuild) {
    return res.status(403).send({
      ok: false,
      sendInApp: ['Veuillez mettre à jour votre application!'],
    });
  }

  const ANDROID_APP_ID = 'com.recosante.recosante';
  const IOS_APP_ID = '6476136888';
  const ANDROID_URL = `https://play.google.com/store/apps/details?id=${ANDROID_APP_ID}`;
  const IOS_URL = `https://apps.apple.com/fr/app/id${IOS_APP_ID}`;

  const storeLink = appdevice === 'ios' ? IOS_URL : ANDROID_URL;

  if (Number(appbuild) < MINIMUM_MOBILE_APP_VERSION) {
    return res.status(403).send({
      ok: false,
      sendInApp: [
        "Votre application n'est pas à jour !",
        'Vous pouvez la mettre à jour en cliquant sur le lien ci-dessous',
        [{ text: 'Mettre à jour', link: storeLink }],
        { cancelable: true },
      ],
    });
  }
  next();
}
