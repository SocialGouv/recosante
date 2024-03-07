import express from 'express';
import { z } from 'zod';
import { catchErrors } from '../middlewares/errors';
import { type CustomError } from '~/types/error';
import { UdiService } from '~/service/udi.js';
import { type TabWaterResponse } from '~/types/api/tap_water';

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
      const currentUdi = UdiService.getUdiByCoordinates(lat, lon);
      if (!currentUdi[0]) {
        res.status(404).send({ error: 'No UDI found' });
        return;
      }

      const result = await fetch(
        `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=${currentUdi[0]}&size=20`,
      );
      const data = (await result.json()) as TabWaterResponse;
      const sub_indicators = data.data.map((d) => {
        return {
          label: d.libelle_parametre,
          value: d.resultat_numerique,
          unit: d.libelle_unite,
          conformity_pc: d.conformite_references_pc_prelevement,
        };
      });
      const indicator = {
        conclusion: data.data[0].conclusion_conformite_prelevement,
        confirmity: data.data[0].conformite_references_pc_prelevement,
        date: data.data[0].date_prelevement,
        // all: data.data,
      };

      res.status(200).send({ ok: true, indicator, sub_indicators });
    },
  ),
);

export default router;
