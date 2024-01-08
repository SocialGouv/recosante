import express from 'express';
import { z } from 'zod';
import { catchErrors } from '../middlewares/errors';
import prisma from '../prisma.js';
import { CustomError } from '~/types/error';
import { User } from '@prisma/client';
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
          municipality_insee_code: z.string().optional(),
          municipality_name: z.string().optional(),
          municipality_zip_code: z.string().optional(),
          push_notif_token: z.string().optional(),
          favorite_indicator: z.string().optional(),
          notification_preference: z.array(z.string()).optional(),
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
      if (req.body.hasOwnProperty('matomo_id')) {
        updatedUser.matomo_id = req.body.matomo_id;
      }
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
      if (req.body.hasOwnProperty('favorite_indicator')) {
        updatedUser.favorite_indicator = req.body.favorite_indicator;
      }
      if (req.body.hasOwnProperty('notifications_preference')) {
        updatedUser.notifications_preference =
          req.body.notifications_preference;
      }

      console.log('updatedUser', updatedUser);

      await prisma.user
        .upsert({
          where: { matomo_id },
          update: updatedUser,
          create: {
            ...updatedUser,
          },
        })
        .then((user) => {
          console.log('user', user);
        })
        .catch((error) => {
          console.log('error', error);
        });
      return res.status(200).send({ ok: true });
    },
  ),
);

export default router;
