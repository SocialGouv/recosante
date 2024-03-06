import express from 'express';
import { z } from 'zod';
import { catchErrors } from '../middlewares/errors';
import { type CustomError } from '~/types/error';
import { UdiService } from '~/service/udi.js';

const router = express.Router();

router.post(
  '/',
  catchErrors(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({
          lat: z.number(),
          lon: z.number(),
        }).parse(req.body);
      } catch (zodError) {
        const customError = new Error(
          `Invalid request in get udi: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
      }
      const { lat, lon } = req.body;
      const currentUdi = await UdiService.getUdiByCoordinates(lat, lon);
      if (!currentUdi) {
        res.status(404).send({ error: 'No UDI found' });
        return;
      }

      const result = await fetch(
        `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=${currentUdi}&size=20`,
      );
      const data = await result.json();
      res.status(200).send({ ok: true, data: { currentUdi, data } });
    },
  ),
);

export default router;
