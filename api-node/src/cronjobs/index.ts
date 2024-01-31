import 'dotenv/config';
import '~/prisma';

import { initMunicipalities } from './municipalities';
import { initRecommandations } from './recommandations';
import { initAggregators } from './aggregators';
import { initNotifications } from './notifications';

Promise.resolve()
  .then(initMunicipalities) //
  .then(initRecommandations) //
  .then(initAggregators) //
  .then(initNotifications); //
