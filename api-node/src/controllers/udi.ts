import express from 'express';
import { z } from 'zod';
import prisma from '~/prisma';
import { catchErrors } from '../middlewares/errors';
import { type CustomError } from '~/types/error';
import { type udis } from '@prisma/client';

const router = express.Router();

router.get(
  '/',
  catchErrors(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({
          lat: z.string(),
          lon: z.string(),
        }).parse(req.query);
      } catch (zodError) {
        const customError = new Error(
          `Invalid request in get udi: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        const customError = new Error(
          `Invalid request in get udi: lat and lon are required`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }

      const longitude = parseFloat(lon as string);
      const latitude = parseFloat(lat as string);

      const udi: udis = await prisma.$queryRaw`
            SELECT code_udi
            FROM public.udis
            WHERE ST_Within(
                ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
                wkb_geometry
            );
        `;

      res.status(200).send({ ok: true, data: udi });
    },
  ),
);

export default router;
