import express from 'express';
import dayjs from 'dayjs';
import { type IndicatorsSlugEnum } from '@prisma/client';
import { catchErrors } from '~/middlewares/errors';
import type { IndicatorCommonData } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import type { RequestWithUser } from '~/types/request';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';
import { indicatorsList } from '~/getters/indicators_list';
import indicatorMocks from './mocks/indicators.json';
import { withUser } from '~/middlewares/auth';
import utc from 'dayjs/plugin/utc';
import { getIndiceAtmoFromMunicipalityAndDate } from '~/getters/indice_atmo';
dayjs.extend(utc);

const router = express.Router();

router.get(
  '/list',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    res.status(200).send({ ok: true, data: indicatorsList });
  }),
);

router.get(
  '/',
  withUser,
  catchErrors(
    async (
      req: RequestWithUser,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (!req.user.municipality_insee_code) {
        const error = new Error(
          'User has no municipality_insee_code',
        ) as CustomError;
        error.status = 400;
        next(error);
        return;
      }

      const municipality_insee_code = req.user.municipality_insee_code;

      const data: Record<IndicatorsSlugEnum, IndicatorCommonData> = {
        // temporary mocks and types
        ...(indicatorMocks as Record<IndicatorsSlugEnum, IndicatorCommonData>),
        indice_uv: await getIndiceUvFromMunicipalityAndDate({
          municipality_insee_code,
          date_UTC_ISO: dayjs().utc().toISOString(),
        }),
        indice_atmospheric: await getIndiceAtmoFromMunicipalityAndDate({
          municipality_insee_code,
          date_UTC_ISO: dayjs().utc().toISOString(),
        }),
      };

      res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
