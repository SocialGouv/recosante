import express from 'express';
import { catchErrors } from '~/middlewares/errors';
import type { Indicator } from '~/types/api/indicator';
const router = express.Router();
import { CustomError } from '~/types/error';
import { z } from 'zod';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';

router.get(
  '/list',
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

router.get(
  '/',
  catchErrors(
    async (
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({}).parse(_req.params);
        z.object({
          municipality_insee_code: z.string().length(5),
          date_ISO: z.string().length(24),
          // matomo_id: z.string().length(16), // at least for auth
        }).parse(_req.query);
      } catch (zodError) {
        const error = new Error(
          `Invalid request in GET /indice_uv/:municipality_insee_code/:date_ISO: ${zodError}`,
        ) as CustomError;
        error.status = 400;
        return next(error);
      }

      const { municipality_insee_code, date_ISO } = _req.params; // OR: just retrieve the municipality_insee_code from user row in DB ? IDK

      const indice_uv = await getIndiceUvFromMunicipalityAndDate({
        municipality_insee_code,
        date_ISO,
      });

      const data = {
        indice_uv,
      };

      return res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
