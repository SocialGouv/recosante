/**
 * Configuration centralisée des APIs externes
 */

export const API_CONFIG = {
  // Configuration des retries
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY: 1000, // 1 seconde
    MAX_DELAY: 5000,  // 5 secondes max
    EXPONENTIAL_BASE: 2,
  },
  
  // Configuration des timeouts
  TIMEOUT: {
    REQUEST: 30000,    // 30 secondes
    AUTH: 15000,       // 15 secondes pour l'auth
    DATA_FETCH: 45000, // 45 secondes pour la récupération de données
  },
  
  // Codes d'erreur HTTP pour lesquels un retry est effectué
  RETRY_ON_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  
  // Configuration spécifique à l'API Atmo
  ATMO: {
    BASE_URL: 'https://admindata.atmo-france.org/api',
    ENDPOINTS: {
      LOGIN: '/login',
      DATA: '/data',
    },
    AUTH: {
      MAX_RETRIES: 3,
      RETRY_DELAY: 2000, // 2 secondes fixes
    },
  },
} as const;

/**
 * Calcule le délai de retry avec backoff exponentiel et limite maximale
 */
export function calculateRetryDelay(attempt: number, baseDelay = API_CONFIG.RETRY.BASE_DELAY): number {
  const exponentialDelay = baseDelay * Math.pow(API_CONFIG.RETRY.EXPONENTIAL_BASE, attempt);
  return Math.min(exponentialDelay, API_CONFIG.RETRY.MAX_DELAY);
}

/**
 * Configuration par défaut pour fetchRetry
 */
export const DEFAULT_FETCH_RETRY_CONFIG = {
  retries: API_CONFIG.RETRY.MAX_ATTEMPTS,
  retryDelay: (attempt: number) => calculateRetryDelay(attempt),
  retryOn: [...API_CONFIG.RETRY_ON_STATUS_CODES], // Conversion en array mutable
};
