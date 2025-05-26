import { getAtmoIndicator } from '~/aggregators/indice_atmo.ts';
import { getIndiceUVIndicator } from '~/aggregators/indice_uv.ts';
import { setupCronJob } from './utils';
import { capture } from '~/third-parties/sentry';
import { getWeatherAlert } from '~/aggregators/weather_alert';
import { getBathingWaterIndicator } from '~/aggregators/bathing_water';
import { getDrinkingWaterIndicator } from '~/aggregators/drinking_water';
import { getPollensIndicator } from '~/aggregators/pollens/index';
import {
  type LoggerUtils,
  type ApiService,
} from '~/aggregators/pollens/index';
import { logStep, calculateValidityEndDate } from '~/aggregators/pollens/utils';
import {
  fetchAtmoJWTToken,
  fetchPollensDataFromAtmoAPI,
} from '~/aggregators/pollens/api';



// Dependencies for the pollens aggregator
const pollensLoggerUtils: LoggerUtils = {
  logStep,
  calculateValidityEndDate,
};

const pollensApiService: ApiService = {
  fetchAtmoJWTToken,
  fetchPollensDataFromAtmoAPI,
};

/*
*
*

Initialization of the cron jobs
We call them one after the other,
in order to avoid to launch them all at the same time
and have logs that are mixed and not readable.

Test it: run `npm run dev-cronjobs` and check the logs

*/

export async function initAggregators() {
  await Promise.resolve()
    // .then(() => {
    //   console.log('Inside aggregators cronjobs');
    // })
     .then(
       async () =>
         await setupCronJob({
           name: 'Drinking Water',
           cronTime: '0 */3 * * *', // Tous les jours à 0h, 3h, 6h, 9h, 12h, 15h, 18h, 21h
           job: getDrinkingWaterIndicator,
           runOnInit: true,
         }),
     )
    .then(
      async () =>
        await setupCronJob({
          name: 'Bathing Water',
          // The data is scraped from a website with no emission rule
          cronTime: '11 11,23 * * *', // every day at 11:11am and 11:11pm
          job: getBathingWaterIndicator,
          runOnInit: true,
        }),
    )
    .then(() => {
      console.log('All aggregators cron jobs are set up');
    })
    .catch(capture);
}
