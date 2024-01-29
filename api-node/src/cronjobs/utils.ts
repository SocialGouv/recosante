import * as cron from 'cron';
import { capture } from '../third-parties/sentry.ts';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
/*
*
*
Launch Cron Job function

In order to prevent the same cron to be launched twice, we use a cronJob table in the database.
If a cron is already running, we don't launch it again.

*/
type TaskFn = () => Promise<void>;

export async function launchCronJob(
  name: string,
  job: TaskFn,
): Promise<boolean> {
  try {
    const cronJobAlreadyExisting = await prisma.cronJob.findUnique({
      where: {
        unique_key: `${dayjs().utc().format('YYYY-MM-DD:HH:mm')}_${name}`,
      },
    });
    if (cronJobAlreadyExisting) {
      capture(new Error(`Cron job ${name} already existing`), {
        level: 'error',
      });
      return false;
    }
    const cronJob = await prisma.cronJob.create({
      data: {
        unique_key: `${dayjs().utc().format('YYYY-MM-DD:HH:mm')}_${name}`,
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
  runOnInit: boolean;
}

export async function setupCronJob({
  cronTime,
  name,
  job,
  runOnInit = true,
}: SetupCronJob): Promise<boolean> {
  return await new Promise((resolve) => {
    cron.CronJob.from({
      cronTime,
      onTick: async function () {
        const cronStarted = await launchCronJob(name, job);
        console.log(`${name}: next run at ${cron.sendAt(cronTime).toISO()}`);
        resolve(cronStarted);
      },
      runOnInit,
      start: true,
      timeZone: 'Europe/Paris',
    });
    if (!runOnInit) {
      resolve(true);
    }
  });
}
