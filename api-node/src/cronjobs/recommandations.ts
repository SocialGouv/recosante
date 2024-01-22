import { setupCronJob } from './utils';
import { capture } from '~/third-parties/sentry';
import { getRecommandationsFromGoogleSheet } from '~/utils/recommandations';

/*
*
*

Initialization of the cron jobs
We call them one after the other,
in order to avoid to launch them all at the same time
and have logs that are mixed and not readable.

Test it: run `npm run dev-cronjobs` and check the logs

*/

export async function initRecommandations() {
  await Promise.resolve()
    .then(() => {
      console.log('Inside recommandations cronjobs');
    })
    .then(
      async () =>
        await setupCronJob({
          name: 'Recommandations from Google Sheet',
          cronTime: '0/5 * * * *', // every 5 minutes TODO: remove this when recos are more stable
          job: getRecommandationsFromGoogleSheet,
        }),
    )
    .then(() => {
      console.log('Recommandation cron job is set up');
    })
    .catch(capture);
}
