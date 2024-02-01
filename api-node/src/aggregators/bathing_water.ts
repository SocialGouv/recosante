import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import HTMLParser from 'node-html-parser';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { getIdCarteForDepartment } from '~/utils/bathing_water';
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

const sitesListUrl = new URL(
  'https://baignades.sante.gouv.fr/baignades/siteList.do',
);

const consultSiteUrl = new URL(
  'https://baignades.sante.gouv.fr/baignades/consultSite.do',
);

export async function getBathingWaterIndicator() {
  try {
    // Step 1: Fetch data
    now = Date.now();
    logStep('Getting Bathing Waters');

    // Step 5: grab the municipalities list
    const municipalities = await prisma.municipality.findMany({
      where: {
        has_bathing_water_sites: true,
      },
    });

    for await (const [index, municipality] of Object.entries(municipalities)) {
      console.log(index, municipality.COM, municipality.DEP);
      const dptddass = municipality.DEP.padStart(3, '0');
      const idCarte = getIdCarteForDepartment(municipality.DEP);

      const sitesListQuery: any = {
        idCarte,
        insee_com: municipality.COM,
        code_dept: municipality.DEP,
        f: 'json',
      };
      Object.keys(sitesListQuery).forEach((key) => {
        sitesListUrl.searchParams.append(key, sitesListQuery[key]);
      });
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      const sites: Array<Site> = await fetch(sitesListUrl.toString())
        .then((res) => res.json())
        .then((res) => res.sites);
      console.log(JSON.stringify(sites, null, 2));
      for (const site of sites) {
        const idSite = `${dptddass}${site.isite}`;
        const year = dayjs().year();
        const consultSiteQuery: any = {
          dptddass,
          site: idSite,
          annee: year,
          plv: 'all',
        };
        Object.keys(consultSiteQuery).forEach((key) => {
          consultSiteUrl.searchParams.append(key, consultSiteQuery[key]);
        });
        // example of consultSiteUrl: https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=013&site=013000808&annee=2023&plv=all
        const htmlSitePage = await fetch(consultSiteUrl.toString()).then(
          (res) => res.text(),
        );
        const dom = HTMLParser.parse(htmlSitePage);
        // TODO: Charles, tu peux faire le parsing ici ?
        console.log(dom);
      }
      return;
    }

    // logStep('finito asticot');

    // logStep(
    //   `DONE INSERTING POLLENS: ${result.count} rows inserted upon ${municipalities.length} municipalities`,
    // );
    // logStep(
    //   `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    // );
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getBathingWaterIndicator' } });
  }
}
