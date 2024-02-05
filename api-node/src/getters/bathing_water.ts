import { type CustomError } from '~/types/error';
import fs from 'fs';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import type { Indicator, IndicatorByPeriod } from '~/types/api/indicator';
import {
  IndicatorsSlugEnum,
  type BathingWater,
  type Municipality,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {
  buildBathingWaterUrl,
  getBathingWaterLatestResultDate,
  getBathingWaterSiteValueDerivedFromBathingWaterRow,
  getBathingWaterSummaryValue,
} from '~/utils/bathing_water/bathing_water';
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

  if (!bathingWaters.length) {
    return null;
  }

  const { value, status } = getBathingWaterSummaryValue(bathingWaters);

  const recommandations = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.bathing_water,
        indicator_value: value,
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
      value,
      status,
      recommendations: recommandations,
    },
    values: bathingWaters.map((bathingWater) => ({
      slug: bathingWater.id_site ?? '',
      name: bathingWater.name ?? '',
      value: getBathingWaterSiteValueDerivedFromBathingWaterRow(bathingWater),
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
    municipality_insee_code,
    about_title: "à propos de l'indice UV",
    about_description,
    j0: bathingWaterIndicatorJ0AndJ1,
    j1: bathingWaterIndicatorJ0AndJ1,
  };

  return bathingWaterIndicator;
}

async function getBathingWaters({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string;
}): Promise<Array<BathingWater>> {
  const result = await prisma.$queryRaw`
  SELECT bw.*
  FROM (
    SELECT
        *,
        ROW_NUMBER() OVER(PARTITION BY id_site ORDER BY diffusion_date DESC) as row_number
    FROM
        "BathingWater"
    WHERE
        municipality_insee_code = ${municipality_insee_code}
  ) bw
  WHERE
    bw.row_number = 1`;
  return result as Array<BathingWater>;
}

export { getBathingWaterFromMunicipalityAndDate, getBathingWaters };
