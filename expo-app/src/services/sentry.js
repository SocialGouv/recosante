import * as Sentry from '@sentry/react-native';

// https://docs.sentry.io/platforms/javascript/enriching-events/context/#example-usages

export const capture = (err, context = {}) => {
  if (!!context.extra && typeof context.extra !== 'string') {
    try {
      const newExtra = {};
      for (let extraKey of Object.keys(context.extra)) {
        if (typeof context.extra[extraKey] === 'string') {
          newExtra[extraKey] = context.extra[extraKey];
        } else {
          newExtra[extraKey] = JSON.stringify(context.extra[extraKey]);
        }
      }
      context.extra = newExtra;
    } catch (e) {
      Sentry.captureMessage(e, context);
    }
  }
  if (typeof context === 'string') {
    context = JSON.parse(context);
  } else {
    context = JSON.parse(JSON.stringify(context));
  }
  if (typeof err === 'string') {
    Sentry.captureMessage(err, context);
  } else {
    Sentry.captureException(err, context);
  }
  console.log('capture', err, context);
};
