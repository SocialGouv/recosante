// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://59bb180e87e0a82a731432c8df6db4a3@sentry2.fabrique.social.gouv.fr/43',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out development and test environments
  beforeSend(event) {
    // Don't send events in development or test
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return null;
    }
    return event;
  },

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',
});
