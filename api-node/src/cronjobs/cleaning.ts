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
    console.log('⏱️ Début du nettoyage des données des indicateurs');
    const startTime = Date.now();
    
    const municipalitiesByUser = await groupUsersByMunicipality();
    const inseeCodes = municipalitiesByUser.map(
      (row) => row.municipality_insee_code,
    );
    console.log(` Municipalités utilisées: ${inseeCodes.length}`);
    
    const olderThan = dayjs().add(-1, 'weeks').toDate();
    console.log(`Suppression des données antérieures à: ${olderThan.toISOString()}`);
    
    const stats = {
      bathingWater: 0,
      atmospheric: 0,
      uv: 0,
      weatherAlert: 0,
      pollen: 0,
    };

    await prisma.bathingWater
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: olderThan,
          },
        },
      })
      .then((result) => {
        stats.bathingWater = result.count;
        console.log(`🧹 Bathing water: ${result.count} données supprimées`);
      })
      .catch(capture);
    
    await prisma.indiceAtmospheric
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: olderThan,
          },
        },
      })
      .then((result) => {
        stats.atmospheric = result.count;
        console.log(`🧹 Atmospheric data: ${result.count} données supprimées`);
      })
      .catch(capture);
    
    await prisma.indiceUv
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: olderThan,
          },
        },
      })
      .then((result) => {
        stats.uv = result.count;
        console.log(`🧹 UV data: ${result.count} données supprimées`);
      })
      .catch(capture);
    
    await prisma.weatherAlert
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: olderThan,
          },
        },
      })
      .then((result) => {
        stats.weatherAlert = result.count;
        console.log(`🧹 Weather alert data: ${result.count} données supprimées`);
      })
      .catch(capture);
    
    await prisma.pollenAllergyRisk
      .deleteMany({
        where: {
          municipality_insee_code: {
            notIn: inseeCodes,
          },
          validity_end: {
            lt: olderThan,
          },
        },
      })
      .then((result) => {
        stats.pollen = result.count;
        console.log(`🧹 Pollen data: ${result.count} données supprimées`);
      })
      .catch(capture);
    
    const totalDeleted = Object.values(stats).reduce((a, b) => a + b, 0);
    const duration = (Date.now() - startTime) / 1000;
    console.log(`\n📊 Résumé du nettoyage:`);
    console.log(`- Total: ${totalDeleted} entrées supprimées`);
    console.log(`- Durée: ${duration.toFixed(2)} secondes`);
    
    console.log('✅ Nettoyage des données terminé\n');
  } catch (error: any) {
    console.error('❌ Erreur lors du nettoyage des données:', error);
    capture(error, { level: 'error' });
  }
}

export async function initIndicatorsCleaning() {
  await Promise.resolve()
    .then(() => {
      console.log('\n🚀 Initialisation du cronjob de nettoyage des données');
    })
    .then(
      async () =>
        await setupCronJob({
          name: 'Clean indicators data',
          cronTime: '3 3 * * *', // every day at 3:03am
          job: cleanIndicatorsData,
          runOnInit: true
        }),
    )
    .then(() => {
      console.log('✅ Cronjob de nettoyage des données configuré (exécution quotidienne à 3:03)\n');
    })
    .catch(capture);
}
