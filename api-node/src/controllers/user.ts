import express from 'express';
import { z } from 'zod';
import { catchErrors } from '../middlewares/errors';
import prisma from '../prisma.js';
import { type CustomError } from '~/types/error';
import { type User } from '@prisma/client';
import { withUser } from '~/middlewares/auth.js';
import type { RequestWithUser } from '~/types/request';
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
          matomo_id: z.string().length(16),
        }).parse(req.body);
      } catch (zodError) {
        const customError = new Error(
          `Invalid request in post user: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }

      const matomo_id = req.body.matomo_id as User['matomo_id'];
      await prisma.user.upsert({
        where: { matomo_id },
        update: { matomo_id },
        create: { matomo_id },
      });
      res.status(200).send({ ok: true });
    },
  ),
);

router.put(
  '/',
  withUser,
  catchErrors(
    async (
      req: RequestWithUser,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({
          municipality_insee_code: z.string().optional(),
          municipality_name: z.string().optional(),
          municipality_zip_code: z.string().optional(),
          push_notif_token: z.string().optional(),
          favorite_indicator: z.string().optional(),
          notification_preference: z.array(z.string()).optional(),
        }).parse(req.body);
      } catch (zodError) {
        const customError = new Error(
          `Invalid request in post user: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }

      const updatedUser: Partial<User> = {};
      function bodyHasProperty(property: string) {
        return Object.prototype.hasOwnProperty.call(req.body, property);
      }

      if (bodyHasProperty('municipality_insee_code')) {
        updatedUser.municipality_insee_code = req.body.municipality_insee_code;
      }
      if (bodyHasProperty('municipality_name')) {
        updatedUser.municipality_name = req.body.municipality_name;
      }
      if (bodyHasProperty('municipality_zip_code')) {
        updatedUser.municipality_zip_code = req.body.municipality_zip_code;
      }
      if (bodyHasProperty('push_notif_token')) {
        updatedUser.push_notif_token = req.body.push_notif_token;
      }
      if (bodyHasProperty('favorite_indicator')) {
        updatedUser.favorite_indicator = req.body.favorite_indicator;
      }
      if (bodyHasProperty('notifications_preference')) {
        updatedUser.notifications_preference =
          req.body.notifications_preference;
      }

      await prisma.user
        .upsert({
          where: { matomo_id: req.user.matomo_id },
          update: updatedUser,
          create: {
            matomo_id: req.user.matomo_id,
            ...updatedUser,
          },
        })
        .then(() => {
          console.log('User has been updated');
        })
        .catch((error) => {
          console.log('error', error);
        });
      res.status(200).send({ ok: true });
    },
  ),
);

export default router;
