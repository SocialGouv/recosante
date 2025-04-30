import 'dotenv/config';
import '~/prisma';
import * as Sentry from '@sentry/node';

import { initMunicipalities } from './municipalities';
import { initRecommandations } from './recommandations';
import { initAggregators } from './aggregators';
import { initNotifications } from './notifications';
import { ENVIRONMENT, SENTRY_KEY, VERSION } from '~/config';
import { initIndicatorsCleaning } from './cleaning';
import { getUVIndicator } from '~/aggregators/uv/main';
import { setupCronJob } from './utils';

const sentryEnabled = process.env.NODE_ENV !== 'development';

if (sentryEnabled) {
  Sentry.init({
    dsn: SENTRY_KEY,
    environment: `cronjobs-${ENVIRONMENT}`,
    release: VERSION,
    integrations: [
      // Automatically instrument Node.js libraries and frameworks
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.05,
  });
}

const isLocalDevelopment = process.env.NODE_ENV === 'development';
const isReviewBranch = ENVIRONMENT === 'development';

// if (isLocalDevelopment || !isReviewBranch) {
//   Promise.resolve()
//     .then(initIndicatorsCleaning) //
//     .then(initMunicipalities) //
//     .then(initRecommandations) //
//     .then(initAggregators) //
//     .then(initNotifications); //
// } else {
// setInterval(() => {
// This empty function is called every second.
// }, 1000);
// }
getUVIndicator();
