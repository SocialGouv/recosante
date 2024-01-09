import express from 'express';
import { catchErrors } from '~/middlewares/errors';
import type { Indicator } from '~/types/api/indicator';
const router = express.Router();

router.get(
  '/',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    const indicators: Indicator[] = [
      {
        name: 'Indice Atmosphérique',
        slug: 'indice_atmospheric',
      },
      {
        name: 'Indice UV',
        slug: 'ultra_violet',
      },
      {
        name: 'Allergie aux Pollens',
        slug: 'pollen',
      },
      {
        name: 'Alerte Météo',
        slug: 'weather',
      },
      {
        name: 'Pollution Atmosphérique',
        slug: 'pollution_atmospheric',
      },
      {
        name: "Qualité de l'air",
        slug: 'air_quality',
      },
      {
        name: 'Eau',
        slug: 'water',
      },
    ];
    return res.status(200).send({ ok: true, data: indicators });
  }),
);

export default router;
