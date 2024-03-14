import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import {
  type HubEAUResponse,
  type CodeParametreSISEEaux,
  ConformityStatusEnum,
} from '~/types/api/drinking_water';
import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type User,
} from '@prisma/client';
import { sendAlertNotification } from '~/utils/notifications/alert';
import {
  getUdiConformityStatus,
  mapParameterToRowData,
} from '~/utils/drinking_water';

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
      if (!udi) continue;
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
  // but each test doesn't have the same parameters tested

  // so what we need to do is:
  // 1. know which parameters we are interested in
  // 2. select for the udi and the selected parameters the latest test results

  // 1. get the latest test results from hubeau
  // doc: https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/resultats
  // max 20 paramters
  const parameters: Array<CodeParametreSISEEaux> = [
    'PH',
    'TEAU',
    'PESTOT',
    'COULF',
    'SAVQ',
    'COULQ',
    'ASP',
    'ODQ',
  ];

  const hubEauQuery = {
    size: 500, // to mazimize the chance to get the latest test results for all the parameters
    code_reseau: udi,
    code_parametre_se: parameters.join(','),
  } as any;
  const hubeauUdiUrl = new URL(
    'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis',
  );

  // Pour chaque municipalité, on récupère la liste des sites de baignade
  Object.keys(hubEauQuery).forEach((key) => {
    hubeauUdiUrl.searchParams.append(key, hubEauQuery[key]);
  });

  const hubeau_parameters_url = hubeauUdiUrl.toString();
  const hubeauUdiResponse: HubEAUResponse = await fetch(hubeau_parameters_url, {
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

  const datePrelevement = dayjs(latestTestResult.date_prelevement)
    .utc()
    .toDate();

  const existingPrelevement = await prisma.drinkingWater.findFirst({
    where: {
      udi,
      diffusion_date: datePrelevement,
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

  const phTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'PH'),
  );
  const teauTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'TEAU'),
  );
  const pestotTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'PESTOT'),
  );
  const coulfTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'COULF'),
  );
  const savqTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'SAVQ'),
  );
  const coulqTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'COULQ'),
  );
  const aspTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'ASP'),
  );
  const odqTestResult = mapParameterToRowData(
    results.find((r) => r.code_parametre_se === 'ODQ'),
  );

  let newDrinkingWaterRow = await prisma.drinkingWater.create({
    data: {
      udi,
      validity_start: datePrelevement,
      validity_end: dayjs(datePrelevement).add(1, 'year').toDate(),
      diffusion_date: datePrelevement,
      data_availability:
        hubeauUdiResponse.data.length > 0
          ? DataAvailabilityEnum.AVAILABLE
          : DataAvailabilityEnum.NOT_AVAILABLE,
      alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
      hubeau_parameters_url,
      PH_conformity: phTestResult.conformity,
      PH_value: phTestResult.value,
      PH_code_prelevement: phTestResult.code_prelevement,
      PH_date_prelevement: phTestResult.date_prelevement,
      PH_conclusion_conformite_prelevement:
        phTestResult.conclusion_conformite_prelevement,
      TEAU_conformity: teauTestResult.conformity,
      TEAU_value: teauTestResult.value,
      TEAU_code_prelevement: teauTestResult.code_prelevement,
      TEAU_date_prelevement: teauTestResult.date_prelevement,
      TEAU_conclusion_conformite_prelevement:
        teauTestResult.conclusion_conformite_prelevement,
      PESTOT_conformity: pestotTestResult.conformity,
      PESTOT_value: pestotTestResult.value,
      PESTOT_code_prelevement: pestotTestResult.code_prelevement,
      PESTOT_date_prelevement: pestotTestResult.date_prelevement,
      PESTOT_conclusion_conformite_prelevement:
        pestotTestResult.conclusion_conformite_prelevement,
      COULF_conformity: coulfTestResult.conformity,
      COULF_value: coulfTestResult.value,
      COULF_code_prelevement: coulfTestResult.code_prelevement,
      COULF_date_prelevement: coulfTestResult.date_prelevement,
      COULF_conclusion_conformite_prelevement:
        coulfTestResult.conclusion_conformite_prelevement,
      SAVQ_conformity: savqTestResult.conformity,
      SAVQ_value: savqTestResult.value,
      SAVQ_code_prelevement: savqTestResult.code_prelevement,
      SAVQ_date_prelevement: savqTestResult.date_prelevement,
      SAVQ_conclusion_conformite_prelevement:
        savqTestResult.conclusion_conformite_prelevement,
      COULQ_conformity: coulqTestResult.conformity,
      COULQ_value: coulqTestResult.value,
      COULQ_code_prelevement: coulqTestResult.code_prelevement,
      COULQ_date_prelevement: coulqTestResult.date_prelevement,
      COULQ_conclusion_conformite_prelevement:
        coulqTestResult.conclusion_conformite_prelevement,
      ASP_conformity: aspTestResult.conformity,
      ASP_value: aspTestResult.value,
      ASP_code_prelevement: aspTestResult.code_prelevement,
      ASP_date_prelevement: aspTestResult.date_prelevement,
      ASP_conclusion_conformite_prelevement:
        aspTestResult.conclusion_conformite_prelevement,
      ODQ_conformity: odqTestResult.conformity,
      ODQ_value: odqTestResult.value,
      ODQ_code_prelevement: odqTestResult.code_prelevement,
      ODQ_date_prelevement: odqTestResult.date_prelevement,
      ODQ_conclusion_conformite_prelevement:
        odqTestResult.conclusion_conformite_prelevement,
    },
  });
  if (
    getUdiConformityStatus(newDrinkingWaterRow) ===
    ConformityStatusEnum.NOT_CONFORM
  ) {
    newDrinkingWaterRow = await prisma.drinkingWater.update({
      where: {
        id: newDrinkingWaterRow.id,
      },
      data: {
        alert_status: AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET,
      },
    });
    const alertSent = await sendAlertNotification(
      IndicatorsSlugEnum.drinking_water,
      newDrinkingWaterRow,
    );
    newDrinkingWaterRow = await prisma.drinkingWater.update({
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
