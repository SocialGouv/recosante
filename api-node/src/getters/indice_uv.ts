import { type CustomError } from '~/types/error';
import fs from 'fs';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import { getIndiceUVStatus } from '~/utils/indice_uv';
import type { IndiceUVNumber } from '~/types/api/indice_uv';
import type { Indicator } from '~/types/api/indicator';
import {
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  SeasonEnum,
  type Municipality,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import { capture } from '~/third-parties/sentry';
import utc from 'dayjs/plugin/utc';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);
dayjs.extend(utc);

const about_description = fs.readFileSync('./data/about/indice_uv.md', 'utf8');

async function getIndiceUvFromMunicipalityAndDate({
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
      `Invalid request in getIndiceUvFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const indice_uv = await getIndiceUVForJ({
    municipality_insee_code,
    date_UTC_ISO,
  });

  if (indice_uv?.uv_j0 == null) {
    capture('No indice_uv found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
      tags: {
        municipality_insee_code,
      },
    });
    const indiceUvEmpty: Indicator = {
      slug: IndicatorsSlugEnum.indice_uv,
      name: indicatorsObject[IndicatorsSlugEnum.indice_uv].name,
      short_name: indicatorsObject[IndicatorsSlugEnum.indice_uv].short_name,
      long_name: indicatorsObject[IndicatorsSlugEnum.indice_uv].long_name,
      municipality_insee_code,
      about_title: "à propos de l'indice UV",
      about_description,
      j0: {
        id: 'empty',
        summary: {
          value: null,
          status: getIndiceUVStatus(null),
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
          status: getIndiceUVStatus(null),
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
    return indiceUvEmpty;
  }

  const isWinter = dayjs(indice_uv.validity_start).quarter() === 1;
  const isSpring = dayjs(indice_uv.validity_start).quarter() === 2;
  const isSummer = dayjs(indice_uv.validity_start).quarter() === 3;
  const isFall = dayjs(indice_uv.validity_start).quarter() === 4;
  const seasons: Array<SeasonEnum> = [SeasonEnum.Toute];
  if (isWinter) seasons.push(SeasonEnum.Hiver);
  if (isSpring) seasons.push(SeasonEnum.Printemps);
  if (isSummer) seasons.push(SeasonEnum.Ete);
  if (isFall) seasons.push(SeasonEnum.Automne);
  const recommandationsJ0 = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.indice_uv,
        indicator_value: indice_uv.uv_j0,
        seasons: {
          hasSome: seasons,
        },
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

  const indiceUvIndicator: Indicator = {
    slug: IndicatorsSlugEnum.indice_uv,
    name: indicatorsObject[IndicatorsSlugEnum.indice_uv].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.indice_uv].short_name,
    long_name: indicatorsObject[IndicatorsSlugEnum.indice_uv].long_name,
    municipality_insee_code: indice_uv.municipality_insee_code,
    about_title: "à propos de l'indice UV",
    about_description,
    j0: {
      id: indice_uv.id,
      summary: {
        value: indice_uv.uv_j0,
        status: getIndiceUVStatus(indice_uv.uv_j0 as IndiceUVNumber),
        recommendations: recommandationsJ0,
      },
      validity_start: indice_uv.validity_start.toISOString(),
      validity_end: indice_uv.validity_end.toISOString(),
      diffusion_date: indice_uv.diffusion_date.toISOString(),
      created_at: indice_uv.created_at.toISOString(),
      updated_at: indice_uv.updated_at.toISOString(),
    },
  };

  if (indice_uv.uv_j1) {
    const recommandationsJ1 = await prisma.recommandation
      .findMany({
        where: {
          indicator: IndicatorsSlugEnum.indice_uv,
          indicator_value: indice_uv.uv_j1,
          seasons: {
            hasSome: seasons,
          },
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

    indiceUvIndicator.j1 = {
      id: indice_uv.id,
      summary: {
        value: indice_uv.uv_j1,
        status: getIndiceUVStatus(indice_uv.uv_j1 as IndiceUVNumber),
        recommendations: recommandationsJ1,
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

async function getIndiceUVForJ({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const indice_uv = await prisma.indiceUv.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (indice_uv) return indice_uv;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (municipality?.COMPARENT) {
    return await getIndiceUVForJ({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

export { getIndiceUvFromMunicipalityAndDate, getIndiceUVForJ };
