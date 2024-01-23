import express from 'express';
import { catchErrors } from '../middlewares/errors';
const router = express.Router();

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
    console.log(parseInt(appbuild as string, 10));
    if (parseInt(appbuild as string, 10) > 5) {
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
        api_host: 'api-node.recosante.beta.gouv.fr',
      },
    });
  }),
);

export default router;
