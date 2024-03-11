import type { Municipality } from '@prisma/client';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import fs from 'fs';

export async function grabEPCIsWithINSEEMunicipalityCodes(): Promise<
  Record<Exclude<Municipality['EPCI'], null>, Array<Municipality['COM']>>
> {
  /*

  I don't know why but sometimes the query below doesn't work

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
   */

  /*

  I don't know why but sometimes the query above doesn't work
  cf RECOSANTE-API-NODE-1G
  https://sentry.fabrique.social.gouv.fr/share/issue/06a7636be775414e88b12fe2d7fec7c3/

  so I wrote a backup file to make sure we have the data
  and we'll use this data instead of the query result

  fs.writeFileSync(
    './data/municipalitiesINSEECodeByEPCIObject.json',
    JSON.stringify(municipalitiesINSEECodeByEPCIObject),
  );
   */

  const municipalitiesINSEECodeByEPCIObject: Record<
    Exclude<Municipality['EPCI'], null>,
    Array<Municipality['COM']>
  > = JSON.parse(
    fs.readFileSync('./data/municipalitiesINSEECodeByEPCIObject.json', 'utf8'),
  );

  return municipalitiesINSEECodeByEPCIObject;
}
