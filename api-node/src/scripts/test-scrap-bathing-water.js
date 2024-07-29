import { getBathingWaterIndicator } from '~/aggregators/bathing_water';
import { scrapeHtmlBaignadesSitePage } from '~/utils/bathing_water/scrapping';

const url =
  'https://baignades.sante.gouv.fr/baignades/consultSite.do?dptddass=076&site=076002097&annee=2024';

(async () => {
  const result = await getBathingWaterIndicator(url);
  console.log(result);
})();
