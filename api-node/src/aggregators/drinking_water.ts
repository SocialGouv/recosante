import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { type HubEAUResponse } from '~/types/api/drinking_water';
import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type User,
} from '@prisma/client';
import { sendAlertNotification } from '~/utils/notifications/alert';
import { checkPrelevementConformity } from '~/utils/drinking_water';

const fetch = fetchRetry(global.fetch);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

// documentation about indicators:
// https://www.data.gouv.fr/en/datasets/resultats-du-controle-sanitaire-de-leau-distribuee-commune-par-commune/
// https://www.data.gouv.fr/fr/datasets/r/36afc708-42dc-4a89-b039-7fde6bcc83d8

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[DRINKING_WATER] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

async function getDrinkingWaterIndicator() {
  try {
    now = Date.now();
    logStep('Getting Drinking Waters');

    // Step 1: grab the udis list from the database
    const udisRows: Record<'udi', User['udi']>[] =
      await prisma.$queryRaw`SELECT DISTINCT udi FROM "User";`;
    const udis = udisRows.map((row) => row.udi).filter(Boolean);

    let insertedNewRows = 0;
    let alreadyExistingRows = 0;
    let missingData = 0;
    for await (const udi of udis) {
      const result = await fetchDrinkingWaterData(udi);
      if (result.alreadyExistingRow) alreadyExistingRows++;
      if (result.insertedNewRow) insertedNewRows++;
      if (result.missingData) missingData++;
    }

    logStep(
      `DONE INSERTING DRINKING WATER: ${insertedNewRows} rows inserted upon ${udis.length} udis`,
    );
    logStep(
      `ALREADY EXISTING ROWS : ${alreadyExistingRows} existing rows upon ${udis.length} udis`,
    );
    logStep(`MISSING DATA : ${missingData} missing upon ${udis.length} udis`);
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getDrinkingWaterIndicator' } });
  }
}

async function fetchDrinkingWaterData(udi: string) {
  // what does Hub'eau provide? IT's not written in the documentation so we figured this out ourselves
  // you can put an udi as parameter, you will receive the latest test results for this udi
  // a test has an id: the `code_prelevement`
  // Hub'eau lists all the results for each parameter for each test
  // and for each paramter for one given test, the global conclusion are always the same

  // so what we need to do is:
  // 1. get the latest test results from hubeau for the given udi - we'll get only one row for a random parameter
  // 2. grab the conslusion for this test
  // 3. [TODO] grab the `code_prelevement` to grab all the paramters results for this test, when we'll have decided which parameter we want to grab
  // Note: some tests have only 1 parameter tested, some other have 632 (!) parameters tested, so we need to select

  // 1. get the latest test results from hubeau
  // doc: https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/resultats
  const hubeauUdiUrl = `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?size=1&code_reseau=${udi}`;
  const hubeauUdiResponse: HubEAUResponse = await fetch(hubeauUdiUrl, {
    retryDelay: 1000,
    retries: 3,
  }).then(async (res) => res.json());

  const results = hubeauUdiResponse.data;
  const latestTestResult = results[0];

  if (!latestTestResult) {
    return {
      data: null,
      insertedNewRow: false,
      alreadyExistingRow: false,
      missingData: true,
    };
  }

  const existingPrelevement = await prisma.drinkingWater.findFirst({
    where: {
      code_prelevement: latestTestResult.code_prelevement,
    },
  });
  if (existingPrelevement) {
    return {
      data: existingPrelevement,
      insertedNewRow: false,
      alreadyExistingRow: true,
      missingData: false,
    };
  }

  const testDate = dayjs(latestTestResult.date_prelevement).utc().toDate();

  // 2. get all the parameters results for this test
  const hubeauTestUrl = `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?size=1000&code_prelevement=${latestTestResult.code_prelevement}`;
  // TODO
  // - select the sub indicators
  // - save the sub indicators

  const newDrinkingWaterRow = await prisma.drinkingWater.create({
    data: {
      udi,
      validity_start: testDate,
      validity_end: dayjs(testDate).add(1, 'year').toDate(),
      diffusion_date: testDate,
      data_availability:
        hubeauUdiResponse.data.length > 0
          ? DataAvailabilityEnum.AVAILABLE
          : DataAvailabilityEnum.NOT_AVAILABLE,
      alert_status: checkPrelevementConformity(latestTestResult)
        ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
        : AlertStatusEnum.NOT_ALERT_THRESHOLD,
      code_prelevement: latestTestResult.code_prelevement,
      nom_uge: latestTestResult.nom_uge,
      nom_distributeur: latestTestResult.nom_distributeur,
      nom_moa: latestTestResult.nom_moa,
      date_prelevement: testDate,
      conclusion_conformite_prelevement:
        latestTestResult.conclusion_conformite_prelevement,
      conformite_limites_bact_prelevement:
        latestTestResult.conformite_limites_bact_prelevement,
      conformite_limites_pc_prelevement:
        latestTestResult.conformite_limites_pc_prelevement,
      conformite_references_bact_prelevement:
        latestTestResult.conformite_references_bact_prelevement,
      conformite_references_pc_prelevement:
        latestTestResult.conformite_references_pc_prelevement,
      hubeau_udi_url: hubeauUdiUrl,
      hubeau_test_url: hubeauTestUrl,
    },
  });
  if (
    newDrinkingWaterRow.alert_status ===
    AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
  ) {
    const alertSent = await sendAlertNotification(
      IndicatorsSlugEnum.drinking_water,
      newDrinkingWaterRow,
    );
    await prisma.drinkingWater.update({
      where: {
        id: newDrinkingWaterRow.id,
      },
      data: {
        alert_status: alertSent
          ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
          : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
      },
    });
  }
  return {
    data: newDrinkingWaterRow,
    insertedNewRow: true,
    alreadyExistingRow: false,
    missingData: false,
  };
}

export { getDrinkingWaterIndicator, fetchDrinkingWaterData };
