import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { getIdCarteForDepartment } from '~/utils/bathing_water/bathing_water';
import {
  AlertStatusEnum,
  BathingWaterCurrentYearGradingEnum,
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
} from '@prisma/client';
import { scrapeHtmlBaignadesSitePage } from '~/utils/bathing_water/scrapping';
import { sendAlertNotification } from '~/utils/notifications/alert';

const fetch = fetchRetry(global.fetch);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[BATHING_WATER] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

type Site = {
  isite: string;
  nom: string;
};

export async function getBathingWaterIndicator() {
  try {
    now = Date.now();
    logStep('Getting Bathing Waters');

    // Step 1: grab the municipalities list with bathing water sites
    const municipalities = await prisma.municipality.findMany({
      where: {
        bathing_water_sites: { gt: 0 },
      },
      orderBy: {
        DEP: 'desc',
      },
    });

    let insertedNewRows = 0;
    let missingData = 0;
    for await (const municipality of municipalities) {
      const dptddass = municipality.DEP.padStart(3, '0');
      const idCarte = getIdCarteForDepartment(municipality.DEP);

      const sitesListQuery = {
        // TODO: Check si c'est le bon type, est on sûr que idCarte peut être null ?
        idCarte,
        insee_com: municipality.COM,
        code_dept: municipality.DEP,
        f: 'json',
      } as any;
      const sitesListUrl = new URL(
        'https://baignades.sante.gouv.fr/baignades/siteList.do',
      );

      // Pour chaque municipalité, on récupère la liste des sites de baignade
      Object.keys(sitesListQuery).forEach((key) => {
        sitesListUrl.searchParams.append(key, sitesListQuery[key]);
      });

      const sites: Array<Site> = await fetch(sitesListUrl.toString(), {
        retryDelay: 1000,
        retries: 3,
      })
        .then(async (res) => await res.json())
        .then((res) => res.sites);

      for (const site of sites) {
        const idSite = `${dptddass}${site.isite}`;
        const currentYear = dayjs().year();
        const consultSiteQuery: any = {
          dptddass,
          site: idSite,
          annee: currentYear,
          // TODO: Que fait on avec plv ?
          // plv: 'all', // CAREFUL: for 2023 it works, but for 2024 it doesn't
        };
        const consultSiteUrl = new URL(
          'https://baignades.sante.gouv.fr/baignades/consultSite.do',
        );

        Object.keys(consultSiteQuery).forEach((key) => {
          consultSiteUrl.searchParams.append(key, consultSiteQuery[key]);
        });
        // example of consultSiteUrl: https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=013&site=013000808&annee=2023&plv=all
        // console.log(consultSiteUrl.href);
        const scrapingResult = await scrapeHtmlBaignadesSitePage(
          consultSiteUrl,
        );
        // console.log(scrapingResult);

        if (!scrapingResult) {
          missingData++;
          const existingResult = await prisma.bathingWater.findFirst({
            where: {
              municipality_insee_code: municipality.COM,
              id_site: idSite,
            },
          });
          if (
            !!existingResult &&
            existingResult.data_availability ===
              DataAvailabilityEnum.NOT_AVAILABLE
          ) {
            continue;
          }
          insertedNewRows++;
          await prisma.bathingWater.create({
            data: {
              diffusion_date: dayjs().utc().toDate(),
              validity_start: dayjs().utc().toDate(),
              validity_end: dayjs().utc().add(7, 'days').toDate(),
              municipality_insee_code: municipality.COM,
              data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
              dptddass,
              id_site: idSite,
              id_carte: idCarte,
              isite: site.isite,
              name: site.nom,
              consult_site_url: consultSiteUrl.href,
            },
          });
          continue;
        }
        const diffusionDate = scrapingResult.result_date
          ? scrapingResult.result_date
          : dayjs().utc().startOf('year');
        const existingResults = await prisma.bathingWater.count({
          where: {
            diffusion_date: dayjs(diffusionDate).utc().toDate(),
            municipality_insee_code: municipality.COM,
            id_site: idSite,
          },
        });
        if (existingResults > 0) {
          continue;
        }
        await prisma.bathingWater
          .create({
            data: {
              diffusion_date: dayjs(diffusionDate).utc().toDate(),
              validity_start: dayjs(diffusionDate).utc().toDate(),
              validity_end: dayjs(diffusionDate).utc().add(1, 'year').toDate(),
              municipality_insee_code: municipality.COM,
              data_availability: DataAvailabilityEnum.AVAILABLE,
              alert_status:
                scrapingResult.current_year_grading ===
                BathingWaterCurrentYearGradingEnum.PROHIBITION
                  ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
                  : AlertStatusEnum.NOT_ALERT_THRESHOLD,
              dptddass,
              id_site: idSite,
              id_carte: idCarte,
              isite: site.isite,
              name: site.nom,
              result_date: scrapingResult.result_date,
              result_value: scrapingResult.result_value,
              swimming_season_start: scrapingResult.swimming_season_start,
              swimming_season_end: scrapingResult.swimming_season_end,
              current_year_grading: scrapingResult.current_year_grading,
              consult_site_url: consultSiteUrl.href,
            },
          })
          .then(async (bathingWaterRow) => {
            insertedNewRows++;
            if (
              bathingWaterRow.alert_status ===
              AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
            ) {
              const alertSent = await sendAlertNotification(
                IndicatorsSlugEnum.bathing_water,
                bathingWaterRow,
              );
              await prisma.bathingWater.update({
                where: {
                  id: bathingWaterRow.id,
                },
                data: {
                  alert_status: alertSent
                    ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
                    : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // return;
    }

    logStep(
      `DONE INSERTING POLLENS: ${insertedNewRows} rows inserted upon ${municipalities.length} municipalities`,
    );
    logStep(
      `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    );
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getBathingWaterIndicator' } });
  }
}
