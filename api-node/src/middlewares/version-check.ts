import type express from 'express';

// const MINIMUM_MOBILE_APP_VERSION = 75;

export default function (
  {
    headers: { appversion },
  }: {
    headers: {
      appversion: string;
    };
  },
  res: express.Response,
  next: express.NextFunction,
) {
  // if (!appversion) return res.status(403).send({ ok: false, sendInApp: ["Veuillez mettre à jour votre application!"] });
  // if (Number(appversion) < MINIMUM_MOBILE_APP_VERSION)
  //   return res.status(403).send({
  //     ok: false,
  //     sendInApp: [
  //       "Votre application n'est pas à jour !",
  //       "Vous pouvez la mettre à jour en cliquant sur le lien ci-dessous",
  //       [{ text: "Mettre à jour", link: "https://www.ozensemble.fr" }],
  //       { cancelable: true },
  //     ],
  //   });
  next();
}
