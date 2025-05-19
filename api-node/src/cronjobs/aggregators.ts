import { getAtmoIndicator } from '~/aggregators/indice_atmo.ts';
import { getIndiceUVIndicator } from '~/aggregators/indice_uv.ts';
import { setupCronJob } from './utils';
import { capture } from '~/third-parties/sentry';
import { getWeatherAlert } from '~/aggregators/weather_alert';
import { getBathingWaterIndicator } from '~/aggregators/bathing_water';
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
    // .then(
    //   async () =>
    //     await setupCronJob({
    //       name: 'Drinking Water',
    //       cronTime: '10 10,22 * * *', // every day at 10:10am and 10:10pm
    //       job: getDrinkingWaterIndicator,
    //       runOnInit: true,
    //     }),
    // )
    .then(
      async () =>
        await setupCronJob({
          name: 'Indice atmo',
          // https://www.atmo-france.org/sites/federation/files/medias/documents/2023-10/FAQ_API_Atmo_Data_20231010_0.pdf
          // QUELLES SONT LES BONNES PRATIQUES POUR UTILISER L'API ?
          // Les flux sont mis à jour quotidiennement (c'est-à-dire 1 fois par jour), à partir de 13h00
          // (heure de Paris) jusqu'à 15h00 pour la métropole et à partir de 18h00 pour les outre-mer
          // Les serveurs d'Atmo Data connaissent donc un pic d'activité entre 13h et 15h. Les requêtes
          // sont à effectuer 1 à 2 fois par jour, en dehors de ces horaires.
          cronTime: '15 15,20 * * *', // every day at 3:15pm and 8:15pm
          job: getAtmoIndicator,
          runOnInit: true,
        }),
    )
    .then(
      async () =>
        await setupCronJob({
          name: 'Pollens',
          // L'API ATMO met à jour ses données principalement entre 12h et 14h
          // On utilise un pattern personnalisé pour:
          // - Vérifier toutes les 15 minutes entre 12h et 14h pour capturer rapidement les mises à jour
          // - Vérifier toutes les 6h le reste du temps
          cronTime: '5 0,6,12,12/1,18 * * *', // 00:05, 06:05, 12:05, 13:05, 18:05 + vérifications supplémentaires à 12:20, 12:35, 12:50, 13:20, 13:35, 13:50
          job: async () => {
          
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            
            if (hour >= 12 && hour < 14) {
              console.log(`[POLLENS] Exécution en période prioritaire (${hour}:${minute.toString().padStart(2, '0')}) - L'API ATMO met généralement à jour ses données à cette période`);
            } else {
              console.log(`[POLLENS] Exécution en période standard (${hour}:${minute.toString().padStart(2, '0')})`);
            }
            
            return await getPollensIndicator({
              loggerUtils: pollensLoggerUtils,
              apiService: pollensApiService,
            });
          },
          runOnInit: true,
        }),
    )
    .then(
      async () =>
        await setupCronJob({
          name: 'Indice UV',
          // The data is a CSV issued every day at 6am or 7am
          // Data is available for the current day, J+1 and J+2
          cronTime: '10 7 * * *', // every day at 7:10am
          job: getIndiceUVIndicator,
          runOnInit: true,
        }),
    )
    .then(
      async () =>
        await setupCronJob({
          name: 'Weather Alerts',
          // The data is an API call with no emission rule
          cronTime: '20 * * * *', // every day every hour at HH:20
          job: getWeatherAlert,
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
