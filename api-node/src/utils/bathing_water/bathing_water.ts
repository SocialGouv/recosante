import fetchRetry from 'fetch-retry';
import {
  BathgWaterIdCarteEnum,
  type Municipality,
  type BathingWater,
  BathingWaterResultEnum,
  BathingWaterCurrentYearGradingEnum,
} from '@prisma/client';
import {
  BathingWaterNumberValueEnum,
  BathingWaterStatusEnum,
} from '~/types/api/bathing_water';
import { NotificationDotColor } from '~/types/notifications';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import dayjs from 'dayjs';

const fetch = fetchRetry(global.fetch);

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[BATHING_WATER_SITES] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

function getIdCarteForDepartment(
  departmendCode: Municipality['DEP'],
): BathgWaterIdCarteEnum | null {
  switch (departmendCode) {
    case '971':
      return BathgWaterIdCarteEnum.gua;
    case '972':
      return BathgWaterIdCarteEnum.mar;
    case '973':
      return BathgWaterIdCarteEnum.guy;
    case '974':
      return BathgWaterIdCarteEnum.reu;
    case '976':
      return BathgWaterIdCarteEnum.may;
    case '975':
    case '977':
    case '978':
    case '984':
    case '986':
    case '987':
    case '988':
    case '989':
      return null;
    default:
      return BathgWaterIdCarteEnum.fra;
  }
}

async function updateMunicipalitiesWithBathingWaterSites() {
  try {
    now = Date.now();
    logStep('Update municipalities with bathing water sites');

    const prevMunicipalities = await prisma.municipality.findMany({
      where: {
        bathing_water_sites: { gt: 0 },
      },
    });
    // Step 5: grab the municipalities list
    const municipalities = await prisma.municipality.findMany();
    for await (const [index, municipality] of Object.entries(municipalities)) {
      const idCarte = getIdCarteForDepartment(municipality.DEP);
      const url = new URL(
        'https://baignades.sante.gouv.fr/baignades/siteList.do',
      );

      const query: any = {
        idCarte,
        insee_com: municipality.COM,
        code_dept: municipality.DEP,
        f: 'json',
      };
      Object.keys(query).forEach((key) => {
        url.searchParams.append(key, query[key]);
      });
      const { sites } = await fetch(url.toString(), {
        retryDelay: 1000,
        retries: 3,
      }).then(async (res) => res.json());
      if (sites.length > 0) {
        console.log(
          `${index} of ${municipalities.length} ${
            municipality.COM
          }: ${url.toString()}: ${sites.length} sites`,
        );
        // LOL: if no `await` here below, the row will be updated
        await prisma.municipality.update({
          where: {
            COM: municipality.COM,
          },
          data: {
            bathing_water_sites: sites.length,
          },
        });
      }
    }

    const nextMunicipalities = await prisma.municipality.findMany({
      where: {
        bathing_water_sites: { gt: 0 },
      },
    });

    logStep(
      `Finished updating municipalities with bathing water sites. Before: ${prevMunicipalities.length} After: ${nextMunicipalities.length}`,
    );
  } catch (error: any) {
    capture(error, {
      extra: { functionCall: 'updateMunicipalitiesWithBathingWaterSites' },
    });
  }
}

function getBathingWaterSiteValueDerivedFromTestResult(
  result_value: BathingWaterResultEnum | null,
): BathingWaterNumberValueEnum {
  switch (result_value) {
    case BathingWaterResultEnum.GOOD:
      return BathingWaterNumberValueEnum.GOOD;
    case BathingWaterResultEnum.AVERAGE:
      return BathingWaterNumberValueEnum.AVERAGE;
    case BathingWaterResultEnum.POOR:
      return BathingWaterNumberValueEnum.POOR;
    case BathingWaterResultEnum.NO_RESULT_FOUND:
    default:
      return BathingWaterNumberValueEnum.UNRANKED_SITE;
  }
}

function getBathingWaterSiteValueDerivedFromBathingWaterRow(
  bathingWater: BathingWater,
): BathingWaterNumberValueEnum {
  if (
    bathingWater.current_year_grading ===
    BathingWaterCurrentYearGradingEnum.PROHIBITION
  ) {
    return BathingWaterNumberValueEnum.PROHIBITION;
  }

  switch (bathingWater.result_value) {
    case BathingWaterResultEnum.GOOD:
      return BathingWaterNumberValueEnum.GOOD;
    case BathingWaterResultEnum.AVERAGE:
      return BathingWaterNumberValueEnum.AVERAGE;
    case BathingWaterResultEnum.POOR:
      return BathingWaterNumberValueEnum.POOR;
    case BathingWaterResultEnum.NO_RESULT_FOUND:
    default:
      return BathingWaterNumberValueEnum.UNRANKED_SITE;
  }
}

function getBathingWaterStatus(
  value: BathingWaterNumberValueEnum,
): BathingWaterStatusEnum {
  switch (value) {
    case BathingWaterNumberValueEnum.OFF_SEASON:
      return BathingWaterStatusEnum.OFF_SEASON;
    case BathingWaterNumberValueEnum.UNRANKED_SITE:
      return BathingWaterStatusEnum.UNRANKED_SITE;
    case BathingWaterNumberValueEnum.GOOD:
      return BathingWaterStatusEnum.GOOD;
    case BathingWaterNumberValueEnum.AVERAGE:
      return BathingWaterStatusEnum.AVERAGE;
    case BathingWaterNumberValueEnum.POOR:
      return BathingWaterStatusEnum.POOR;
    case BathingWaterNumberValueEnum.PROHIBITION:
      return BathingWaterStatusEnum.PROHIBITION;
  }
}

function isBathingWaterSiteOnSeason(bathingWater: BathingWater): boolean {
  const today = dayjs().format('YYYY-MM-DD');
  switch (bathingWater.id_carte) {
    case BathgWaterIdCarteEnum.gua:
    case BathgWaterIdCarteEnum.mar:
    case BathgWaterIdCarteEnum.guy:
    case BathgWaterIdCarteEnum.reu:
    case BathgWaterIdCarteEnum.may:
      return true;
  }

  if (!bathingWater.swimming_season_end) return false;
  if (!bathingWater.swimming_season_start) return false;
  return (
    bathingWater.swimming_season_end >= today &&
    today >= bathingWater.swimming_season_start
  );
}

function getBathingWaterSummaryValue(bathingWaterSites: Array<BathingWater>): {
  value: BathingWaterNumberValueEnum;
  status: BathingWaterStatusEnum;
} {
  let worstSiteGrading = BathingWaterNumberValueEnum.UNRANKED_SITE;
  let isOffSeason = true;
  for (const site of bathingWaterSites) {
    if (
      site.current_year_grading ===
      BathingWaterCurrentYearGradingEnum.PROHIBITION
    ) {
      return {
        value: BathingWaterNumberValueEnum.PROHIBITION,
        status: BathingWaterStatusEnum.PROHIBITION,
      };
    }
    const isOnSeason = isBathingWaterSiteOnSeason(site);
    if (isOnSeason) {
      isOffSeason = false;
      const siteResult = getBathingWaterSiteValueDerivedFromTestResult(
        site.result_value,
      );
      if (siteResult > worstSiteGrading) {
        worstSiteGrading = siteResult;
      }
    }
  }
  if (isOffSeason) {
    return {
      value: BathingWaterNumberValueEnum.OFF_SEASON,
      status: BathingWaterStatusEnum.OFF_SEASON,
    };
  }
  return {
    value: worstSiteGrading,
    status: getBathingWaterStatus(worstSiteGrading),
  };
}

function getBathingWaterLatestResultDate(
  bathingWaterSites: Array<BathingWater>,
): string {
  let latestResultDate = '';
  for (const site of bathingWaterSites) {
    const resultDate = dayjs(site.result_date).utc().format('YYYY-MM-DD');
    if (!resultDate) continue;
    if (resultDate > latestResultDate) {
      latestResultDate = resultDate;
    }
  }
  return latestResultDate;
}

function buildBathingWaterUrl(bathingWater: BathingWater): string {
  const consultSiteUrl = new URL(
    'https://baignades.sante.gouv.fr/baignades/consultSite.do',
  );
  const consultSiteQuery: any = {
    dptddass: bathingWater.dptddass,
    site: bathingWater.id_site,
    annee: dayjs().year(),
    // plv: 'all', // CAREFUL: for 2023 it works, but for 2024 it doesn't
  };
  Object.keys(consultSiteQuery).forEach((key) => {
    consultSiteUrl.searchParams.append(key, consultSiteQuery[key]);
  });
  // example of consultSiteUrl: https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=013&site=013000808&annee=2023
  return consultSiteUrl.toString();
}

function getBathingWaterDotColor(
  code_indice_atmo: BathingWaterStatusEnum,
): NotificationDotColor | null {
  switch (code_indice_atmo) {
    case BathingWaterStatusEnum.GOOD:
      return NotificationDotColor.GOOD;
    case BathingWaterStatusEnum.AVERAGE:
      return NotificationDotColor.FAIR;
    case BathingWaterStatusEnum.POOR:
      return NotificationDotColor.POOR;
    case BathingWaterStatusEnum.PROHIBITION:
      return NotificationDotColor.EXTREMELY_POOR;
    case BathingWaterStatusEnum.UNRANKED_SITE:
    case BathingWaterStatusEnum.OFF_SEASON:
    case BathingWaterStatusEnum.NO_DATA:
    default:
      return null;
  }
}

export {
  getIdCarteForDepartment,
  updateMunicipalitiesWithBathingWaterSites,
  getBathingWaterSummaryValue,
  getBathingWaterSiteValueDerivedFromBathingWaterRow,
  getBathingWaterLatestResultDate,
  buildBathingWaterUrl,
  getBathingWaterDotColor,
};
