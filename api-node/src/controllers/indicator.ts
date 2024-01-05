import express from 'express';
import { catchErrors } from '../middlewares/errors';
import prisma from '~/prisma';
const router = express.Router();

router.get(
  '/',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    const indicators = await prisma.indicators.findMany();
    if (!indicators) {
      return res.status(500).send({ ok: false, error: 'No indicators found' });
    }
    return res.status(200).send({ ok: true, data: indicators });
  }),
);

export default router;
