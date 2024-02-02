import express from 'express';
import { z } from 'zod';
import { withUser } from '~/middlewares/auth';

import { catchErrors } from '~/middlewares/errors';
import prisma from '~/prisma';
import { type CustomError } from '~/types/error';

import { type RequestWithUser } from '~/types/request';

const feedbackRouter = express.Router();

feedbackRouter.post(
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
          score: z.number(),
          message: z.string().optional(),
          contact: z.string().optional(),
        }).parse(req.body);
      } catch (zodError) {
        console.log('error zod');
        const customError = new Error(
          `Invalid request in post feedback: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }

      await prisma.feedback.create({
        data: {
          user_id: req.user.id,
          score: req.body.score,
          message: req.body.message,
          contact: req.body.contact,
        },
      });
      res.status(200).send({ ok: true });
    },
  ),
);

export default feedbackRouter;
