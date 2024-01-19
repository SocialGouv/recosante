import { type CustomError } from '~/types/error';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceUVStatus } from '~/utils/indice_uv';
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import type { Indicator } from '~/types/api/indicator';
import type { MunicipalityJSON } from '~/types/municipality';
import { DataAvailabilityEnum, IndicatorsSlugEnum } from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
dayjs.extend(utc);

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
        gte: dayjs(date_UTC_ISO).startOf('day').utc().toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  if (indice_uv?.uv_j0 == null) {
    capture('No indice_uv found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
    });
    return null;
  }

  const indiceUvIndicator: Indicator = {
    slug: IndicatorsSlugEnum.indice_uv,
    name: indicatorsObject[IndicatorsSlugEnum.indice_uv].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.indice_uv].short_name,
    municipality_insee_code: indice_uv.municipality_insee_code,
    about_title: 'à propos de la qualité de l’air et l’indice ATMO',
    about_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, nec aliquam nisl nunc nec nisl.',
    j0: {
      id: indice_uv.id,
      summary: {
        value: indice_uv.uv_j0,
        status: getIndiceUVStatus(indice_uv.uv_j0 as IndiceUVNumber),
        recommendations: [
          "La recommandation tirée au sort pile pour aujourd'hui, pour ces conditions d'indice, de saison, de date, de lieu",
        ],
      },
      validity_start: indice_uv.validity_start.toISOString(),
      validity_end: indice_uv.validity_end.toISOString(),
      diffusion_date: indice_uv.diffusion_date.toISOString(),
      created_at: indice_uv.created_at.toISOString(),
      updated_at: indice_uv.updated_at.toISOString(),
    },
  };

  if (indice_uv.uv_j1) {
    indiceUvIndicator.j1 = {
      id: indice_uv.id,
      summary: {
        value: indice_uv.uv_j1,
        status: getIndiceUVStatus(indice_uv.uv_j1 as IndiceUVNumber),
        recommendations: [
          "La recommandation tirée au sort pile pour demain, pour ces conditions d'indice, de saison, de date, de lieu",
        ],
      },
      validity_start: dayjs(indice_uv.validity_start)
        .add(1, 'day')
        .toISOString(),
      validity_end: dayjs(indice_uv.validity_start)
        .add(1, 'day')
        .endOf('day')
        .toISOString(),
      diffusion_date: indice_uv.diffusion_date.toISOString(),
      created_at: indice_uv.created_at.toISOString(),
      updated_at: indice_uv.updated_at.toISOString(),
    };
  }
  return indiceUvIndicator;
}

export { getIndiceUvFromMunicipalityAndDate };
