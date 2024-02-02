import {
  BathgWaterIdCarteEnum,
  BathingWaterCurrentYearGradingEnum,
  BathingWaterResultEnum,
  type Municipality,
} from '@prisma/client';
import type { ScrapingResult } from '~/types/api/bathing_water';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';

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

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[BATHING_WATER_SITES] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}
async function updateMunicipalitiesWithBathingWaterSites() {
  try {
    now = Date.now();
    logStep('Update municipalities with bathing water sites');

    const prevMunicipalities = await prisma.municipality.findMany({
      where: {
        has_bathing_water_sites: true,
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
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      const { sites } = await fetch(url.toString()).then((res) => res.json());
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
            has_bathing_water_sites: sites.length > 0,
          },
        });
      }
    }

    const nextMunicipalities = await prisma.municipality.findMany({
      where: {
        has_bathing_water_sites: true,
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

async function scrapeHtmlBaignadesSitePage(
  consultSiteUrl: string,
): Promise<ScrapingResult | null> {
  console.log({ consultSiteUrl });
  // const htmlSitePage = await fetch(consultSiteUrl.toString()).then(
  //   (res) => res.text(),
  // );
  // TODO: Charles, tu peux faire le parsing ici ?
  // example 2024: https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=013&site=013000808&annee=2024
  // example 2023: https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=013&site=013000808&annee=2023&plv=all
  // const dom = HTMLParser.parse(htmlSitePage);
  // console.log(dom);
  return {
    result_date: '2023-08-23',
    result_value: BathingWaterResultEnum.GOOD,
    swimming_season_start: '2023-06-01',
    swimming_season_end: '2023-10-01',
    current_year_grading: BathingWaterCurrentYearGradingEnum.EXCELLENT,
  };
}

export {
  getIdCarteForDepartment,
  updateMunicipalitiesWithBathingWaterSites,
  scrapeHtmlBaignadesSitePage,
};
