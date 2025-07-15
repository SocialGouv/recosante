import express from 'express';
import prisma from '~/prisma';
import { catchErrors } from '../middlewares/errors';
import { z } from 'zod';
import { type CustomError } from '~/types/error';

const router = express.Router();

router.post(
  '/indicator-feedback',
  catchErrors(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({
          indicatorId: z.string(),
          isRelevant: z.boolean(),
        }).parse(req.body);
      } catch (zodError) {
        const customError = new Error(
          `Invalid request in indicator feedback: ${
            zodError instanceof Error ? zodError.message : 'Unknown error'
          }`,
        ) as CustomError;
        customError.status = 400;
        next(customError);
        return;
      }

      const { indicatorId, isRelevant } = req.body;

      await prisma.indicatorFeedback.create({
        data: {
          indicatorId,
          isRelevant,
        },
      });

      res.status(200).send({ ok: true });
    },
  ),
);

export default router;
