import fs from 'fs';
import { type CustomError } from '~/types/error';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceUVColor, getIndiceUVLabel } from '~/utils/indice_uv';
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import type { IndicatorDataTodayAndTomorrow } from '~/types/api/indicator';
import type { MunicipalityJSON } from '~/types/municipality';
import { DataAvailabilityEnum, IndicatorsSlugEnum } from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const indiceUvAboutMd = fs.readFileSync('./data/about/indice_uv.md', 'utf8');

async function getIndiceUvFromMunicipalityAndDate({
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
      `Invalid request in getIndiceUvFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const indice_uv = await prisma.indiceUv.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        gte: dayjs(date_UTC_ISO).utc().startOf('day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  if (indice_uv?.uv_j0 == null) {
    const error = new Error(
      `No indice_uv found for municipality_insee_code=${municipality_insee_code} and date_UTC_ISO=${date_UTC_ISO}`,
    ) as CustomError;
    error.status = 404;
    return error;
    // throw error;
  }

  const data: IndicatorDataTodayAndTomorrow = {
    slug: IndicatorsSlugEnum.indice_uv,
    name: indicatorsObject[IndicatorsSlugEnum.indice_uv].name,
    municipality_insee_code: indice_uv.municipality_insee_code,
<<<<<<< HEAD
    validity_start: indice_uv.validity_start,
    validity_end: indice_uv.validity_end,
    diffusion_date: indice_uv.diffusion_date,
    created_at: indice_uv.created_at,
    updated_at: indice_uv.updated_at,
    recommendations: ['blablabla', 'blablabla'],
=======
    recommendations: [
      "Toutes les autres recommandations pour ces conditions d'indice, de saison, de date, de lieu",
      'Par exemple, une autre',
      'Stockée sur un Google Sheet, il faut aller la chercher',
    ],
>>>>>>> 5989cd5 (ongoing)
    about: indiceUvAboutMd,
    j0: {
      id: indice_uv.id,
      summary: {
        value: indice_uv.uv_j0,
        color: getIndiceUVColor(indice_uv.uv_j0 as IndiceUVNumber),
        label: getIndiceUVLabel(indice_uv.uv_j0 as IndiceUVNumber),
        recommendation:
          "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
      },
      validity_start: indice_uv.validity_start,
      validity_end: indice_uv.validity_end,
      diffusion_date: indice_uv.diffusion_date,
      created_at: indice_uv.created_at,
      updated_at: indice_uv.updated_at,
      values: [],
    },
  };

  if (indice_uv.uv_j1) {
    data.j1 = {
      id: indice_uv.id,
      summary: {
        value: indice_uv.uv_j1,
        color: getIndiceUVColor(indice_uv.uv_j1 as IndiceUVNumber),
        label: getIndiceUVLabel(indice_uv.uv_j1 as IndiceUVNumber),
        recommendation:
          "La recommandation tirée au sort pile pour demain, pour ces conditions d'indice, de saison, de date, de lieu",
      },
      validity_start: dayjs(indice_uv.validity_start).add(1, 'day').toDate(),
      validity_end: dayjs(indice_uv.validity_start)
        .add(1, 'day')
        .endOf('day')
        .toDate(),
      diffusion_date: indice_uv.diffusion_date,
      created_at: indice_uv.created_at,
      updated_at: indice_uv.updated_at,
      values: [],
    };
  }
  return data;
}

export { getIndiceUvFromMunicipalityAndDate };
