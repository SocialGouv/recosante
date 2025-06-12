import { Router } from 'express';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { indicator, helpful, message, matomo_user_id } = req.body;

    if (!matomo_user_id) {
      return res.status(400).json({ error: 'matomo_user_id is required' });
    }

    const feedback = await prisma.feedbackIndicator.create({
      data: {
        indicator,
        helpful,
        message,
        matomo_user_id,
      },
    });

    res.json(feedback);
  } catch (error) {
    capture(String(error));
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 