import * as Sentry from '@sentry/node';
import type express from 'express';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import type { RequestWithUser } from '~/types/request';

export async function withUser(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  const matomo_id = req.headers.authorization;
  if (!matomo_id) {
    next(new Error('Missing matomo_id'));
    return;
  }
  let user = await prisma.user.findUnique({
    where: {
      matomo_id,
    },
  });
  if (!user) {
    capture('Unexpected user not found so we create a new one', {
      extra: { matomo_id },
    });
    user = await prisma.user.create({
      data: {
        matomo_id,
      },
    });
    // next(new Error('User not found'));
    // return;
  }
  Sentry.setUser(user);
  (req as unknown as RequestWithUser).user = user;
  next();
}
