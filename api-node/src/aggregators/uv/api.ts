/**
 * Module d'interaction avec l'API Copernicus ADS pour les données UV
 */

import { capture } from '~/third-parties/sentry';
import fetchRetry from 'fetch-retry';
import { getADSAuthHeader } from '~/auth/ads';

const fetch = fetchRetry(global.fetch);

/**
 * Obtient l'en-tête d'authentification pour l'API Copernicus
 *
 * @returns L'en-tête d'authentification Basic
 */
export async function getAuthHeader(): Promise<string> {
  try {
    return getADSAuthHeader();
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'getAuthHeader' } });
    throw error;
  }
}

/**
 * Soumet un job pour récupérer les prévisions UV
 * @param authHeader En-tête d'authentification Basic
 * @returns ID du job soumis
 */
export async function submitUVForecastJob(authHeader: string): Promise<string> {
  console.log('authHeader', authHeader);
  console.log('Soumission du job avec Basic auth...');
  try {
    const res = await fetch(
      'https://ads.atmosphere.copernicus.eu/api/retrieve/v1/processes/cams-global-atmospheric-composition-forecasts/execution',
      {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            variable: [
              'uv_biologically_effective_dose',
              'uv_biologically_effective_dose_clear_sky',
            ],
            date: [
              new Date().toISOString().slice(0, 10) +
                '/' +
                new Date().toISOString().slice(0, 10),
            ],
            time: ['12:00'],
            leadtime_hour: ['0', '24', '48', '72'], // J0 → J3
            type: ['forecast'],
            data_format: 'grib',
            area: [51, -5, 41, 10], // France approx
          },
        }),
        retryDelay: 1000,
        retries: 3,
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.log('RES ERROR', res.status, errorText);
      throw new Error(
        `Erreur de soumission du job: ${res.status} - ${errorText}`,
      );
    }

    const data = await res.json();
    console.log('Job ID:', data.jobID || data.request_id);
    return data.jobID || data.request_id;
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'submitUVForecastJob' } });
    throw error;
  }
}

/**
 * Attend que le job soit terminé et retourne l'URL du fichier GRIB
 * @param jobID ID du job
 * @param authHeader En-tête d'authentification
 * @returns URL du fichier GRIB
 */
export async function waitForGribURL(
  jobID: string,
  authHeader: string,
): Promise<string> {
  try {
    for (let i = 0; i < 30; i++) {
      console.log(`Vérification du statut du job (tentative ${i + 1}/30)...`);

      // Vérifier le statut du job
      const statusUrl = `https://ads.atmosphere.copernicus.eu/api/retrieve/v1/jobs/${jobID}`;
      const statusRes = await fetch(statusUrl, {
        headers: { Authorization: authHeader },
        retryDelay: 1000,
        retries: 3,
      });

      if (!statusRes.ok) {
        console.log(
          `Erreur lors de la vérification du statut: ${statusRes.status}`,
        );
        // Attendre avant la prochaine tentative
        await new Promise((r) => setTimeout(r, 10000));
        continue;
      }

      const statusData = await statusRes.json();
      console.log(`Statut du job: ${statusData.status}`);

      // Si le job est terminé avec succès
      if (statusData.status === 'successful') {
        // Récupérer les résultats
        const resultsUrl = `https://ads.atmosphere.copernicus.eu/api/retrieve/v1/jobs/${jobID}/results`;
        const resultsRes = await fetch(resultsUrl, {
          headers: { Authorization: authHeader },
        });

        if (!resultsRes.ok) {
          throw new Error(
            `Erreur lors de la récupération des résultats: ${resultsRes.status}`,
          );
        }

        const resultsData = await resultsRes.json();

        // Extraire l'URL du GRIB
        const gribUrl = resultsData.asset?.value?.href;

        if (gribUrl) {
          console.log('URL GRIB trouvée:', gribUrl);
          return gribUrl;
        } else {
          throw new Error('URL GRIB non trouvée dans la réponse');
        }
      }

      // Si le job a échoué
      else if (statusData.status === 'failed') {
        throw new Error(
          `Le job a échoué: ${statusData.error?.message || 'Raison inconnue'}`,
        );
      }

      // Attendre 10 secondes avant de vérifier à nouveau
      await new Promise((r) => setTimeout(r, 10000));
    }

    throw new Error('Job non terminé dans le délai imparti (5 minutes)');
  } catch (error) {
    capture(error as Error, {
      extra: { functionCall: 'waitForGribURL', jobID },
    });
    throw error;
  }
}

/**
 * Télécharge le fichier GRIB
 * @param url URL du fichier GRIB
 * @param authHeader En-tête d'authentification
 * @returns Buffer contenant les données GRIB
 */
export async function downloadGribFile(
  url: string,
  authHeader: string,
): Promise<Buffer> {
  try {
    console.log('Téléchargement du fichier GRIB...');
    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
      },
      retryDelay: 1000,
      retries: 3,
    });

    if (!response.ok) {
      throw new Error(
        `Erreur de téléchargement du fichier GRIB: ${response.status}`,
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    console.log(`Fichier GRIB téléchargé: ${arrayBuffer.byteLength} octets`);
    return Buffer.from(arrayBuffer);
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'downloadGribFile' } });
    throw error;
  }
}
