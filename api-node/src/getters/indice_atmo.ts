import { type CustomError } from '~/types/error';
import fs from 'fs';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceAtmoStatus } from '~/utils/indice_atmo';
import type { Indicator } from '~/types/api/indicator';
import {
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type Municipality,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
dayjs.extend(utc);

const about_description = fs.readFileSync(
  './data/about/indice_atmo.md',
  'utf8',
);

async function getIndiceAtmoFromMunicipalityAndDate({
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
      `Invalid request in getIndiceAtmoFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const indice_atmo_j0 = await getIndiceAtmoForJ0({
    municipality_insee_code,
    date_UTC_ISO,
  });

  if (indice_atmo_j0?.code_qual == null) {
    if (
      !knownMissingMunicipalitiesForIndiceAtmo.includes(municipality_insee_code)
    ) {
      capture('[INDICE ATMO] New insee code with unavailable data', {
        extra: {
          municipality_insee_code,
          date_UTC_ISO,
        },
        tags: {
          municipality_insee_code,
        },
      });
    }
    const indiceAtmoEmpty: Indicator = {
      slug: IndicatorsSlugEnum.indice_atmospheric,
      name: indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].name,
      long_name:
        indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].long_name,
      short_name:
        indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].short_name,
      municipality_insee_code,
      about_title: 'à propos de la qualité de l’air et l’indice ATMO',
      about_description,
      j0: {
        id: 'empty',
        summary: {
          value: null,
          status: getIndiceAtmoStatus(null),
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
          status: getIndiceAtmoStatus(null),
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
    return indiceAtmoEmpty;
  }

  const indice_atmo_j1 = await getIndiceAtmoForJ1({
    municipality_insee_code,
    date_UTC_ISO,
  });

  const recommandationsJ0 = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.indice_atmospheric,
        indicator_value: indice_atmo_j0.code_qual,
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

  const indiceAtmoIndicator: Indicator = {
    slug: IndicatorsSlugEnum.indice_atmospheric,
    name: indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].name,
    long_name:
      indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].long_name,
    short_name:
      indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].short_name,
    municipality_insee_code,
    about_title: 'à propos de la qualité de l’air et l’indice ATMO',
    about_description,
    j0: {
      id: indice_atmo_j0.id,
      summary: {
        value: indice_atmo_j0.code_qual,
        status: getIndiceAtmoStatus(indice_atmo_j0.code_qual),
        recommendations: recommandationsJ0,
      },
      validity_start: indice_atmo_j0.validity_start.toISOString(),
      validity_end: indice_atmo_j0.validity_end.toISOString(),
      diffusion_date: indice_atmo_j0.diffusion_date.toISOString(),
      created_at: indice_atmo_j0.created_at.toISOString(),
      updated_at: indice_atmo_j0.updated_at.toISOString(),
      values: [
        {
          slug: 'code_no2',
          name: 'NO2',
          value: indice_atmo_j0.code_no2 ?? 0,
        },
        {
          slug: 'code_o3',
          name: 'O3',
          value: indice_atmo_j0.code_o3 ?? 0,
        },
        {
          slug: 'code_pm10',
          name: 'PM10',
          value: indice_atmo_j0.code_pm10 ?? 0,
        },
        {
          slug: 'code_pm25',
          name: 'PM2,5',
          value: indice_atmo_j0.code_pm25 ?? 0,
        },
        {
          slug: 'code_so2',
          name: 'SO2',
          value: indice_atmo_j0.code_so2 ?? 0,
        },
      ],
    },
  };

  if (!!indice_atmo_j1 && indice_atmo_j1?.code_qual !== null) {
    const recommandationsJ1 = await prisma.recommandation
      .findMany({
        where: {
          indicator: IndicatorsSlugEnum.indice_atmospheric,
          indicator_value: indice_atmo_j1.code_qual,
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

    indiceAtmoIndicator.j1 = {
      id: indice_atmo_j1.id,
      summary: {
        value: indice_atmo_j1.code_qual,
        status: getIndiceAtmoStatus(indice_atmo_j1.code_qual),
        recommendations: recommandationsJ1,
      },
      validity_start: indice_atmo_j1.validity_start.toISOString(),
      validity_end: indice_atmo_j1.validity_end.toISOString(),
      diffusion_date: indice_atmo_j1.diffusion_date.toISOString(),
      created_at: indice_atmo_j1.created_at.toISOString(),
      updated_at: indice_atmo_j1.updated_at.toISOString(),
      values: [
        {
          slug: 'code_no2',
          name: 'NO2',
          value: indice_atmo_j1.code_no2 ?? 0,
        },
        {
          slug: 'code_o3',
          name: 'O3',
          value: indice_atmo_j1.code_o3 ?? 0,
        },
        {
          slug: 'code_pm10',
          name: 'PM10',
          value: indice_atmo_j1.code_pm10 ?? 0,
        },
        {
          slug: 'code_pm25',
          name: 'PM25',
          value: indice_atmo_j1.code_pm25 ?? 0,
        },
        {
          slug: 'code_so2',
          name: 'SO2',
          value: indice_atmo_j1.code_so2 ?? 0,
        },
      ],
    };
  }
  return indiceAtmoIndicator;
}

async function getIndiceAtmoForJ0({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const indice_atmo_j0 = await prisma.indiceAtmospheric.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (indice_atmo_j0) return indice_atmo_j0;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (
    municipality?.COMPARENT &&
    municipality.COMPARENT !== municipality_insee_code
  ) {
    return await getIndiceAtmoForJ0({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

async function getIndiceAtmoForJ1({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const indice_atmo_j1 = await prisma.indiceAtmospheric.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().add(1, 'day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (indice_atmo_j1) return indice_atmo_j1;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (
    municipality?.COMPARENT &&
    municipality?.COMPARENT !== municipality_insee_code
  ) {
    return await getIndiceAtmoForJ1({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

const knownMissingMunicipalitiesForIndiceAtmo: Array<Municipality['COM']> = [
  '08316',
  '08248',
  '02245',
  '02659',
  '02722',
  '69152',
  '02484',
  '97416',
  '08228',
  '02389',
  '02312',
  '02168',
  '02072',
  '97407',
  '02239',
  '97411',
  '02543',
  '02358',
  '02061',
  '97615',
  '08163',
  '02824',
  '02738',
  '02487',
  '02372',
  '02238',
  '02183',
  '98818',
  '97415',
  '97311',
  '08105',
  '02610',
  '02465',
  '02340',
  '02180',
  '02173',
  '02097',
];

export {
  getIndiceAtmoFromMunicipalityAndDate,
  getIndiceAtmoForJ0,
  getIndiceAtmoForJ1,
  knownMissingMunicipalitiesForIndiceAtmo,
};
