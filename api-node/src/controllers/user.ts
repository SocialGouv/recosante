import express from 'express';
import { z } from 'zod';
import { catchErrors } from '../middlewares/errors.ts';
import { CustomError } from '../types/error.ts';
import { User } from '@prisma/client';
import prisma from 'prisma.ts';
const router = express.Router();

router.post(
  '/',
  catchErrors(
    async (
      req: {
        body: User;
      },
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({
          matomo_id: z.string(),
          municipality_code: z.string().optional(),
          municipality_nom: z.string().optional(),
          municipality_zip_code: z.string().optional(),
          push_notif_token: z.string().optional(),
        }).parse(req.body);
      } catch (error) {
        const customError = new Error(
          `Invalid request in post user: ${error}`,
        ) as CustomError;
        customError.status = 400;
        return next(customError);
      }

      const updatedUser = {} as User;
      const { matomo_id } = req.body;
      if (req.body.hasOwnProperty('municipality_zip_code')) {
        updatedUser.municipality_zip_code = req.body.municipality_zip_code;
      }
      if (req.body.hasOwnProperty('municipality_name')) {
        updatedUser.municipality_name = req.body.municipality_name;
      }
      if (req.body.hasOwnProperty('municipality_zip_code')) {
        updatedUser.municipality_zip_code = req.body.municipality_zip_code;
      }
      if (req.body.hasOwnProperty('push_notif_token')) {
        updatedUser.push_notif_token = req.body.push_notif_token;
      }
      console.log('updatedUser', updatedUser);
      await prisma.user.upsert({
        where: { matomo_id },
        update: updatedUser,
        create: {
          ...updatedUser,
        },
      });
      return res.status(200).send({ ok: true });
    },
  ),
);

export default router;
