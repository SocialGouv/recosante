import express from 'express';
import prisma from '~/prisma';
import { catchErrors } from '../middlewares/errors';
import type { RequestWithMatomoEvent } from '~/types/request';
import { canAskReviewForUser } from '~/utils/user';
import { WebhookService } from '~/utils/webhook';
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
          asked_for_review: { increment: 1 }, // TODO FIXME: `asked_for_review` should be rename to `triggered_manually_from_app`
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
          asked_for_review_latest_at: new Date(),
        },
      });
      res.status(200).send({ ok: true, askForReview: true });
      return;
    }

    if (event.category === 'APP' && event.action === 'FIRST_TIME_LAUNCH') {
      WebhookService.sendToMattermost(req);
    }

    res.status(200).send({ ok: true });
  }),
);

export default router;
