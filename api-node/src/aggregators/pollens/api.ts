import fetchRetry from 'fetch-retry';
import { z } from 'zod';
import { capture } from '~/third-parties/sentry';
import dayjs from 'dayjs';
import { ATMODATA_USERNAME, ATMODATA_PASSWORD } from '~/config';

const fetch = fetchRetry(global.fetch);

/**
 * Classe d'erreur personnalisée pour les problèmes d'API pollen
 */
export class PollenAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PollenAPIError';
  }
}

/**
 * Schéma de validation pour la réponse de l'API Atmo
 */
export const pollenResponseSchema = z.object({
  code: z.number(),
  label: z.string(),
  data: z.array(
    z.object({
      date_diffusion: z.string(), // Format YYYY-MM-DD
      date_debut: z.string(), // Format YYYY-MM-DD
      date_fin: z.string(), // Format YYYY-MM-DD
      code_risque: z.string(),
      libelle_risque: z.string(),
      code_pollinique: z.string(),
      libelle_pollinique: z.string(),
      id_pollinique: z.string(),
      raep: z.string().optional(), // not required
    }),
  ),
});

export type PollenApiResponse = z.infer<typeof pollenResponseSchema>;

/**
 * Récupère les données de pollens pour une zone spécifique et une période donnée
 * @param codeZone Code INSEE de la zone
 * @param dateDebut Date de début (YYYY-MM-DD)
 * @param dateFin Date de fin (YYYY-MM-DD)
 * @returns Données de pollens pour la zone demandée
 */
export async function fetchPollensData(
  codeZone: string,
  dateDebut: string = dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  dateFin: string = dayjs().add(1, 'day').format('YYYY-MM-DD'),
): Promise<PollenApiResponse> {
  try {
    // Authentification à l'API Atmo
    const loginRes = await fetch(
      'https://admindata.atmo-france.org/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: ATMODATA_USERNAME,
          password: ATMODATA_PASSWORD,
        }),
        retries: 3,
        retryDelay: 1000,
      },
    ).then(async (response) => await response.json());

    const token = loginRes.token;

    // Appel à l'API
    const response = await fetch(
      `https://admindata.atmo-france.org/api/feedbacks/code/${codeZone}?date_debut=${dateDebut}&date_fin=${dateFin}&with_metadata=1`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        retries: 3,
        retryDelay: 1000,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new PollenAPIError(
        `Erreur API pollens: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();

    // Validation des données avec Zod
    return pollenResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof PollenAPIError) {
      throw error;
    }
    capture(error as Error, {
      extra: { functionCall: 'fetchPollensData', codeZone },
    });
    throw new PollenAPIError(
      `Erreur lors de la récupération des données de pollens: ${
        (error as Error).message
      }`,
    );
  }
}
