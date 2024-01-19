import express from 'express';
import dayjs from 'dayjs';
import { catchErrors } from '~/middlewares/errors';
import type { Indicator } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import type { RequestWithUser } from '~/types/request';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';
import { indicatorsList } from '~/getters/indicators_list';
import { indicatorsMock } from './mocks/indicators';
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

      const indicators: Indicator[] = [];

      const indice_uv = await getIndiceUvFromMunicipalityAndDate({
        municipality_insee_code,
        date_UTC_ISO: dayjs().utc().toISOString(),
      });
      if (indice_uv instanceof Error) {
        next(indice_uv);
        return;
      }
      if (indice_uv) indicators.push(indice_uv);

      const indice_atmo = await getIndiceAtmoFromMunicipalityAndDate({
        municipality_insee_code,
        date_UTC_ISO: dayjs().utc().toISOString(),
      });
      if (indice_atmo instanceof Error) {
        next(indice_atmo);
        return;
      }
      if (indice_atmo) indicators.push(indice_atmo);

      indicators.push(...indicatorsMock);

      res.status(200).send({ ok: true, data: indicators });
    },
  ),
);

export default router;
