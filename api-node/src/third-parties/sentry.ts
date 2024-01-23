import * as Sentry from '@sentry/node';
import { ENVIRONMENT } from '../config.js';

const sentryEnabled = ENVIRONMENT !== 'development' && ENVIRONMENT !== 'test';

function capture(
  error: string | Error,
  context?: {
    extra?: any;
    [key: string]: unknown;
  },
) {
  console.log('capture', error, JSON.stringify(context, null, 2));
  if (!sentryEnabled) {
    return;
  }

  if (typeof context === 'string') {
    context = JSON.parse(context);
  } else {
    context = JSON.parse(JSON.stringify(context));
  }
  if (!!context && !!context.extra && typeof context.extra !== 'string') {
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
