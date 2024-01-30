import dayjs from 'dayjs';
// import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
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

export async function getBathingWaterIndicator() {
  try {
    // Step 1: Fetch data
    now = Date.now();
    logStep('Getting Bathing Waters');

    // Step 5: grab the municipalities list
    // const municipalities = await prisma.municipality.findMany({
    //   where: {
    //     has_bathing_water_sites: true,
    //   },
    // });

    // for (const [index, municipality] of Object.entries(municipalities)) {
    // }

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
