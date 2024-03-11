import express from 'express';
import prisma from '~/prisma';
import { catchErrors } from '../middlewares/errors';
import type { RequestWithMatomoEvent } from '~/types/request';
import { canAskReviewForUser } from '~/utils/user';
const router = express.Router();

router.post(
  '/',
  catchErrors(async (req: RequestWithMatomoEvent, res: express.Response) => {
    const event = req.body.event;

    if (!req.body.userId) {
      res.status(200).send({ ok: true });
      return;
    }

    if (
      event.category === 'STORE_REVIEW' &&
      event.action === 'TRIGGERED_FROM_SETTINGS'
    ) {
      await prisma.user.update({
        where: {
          matomo_id: req.body.userId,
        },
        data: {
          asked_for_review: { increment: 1 },
          asked_for_review_latest_at: new Date(),
        },
      });
    }
    if (event.category === 'APP' && event.action === 'APP_OPEN') {
      const user = await prisma.user.findUnique({
        where: {
          matomo_id: req.body.userId,
        },
      });
      if (!canAskReviewForUser(user)) {
        res.status(200).send({ ok: true });
        return;
      }
      await prisma.user.update({
        where: {
          matomo_id: req.body.userId,
        },
        data: {
          asked_for_review: { increment: 1 },
          asked_for_review_latest_at: new Date(),
        },
      });
      res.status(200).send({ ok: true, askForReview: true });
      return;
    }
    res.status(200).send({ ok: true });
  }),
);

export default router;
