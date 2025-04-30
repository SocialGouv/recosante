/**
 * Module d'authentification pour les services Copernicus ADS
 * Utilise l'authentification Basic HTTP
 */

import { capture } from '~/third-parties/sentry';

/**
 * Génère l'en-tête d'authentification Basic pour l'API Copernicus ADS
 * @returns L'en-tête d'authentification au format "Basic {credentials}"
 */
export function getADSAuthHeader(): string {
  try {
    const userId = process.env.CDSAPI_USER_ID;
    const apiKey = process.env.CDSAPI_API_KEY;

    if (!userId || !apiKey) {
      throw new Error('User ID ou API Token manquant pour Copernicus ADS');
    }

    const credentials = Buffer.from(`${userId}:${apiKey}`).toString('base64');
    return `Basic ${credentials}`;
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'getADSAuthHeader' } });
    throw error;
  }
}
