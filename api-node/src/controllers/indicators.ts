import express from 'express';
import { catchErrors } from '~/middlewares/errors';
import type { Indicator } from '~/types/api/indicator';
const router = express.Router();

router.get(
  '/',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    const indicators: Indicator[] = [
      {
        name: 'Indice ATMO',
        slug: 'indice_atmospheric',
      },
      {
        name: 'Indice UV',
        slug: 'indice_uv',
      },
      {
        name: 'Allergie aux Pollens',
        slug: 'pollen_allergy',
      },
      {
        name: 'Alerte Météo',
        slug: 'weather_alert',
      },
      // {
      //   name: 'Épisode Pollution Atmosphérique',
      //   slug: 'episode_pollution_atmospheric',
      // },
      // {
      //   name: 'Eau du robinet',
      //   slug: 'tap_water',
      // },
      {
        name: 'Eau de baignades',
        slug: 'bathing_water',
      },
    ];
    return res.status(200).send({ ok: true, data: indicators });
  }),
);

export default router;
