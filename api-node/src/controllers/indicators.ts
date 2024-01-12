import express from 'express';
import { z } from 'zod';
import { type IndicatorsSlugEnum } from '@prisma/client';
import { catchErrors } from '~/middlewares/errors';
import type { IndicatorCommonData } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import type { MunicipalityJSON } from '~/types/municipality';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';
import { indicatorsList } from '~/getters/indicators_list';
import indicatorMocks from './mocks/indicators.json';
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
          `Invalid request in GET /indicators/: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        error.status = 400;
        next(error);
        return;
      }

      const municipality_insee_code = _req.query
        .municipality_insee_code as MunicipalityJSON['COM']; // OR: just retrieve the municipality_insee_code from user row in DB ? IDK
      const date_ISO = _req.query.date_ISO as string;

      const data: Record<IndicatorsSlugEnum, IndicatorCommonData> = {
        indice_uv: await getIndiceUvFromMunicipalityAndDate({
          municipality_insee_code,
          date_ISO,
        }),
        // temporary mocks and types
        ...(indicatorMocks as any),
        // episode_pollution_atmospheric: example,
        // tap_water: example,
      };

      return res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
