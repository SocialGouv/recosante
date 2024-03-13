import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import {
  type HubEAUResponse,
  CodeParametreSISEEauxEnum,
} from '~/types/api/drinking_water';
import {
  AlertStatusEnum,
  BathingWaterCurrentYearGradingEnum,
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
} from '@prisma/client';
import { sendAlertNotification } from '~/utils/notifications/alert';
import { isPrelevementConform } from '~/utils/drinking_water';

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

type Udi = string;

export async function getDrinkingWaterIndicator() {
  try {
    now = Date.now();
    logStep('Getting Drinking Waters');

    // Step 1: grab the udis list from the database
    const udisRows: Record<'udi', Udi>[] =
      await prisma.$queryRaw`SELECT DISTINCT udi FROM "User";`;
    const udis = udisRows.map((row) => row.udi);

    console.log({ udis });

    let insertedNewRows = 0;
    let missingData = 0;
    for await (const udi of udis) {
      // doc: https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/resultats
      const hubeau_url = `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?size=50&code_reseau=${udi}`;
      const testResults: HubEAUResponse = await fetch(hubeau_url, {
        retryDelay: 1000,
        retries: 3,
      }).then((res) => res.json());

      // output is: an
      console.log(JSON.stringify(testResults, null, 2));
      const results = testResults.data;
      const firstRow = results[0];
      const testDate = dayjs(firstRow.date_prelevement).utc().toDate();

      const row = {
        udi,
        validity_start: testDate,
        validity_end: dayjs(testDate).add(1, 'year').toDate(),
        diffusion_date: testDate,
        data_availability:
          testResults.data.length > 0
            ? DataAvailabilityEnum.AVAILABLE
            : DataAvailabilityEnum.NOT_AVAILABLE,
        alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
        code_prelevement: firstRow.code_prelevement,
        code_lieu_analyse: firstRow.code_lieu_analyse,
        nom_uge: firstRow.nom_uge,
        nom_distributeur: firstRow.nom_distributeur,
        nom_moa: firstRow.nom_moa,
        date_prelevement: testDate,
        conclusion_conformite_prelevement:
          firstRow.conclusion_conformite_prelevement,
        conformite_limites_bact_prelevement:
          firstRow.conformite_limites_bact_prelevement,
        conformite_limites_pc_prelevement:
          firstRow.conformite_limites_pc_prelevement,
        conformite_references_bact_prelevement:
          firstRow.conformite_references_bact_prelevement,
        conformite_references_pc_prelevement:
          firstRow.conformite_references_pc_prelevement,
        hubeau_url,
        ACPT: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.ACPT,
            ),
          ),
        ),
        ANPHT: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.ANPHT,
            ),
          ),
        ),
        NH4: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.NH4,
            ),
          ),
        ),
        ANTHRA: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.ANTHRA,
            ),
          ),
        ),
        SB: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.SB,
            ),
          ),
        ),
        ASP: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.ASP,
            ),
          ),
        ),
        GT22_68: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.GT22_68,
            ),
          ),
        ),
        GT36_44: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.GT36_44,
            ),
          ),
        ),
        BSIR: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.BSIR,
            ),
          ),
        ),
        CTF: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.CTF,
            ),
          ),
        ),
        BENZAN: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.BENZAN,
            ),
          ),
        ),
        BAPYR: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.BAPYR,
            ),
          ),
        ),
        BBFLUO: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.BBFLUO,
            ),
          ),
        ),
        BGPERY: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.BGPERY,
            ),
          ),
        ),
        BKFLUO: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.BKFLUO,
            ),
          ),
        ),
        CD: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.CD,
            ),
          ),
        ),
        CL2LIB: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.CL2LIB,
            ),
          ),
        ),
        CL2TOT: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.CL2TOT,
            ),
          ),
        ),
        CLVYL: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.CLVYL,
            ),
          ),
        ),
        CRT: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.CRT,
            ),
          ),
        ),
        CHRYS: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.CHRYS,
            ),
          ),
        ),
        CDT25: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.CDT25,
            ),
          ),
        ),
        COULQ: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.COULQ,
            ),
          ),
        ),
        DBENZAN: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.DBENZAN,
            ),
          ),
        ),
        STRF: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.STRF,
            ),
          ),
        ),
        ECOLI: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.ECOLI,
            ),
          ),
        ),
        FET: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.FET,
            ),
          ),
        ),
        FLUORA: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.FLUORA,
            ),
          ),
        ),
        FLUORE: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.FLUORE,
            ),
          ),
        ),
        HPAT4: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.HPAT4,
            ),
          ),
        ),
        HPAT: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.HPAT,
            ),
          ),
        ),
        INDPYR: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.INDPYR,
            ),
          ),
        ),
        ME2FL: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.ME2FL,
            ),
          ),
        ),
        ME2NA: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.ME2NA,
            ),
          ),
        ),
        NAPHTA: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.NAPHTA,
            ),
          ),
        ),
        NO3: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.NO3,
            ),
          ),
        ),
        NO3_NO2: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.NO3_NO2,
            ),
          ),
        ),
        NO2: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.NO2,
            ),
          ),
        ),
        ODQ: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.ODQ,
            ),
          ),
        ),
        PH: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.PH,
            ),
          ),
        ),
        PHENAN: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.PHENAN,
            ),
          ),
        ),
        PYR: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.PYR,
            ),
          ),
        ),
        SAVQ: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.SAVQ,
            ),
          ),
        ),
        TEAU: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) => row.code_parametre_se === CodeParametreSISEEauxEnum.TEAU,
            ),
          ),
        ),
        TURBNFU: JSON.stringify(
          isPrelevementConform(
            results.find(
              (row) =>
                row.code_parametre_se === CodeParametreSISEEauxEnum.TURBNFU,
            ),
          ),
        ),
      };
      return;
      //   if (!scrapingResult) {
      //     missingData++;
      //     const existingResult = await prisma.bathingWater.findFirst({
      //       where: {
      //         municipality_insee_code: municipality.COM,
      //         id_site: idSite,
      //       },
      //     });
      //     if (
      //       !!existingResult &&
      //       existingResult.data_availability ===
      //         DataAvailabilityEnum.NOT_AVAILABLE
      //     ) {
      //       continue;
      //     }
      //     insertedNewRows++;
      //     await prisma.bathingWater.create({
      //       data: {
      //         diffusion_date: dayjs().utc().toDate(),
      //         validity_start: dayjs().utc().toDate(),
      //         validity_end: dayjs().utc().add(7, 'days').toDate(),
      //         municipality_insee_code: municipality.COM,
      //         data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
      //         dptddass,
      //         id_site: idSite,
      //         id_carte: idCarte,
      //         isite: site.isite,
      //         name: site.nom,
      //         consult_site_url: consultSiteUrl.href,
      //       },
      //     });
      //     continue;
      //   }
      //   const diffusionDate = scrapingResult.result_date
      //     ? scrapingResult.result_date
      //     : dayjs().utc().startOf('year');
      //   const existingResults = await prisma.bathingWater.count({
      //     where: {
      //       diffusion_date: dayjs(diffusionDate).utc().toDate(),
      //       municipality_insee_code: municipality.COM,
      //       id_site: idSite,
      //     },
      //   });
      //   if (existingResults > 0) {
      //     continue;
      //   }
      //   await prisma.bathingWater
      //     .create({
      //       data: {
      //         diffusion_date: dayjs(diffusionDate).utc().toDate(),
      //         validity_start: dayjs(diffusionDate).utc().toDate(),
      //         validity_end: dayjs(diffusionDate).utc().add(1, 'year').toDate(),
      //         municipality_insee_code: municipality.COM,
      //         data_availability: DataAvailabilityEnum.AVAILABLE,
      //         alert_status:
      //           scrapingResult.current_year_grading ===
      //           BathingWaterCurrentYearGradingEnum.PROHIBITION
      //             ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
      //             : AlertStatusEnum.NOT_ALERT_THRESHOLD,
      //         dptddass,
      //         id_site: idSite,
      //         id_carte: idCarte,
      //         isite: site.isite,
      //         name: site.nom,
      //         result_date: scrapingResult.result_date,
      //         result_value: scrapingResult.result_value,
      //         swimming_season_start: scrapingResult.swimming_season_start,
      //         swimming_season_end: scrapingResult.swimming_season_end,
      //         current_year_grading: scrapingResult.current_year_grading,
      //         consult_site_url: consultSiteUrl.href,
      //       },
      //     })
      //     .then(async (bathingWaterRow) => {
      //       insertedNewRows++;
      //       if (
      //         bathingWaterRow.alert_status ===
      //         AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
      //       ) {
      //         const alertSent = await sendAlertNotification(
      //           IndicatorsSlugEnum.bathing_water,
      //           bathingWaterRow,
      //         );
      //         await prisma.bathingWater.update({
      //           where: {
      //             id: bathingWaterRow.id,
      //           },
      //           data: {
      //             alert_status: alertSent
      //               ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
      //               : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
      //           },
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
      // return;
    }

    logStep(
      `DONE INSERTING DRINKING WATER: ${insertedNewRows} rows inserted upon ${udis.length} udis`,
    );
    logStep(`MISSING DATA : ${missingData} missing upon ${udis.length} udis`);
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getDrinkingWaterIndicator' } });
  }
}
