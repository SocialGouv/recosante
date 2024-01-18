import * as cron from 'cron';
import { capture } from '../third-parties/sentry.ts';
import prisma from '~/prisma';
import { getAtmoIndicator } from '~/aggregators/indice_atmo.ts';
import { getPollensIndicator } from '~/aggregators/pollens.ts';
import { getIndiceUVIndicator } from '~/aggregators/indice_uv.ts';

console.log('Inside aggregators cronjobs');

/*
*
*
Launch Cron Job function

In order to prevent the same cron to be launched twice, we use a cronJob table in the database.
If a cron is already running, we don't launch it again.

*/
type TaskFn = () => Promise<void>;

async function launchCronJob(name: string, job: TaskFn): Promise<boolean> {
  try {
    const activeCronJob = await prisma.cronJob.findFirst({
      where: {
        name,
        active: true,
      },
    });
    if (activeCronJob) {
      capture(new Error(`Cron job ${name} already running`), {
        level: 'error',
      });
      return false;
    }
    const cronJob = await prisma.cronJob.create({
      data: {
        name,
        active: true,
      },
    });

    await job();
    await prisma.cronJob.update({
      where: {
        id: cronJob.id,
      },
      data: {
        active: false,
      },
    });
    return true;
  } catch (cronError: any) {
    capture(cronError, { level: 'error', extra: { name } });
    prisma.cronJob.updateMany({
      where: {
        name,
        active: true,
      },
      data: {
        active: false,
      },
    });
  }
  return false;
}

/*
*
*
Setpup Cron Job function
Each cron job has the same parameters:
- we launch it on init
- we start it (all are activated)
- we set the timezone to Europe/Paris

*/

interface SetupCronJob {
  cronTime: string;
  name: string;
  job: TaskFn;
}

async function setupCronJob({
  cronTime,
  name,
  job,
}: SetupCronJob): Promise<boolean> {
  return await new Promise((resolve) => {
    cron.CronJob.from({
      cronTime,
      onTick: async function () {
        const cronStarted = await launchCronJob(name, job);
        console.log(`${name}: next run at ${cron.sendAt(cronTime).toISO()}`);
        resolve(cronStarted);
      },
      runOnInit: true,
      start: true,
      timeZone: 'Europe/Paris',
    });
  });
}

/*
*
*

Initialization of the cron jobs
We call them one after the other,
in order to avoid to launch them all at the same time
and have logs that are mixed and not readable.

Test it: run `npm run dev-cronjobs` and check the logs

*/

Promise.resolve()
  .then(() => {
    console.log('Inside aggregators cronjobs promise');
  })
  .then(
    async () =>
      await setupCronJob({
        name: 'Indice atmo',
        // https://www.atmo-france.org/sites/federation/files/medias/documents/2023-10/FAQ_API_Atmo_Data_20231010_0.pdf
        // QUELLES SONT LES BONNES PRATIQUES POUR UTILISER L’API ?
        // Les flux sont mis à jour quotidiennement (c’est-à-dire 1 fois par jour), à partir de 13h00
        // (heure de Paris) jusqu’à 15h00 pour la métropole et à partir de 18h00 pour les outre-mer
        // Les serveurs d’Atmo Data connaissent donc un pic d’activité entre 13h et 15h. Les requêtes
        // sont à effectuer 1 à 2 fois par jour, en dehors de ces horaires.
        cronTime: '15 15,18 * * *', // every day at 3:15pm and 6:15pm
        job: getAtmoIndicator,
      }),
  )
  .then(
    async () =>
      await setupCronJob({
        name: 'Pollens',
        // There is no known rule for the update of the data. It is updated when the data is available.
        // Data is valid from the day of issue until 7 days later
        cronTime: '5 0/4 * * *', // every day starting at 00:05 every 4 hours
        job: getPollensIndicator,
      }),
  )
  .then(
    async () =>
      await setupCronJob({
        name: 'Indice UV',
        // The data is a CSV issued every day at 6am or 7am
        // Data is available for the current day, J+1 and J+2
        cronTime: '10 8 * * *', // every day at 8:10am
        job: getIndiceUVIndicator,
      }),
  )
  .then(() => {
    console.log('All cron jobs are set up');
  })
  .catch((error) => {
    console.error(error);
  });
