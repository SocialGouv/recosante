import { setupCronJob } from './utils';
import { capture } from '~/third-parties/sentry';
import {
  sendEveningNotification,
  sendMorningNotification,
} from '~/utils/notifications';

/*
*
*

Initialization of the cron jobs
We call them one after the other,
in order to avoid to launch them all at the same time
and have logs that are mixed and not readable.

Test it: run `npm run dev-cronjobs` and check the logs

*/

export async function initNotifications() {
  await Promise.resolve()
    .then(() => {
      console.log('Inside notifications cronjobs');
    })
    .then(
      async () =>
        await setupCronJob({
          name: 'Morning notifications',
          cronTime: '0 7 * * *',
          job: sendMorningNotification,
          runOnInit: false,
        }),
    )
    .then(
      async () =>
        await setupCronJob({
          name: 'Evening notifications',
          cronTime: '21 20 * * *',
          job: sendEveningNotification,
          runOnInit: false,
        }),
    )
    .then(() => {
      console.log('All notifications cron jobs are set up');
    })
    .catch(capture);
}
