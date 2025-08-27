// Configuration Sentry centralisée pour tous les environnements
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

// Configuration commune
const commonConfig = {
  dsn: 'https://59bb180e87e0a82a731432c8df6db4a3@sentry2.fabrique.social.gouv.fr/43',
  debug: false,
  enableLogs: true,
};

// Configuration par environnement
const getEnvironmentConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isTest = process.env.NODE_ENV === 'test';

  if (isProduction) {
    return {
      ...commonConfig,
      enabled: true,
      tracesSampleRate: 0.1, 
      replaysSessionSampleRate: 0.01, 
      replaysOnErrorSampleRate: 1.0, 
      beforeSend: (event: any) => event, // Envoyer tous les événements
    };
  }

  if (isDevelopment || isTest) {
    return {
      ...commonConfig,
      enabled: false, 
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      beforeSend: () => null, // Ne rien envoyer
    };
  }

  // Fallback
  return {
    ...commonConfig,
    enabled: false,
    beforeSend: () => null,
  };
};

export const sentryConfig = getEnvironmentConfig();

// Fonction utilitaire pour vérifier si Sentry est actif
export const isSentryEnabled = () => {
  return process.env.NODE_ENV === 'production';
};

// Fonction utilitaire pour capturer des erreurs de manière conditionnelle
export const captureError = (error: Error, context?: any) => {
  if (isSentryEnabled()) {
    Sentry.captureException(error, context);
  } else {
    console.log('🔍 [DEV] Erreur capturée (Sentry désactivé):', error);
    if (context) {
      console.log('🔍 [DEV] Contexte:', context);
    }
  }
};

// Fonction utilitaire pour capturer des messages de manière conditionnelle
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (isSentryEnabled()) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`🔍 [DEV] Message ${level} (Sentry désactivé):`, message);
  }
};
