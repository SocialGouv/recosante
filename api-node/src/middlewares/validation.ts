import { z } from 'zod';
import { catchErrors } from './errors';
import type { Request, Response, NextFunction } from 'express';
import type { CustomError } from '~/types/error';

export function validateBody(schema: z.ZodSchema) {
  return catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (zodError) {
        const customError = new Error(
          `Données invalides: ${
            zodError instanceof Error ? zodError.message : 'Erreur inconnue'
          }`
        ) as CustomError;
        customError.status = 400;
        next(customError);
      }
    }
  );
}

export function validateQuery(schema: z.ZodSchema) {
  return catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.query);
        next();
      } catch (zodError) {
        const customError = new Error(
          `Paramètres de requête invalides: ${
            zodError instanceof Error ? zodError.message : 'Erreur inconnue'
          }`
        ) as CustomError;
        customError.status = 400;
        next(customError);
      }
    }
  );
}

export function validateParams(schema: z.ZodSchema) {
  return catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.params);
        next();
      } catch (zodError) {
        const customError = new Error(
          `Paramètres d'URL invalides: ${
            zodError instanceof Error ? zodError.message : 'Erreur inconnue'
          }`
        ) as CustomError;
        customError.status = 400;
        next(customError);
      }
    }
  );
}
