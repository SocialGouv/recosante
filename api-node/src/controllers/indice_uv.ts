import express from 'express';
import { catchErrors } from '~/middlewares/errors';
import { CustomError } from '~/types/error';
const router = express.Router();
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceUVColor, getIndiceUVLabel } from '~/utils/indice_uv';
import type { IndiceUVNumber, IndiceUVAPIData } from '~/types/api/indice_uv';

router.get(
  '/:municipality_insee_code/:date_ISO',
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
        }).parse(_req.params);
        z.object({
          matomo_id: z.string().length(16), // at least for auth
        }).parse(_req.query);
      } catch (zodError) {
        const error = new Error(
          `Invalid request in person delete: ${zodError}`,
        ) as CustomError;
        error.status = 400;
        return next(error);
      }

      const { municipality_insee_code, date_ISO } = _req.params; // OR: just retrieve the municipality_insee_code from user row in DB ? IDK

      const indice_uv = await prisma.indiceUv.findFirst({
        where: {
          municipality_insee_code,
          data_availability: 'AVAILABLE',
          validity_start: {
            gte: dayjs(date_ISO).startOf('day').toISOString(),
          },
        },
        orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
      });

      if (!indice_uv || !indice_uv.uv_j0) {
        const error = new Error(
          `No indice_uv found for municipality_insee_code=${municipality_insee_code} and date_ISO=${date_ISO}`,
        ) as CustomError;
        error.status = 404;
        return next(error);
      }

      const data: IndiceUVAPIData = {
        id: indice_uv.id,
        municipality_insee_code: indice_uv.municipality_insee_code,
        validity_start: indice_uv.validity_start,
        validity_end: indice_uv.validity_end,
        diffusion_date: indice_uv.diffusion_date,
        created_at: indice_uv.created_at,
        updated_at: indice_uv.updated_at,
        j0: {
          indice_uv_value: indice_uv.uv_j0,
          indice_uv_color: getIndiceUVColor(indice_uv.uv_j0 as IndiceUVNumber),
          indice_uv_label: getIndiceUVLabel(indice_uv.uv_j0 as IndiceUVNumber),
        },
      };

      if (indice_uv.uv_j1) {
        data.j1 = {
          indice_uv_value: indice_uv.uv_j1,
          indice_uv_color: getIndiceUVColor(indice_uv.uv_j1 as IndiceUVNumber),
          indice_uv_label: getIndiceUVLabel(indice_uv.uv_j1 as IndiceUVNumber),
        };
      }

      return res.status(200).send({ ok: true, data });
    },
  ),
);

export default router;
