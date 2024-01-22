import 'dotenv/config';
import '~/prisma';

import { initAggregators } from './aggregators';
import { initRecommandations } from './recommandations';

Promise.resolve()
  .then(initRecommandations) //
  .then(initAggregators); //
// .then(initNotifications) // TODO: uncomment when notifications are ready
