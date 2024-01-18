import express from 'express';
import dayjs from 'dayjs';
import { type IndicatorsSlugEnum } from '@prisma/client';
import { catchErrors } from '~/middlewares/errors';
import type { IndicatorDataTodayAndTomorrow } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import type { RequestWithUser } from '~/types/request';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';
import { indicatorsList } from '~/getters/indicators_list';
import * as indicatorMocks from './mocks/indicators';
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

      const data: Record<IndicatorsSlugEnum, IndicatorDataTodayAndTomorrow> = {
        // TODO FIXME: remove `as` and handle errors
        indice_uv: (await getIndiceUvFromMunicipalityAndDate({
          municipality_insee_code,
          date_UTC_ISO: dayjs().utc().toISOString(),
        })) as IndicatorDataTodayAndTomorrow,
        indice_atmospheric: (await getIndiceAtmoFromMunicipalityAndDate({
          municipality_insee_code,
          date_UTC_ISO: dayjs().utc().toISOString(),
        })) as IndicatorDataTodayAndTomorrow,
        pollen_allergy: indicatorMocks.pollen_allergy,
        weather_alert: indicatorMocks.weather_alert,
        bathing_water: indicatorMocks.bathing_water,
      };

      res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
