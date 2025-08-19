import express from 'express';
import { catchErrors } from '../middlewares/errors';
import type { RequestWithMatomoEvent } from '~/types/request';
import { EventService } from '~/services/eventService';

const router = express.Router();

router.post(
  '/',
  catchErrors(async (req: RequestWithMatomoEvent, res: express.Response) => {
    const result = await EventService.processEvent(req);

    if (result.success) {
      const response: any = { ok: true };

      // Ajouter askForReview si présent (pour APP_OPEN)
      if (result.askForReview !== undefined) {
        response.askForReview = result.askForReview;
      }

      res.status(200).send(response);
    } else {
      // En cas d'échec, on log l'erreur mais on retourne quand même un succès
      // car ces erreurs sont considérées comme non critiques
      console.error('[EVENT] Event processing failed:', result.message);
      res.status(200).send({ ok: true });
    }
  }),
);

export default router;
