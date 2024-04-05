import { type CustomError } from '~/types/error';
import fs from 'fs';
import { z } from 'zod';
import dayjs from 'dayjs';
import type { Indicator, IndicatorByPeriod } from '~/types/api/indicator';
import type { ExtendedShortPrelevementResult } from '~/types/api/drinking_water';
import {
  IndicatorsSlugEnum,
  type Prisma,
  type Municipality,
  type User,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {
  ConformityStatusEnum,
  ConformityEnum,
} from '~/types/api/drinking_water';
import { fetchDrinkingWaterDataCascade } from '~/aggregators/drinking_water';
import {
  checkPrelevementConformityChemical,
  checkPrelevementConformityBacteriological,
  checkPrelevementConformity,
} from '~/utils/drinking_water';
dayjs.extend(quarterOfYear);
dayjs.extend(utc);

const about_description = fs.readFileSync(
  './data/about/drinking_water.md',
  'utf8',
);

async function getDrinkingWaterFromUdi({
  udi,
  municipality_insee_code, // we keep this municipality_insee_code for now to not break all the types around in the Indicator response
  date_UTC_ISO,
}: {
  udi: User['udi'];
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string;
}) {
  if (!udi) return null;

  try {
    z.object({
      udi: z.string(),
      date_UTC_ISO: z.string().length(24),
      // matomo_id: z.string().length(16), // at least for auth
    }).parse({
      udi,
      date_UTC_ISO,
    });
  } catch (zodError) {
    const error = new Error(
      `Invalid request in getDrinkingWaterFromUdi ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const drinkingWaterResult = await fetchDrinkingWaterDataCascade(udi);
  const drinkingWater = drinkingWaterResult.data;

  if (drinkingWaterResult.missingData || !drinkingWater) {
    return getDrinkingWaterEmpty(municipality_insee_code);
  }
  const lastPrelevementConformity = checkPrelevementConformity(drinkingWater);

  if (lastPrelevementConformity === ConformityEnum.NOT_TESTED) {
    return getDrinkingWaterEmpty(municipality_insee_code);
  }

  const drinkingWaterIndicatorJ0AndJ1: IndicatorByPeriod = {
    id: drinkingWater.id,
    summary: {
      value: {
        chemical: checkPrelevementConformityChemical(drinkingWater),
        bacteriological:
          checkPrelevementConformityBacteriological(drinkingWater),
      },
      status: lastPrelevementConformity,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      recommendations: [drinkingWater.conclusion_conformite_prelevement!],
    },
    values: ((drinkingWater.all_tests_results ?? []) as Prisma.JsonArray)
      ?.filter((_, index) => index < 10)
      .map((jsonValue) => {
        const test_result =
          jsonValue as unknown as ExtendedShortPrelevementResult;
        return {
          slug: test_result.code_prelevement,
          name: `Test du ${dayjs(test_result.date_prelevement).format(
            'DD MMM YYYY',
          )}`,
          value: {
            chemical: checkPrelevementConformityChemical(test_result),
            bacteriological:
              checkPrelevementConformityBacteriological(test_result),
          },
          link: `https://recosante-api-node.fabrique.social.gouv.fr/hubeau-prelevement?code_prelevement=${test_result.code_prelevement}`,
          drinkingWater: {
            parameters_count: test_result.parameters_count,
            prelevement_code: test_result.code_prelevement,
            prelevement_date: test_result.date_prelevement,
          },
        };
      }),
    diffusion_date: dayjs(drinkingWater.diffusion_date).format('YYYY-MM-DD'),
    validity_start: dayjs(drinkingWater.diffusion_date).format('YYYY-MM-DD'),
    validity_end: 'N/A',
    created_at: dayjs(drinkingWater.diffusion_date).format('YYYY-MM-DD'),
    updated_at: dayjs(drinkingWater.diffusion_date).format('YYYY-MM-DD'),
  };

  const drinkingWaterIndicator: Indicator = {
    slug: IndicatorsSlugEnum.drinking_water,
    name: indicatorsObject[IndicatorsSlugEnum.drinking_water].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.drinking_water].short_name,
    long_name: indicatorsObject[IndicatorsSlugEnum.drinking_water].long_name,
    municipality_insee_code,
    about_title: 'à propos de la qualité de l’eau du robinet',
    about_description,
    j0: drinkingWaterIndicatorJ0AndJ1,
    j1: drinkingWaterIndicatorJ0AndJ1,
  };

  return drinkingWaterIndicator;
}

function getDrinkingWaterEmpty(municipality_insee_code: Municipality['COM']) {
  const drinkingWaterEmpty: Indicator = {
    slug: IndicatorsSlugEnum.drinking_water,
    name: indicatorsObject[IndicatorsSlugEnum.drinking_water].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.drinking_water].short_name,
    long_name: indicatorsObject[IndicatorsSlugEnum.drinking_water].long_name,
    about_title: 'à propos de la qualité de l’eau du robinet',
    municipality_insee_code, // we keep this municipality_insee_code for now to not break alkl the types around
    about_description,
    j0: {
      id: 'empty',
      summary: {
        value: null,
        status: ConformityStatusEnum.NOT_TESTED,
        recommendations: [
          "Aucune donnée disponible pour cet indicateur dans cette zone aujourd'hui",
        ],
      },
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
        status: ConformityStatusEnum.NOT_TESTED,
        recommendations: [
          'Aucune donnée disponible pour cet indicateur dans cette zone demain',
        ],
      },
      validity_start: 'NA',
      validity_end: 'NA',
      diffusion_date: dayjs().toISOString(),
      created_at: 'NA',
      updated_at: 'NA',
    },
  };
  return drinkingWaterEmpty;
}

export { getDrinkingWaterFromUdi };
