import express from 'express';
import helmet from 'helmet';
import { z } from 'zod';
import fs from 'fs';
import { catchErrors } from '../middlewares/errors';
import { type CustomError } from '~/types/error';
import { type udis as UdiType } from '@prisma/client';
import { fetchDrinkingWaterPrelevement } from '~/aggregators/drinking_water';
import dayjs from 'dayjs';

const router = express.Router();
const drinkingWater403 = fs.readFileSync(
  './src/templates/drinking-water-403-no-code-provided.html',
  'utf8',
);
const drinkingWater = fs.readFileSync(
  './src/templates/drinking-water-test-result.html',
  'utf8',
);

router.get(
  '/',
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", 'https://cdn.tailwindcss.com'],
      'img-src': [
        "'self'",
        'https://j.gifs.com/VPXDoz.gif',
        'https://recosante.beta.gouv.fr/favicon.ico',
      ],
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
      const hubeauResponse = await fetchDrinkingWaterPrelevement(
        code_prelevement as string,
      );
      const prelevement = hubeauResponse.data;
      const metadata = prelevement[0];

      const testDisplay = drinkingWater
        .replace('{{CODE_PRELEVEMENT}}', metadata.code_prelevement)
        .replace(
          '{{PLACE_PRELEVEMENT}}',
          `${metadata.nom_commune} (${metadata.code_departement})`,
        )
        .replace('{{NOM_DISTRIBUTEUR}}', metadata.nom_distributeur)
        .replace(
          '{{CONCLUSION_CONFORMITE_PRELEVEMENT}}',
          metadata.conclusion_conformite_prelevement,
        )
        .replace(
          '{{HUBEAU_LINK}}',
          `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_prelevement=${metadata.code_prelevement}&size=1000`,
        )
        .replace(
          '{{DATE_PRELEVEMENT}}',
          dayjs(metadata.date_prelevement).format('DD/MM/YYYY HH:mm'),
        )
        .replace('{{COUNT_PARAMETERS}}', prelevement.length.toString())
        .replace(
          '{{UDIS}}',
          metadata.reseaux
            ?.map(
              (reseau) => `${reseau.code} - ${reseau.nom} (${reseau.debit})`,
            )
            .join('<br />') || '',
        )
        .replace(
          '{{RESULTS}}',
          prelevement
            .map((paramTested) => {
              return `
            <tr>
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
              ${
                paramTested.libelle_parametre
              } <span class="text-xs text-gray-400">(${
                paramTested.code_parametre_se
              })</span>
              <dl class="font-normal lg:hidden">
                <dt class="sr-only">Résultat</dt>
                <dd class="mt-1 truncate text-gray-700">${
                  paramTested.resultat_alphanumerique
                } ${
                paramTested.libelle_unite !== 'SANS OBJET'
                  ? paramTested.libelle_unite
                  : ''
              }</dd>
                <dt class="sr-only sm:hidden">Limite</dt>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">${
                  paramTested.limite_qualite_parametre
                }</dd>
                <dt class="sr-only sm:hidden">Référence</dt>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">${
                  paramTested.reference_qualite_parametre
                }</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">${
              paramTested.resultat_alphanumerique
            } (${paramTested.libelle_unite})</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">${
              paramTested.limite_qualite_parametre ?? 'N/A'
            }</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">${
              paramTested.reference_qualite_parametre ?? 'N/A'
            }</td>
          </tr>
            `;
            })
            .join('\n') || '',
        );

      res.status(200).send(testDisplay);
    },
  ),
);

export default router;
