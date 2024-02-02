import { type CustomError } from '~/types/error';
import fs from 'fs';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import type { Indicator, IndicatorByPeriod } from '~/types/api/indicator';
import {
  IndicatorsSlugEnum,
  BathingWater,
  type Municipality,
  BathingWaterCurrentYearGradingEnum,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {
  buildBathingWaterUrl,
  getBathingWaterLatestResultDate,
  getBathingWaterStatusFromBathingWaterValue,
  getBathingWaterValueFromTestResult,
  getBathingWaterWorstValue,
} from '~/utils/bathing_water';
dayjs.extend(quarterOfYear);
dayjs.extend(utc);

async function getBathingWaterFromMunicipalityAndDate({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string;
}) {
  try {
    z.object({
      municipality_insee_code: z.string().length(5),
      date_UTC_ISO: z.string().length(24),
      // matomo_id: z.string().length(16), // at least for auth
    }).parse({
      municipality_insee_code,
      date_UTC_ISO,
    });
  } catch (zodError) {
    const error = new Error(
      `Invalid request in getBathingWaterFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const bathingWaters = await getBathingWaters({
    municipality_insee_code,
    date_UTC_ISO,
  });

  console.log({ bathingWaters });

  if (!bathingWaters.length) {
    return null;
  }

  const indicator_value = getBathingWaterWorstValue(bathingWaters);

  const recommandations = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.bathing_water,
        indicator_value: indicator_value,
      },
      select: {
        recommandation_content: true,
      },
      take: 2,
    })
    .then((recommandations) =>
      recommandations.map(
        (recommandation) => recommandation.recommandation_content,
      ),
    );

  const about_description = fs.readFileSync(
    './data/about/baignades.md',
    'utf8',
  );

  const bathingWaterIndicatorJ0AndJ1: IndicatorByPeriod = {
    id: 'no id',
    summary: {
      value: indicator_value,
      status: getBathingWaterStatusFromBathingWaterValue(indicator_value),
      recommendations: recommandations,
    },
    values: bathingWaters.map((bathingWater) => ({
      slug: bathingWater.id_site as string, // TODO
      name: bathingWater.name as string, // TODO
      value: getBathingWaterValueFromTestResult(
        bathingWater.current_year_grading ??
          BathingWaterCurrentYearGradingEnum.UNRANKED_SITE,
      ),
      link: buildBathingWaterUrl(bathingWater),
    })),
    diffusion_date: getBathingWaterLatestResultDate(bathingWaters),
    validity_start: 'N/A',
    validity_end: 'N/A',
    created_at: 'N/A',
    updated_at: 'N/A',
  };

  const bathingWaterIndicator: Indicator = {
    slug: IndicatorsSlugEnum.bathing_water,
    name: indicatorsObject[IndicatorsSlugEnum.bathing_water].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.bathing_water].short_name,
    long_name: indicatorsObject[IndicatorsSlugEnum.bathing_water].long_name,
    municipality_insee_code: municipality_insee_code,
    about_title: "à propos de l'indice UV",
    about_description,
    j0: bathingWaterIndicatorJ0AndJ1,
    j1: bathingWaterIndicatorJ0AndJ1,
  };

  console.log({ bathingWaterIndicator });
  return bathingWaterIndicator;
}

async function getBathingWaters({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}): Promise<Array<BathingWater>> {
  console.log({
    municipality_insee_code,
    date_UTC_ISO,
  });

  /*

const inseeCode = '<your_insee_code>'; // replace with desired insee code
const sqlQuery = `
  SELECT
    bw1.*
  FROM
    BathingWater bw1
  LEFT JOIN
    BathingWater bw2
  ON
    (bw1.id_site = bw2.id_site AND bw1.diffusion_date < bw2.diffusion_date)
  WHERE
    bw1.municipality_insee_code = $1
  AND
    bw2.id_site IS NULL;
`;

const result = await prisma.$queryRaw(sqlQuery, inseeCode);


*/

  /*

SELECT
    bw.*
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER(PARTITION BY id_site ORDER BY diffusion_date DESC) as row_number
    FROM
        BathingWater
    WHERE
        municipality_insee_code = $1
) bw
WHERE
    bw.row_number = 1


*/
  return await prisma.bathingWater.findMany();
}

export { getBathingWaterFromMunicipalityAndDate, getBathingWaters };
