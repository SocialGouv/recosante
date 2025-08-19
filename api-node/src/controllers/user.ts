import express from 'express';
import { catchErrors } from '../middlewares/errors';
import { validateBody } from '../middlewares/validation';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';
import { upsertByMatomoId, updateUser, extractUpdateData } from '../services/user.service';
import { withUser } from '~/middlewares/auth.js';
import type { RequestWithUser } from '~/types/request';

const router = express.Router();

/**
 * POST /user
 * Créer un nouvel utilisateur avec matomo_id
 */
router.post(
  '/',
  validateBody(createUserSchema),
  catchErrors(async (req, res) => {
    const { matomo_id } = req.body;

    await upsertByMatomoId(matomo_id);

    res.status(200).send({ ok: true });
  })
);

/**
 * PUT /user
 * Mettre à jour un utilisateur existant
 */
router.put(
  '/',
  withUser,
  validateBody(updateUserSchema),
  catchErrors(async (req: RequestWithUser, res) => {
    try {
      // Extraire les données de mise à jour
      const updateData = extractUpdateData(req.body);

      // Extraire les headers d'application
      const headers = {
        appversion: req.headers.appversion as string,
        appbuild: req.headers.appbuild as string,
        appdevice: req.headers.appdevice as string,
      };

      // Mettre à jour l'utilisateur
      const updatedUser = await updateUser(
        req.user.matomo_id,
        updateData,
        headers
      );

      res.status(200).send({ ok: true, data: updatedUser });
    } catch (error) {
      // Log détaillé de l'erreur
      console.error('PUT /user error:', {
        matomoId: req.user.matomo_id,
        body: req.body,
        headers: req.headers,
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : String(error)
      });

      // Réponse d'erreur appropriée
      if (error instanceof Error && error.message.includes('PrismaClientValidationError')) {
        res.status(400).send({ 
          ok: false, 
          error: 'Données utilisateur invalides',
          details: 'Certains champs ne respectent pas le format attendu'
        });
        return;
      }

      // Réponse d'erreur générique
      res.status(500).send({ 
        ok: false, 
        error: 'Erreur interne du serveur' 
      });
    }
  })
);

export default router;
