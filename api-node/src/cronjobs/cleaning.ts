import { setupCronJob } from './utils';
import { capture } from '~/third-parties/sentry';
import { groupUsersByMunicipality } from '~/utils/municipalities';
import prisma from '~/prisma';
import dayjs from 'dayjs';

/*
*
*

Initialization of the cron jobs
We call them one after the other,
in order to avoid to launch them all at the same time
and have logs that are mixed and not readable.

Test it: run `npm run dev-cronjobs` and check the logs

*/

async function cleanIndicatorsData() {
  try {
    const municipalitiesByUser = await groupUsersByMunicipality();
    const inseeCodes = municipalitiesByUser.map(
      (row) => row.municipality_insee_code,
    );
    await prisma.bathingWater
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: dayjs().add(-1, 'weeks').toDate(),
          },
        },
      })
      .then(() => {
        console.log('Bathing water data cleaned up');
      })
      .catch(capture);
    await prisma.indiceAtmospheric
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: dayjs().add(-1, 'weeks').toDate(),
          },
        },
      })
      .then(() => {
        console.log('Atmospheric data cleaned up');
      })
      .catch(capture);
    await prisma.indiceUv
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: dayjs().add(-1, 'weeks').toDate(),
          },
        },
      })
      .then(() => {
        console.log('UV data cleaned up');
      })
      .catch(capture);
    await prisma.weatherAlert
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: dayjs().add(-1, 'weeks').toDate(),
          },
        },
      })
      .then(() => {
        console.log('Weather alert data cleaned up');
      })
      .catch(capture);
    await prisma.pollenAllergyRisk
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: dayjs().add(-1, 'weeks').toDate(),
          },
        },
      })
      .then(() => {
        console.log('Pollen data cleaned up');
      })
      .catch(capture);
  } catch (error: any) {
    capture(error, { level: 'error' });
  }
}

export async function initIndicatorsCleaning() {
  await Promise.resolve()
    .then(() => {
      console.log('Inside cleaning cronjobs');
    })
    .then(
      async () =>
        await setupCronJob({
          name: 'Clean indicators data',
          cronTime: '3 3 * * *', // every day at 3:03am
          job: cleanIndicatorsData,
          runOnInit: false,
        }),
    )
    .then(() => {
      console.log('All indicators data is cleaned up');
    })
    .catch(capture);
}
