import express from 'express';
import { catchErrors } from '../middlewares/errors';
const router = express.Router();

router.post(
  '/',
  catchErrors(async (_req: express.Request, res: express.Response) => {
    return res.status(200).send({ ok: true });
  }),
);

export default router;
