import { type CustomError } from '~/types/error';
import fs from 'fs';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import type { Indicator } from '~/types/api/indicator';
import {
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type Municipality,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
import { formatPollensAPIValues, getPollensStatus } from '~/utils/pollens';
dayjs.extend(utc);

const about_description = fs.readFileSync('./data/about/pollens.md', 'utf8');

async function getPollensFromMunicipalityAndDate({
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
      `Invalid request in getPollensFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const pollensJ0 = await getPollensForJ0({
    municipality_insee_code,
    date_UTC_ISO,
  });

  if (!pollensJ0) {
    if (
      !knownMissingMunicipalitiesForPollens.includes(municipality_insee_code)
    ) {
      capture('[POLLENS] New insee code with unavailable data', {
        extra: {
          municipality_insee_code,
          date_UTC_ISO,
        },
        tags: {
          municipality_insee_code,
        },
      });
    }
    const pollensEmpty: Indicator = {
      slug: IndicatorsSlugEnum.pollen_allergy,
      name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].name,
      long_name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].long_name,
      short_name:
        indicatorsObject[IndicatorsSlugEnum.pollen_allergy].short_name,
      municipality_insee_code,
      about_title: "à propos du risque d'allergie au pollen",
      about_description,
      j0: {
        id: 'empty',
        summary: {
          value: null,
          status: getPollensStatus(null),
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
          status: getPollensStatus(null),
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
    return pollensEmpty;
  }

  const recommandationsJ0 = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.pollen_allergy,
        indicator_value: pollensJ0.total ?? 0,
      },
      select: {
        recommandation_content: true,
      },
      distinct: ['recommandation_content'],
      take: 2,
    })
    .then((recommandations) =>
      recommandations.map(
        (recommandation) => recommandation.recommandation_content,
      ),
    );

  const formattedPollensJ0 = {
    id: pollensJ0.id,
    summary: {
      value: pollensJ0.total,
      status: getPollensStatus(pollensJ0.total),
      recommendations: recommandationsJ0,
    },
    validity_start: pollensJ0.validity_start.toISOString(),
    validity_end: pollensJ0.validity_end.toISOString(),
    diffusion_date: pollensJ0.diffusion_date.toISOString(),
    created_at: pollensJ0.created_at.toISOString(),
    updated_at: pollensJ0.updated_at.toISOString(),
    values: formatPollensAPIValues(pollensJ0),
  };

  const pollensIndicator: Indicator = {
    slug: IndicatorsSlugEnum.pollen_allergy,
    name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].name,
    long_name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].long_name,
    short_name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].short_name,
    municipality_insee_code: pollensJ0.municipality_insee_code,
    about_title: "à propos du risque d'allergie au pollen",
    about_description,
    j0: formattedPollensJ0,
  };

  if (
    dayjs()
      .utc()
      .add(1, 'day')
      .endOf('day')
      .isAfter(dayjs(pollensJ0.validity_end).utc())
  ) {
    const pollensJ1 = await getPollensForJ1({
      municipality_insee_code,
      date_UTC_ISO,
    });

    if (pollensJ1) {
      const recommandationsJ1 = await prisma.recommandation
        .findMany({
          where: {
            indicator: IndicatorsSlugEnum.pollen_allergy,
            indicator_value: pollensJ1.total ?? 0,
          },
          select: {
            recommandation_content: true,
          },
          distinct: ['recommandation_content'],
          take: 2,
        })
        .then((recommandations) =>
          recommandations.map(
            (recommandation) => recommandation.recommandation_content,
          ),
        );

      pollensIndicator.j1 = {
        id: pollensJ1.id,
        summary: {
          value: pollensJ1.total ?? 0,
          status: getPollensStatus(pollensJ1.total ?? 0),
          recommendations: recommandationsJ1,
        },
        validity_start: pollensJ1.validity_start.toISOString(),
        validity_end: pollensJ1.validity_end.toISOString(),
        diffusion_date: pollensJ1.diffusion_date.toISOString(),
        created_at: pollensJ1.created_at.toISOString(),
        updated_at: pollensJ1.updated_at.toISOString(),
        values: formatPollensAPIValues(pollensJ1),
      };
    }
  } else {
    pollensIndicator.j1 = formattedPollensJ0;
  }

  return pollensIndicator;
}

async function getPollensForJ0({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const pollensJ0 = await prisma.pollenAllergyRisk.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (pollensJ0) return pollensJ0;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (
    municipality?.COMPARENT &&
    municipality.COMPARENT !== municipality_insee_code
  ) {
    return await getPollensForJ0({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

async function getPollensForJ1({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const pollensJ1 = await prisma.pollenAllergyRisk.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().add(1, 'day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (pollensJ1) return pollensJ1;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (
    municipality?.COMPARENT &&
    municipality.COMPARENT !== municipality_insee_code
  ) {
    return await getPollensForJ1({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

const knownMissingMunicipalitiesForPollens: Array<Municipality['COM']> = [
  '2B033',
  '2A004',
  '97102',
  '97416',
  '2A247',
  '97407',
  '97411',
  '97221',
  '97110',
  '97107',
  '2B123',
  '2B003',
  '2A008',
  '2A001',
  '97615',
  '97227',
  '97209',
  '97122',
  '98818',
  '97415',
  '97311',
  '97213',
  '2B353',
  '2B311',
  '2B307',
  '2B063',
  '2A284',
];

export {
  getPollensFromMunicipalityAndDate,
  getPollensForJ0,
  getPollensForJ1,
  knownMissingMunicipalitiesForPollens,
};
