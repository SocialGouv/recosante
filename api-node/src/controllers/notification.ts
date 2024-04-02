import express from 'express';
import { z } from 'zod';
import { withUser } from '~/middlewares/auth';

import { catchErrors } from '~/middlewares/errors';
import prisma from '~/prisma';
import { type CustomError } from '~/types/error';

import { type RequestWithUser } from '~/types/request';

const notificationRouter = express.Router();

notificationRouter.post(
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
          id: z.string(),
          status: z.enum(['CLICKED']),
        }).parse(req.body);
      } catch (zodError) {
        console.log('error zod');
        const customError = new Error(
          `Invalid request in post notification: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }

      await prisma.notification.update({
        where: {
          expo_id: req.body.id,
        },
        data: {
          status: req.body.status,
        },
      });
      res.status(200).send({ ok: true });
    },
  ),
);

export default notificationRouter;
