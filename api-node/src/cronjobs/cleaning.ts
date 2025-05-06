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
    console.log(`📋 Municipalités utilisées: ${inseeCodes.length}`);
    
    const now = dayjs();
    const olderThan = now.subtract(1, 'week').toDate();
    const nowStr = now.format('YYYY-MM-DD HH:mm:ss');
    const olderThanStr = dayjs(olderThan).format('YYYY-MM-DD HH:mm:ss');
    
    console.log(`🗓️ Date actuelle: ${nowStr}`);
    console.log(`🗓️ Suppression des données antérieures à: ${olderThanStr}`);
    
    // Statistiques de nettoyage
    const stats = {
      bathingWater: 0,
      atmospheric: 0,
      uv: 0,
      weatherAlert: 0,
      pollen: 0,
      notifications: 0,
    };

    try {
      const bathingResult = await prisma.bathingWater.deleteMany({
        where: {
          validity_end: {
            lt: olderThan,
          },
        },
      });
      stats.bathingWater = bathingResult.count;
      console.log(`🧹 Bathing water: ${bathingResult.count} données supprimées`);
    } catch (error: any) {
      console.error("❌ Erreur lors du nettoyage des données Bathing water:", error);
      capture(error, { extra: { functionCall: 'cleanIndicatorsData - bathingWater' } });
    }
    
    try {
      const atmosphericResult = await prisma.indiceAtmospheric.deleteMany({
        where: {
          validity_end: {
            lt: olderThan,
          },
        },
      });
      stats.atmospheric = atmosphericResult.count;
      console.log(`🧹 Atmospheric data: ${atmosphericResult.count} données supprimées`);
    } catch (error: any) {
      console.error("❌ Erreur lors du nettoyage des données Atmospheric:", error);
      capture(error, { extra: { functionCall: 'cleanIndicatorsData - atmospheric' } });
    }
    
    try {
      const uvResult = await prisma.indiceUv.deleteMany({
        where: {
          validity_end: {
            lt: olderThan,
          },
        },
      });
      stats.uv = uvResult.count;
      console.log(`🧹 UV data: ${uvResult.count} données supprimées`);
    } catch (error: any) {
      console.error("❌ Erreur lors du nettoyage des données UV:", error);
      capture(error, { extra: { functionCall: 'cleanIndicatorsData - uv' } });
    }
    
    try {
      const weatherResult = await prisma.weatherAlert.deleteMany({
        where: {
          validity_end: {
            lt: olderThan,
          },
        },
      });
      stats.weatherAlert = weatherResult.count;
      console.log(`🧹 Weather alert data: ${weatherResult.count} données supprimées`);
    } catch (error: any) {
      console.error("❌ Erreur lors du nettoyage des données Weather alert:", error);
      capture(error, { extra: { functionCall: 'cleanIndicatorsData - weatherAlert' } });
    }
    
    try {
      const pollenResult = await prisma.pollenAllergyRisk.deleteMany({
        where: {
          validity_end: {
            lt: olderThan,
          },
        },
      });
      stats.pollen = pollenResult.count;
      console.log(`🧹 Pollen data: ${pollenResult.count} données supprimées`);
    } catch (error: any) {
      console.error("❌ Erreur lors du nettoyage des données Pollen:", error);
      capture(error, { extra: { functionCall: 'cleanIndicatorsData - pollen' } });
    }
    
    try {
      const threeMonthsAgo = dayjs().subtract(3, 'months').toDate();
      const notificationsResult = await prisma.notification.deleteMany({
        where: {
          created_at: {
            lt: threeMonthsAgo,
          },
        },
      });
      stats.notifications = notificationsResult.count;
      console.log(`🧹 Notifications: ${notificationsResult.count} entrées supprimées (> 3 mois)`);
    } catch (error: any) {
      console.error("❌ Erreur lors du nettoyage des notifications:", error);
      capture(error, { extra: { functionCall: 'cleanIndicatorsData - notifications' } });
    }
    
    const totalDeleted = Object.values(stats).reduce((a, b) => a + b, 0);
    const duration = (Date.now() - startTime) / 1000;
    console.log(`\n📊 Résumé du nettoyage:`);
    console.log(`- Total: ${totalDeleted} entrées supprimées`);
    console.log(`- Durée: ${duration.toFixed(2)} secondes`);
    
    console.log('✅ Nettoyage des données terminé\n');
  } catch (error: any) {
    console.error('❌ Erreur générale lors du nettoyage des données:', error);
    capture(error, { level: 'error', extra: { functionCall: 'cleanIndicatorsData' } });
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
    .catch((error: any) => {
      console.error('❌ Erreur lors de l\'initialisation du cronjob de nettoyage:', error);
      capture(error);
    });
}
