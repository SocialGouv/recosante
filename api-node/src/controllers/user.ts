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
          udi: z.string().optional(),
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

      const updatedUser: Partial<User> = {
        appversion: `${req.headers.appversion as string}`,
        appbuild: `${req.headers.appbuild as string}`,
        appdevice: `${req.headers.appdevice as string}`,
      };
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
      if (bodyHasProperty('udi')) {
        updatedUser.udi = req.body.udi;
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

      const updatedDbUser = await prisma.user.upsert({
        where: { matomo_id: req.user.matomo_id },
        update: updatedUser,
        create: {
          matomo_id: req.user.matomo_id,
          ...updatedUser,
        },
      });

      // Cleaning of old users with the same push_notif_token
      // https://docs.expo.dev/push-notifications/faq/#when-and-why-does-the-expopushtoken-change
      // > The ExpoPushToken will remain the same across app upgrades.
      // > On iOS, it will also remain the same even after uninstalling the app and reinstalling it.
      // > On Android, this results in the push token changing.
      const pushToken = updatedDbUser.push_notif_token;

      if (pushToken && pushToken?.length > 0) {
        const usersWithSamePushToken = await prisma.user.findMany({
          where: {
            id: { not: updatedDbUser.id },
            push_notif_token: pushToken,
          },
        });

        if (usersWithSamePushToken.length > 0) {
          await prisma.user.updateMany({
            where: {
              id: { in: usersWithSamePushToken.map((user) => user.id) },
            },
            data: {
              push_notif_token: `DELETED_${pushToken}`,
              deleted_at: new Date(),
              deleted_because: `push_notif_token taken by a more recent user (id: ${updatedDbUser.id})`,
            },
          });
        }
      }

      res.status(200).send({ ok: true, data: updatedDbUser });
    },
  ),
);

export default router;
