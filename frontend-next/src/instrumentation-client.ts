// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

// Configuration Sentry de base - sera activée/désactivée selon le consentement des cookies
Sentry.init({
  dsn: 'https://59bb180e87e0a82a731432c8df6db4a3@sentry2.fabrique.social.gouv.fr/43',

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  // This sets the sample rate to be 100%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 1.0 : 0.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out development and test environments
  beforeSend(event) {
    // Don't send events in development or test
    if (process.env.NODE_ENV !== 'production') {
      return null;
    }

    // Vérifier le consentement des cookies avant l'envoi
    const cookieConsent = sessionStorage.getItem('cookieConsent');
    if (cookieConsent) {
      try {
        const consent = JSON.parse(cookieConsent);
        if (!consent.analytics) {
          return null; // Bloquer l'envoi si les cookies d'analyse ne sont pas acceptés
        }
      } catch (error) {
        console.warn('Erreur lors de la vérification du consentement des cookies:', error);
        return null; // Bloquer en cas d'erreur
      }
    } else {
      // Pas de consentement = pas d'envoi
      return null;
    }

    return event;
  },

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
