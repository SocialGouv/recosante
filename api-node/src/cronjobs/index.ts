import 'dotenv/config';
import '~/prisma';

import { initAggregators } from './aggregators';
import { initRecommandations } from './recommandations';
import { initNotifications } from './notifications';

Promise.resolve()
  .then(initRecommandations) //
  .then(initAggregators) //
  .then(initNotifications); //
