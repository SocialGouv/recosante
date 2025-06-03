import { type CustomError } from '~/types/error';
import fs from 'node:fs';
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
import { BathingWaterStatusEnum, BathingWaterNumberValueEnum } from '~/types/api/bathing_water';
dayjs.extend(quarterOfYear);
dayjs.extend(utc);

const about_description = fs.readFileSync('./data/about/baignades.md', 'utf8');

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
    const municipality = await prisma.municipality.findUnique({
      where: { COM: municipality_insee_code },
    });
    if (!municipality?.bathing_water_sites) {
      return null;
    }
    const bathingWaterEmpty: Indicator = {
      slug: IndicatorsSlugEnum.bathing_water,
      name: indicatorsObject[IndicatorsSlugEnum.bathing_water].name,
      short_name: indicatorsObject[IndicatorsSlugEnum.bathing_water].short_name,
      long_name: indicatorsObject[IndicatorsSlugEnum.bathing_water].long_name,
      municipality_insee_code,
      about_title: 'à propos de la qualité de l\'eau de baignade',
      about_description,
      j0: {
        id: 'empty',
        summary: {
          value: null,
          status: BathingWaterStatusEnum.NO_DATA,
          recommendations: [
            'Aucune donnée disponible pour cet indicateur dans cette zone aujourd\'hui',
          ],
        },
        help_text:
          'La saison de la collecte des données des eaux de baignades n\'a pas encore commencée.',
        validity_start: 'NA',
        validity_end: 'NA',
        diffusion_date: dayjs().toISOString(),
        created_at: 'NA',
        updated_at: 'NA',
      },
      j1: {
        id: 'empty',
        summary: {
          value: null,
          status: BathingWaterStatusEnum.NO_DATA,
          recommendations: [
            'Aucune donnée disponible pour cet indicateur dans cette zone demain',
          ],
        },
        help_text:
          'La saison de la collecte des données des eaux de baignades n\'a pas encore commencée.',
        validity_start: 'NA',
        validity_end: 'NA',
        diffusion_date: dayjs().toISOString(),
        created_at: 'NA',
        updated_at: 'NA',
      },
    };
    return bathingWaterEmpty;
  }

  const validBathingWaters = bathingWaters.filter(site => {
    const siteValue = getBathingWaterSiteValueDerivedFromBathingWaterRow(site);
    return ![
      BathingWaterNumberValueEnum.OFF_SEASON,
      BathingWaterNumberValueEnum.UNRANKED_SITE,
      BathingWaterNumberValueEnum.PROHIBITION
    ].includes(siteValue);
  });


  const { value: validValue, status: validStatus } = getBathingWaterSummaryValue(
    validBathingWaters.length > 0 ? validBathingWaters : bathingWaters
  );

  const { value: worstValue, status: worstStatus } = getBathingWaterSummaryValue(bathingWaters);


  const shouldCombineRecommendations = worstValue !== validValue && 
    [BathingWaterNumberValueEnum.OFF_SEASON,
     BathingWaterNumberValueEnum.UNRANKED_SITE,
     BathingWaterNumberValueEnum.PROHIBITION].includes(worstValue);

  const worstRecommandations = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.bathing_water,
        indicator_value: worstValue,
      },
      select: {
        recommandation_content: true,
      },
      take: 1,
    })
    .then((recommandations: Array<{ recommandation_content: string }>) =>
      recommandations.map(
        (recommandation) => recommandation.recommandation_content,
      ),
    );

  const validRecommandations = shouldCombineRecommendations ? 
    await prisma.recommandation
      .findMany({
        where: {
          indicator: IndicatorsSlugEnum.bathing_water,
          indicator_value: validValue,
        },
        select: {
          recommandation_content: true,
        },
        take: 1,
      })
      .then((recommandations: Array<{ recommandation_content: string }>) =>
        recommandations.map(
          (recommandation) => recommandation.recommandation_content,
        ),
      )
    : [];

  const recommandations = shouldCombineRecommendations ? 
    [...worstRecommandations, ...validRecommandations] :
    worstRecommandations;

  const bathingWaterIndicatorJ0AndJ1: IndicatorByPeriod = {
    id: 'no id',
    summary: {
      value: worstValue,
      status: worstStatus,
      recommendations: recommandations,
    },
    values: bathingWaters.map((bathingWater) => ({
      slug: bathingWater.id_site ?? '',
      name: bathingWater.name ?? '',
      value: getBathingWaterSiteValueDerivedFromBathingWaterRow(bathingWater),
      link: buildBathingWaterUrl(bathingWater),
    })),
    help_text:
      'La saison de la collecte des données des eaux de baignades n\'a pas encore commencée.',
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
    about_title: 'à propos de la qualité de l\'eau de baignade',
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
  const result: Array<BathingWater> = await prisma.$queryRaw`
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
  if (result?.length) return result;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (
    municipality?.COMPARENT &&
    municipality.COMPARENT !== municipality_insee_code
  ) {
    return await getBathingWaters({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return [];
}

export { getBathingWaterFromMunicipalityAndDate, getBathingWaters };
