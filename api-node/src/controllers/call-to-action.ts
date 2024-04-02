import express from 'express';
import { withUser } from '~/middlewares/auth';

import { catchErrors } from '~/middlewares/errors';

const callToActionRouter = express.Router();

// Easy way to show a call to action in the dashboard.
// If show is true, the call to action will be displayed.

const callToAction = {
  show: true,
  title:
    '📣\n Un besoin ? Un avis ? Une suggestion ?\n Nous sommes à votre écoute !',
  label: 'Ecrivez-nous !',
  action: 'FEEDBACK',
};

callToActionRouter.get(
  '/',
  withUser,
  catchErrors(
    async (
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.status(200).send({ ok: true, data: callToAction });
    },
  ),
);

export default callToActionRouter;
