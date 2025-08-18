import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import type {
  PollensAPIResponse,
  PollensAPIProperties,
  DATE_CALENDAR_YYYY_MM_DD,
} from '~/types/api/pollens';
import { PollensAPIDataIdsEnum } from '~/types/api/pollens';
import { capture } from '~/third-parties/sentry';
import { ATMODATA_PASSWORD, ATMODATA_USERNAME } from '~/config';
import { logStep } from './utils';
import { DEFAULT_FETCH_RETRY_CONFIG, API_CONFIG } from '~/config/api';

const fetch = fetchRetry(global.fetch, DEFAULT_FETCH_RETRY_CONFIG);

export async function fetchAtmoJWTToken(maxRetries = API_CONFIG.ATMO.AUTH.MAX_RETRIES): Promise<string> {
  let retryCount = 0;
  let lastError: Error = new Error('Erreur inconnue lors de l\'authentification');

  while (retryCount < maxRetries) {
    try {
      console.log(`[POLLENS] Tentative de connexion à l'API Atmo (tentative ${retryCount + 1}/${maxRetries})`);
      
      const response = await fetch(`${API_CONFIG.ATMO.BASE_URL}${API_CONFIG.ATMO.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: ATMODATA_USERNAME,
          password: ATMODATA_PASSWORD,
        }),
        retries: 0,
      });

      if (!response.ok) {
        throw new Error(`Réponse API non valide: ${response.status} ${response.statusText}`);
      }

      const loginRes = await response.json();
      
      if (!loginRes || typeof loginRes.token !== 'string' || !loginRes.token.trim()) {
        throw new Error('Token manquant ou invalide dans la réponse API');
      }

      console.log(`[POLLENS] Authentification réussie à l'API Atmo`);
      return loginRes.token;
    } catch (error: unknown) {
      if (error instanceof Error) {
        lastError = error;
      } else {
        lastError = new Error(String(error));
      }
      
      retryCount++;
      
      if (retryCount < maxRetries) {
        // Délai fixe plus court pour éviter l'accumulation
        const waitTime = Math.min(API_CONFIG.ATMO.AUTH.RETRY_DELAY * retryCount, API_CONFIG.RETRY.MAX_DELAY);
        console.error(`[POLLENS] Échec d'authentification (tentative ${retryCount}/${maxRetries}): ${lastError.message}`);
        console.log(`[POLLENS] Nouvelle tentative dans ${waitTime/1000} secondes...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  // Si toutes les tentatives ont échoué
  capture(lastError, {
    extra: { 
      functionCall: 'fetchAtmoJWTToken', 
      architectureLevel: "api",
      maxRetries,
      username: ATMODATA_USERNAME ? 'défini' : 'non défini',
    },
  });
  
  throw lastError;
}

/**
 * Récupère les données de pollens depuis l'API Atmo pour une date spécifique
 */
export async function fetchPollensDataFromAtmoAPI(
  atmoJWTToken: string,
  indiceForDate: dayjs.Dayjs,
): Promise<
  | Array<{
      type: string;
      geometry: null;
      properties: PollensAPIProperties;
    }>
  | undefined
> {
  type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'IN' | 'NOT IN';

  const indiceDataId = PollensAPIDataIdsEnum.pollens_current_year;
  const dateQuery: { operator: Operator; value: DATE_CALENDAR_YYYY_MM_DD } = {
    operator: '=',
    value: indiceForDate.format('YYYY-MM-DD'),
  };
  const rawQuery: Record<'date_ech', { operator: Operator; value: string }> = {
    date_ech: dateQuery,
  };
  const query = JSON.stringify(rawQuery);
  const url = `https://admindata.atmo-france.org/api/data/${indiceDataId}/${query}?withGeom=false`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${atmoJWTToken}`,
      },
      retries: API_CONFIG.RETRY.MAX_ATTEMPTS - 1, 
      retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 3000), // Max 3s
      retryOn: [...API_CONFIG.RETRY_ON_STATUS_CODES],
    });
    
    if (!response.ok) {
      throw new Error(`Réponse API non valide: ${response.status} ${response.statusText}`);
    }
    
    // Vérifier que la réponse contient du contenu avant de la parser
    const responseText = await response.text();
    if (!responseText || responseText.trim() === '') {
      throw new Error('Réponse API vide - aucune donnée reçue');
    }
    
    let pollensRes: PollensAPIResponse;
    try {
      pollensRes = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Erreur de parsing JSON: ${parseError instanceof Error ? parseError.message : 'Format invalide'} - Contenu reçu: ${responseText.substring(0, 200)}...`);
    }
    
    if (!pollensRes || !Array.isArray(pollensRes.features)) {
      throw new Error('Format de réponse invalide: features manquants ou non dans un format tableau');
    }
    
    logStep(`Fetched Pollens data for ${indiceForDate.format('YYYY-MM-DD dddd')}`);
    return pollensRes?.features;
  } catch (error: unknown) {
    // Conversion de l'erreur pour Sentry
    const errorToCapture = error instanceof Error ? error : new Error(String(error));
    
    capture(errorToCapture, {
      extra: { functionCall: 'fetchPollensDataFromAtmoAPI', url, query, architectureLevel:"api" },
    });
    console.error(`[POLLENS] Erreur lors de la récupération des données: ${errorToCapture.message}`);
    return undefined;
  }
}
