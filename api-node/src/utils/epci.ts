import type { Municipality } from '@prisma/client';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';

export async function grabEPCIsWithINSEEMunicipalityCodes(): Promise<
  Record<Exclude<Municipality['EPCI'], null>, Array<Municipality['COM']>>
> {
  const epcisRows: Array<{
    EPCI: Exclude<Municipality['EPCI'], null>;
    COM: Array<Municipality['COM']>;
  }> = await prisma.$queryRaw`
  SELECT "EPCI", array_agg("COM") as "COM"
  FROM "Municipality"
  WHERE "EPCI" IS NOT NULL
  GROUP BY "EPCI";
      `;

  const municipalitiesINSEECodeByEPCIObject: Record<
    Exclude<Municipality['EPCI'], null>,
    Array<Municipality['COM']>
  > = {};

  for (const row of epcisRows) {
    municipalitiesINSEECodeByEPCIObject[row.EPCI] = row.COM;
  }

  // if no 200070233, capture to sentry for debug
  if (!municipalitiesINSEECodeByEPCIObject['200070233']) {
    capture('No 200070233 in municipalitiesINSEECodeByEPCIObject', {
      extra: { municipalitiesINSEECodeByEPCIObject },
    });
  }

  return municipalitiesINSEECodeByEPCIObject;
}
