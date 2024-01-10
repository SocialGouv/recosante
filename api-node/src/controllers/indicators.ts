import express from 'express';
import { z } from 'zod';
import { IndicatorsSlugEnum } from '@prisma/client';
import dayjs from 'dayjs';
import { catchErrors } from '~/middlewares/errors';
import type { IndicatorCommonData } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import type { MunicipalityJSON } from '~/types/municipality';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';
import { indicatorsList } from '~/getters/indicators_list';

const router = express.Router();

router.get(
  '/list',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    return res.status(200).send({ ok: true, data: indicatorsList });
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
        z.object({
          municipality_insee_code: z.string().length(5),
          date_ISO: z.string().length(24),
          // matomo_id: z.string().length(16), // at least for auth
        }).parse(_req.query);
      } catch (zodError) {
        const error = new Error(
          `Invalid request in GET /indicators/: ${zodError}`,
        ) as CustomError;
        error.status = 400;
        return next(error);
      }

      const municipality_insee_code = _req.query
        .municipality_insee_code as MunicipalityJSON['COM']; // OR: just retrieve the municipality_insee_code from user row in DB ? IDK
      const date_ISO = _req.query.date_ISO as string;

      const example = {
        id: '1234',
        name: 'Indice ATMO',
        slug: IndicatorsSlugEnum.indice_atmospheric,
        municipality_insee_code,
        validity_start: dayjs(date_ISO).startOf('day').toDate(),
        validity_end: dayjs(date_ISO).endOf('day').toDate(),
        diffusion_date: dayjs(date_ISO).startOf('day').toDate(),
        created_at: dayjs(date_ISO).startOf('day').toDate(),
        updated_at: dayjs(date_ISO).startOf('day').toDate(),
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

      const data: Record<IndicatorsSlugEnum, IndicatorCommonData> = {
        indice_uv: await getIndiceUvFromMunicipalityAndDate({
          municipality_insee_code,
          date_ISO,
        }),
        bathing_water: example,
        indice_atmospheric: example,
        pollen_allergy: example,
        weather_alert: example,
        // episode_pollution_atmospheric: example,
        // tap_water: example,
      };

      return res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
