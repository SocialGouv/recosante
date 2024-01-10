import express from 'express';
import { z } from 'zod';
import { IndicatorsSlugEnum } from '@prisma/client';
import dayjs from 'dayjs';
import { catchErrors } from '~/middlewares/errors';
import type { Indicator } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';

const router = express.Router();

router.get(
  '/list',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    const indicators: Indicator[] = [
      {
        name: 'Indice ATMO',
        slug: IndicatorsSlugEnum.indice_atmospheric,
      },
      {
        name: 'Indice UV',
        slug: IndicatorsSlugEnum.indice_uv,
      },
      {
        name: 'Allergie aux Pollens',
        slug: IndicatorsSlugEnum.pollen_allergy,
      },
      {
        name: 'Alerte Météo',
        slug: IndicatorsSlugEnum.weather_alert,
      },
      // {
      //   name: 'Épisode Pollution Atmosphérique',
      //   slug: IndicatorsSlugEnum.episode_pollution_atmospheric,
      // },
      // {
      //   name: 'Eau du robinet',
      //   slug: IndicatorsSlugEnum.tap_water,
      // },
      {
        name: 'Eau de baignades',
        slug: IndicatorsSlugEnum.bathing_water,
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

      const example = {
        id: '1234',
        municipality_insee_code,
        validity_start: dayjs(date_ISO).startOf('day').toISOString(),
        validity_end: dayjs(date_ISO).endOf('day').toISOString(),
        diffusion_date: dayjs(date_ISO).startOf('day').toISOString(),
        created_at: dayjs(date_ISO).startOf('day').toISOString(),
        updated_at: dayjs(date_ISO).startOf('day').toISOString(),
        recommendations: ['blasbla', 'blibli'],
        about: 'bloblo',
        j0: {
          value: 3,
          color: '#207900',
          label: 'Fort',
          recommendation: 'blablabla',
        },
        j1: {
          value: 3,
          color: '#207900',
          label: 'Fort',
          recommendation: 'blablabla',
        },
      };

      const data: Record<IndicatorsSlugEnum, any> = {
        indice_uv: await getIndiceUvFromMunicipalityAndDate({
          municipality_insee_code,
          date_ISO,
        }),
        bathing_water: example,
        indice_atmospheric: example,
        pollen_allergy: example,
        weather_alert: example,
        episode_pollution_atmospheric: example,
        tap_water: example,
      };

      return res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
