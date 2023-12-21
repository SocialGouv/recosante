import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { VERSION, ENVIRONMENT, SENTRY_KEY } from '../config.js';

const sentryEnabled = ENVIRONMENT !== 'development' && ENVIRONMENT !== 'test';

if (sentryEnabled) {
  Sentry.init({
    dsn: SENTRY_KEY,
    environment: `api-${ENVIRONMENT}`,
    release: VERSION,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      // @ts-expect-error TODO: Fix this later
      new Tracing.Integrations.Express({ app }),
      // Automatically instrument Node.js libraries and frameworks
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.05,
  });
}

function capture(
  error: string,
  context: {
    extra?: any;
    [key: string]: unknown;
  },
) {
  if (!sentryEnabled) {
    console.log('capture', error, JSON.stringify(context));
    return;
  }

  if (typeof context === 'string') {
    context = JSON.parse(context);
  } else {
    context = JSON.parse(JSON.stringify(context));
  }
  if (!!context.extra && typeof context.extra !== 'string') {
    try {
      const newExtra = {};
      for (const [extraKey, extraValue] of Object.entries(context.extra)) {
        if (typeof extraValue === 'string') {
          // @ts-expect-error TODO: Fix this later
          newExtra[extraKey] = extraValue;
        } else {
          // @ts-expect-error TODO: Fix this later
          if (extraValue?.password) {
            // @ts-expect-error TODO: Fix this later
            extraValue.password = '******';
          }

          // @ts-expect-error TODO: Fix this later
          newExtra[extraKey] = JSON.stringify(extraValue);
        }
      }
      context.extra = newExtra;
    } catch (error) {
      // TODO: Check this error type
      const customError = error as string;
      Sentry.captureMessage(customError, context);
    }
  }

  if (typeof error === 'string') {
    Sentry.captureMessage(error, context);
  } else {
    Sentry.captureException(error, context);
  }
}

export { capture };
