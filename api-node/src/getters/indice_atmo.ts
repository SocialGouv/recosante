import { type CustomError } from '~/types/error';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceAtmoStatus } from '~/utils/indice_atmo';
import type { Indicator } from '~/types/api/indicator';
import type { MunicipalityJSON } from '~/types/municipality';
import { DataAvailabilityEnum, IndicatorsSlugEnum } from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
dayjs.extend(utc);

async function getIndiceAtmoFromMunicipalityAndDate({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: MunicipalityJSON['COM'];
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

  const indice_atmo_j0 = await prisma.indiceAtmospheric.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        gte: dayjs(date_UTC_ISO).startOf('day').utc().toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  if (indice_atmo_j0?.code_qual == null) {
    capture('No indice_atmo_j0 found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
    });
    return null;
  }

  const indice_atmo_j1 = await prisma.indiceAtmospheric.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        gte: dayjs(date_UTC_ISO)
          .add(1, 'day')
          .startOf('day')
          .utc()
          .toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  const indiceAtmoIndicator: Indicator = {
    slug: IndicatorsSlugEnum.indice_atmospheric,
    name: indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].name,
    short_name:
      indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].short_name,
    municipality_insee_code,
    about_title: 'à propos de la qualité de l’air et l’indice ATMO',
    about_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl.',
    j0: {
      id: indice_atmo_j0.id,
      summary: {
        value: indice_atmo_j0.code_qual,
        status: getIndiceAtmoStatus(indice_atmo_j0.code_qual),
        recommendations: [
          "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
          "La recommandation 2 tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
        ],
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
          name: 'PM25',
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
    indiceAtmoIndicator.j1 = {
      id: indice_atmo_j1.id,
      summary: {
        value: indice_atmo_j1.code_qual,
        status: getIndiceAtmoStatus(indice_atmo_j1.code_qual),
        recommendations: [
          "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
        ],
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

export { getIndiceAtmoFromMunicipalityAndDate };
