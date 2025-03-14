import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import {
  type HubEAUShortResponse,
  type ShortPrelevementResult,
  type HubEAUResultsParameters,
  type ExtendedShortPrelevementResult,
  type PrelevementResult,
  type HubEAUCompleteResponse,
  ConformityEnum,
} from '~/types/api/drinking_water';
import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type User,
  type DrinkingWater,
  type Prisma,
} from '@prisma/client';
import { sendAlertNotification } from '~/utils/notifications/alert';
import {
  checkPrelevementConformity,
  getWorstConclusion,
  getWorstConformity,
} from '~/utils/drinking_water';

const fetch = fetchRetry(global.fetch);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

// documentation about indicators:
// https://www.data.gouv.fr/en/datasets/resultats-du-controle-sanitaire-de-leau-distribuee-commune-par-commune/
// https://www.data.gouv.fr/fr/datasets/resultats-du-controle-sanitaire-de-leau-du-robinet/
// https://www.data.gouv.fr/fr/datasets/r/36afc708-42dc-4a89-b039-7fde6bcc83d8

// documentation about Hub'eau API:
// https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/resultats

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
    const udis = await prisma.udis
      .findMany({
        select: {
          code_udi: true,
        },
      })
      .then((udis) => udis.map((udi) => udi.code_udi).filter(Boolean));

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

async function fetchDrinkingWaterData(udi: User['udi']) {
  if (!udi) {
    return {
      data: null,
      insertedNewRow: false,
      alreadyExistingRow: false,
      missingData: false,
    };
  }
  // what does Hub'eau provide? IT's not written in the documentation so we figured this out ourselves
  // you can put an udi as parameter, you will receive the latest test results for this udi
  // a test has an id: the `code_prelevement`
  // Hub'eau lists all the results for each parameter for each test
  // and for each paramter for one given test, the global conclusion are always the same
  // but each test doesn't have the same parameters tested

  // the agreement we have with the Health Autohrity right now is
  // - we can't make our own conclusion
  // so what we need to do is:
  // 1. select all the tests after a date_min_prelevement (1 year ago)
  // 2. the latest test will be the one we'll show in the summary
  // 3. we'll show all the tests results in the details

  const hubeEauEndpoint =
    'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis';

  // first we check the latest test results for the udi to know if we have it in DB
  const hubEauLastTestCheckURL = new URL(hubeEauEndpoint);
  const hubeEauLastTestCheckQuery: HubEAUResultsParameters = {
    size: 1,
    code_reseau: [udi],
    fields: ['code_prelevement'],
    date_min_prelevement: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    date_max_prelevement: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  };

  Object.keys(hubeEauLastTestCheckQuery).forEach((key) => {
    const value =
      hubeEauLastTestCheckQuery[key as keyof typeof hubeEauLastTestCheckQuery];
    if (value) {
      hubEauLastTestCheckURL.searchParams.append(
        key,
        Array.isArray(value) ? value.join(',') : `${value}`,
      );
    }
  });

  const hubEauLastTestCheckResponse: HubEAUShortResponse = await fetch(
    hubEauLastTestCheckURL.toString(),
    {
      retryDelay: 1000,
      retries: 3,
    },
  ).then(async (res) => res.json());
  if (hubEauLastTestCheckResponse.data?.length > 0) {
    const hubEauLastTestCheckResuklt = hubEauLastTestCheckResponse.data[0];
    const existingDrinkingWaterRow = await prisma.drinkingWater.findFirst({
      where: {
        udi,
        last_prelevement_code: hubEauLastTestCheckResuklt.code_prelevement,
      },
    });
    if (existingDrinkingWaterRow) {
      return {
        data: existingDrinkingWaterRow,
        insertedNewRow: false,
        alreadyExistingRow: true,
        missingData: false,
      };
    }
  }

  // there is new data to fetch ! let's do it
  const hubEauURL = new URL(hubeEauEndpoint);

  const hubEauQuery: HubEAUResultsParameters = {
    size: 1000, // to mazimize the chance to get the latest test results for all the parameters
    code_reseau: [udi],
    // code_parametre_se: [
    //   'PH',
    //   'TEAU',
    //   'PESTOT',
    //   'COULF',
    //   'SAVQ',
    //   'COULQ',
    //   'ASP',
    //   'ODQ',
    // ],
    fields: [
      'date_prelevement',
      'code_prelevement',
      'conclusion_conformite_prelevement',
      'conformite_limites_bact_prelevement',
      'conformite_limites_pc_prelevement',
      'conformite_references_bact_prelevement',
      'conformite_references_pc_prelevement',
      'code_installation_amont',
    ],
    date_min_prelevement: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    date_max_prelevement: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  };

  Object.keys(hubEauQuery).forEach((key) => {
    const value = hubEauQuery[key as keyof typeof hubEauQuery];
    if (value) {
      hubEauURL.searchParams.append(
        key,
        Array.isArray(value) ? value.join(',') : `${value}`,
      );
    }
  });

  const hubeau_first_url = hubEauURL.toString();

  const prelevements: Array<ExtendedShortPrelevementResult> = [];
  const prelevementsDone: Record<
    ShortPrelevementResult['code_prelevement'],
    boolean
  > = {};
  let currentPrelevementCode: ShortPrelevementResult['code_prelevement'] = '';
  let currentPrelevementConclusions: ShortPrelevementResult | null = null;
  let currentPrelevementParametersCount = 0;

  async function getHubeauDataRecursive(hubeau_url: string) {
    const hubeauUdiResponse: HubEAUShortResponse = await fetch(hubeau_url, {
      retryDelay: 1000,
      retries: 3,
    }).then(async (res) => res.json());
    if (hubeauUdiResponse.data?.length > 0) {
      // let's group by code_prelevement
      const hubEAUResults = hubeauUdiResponse.data;
      for (const result of hubEAUResults) {
        if (result.code_prelevement !== currentPrelevementCode) {
          if (currentPrelevementConclusions) {
            prelevements.push({
              ...currentPrelevementConclusions,
              code_installation_amont: result.code_installation_amont,
              parameters_count: currentPrelevementParametersCount,
            });
          }
          currentPrelevementParametersCount = 0;
          currentPrelevementConclusions = result;
          if (prelevementsDone[result.code_prelevement]) {
            capture(
              new Error(
                '[Hubeau] Response is not sorted by prelevement because prelevement already done',
              ),
              {
                extra: {
                  prelevementCode: result.code_prelevement,
                  udi,
                  hubeau_first_url,
                  hubeau_url,
                  prelevementsDone,
                },
              },
            );
          }
          currentPrelevementCode = result.code_prelevement;
        }
        if (
          JSON.stringify(currentPrelevementConclusions) !==
          JSON.stringify(result)
        ) {
          capture(new Error('[Hubeau] Conclusion is different for same test'), {
            extra: {
              result,
              udi,
              hubeau_first_url,
              hubeau_url,
              currentPrelevementConclusions,
              currentPrelevementCode,
            },
            tags: {
              udi,
              currentPrelevementCode,
            },
          });
          if (!currentPrelevementConclusions) continue;
          const worstPrelevement: ShortPrelevementResult = {
            // order matters
            code_prelevement: currentPrelevementCode,
            date_prelevement: currentPrelevementConclusions.date_prelevement,
            conclusion_conformite_prelevement: getWorstConclusion(
              currentPrelevementConclusions.conclusion_conformite_prelevement,
              result.conclusion_conformite_prelevement,
            ),
            conformite_limites_bact_prelevement: getWorstConformity(
              currentPrelevementConclusions.conformite_limites_bact_prelevement,
              result.conformite_limites_bact_prelevement,
            ),
            conformite_limites_pc_prelevement: getWorstConformity(
              currentPrelevementConclusions.conformite_limites_pc_prelevement,
              result.conformite_limites_pc_prelevement,
            ),
            conformite_references_bact_prelevement: getWorstConformity(
              currentPrelevementConclusions.conformite_references_bact_prelevement,
              result.conformite_references_bact_prelevement,
            ),
            conformite_references_pc_prelevement: getWorstConformity(
              currentPrelevementConclusions.conformite_references_pc_prelevement,
              result.conformite_references_pc_prelevement,
            ),
          };
          currentPrelevementConclusions = worstPrelevement;
        }
        currentPrelevementParametersCount++;
      }
    }
    if (hubeauUdiResponse.next) {
      await getHubeauDataRecursive(hubeauUdiResponse.next);
    } else {
      if (currentPrelevementConclusions && currentPrelevementParametersCount) {
        prelevements.push({
          ...currentPrelevementConclusions,
          parameters_count: currentPrelevementParametersCount,
        });
      }
    }
  }

  await getHubeauDataRecursive(hubeau_first_url);
  // results are sorted by latest date, and one prelevement has one date, so
  // results are also sorted by prelevement

  if (!prelevements.length) {
    return {
      data: null,
      insertedNewRow: false,
      alreadyExistingRow: false,
      missingData: false,
    };
  }

  const lastPrelevement = prelevements[0];

  const datePrelevement = dayjs(lastPrelevement.date_prelevement)
    .utc()
    .toDate();

  let newDrinkingWaterRow = await prisma.drinkingWater.create({
    data: {
      udi,
      validity_start: datePrelevement,
      validity_end: dayjs(datePrelevement).add(1, 'year').toDate(),
      diffusion_date: datePrelevement,
      data_availability:
        prelevements.length > 0
          ? DataAvailabilityEnum.AVAILABLE
          : DataAvailabilityEnum.NOT_AVAILABLE,
      alert_status:
        checkPrelevementConformity(lastPrelevement) ===
        ConformityEnum.NOT_CONFORM
          ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
          : AlertStatusEnum.NOT_ALERT_THRESHOLD,
      last_prelevement_code: lastPrelevement.code_prelevement,
      last_prelevement_date: datePrelevement,
      conclusion_conformite_prelevement:
        lastPrelevement.conclusion_conformite_prelevement,
      conformite_limites_bact_prelevement:
        lastPrelevement.conformite_limites_bact_prelevement,
      conformite_limites_pc_prelevement:
        lastPrelevement.conformite_limites_pc_prelevement,
      conformite_references_bact_prelevement:
        lastPrelevement.conformite_references_bact_prelevement,
      conformite_references_pc_prelevement:
        lastPrelevement.conformite_references_pc_prelevement,
      hubeau_first_url,
      all_tests_results: prelevements as unknown as Prisma.JsonArray,
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

type PrelevementsByCode = Record<
  ExtendedShortPrelevementResult['code_prelevement'],
  ExtendedShortPrelevementResult
>;

async function fetchDrinkingWaterDataCascade(udi: User['udi']) {
  const result = await fetchDrinkingWaterData(udi);
  if (!result.data) return result;
  const drinkingWater = result.data;
  const allTestsResults = [
    ...((drinkingWater.all_tests_results ?? []) as Prisma.JsonArray),
  ];
  const allTestsResultsByPrelevementCode: PrelevementsByCode = {};
  for (const jsonValue of allTestsResults) {
    const testResult = jsonValue as unknown as ExtendedShortPrelevementResult;
    allTestsResultsByPrelevementCode[testResult.code_prelevement] = testResult;
    const reseauAmont = testResult.code_installation_amont;
    if (!reseauAmont) continue;
    if (reseauAmont === udi) continue;
    const amontTests = await fetchDrinkingWaterDataCascade(reseauAmont);
    if (!amontTests.data) continue;
    const amontAllTestsResults = [
      ...((amontTests.data.all_tests_results ?? []) as Prisma.JsonArray),
    ];
    for (const amontJsonValue of amontAllTestsResults) {
      const amontTestResult =
        amontJsonValue as unknown as ExtendedShortPrelevementResult;
      allTestsResultsByPrelevementCode[amontTestResult.code_prelevement] =
        amontTestResult;
    }
  }
  const allPrelevements = Object.values(allTestsResultsByPrelevementCode).sort(
    (a, b) => {
      return a.date_prelevement > b.date_prelevement ? -1 : 1;
    },
  );

  const lastPrelevement = allPrelevements[0];

  const datePrelevement = dayjs(lastPrelevement.date_prelevement)
    .utc()
    .toDate();

  const augmentedDrinkingWaterWithAmont: DrinkingWater = {
    ...drinkingWater,
    validity_start: datePrelevement,
    validity_end: dayjs(datePrelevement).add(1, 'year').toDate(),
    diffusion_date: datePrelevement,
    last_prelevement_code: lastPrelevement.code_prelevement,
    last_prelevement_date: datePrelevement,
    conclusion_conformite_prelevement:
      lastPrelevement.conclusion_conformite_prelevement,
    conformite_limites_bact_prelevement:
      lastPrelevement.conformite_limites_bact_prelevement,
    conformite_limites_pc_prelevement:
      lastPrelevement.conformite_limites_pc_prelevement,
    conformite_references_bact_prelevement:
      lastPrelevement.conformite_references_bact_prelevement,
    conformite_references_pc_prelevement:
      lastPrelevement.conformite_references_pc_prelevement,
    all_tests_results: allPrelevements as unknown as Prisma.JsonArray,
  };

  return {
    ...result,
    data: augmentedDrinkingWaterWithAmont,
  };
}

async function fetchDrinkingWaterPrelevement(code_prelevement: string) {
  const hubeEauEndpoint =
    'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis';

  // there is new data to fetch ! let's do it
  const hubEauURL = new URL(hubeEauEndpoint);

  const hubEauQuery: HubEAUResultsParameters = {
    size: 1000,
    code_prelevement,
  };

  Object.keys(hubEauQuery).forEach((key) => {
    const value = hubEauQuery[key as keyof typeof hubEauQuery];
    if (value) {
      hubEauURL.searchParams.append(
        key,
        Array.isArray(value) ? value.join(',') : `${value}`,
      );
    }
  });

  const hubeau_first_url = hubEauURL.toString();
  let hubeauUdiFirstResponse: HubEAUCompleteResponse | null = null;

  const parametersTested: Array<PrelevementResult> = [];

  async function getHubeauDataRecursive(hubeau_url: string) {
    const hubeauUdiResponse: HubEAUCompleteResponse = await fetch(hubeau_url, {
      retryDelay: 1000,
      retries: 3,
    }).then(async (res) => res.json());
    if (hubeau_url === hubeau_first_url) {
      hubeauUdiFirstResponse = hubeauUdiResponse;
    }
    if (hubeauUdiResponse.data?.length > 0) {
      parametersTested.push(...hubeauUdiResponse.data);
    }
    if (hubeauUdiResponse.next) {
      await getHubeauDataRecursive(hubeauUdiResponse.next);
    }
  }

  await getHubeauDataRecursive(hubeau_first_url);

  return {
    ...(hubeauUdiFirstResponse as unknown as HubEAUCompleteResponse),
    data: parametersTested,
  };
}

export {
  getDrinkingWaterIndicator,
  fetchDrinkingWaterData,
  fetchDrinkingWaterDataCascade,
  fetchDrinkingWaterPrelevement,
};
