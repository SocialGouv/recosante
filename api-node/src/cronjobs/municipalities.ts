import { fillOrUpdateMunicipalitiesInDB } from '~/utils/municipalities';
import { setupCronJob } from './utils';
import { capture } from '~/third-parties/sentry';
import { updateMunicipalitiesWithBathingWaterSites } from '~/utils/bathing_water/bathing_water';

/*
*
*

Initialization of the cron jobs
We call them one after the other,
in order to avoid to launch them all at the same time
and have logs that are mixed and not readable.

Test it: run `npm run dev-cronjobs` and check the logs

*/

export async function initMunicipalities() {
  await Promise.resolve()
    .then(() => {
      console.log('Inside municipalities cronjobs');
    })
    .then(
      async () =>
        await setupCronJob({
          name: 'Update Municipalities',
          cronTime: '15 3 15 1,6,10 *', // At 03:15 on day-of-month 15 in January, June and October.
          job: fillOrUpdateMunicipalitiesInDB,
          runOnInit: false,
        }),
    )
    .then(
      async () =>
        await setupCronJob({
          name: "Update has_bathing_water_sites Municipality's column",
          cronTime: '40 3 15 6,12 *', // At 03:40 on day-of-month 15 in January, June and October.
          job: updateMunicipalitiesWithBathingWaterSites,
          runOnInit: false,
        }),
    )
    .then(() => {
      console.log('Miscalleneous cron jobs are set up');
    })
    .catch(capture);
}
