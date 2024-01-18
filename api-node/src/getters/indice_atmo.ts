import fs from 'fs';
import { type CustomError } from '~/types/error';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceAtmoLabel, getIndiceAtmoColor } from '~/utils/indice_atmo';
import type { IndiceAtmoAPIData } from '~/types/api/indice_atmo';
import type { MunicipalityJSON } from '~/types/municipality';
import { DataAvailabilityEnum, IndicatorsSlugEnum } from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const indiceAtmoAboutMd = fs.readFileSync(
  './data/about/indice_atmo.md',
  'utf8',
);

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
        gte: dayjs(date_UTC_ISO).utc().startOf('day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  if (indice_atmo_j0?.code_qual == null) {
    const error = new Error(
      `No indice_atmo_j0 found for municipality_insee_code=${municipality_insee_code} and date_UTC_ISO=${date_UTC_ISO}`,
    ) as CustomError;
    error.status = 404;
    return error;
    // throw error;
  }

  const indice_atmo_j1 = await prisma.indiceAtmospheric.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        gte: dayjs(date_UTC_ISO)
          .add(1, 'day')
          .utc()
          .startOf('day')
          .toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  const data: IndiceAtmoAPIData = {
    id: indice_atmo_j0.id,
    slug: IndicatorsSlugEnum.indice_atmospheric,
    name: indicatorsObject[IndicatorsSlugEnum.indice_atmospheric].name,
    municipality_insee_code,
    recommendations: [
      "Toutes les autres recommandations pour ces conditions d'indice, de saison, de date, de lieu",
      'Par exemple, une autre',
      'Stockée sur un Google Sheet, il faut aller la chercher',
    ],
    about: indiceAtmoAboutMd,
    j0: {
      value: indice_atmo_j0.code_qual,
      color: getIndiceAtmoLabel(indice_atmo_j0.code_qual),
      label: getIndiceAtmoColor(indice_atmo_j0.code_qual),
      recommendation:
        "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
      validity_start: indice_atmo_j0.validity_start,
      validity_end: indice_atmo_j0.validity_end,
      diffusion_date: indice_atmo_j0.diffusion_date,
      created_at: indice_atmo_j0.created_at,
      updated_at: indice_atmo_j0.updated_at,
      code_no2: indice_atmo_j0.code_no2 ?? 0,
      code_o3: indice_atmo_j0.code_o3 ?? 0,
      code_pm10: indice_atmo_j0.code_pm10 ?? 0,
      code_pm25: indice_atmo_j0.code_pm25 ?? 0,
      code_so2: indice_atmo_j0.code_so2 ?? 0,
    },
  };

  if (!!indice_atmo_j1 && indice_atmo_j1?.code_qual !== null) {
    data.j1 = {
      value: indice_atmo_j1.code_qual,
      color: getIndiceAtmoLabel(indice_atmo_j1.code_qual),
      label: getIndiceAtmoColor(indice_atmo_j1.code_qual),
      recommendation:
        "La recommandation tirée au sort pile pour demain, pour ces conditions d'indice, de saison, de date, de lieu",
      validity_start: indice_atmo_j1.validity_start,
      validity_end: indice_atmo_j1.validity_end,
      diffusion_date: indice_atmo_j1.diffusion_date,
      created_at: indice_atmo_j1.created_at,
      updated_at: indice_atmo_j1.updated_at,
      code_no2: indice_atmo_j1.code_no2 ?? 0,
      code_o3: indice_atmo_j1.code_o3 ?? 0,
      code_pm10: indice_atmo_j1.code_pm10 ?? 0,
      code_pm25: indice_atmo_j1.code_pm25 ?? 0,
      code_so2: indice_atmo_j1.code_so2 ?? 0,
    };
  }
  return data;
}

export { getIndiceAtmoFromMunicipalityAndDate };
