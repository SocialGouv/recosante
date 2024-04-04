import express from 'express';
import dayjs from 'dayjs';
import { catchErrors } from '~/middlewares/errors';
import type { Indicator } from '~/types/api/indicator';
import type { CustomError } from '~/types/error';
import type { RequestWithUser } from '~/types/request';
import { getIndiceUvFromMunicipalityAndDate } from '~/getters/indice_uv';
import { getIndiceAtmoFromMunicipalityAndDate } from '~/getters/indice_atmo';
import { getPollensFromMunicipalityAndDate } from '~/getters/pollens';
import { getWeatherAlertFromMunicipalityAndDate } from '~/getters/weather_alert';
import { indicatorsList } from '~/getters/indicators_list';
import { withUser } from '~/middlewares/auth';
import utc from 'dayjs/plugin/utc';
import { getBathingWaterFromMunicipalityAndDate } from '~/getters/bathing_water';
import { getDrinkingWaterFromUdi } from '~/getters/drinking_water';
import { IndicatorsSlugEnum } from '@prisma/client';
dayjs.extend(utc);

const router = express.Router();

router.get(
  '/list',
  withUser,
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    if (Number(req.user.appbuild) < 62) {
      res.status(200).send({
        ok: true,
        data: indicatorsList.filter(
          (list) => list.slug !== IndicatorsSlugEnum.drinking_water,
        ),
      });
      return;
    }
    res.status(200).send({ ok: true, data: indicatorsList });
    return;
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

      const pollens = await getPollensFromMunicipalityAndDate({
        municipality_insee_code,
        date_UTC_ISO: dayjs().utc().toISOString(),
      });
      if (pollens instanceof Error) {
        next(pollens);
        return;
      }
      if (pollens) indicators.push(pollens);

      const weatherAlert = await getWeatherAlertFromMunicipalityAndDate({
        municipality_insee_code,
        date_UTC_ISO: dayjs().utc().toISOString(),
      });
      if (weatherAlert instanceof Error) {
        next(weatherAlert);
        return;
      }

      if (weatherAlert) indicators.push(weatherAlert);

      const bathingWater = await getBathingWaterFromMunicipalityAndDate({
        municipality_insee_code,
        date_UTC_ISO: dayjs().utc().toISOString(),
      });
      if (bathingWater instanceof Error) {
        next(bathingWater);
        return;
      }

      if (bathingWater) indicators.push(bathingWater);

      const drinkingWater = await getDrinkingWaterFromUdi({
        udi: req.user.udi,
        municipality_insee_code,
        date_UTC_ISO: dayjs().utc().toISOString(),
      });
      if (drinkingWater instanceof Error) {
        next(drinkingWater);
        return;
      }
      if (drinkingWater) indicators.push(drinkingWater);

      res.status(200).send({ ok: true, data: indicators });
    },
  ),
);

export default router;
