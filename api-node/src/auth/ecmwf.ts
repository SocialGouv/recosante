/**
 * Module d'authentification pour les services ECMWF (Copernicus)
 *
 * Gère l'obtention et le renouvellement automatique des tokens d'authentification
 */

import fetchRetry from 'fetch-retry';
import { capture } from '~/third-parties/sentry';

const fetch = fetchRetry(global.fetch);

interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
}

// Cache pour le token
let tokenCache: {
  accessToken: string | null;
  expiresAt: number | null;
} = {
  accessToken: null,
  expiresAt: null,
};

/**
 * Effectue l'authentification auprès d'ECMWF et récupère un token
 * @returns Le token d'accès (Bearer)
 */
export async function getECMWFToken(): Promise<string> {
  try {
    // Vérifier si un token valide existe en cache
    const now = Date.now();
    if (
      tokenCache.accessToken &&
      tokenCache.expiresAt &&
      tokenCache.expiresAt > now
    ) {
      console.log(
        'Utilisation du token en cache (expire dans',
        Math.floor((tokenCache.expiresAt - now) / 1000 / 60),
        'minutes)',
      );
      return tokenCache.accessToken;
    }

    console.log("Obtention d'un nouveau token ECMWF");

    // Vérifier les identifiants
    const username = process.env.ECMWF_USERNAME;
    const password = process.env.ECMWF_PASSWORD;
    const clientId = process.env.ECMWF_CLIENT_ID || 'cds';
    const clientSecret = process.env.ECMWF_CLIENT_SECRET;

    if (!username || !password) {
      throw new Error(
        'Identifiants ECMWF manquants. Veuillez définir ECMWF_USERNAME et ECMWF_PASSWORD ' +
          'dans le fichier .env.',
      );
    }

    if (!clientSecret) {
      throw new Error(
        'Client secret ECMWF manquant. Veuillez définir ECMWF_CLIENT_SECRET dans le fichier .env.',
      );
    }

    // Effectuer la requête d'authentification avec client_id et client_secret
    const response = await fetch(
      'https://accounts.ecmwf.int/auth/realms/ecmwf/protocol/openid-connect/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          client_id: 'cds',
          client_secret: '6d5f1ad4-1fd9-43d2-9b99-e6c68dccdbee',
          username,
          password,
          scope: 'openid email',
        }).toString(),
        retryDelay: 1000,
        retries: 3,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erreur d'authentification ECMWF: ${response.status} - ${errorText}`,
      );
    }

    // Traiter la réponse
    const authData: AuthResponse = await response.json();

    // Mettre en cache avec une marge de sécurité (expire 5 minutes avant)
    const expiresInMs = (authData.expires_in - 300) * 1000;
    tokenCache = {
      accessToken: authData.access_token,
      expiresAt: Date.now() + expiresInMs,
    };

    console.log(
      'Nouveau token obtenu, valide pour',
      Math.floor(expiresInMs / 1000 / 60),
      'minutes',
    );

    return authData.access_token;
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'getECMWFToken' } });
    throw error;
  }
}

/**
 * Invalide le token en cache, forçant l'obtention d'un nouveau token
 * lors du prochain appel à getECMWFToken
 */
export function invalidateToken(): void {
  tokenCache = {
    accessToken: null,
    expiresAt: null,
  };
}
