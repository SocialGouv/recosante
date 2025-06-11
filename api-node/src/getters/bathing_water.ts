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

const EXCLUDED_BATHING_VALUES = [
  BathingWaterNumberValueEnum.OFF_SEASON,
  BathingWaterNumberValueEnum.UNRANKED_SITE,
  BathingWaterNumberValueEnum.PROHIBITION
] as const;

type ExcludedBathingValue = typeof EXCLUDED_BATHING_VALUES[number];

function isValidBathingWater(site: BathingWater): boolean {
  const siteValue = getBathingWaterSiteValueDerivedFromBathingWaterRow(site);
  return !EXCLUDED_BATHING_VALUES.includes(siteValue as ExcludedBathingValue);
}

async function getRecommendationsForValue(value: BathingWaterNumberValueEnum): Promise<string[]> {
  return await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.bathing_water,
        indicator_value: value,
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
}

function buildBathingWaterValues(bathingWaters: BathingWater[]): Array<{
  slug: string;
  name: string;
  value: BathingWaterNumberValueEnum;
  link: string;
}> {
  return bathingWaters.map((bathingWater) => ({
    slug: bathingWater.id_site ?? '',
    name: bathingWater.name ?? '',
    value: getBathingWaterSiteValueDerivedFromBathingWaterRow(bathingWater),
    link: buildBathingWaterUrl(bathingWater),
  }));
}

async function buildBathingWaterSummary(bathingWaters: BathingWater[]): Promise<{
  value: BathingWaterNumberValueEnum;
  status: BathingWaterStatusEnum;
  recommendations: string[];
}> {
  // Filtrer les sites valides
  const validBathingWaters = bathingWaters.filter(isValidBathingWater);

  // Calculer les valeurs pour tous les sites et les sites valides
  const { value: worstValue, status: worstStatus } = getBathingWaterSummaryValue(validBathingWaters);
  const { value: totalValue } = getBathingWaterSummaryValue(bathingWaters);

  // Déterminer si on doit combiner les recommandations
  const shouldCombineRecommendations = EXCLUDED_BATHING_VALUES.includes(totalValue as ExcludedBathingValue);

  // Récupérer les recommandations
  const totalRecommendations = await getRecommendationsForValue(totalValue);
  const validRecommendations = shouldCombineRecommendations 
    ? await getRecommendationsForValue(worstValue)
    : [];

  return {
    value: worstValue,
    status: worstStatus,
    recommendations: shouldCombineRecommendations 
      ? [...totalRecommendations, ...validRecommendations]
      : totalRecommendations,
  };
}

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
    return buildEmptyBathingWaterIndicator(municipality_insee_code);
  }

  const summary = await buildBathingWaterSummary(bathingWaters);
  const values = buildBathingWaterValues(bathingWaters);

  const bathingWaterIndicatorJ0AndJ1: IndicatorByPeriod = {
    id: 'no id',
    summary,
    values,
    help_text:
      'La saison de la collecte des données des eaux de baignades n\'a pas encore commencée.',
    diffusion_date: getBathingWaterLatestResultDate(bathingWaters),
    validity_start: 'N/A',
    validity_end: 'N/A',
    created_at: 'N/A',
    updated_at: 'N/A',
  };

  return {
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
}

function buildEmptyBathingWaterIndicator(municipality_insee_code: string): Indicator {
  return {
    slug: IndicatorsSlugEnum.bathing_water,
    name: indicatorsObject[IndicatorsSlugEnum.bathing_water].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.bathing_water].short_name,
    long_name: indicatorsObject[IndicatorsSlugEnum.bathing_water].long_name,
    municipality_insee_code,
    about_title: 'à propos de la qualité de l\'eau de baignade',
    about_description,
    j0: buildEmptyBathingWaterPeriod(),
    j1: buildEmptyBathingWaterPeriod(),
  };
}

function buildEmptyBathingWaterPeriod(): IndicatorByPeriod {
  return {
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
  };
}

async function getLatestBathingWaterDataForMunicipality(
  municipality_insee_code: Municipality['COM']
): Promise<Array<BathingWater>> {
  return await prisma.$queryRaw`
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
}

async function getParentMunicipality(
  municipality_insee_code: Municipality['COM']
): Promise<Municipality | null> {
  return await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
}

async function getBathingWaters({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string;
}): Promise<Array<BathingWater>> {
  // Récupération des données de baignade pour la municipalité
  const result = await getLatestBathingWaterDataForMunicipality(municipality_insee_code);
  if (result?.length) return result;

  // Si pas de données, on vérifie la municipalité parente
  const municipality = await getParentMunicipality(municipality_insee_code);
  
  // Si une municipalité parente existe et est différente, on relance la recherche
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
