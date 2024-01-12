import * as Sentry from '@sentry/node';
import type express from 'express';
import prisma from '~/prisma';
import type { RequestWithUser } from '~/types/request';

export async function withUser(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  const matomo_id = req.headers.authorization;
  const user = await prisma.user.findUnique({
    where: {
      matomo_id,
    },
  });
  if (!user) {
    next(new Error('User not found'));
    return;
  }
  Sentry.setUser(user);
  (req as unknown as RequestWithUser).user = user;
  next();
}
