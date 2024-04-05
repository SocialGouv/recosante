import express from 'express';
import helmet from 'helmet';
import { z } from 'zod';
import fs from 'fs';
import { catchErrors } from '../middlewares/errors';
import { type CustomError } from '~/types/error';
import { type udis as UdiType } from '@prisma/client';
import { fetchDrinkingWaterPrelevement } from '~/aggregators/drinking_water';

const router = express.Router();
const drinkingWater403 = fs.readFileSync(
  './src/templates/drinking-water-403-no-code-provided.html',
  'utf8',
);

router.get(
  '/',
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", 'https://cdn.tailwindcss.com'],
      'img-src': ["'self'", 'https://j.gifs.com/VPXDoz.gif'],
      'object-src': ["'none'"],
      'upgrade-insecure-requests': [],
    },
  }),
  catchErrors(
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      try {
        z.object({
          code_prelevement: z.string(),
        }).parse(req.query);
      } catch (zodError) {
        res.status(403).send(drinkingWater403);
        return;
      }
      const { code_prelevement } = req.query;

      if (!code_prelevement) {
        res.status(403).send(drinkingWater403);
        return;
      }
      const prelevement = await fetchDrinkingWaterPrelevement(
        code_prelevement as string,
      );
      const codePrelevement = prelevement[0].code_prelevement;
      const drinkingWater = fs
        .readFileSync('./src/templates/drinking-water-test-result.html', 'utf8')
        .replace('{{CODE_PRELEVEMENT}}', codePrelevement)
        // .replace('{{UDI}}', prelevement[0].)
        .replace('{{JSON}}', JSON.stringify(prelevement, null, 2));

      res.status(403).send(drinkingWater);
    },
  ),
);

export default router;
