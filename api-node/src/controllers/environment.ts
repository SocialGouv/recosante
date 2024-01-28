import express from 'express';
import { catchErrors } from '../middlewares/errors';
const router = express.Router();

// The process is:
// Imagine the current app version in production is 4: current_app_buildversion_in_production === 4
// We are developing new features/fixes for the next version 5
// We want to test the new version 5 on preproduction, wiuthout affecting the production
// We send the version 5 on testflight, with preproduciton environment
// We test it: we like it
// THEN we change the value of current_app_buildversion_in_production to 5
// We send the version 5 on review and on production

router.get(
  '/',
  catchErrors(async (req: express.Request, res: express.Response) => {
    const appbuild = req.headers.appbuild;
    if (!appbuild) {
      res.status(403).send({
        ok: false,
        error: 'no appversion or appbuild in headers',
      });
      return;
    }

    const current_app_buildversion_in_production = 16;

    if (
      parseInt(appbuild as string, 10) > current_app_buildversion_in_production
    ) {
      res.status(200).send({
        ok: true,
        data: {
          environment: 'preproduction',
          api_host: 'api-node-recosante-preprod.dev.fabrique.social.gouv.fr',
        },
      });
      return;
    }
    res.status(200).send({
      ok: true,
      data: {
        environment: 'production',
        api_host: 'recosante-api-node.fabrique.social.gouv.fr',
        // api_host: 'api-node.recosante.beta.gouv.fr',
        // api_host: 'api-node.recosante.beta.gouv.fr',
      },
    });
  }),
);

export default router;
