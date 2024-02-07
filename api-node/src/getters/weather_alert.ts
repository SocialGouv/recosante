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
import {
  getSortedPhenomenonsByValue,
  getAlertValueByColorId,
} from '~/utils/weather_alert';
dayjs.extend(utc);

async function getWeatherAlertFromMunicipalityAndDate({
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
      `Invalid request in getWeatherAlertFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const weatherAlertJ0 = await getWeatherAlertForJ0({
    municipality_insee_code,
    date_UTC_ISO,
  });

  if (!weatherAlertJ0) {
    capture('No weatherAlertJ0 found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
    });
    return null;
  }

  const about_description = fs.readFileSync(
    './data/about/vigilance_meteo.md',
    'utf8',
  );

  const phenomenonsJ0 = getSortedPhenomenonsByValue(weatherAlertJ0);
  const maxColorCodeIdJ0 = phenomenonsJ0[0].value;
  const worstPhenomenonCodeIdJ0 = phenomenonsJ0[0].id;

  const recommandationsJ0 = await prisma.recommandation
    .findMany({
      where:
        maxColorCodeIdJ0 > 2
          ? {
              indicator: IndicatorsSlugEnum.weather_alert,
              indicator_value: maxColorCodeIdJ0,
              type_weather_alert: worstPhenomenonCodeIdJ0,
            }
          : {
              indicator: IndicatorsSlugEnum.weather_alert,
              indicator_value: maxColorCodeIdJ0,
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

  const weatherAlertIndicator: Indicator = {
    slug: IndicatorsSlugEnum.weather_alert,
    name: indicatorsObject[IndicatorsSlugEnum.weather_alert].name,
    short_name: indicatorsObject[IndicatorsSlugEnum.weather_alert].short_name,
    long_name: indicatorsObject[IndicatorsSlugEnum.weather_alert].long_name,
    municipality_insee_code: weatherAlertJ0.municipality_insee_code,
    about_title: 'à propos de la vigilance météo',
    about_description,
    j0: {
      id: weatherAlertJ0.id,
      summary: {
        value: maxColorCodeIdJ0,
        status: getAlertValueByColorId(maxColorCodeIdJ0),
        recommendations: recommandationsJ0,
      },
      validity_start: weatherAlertJ0.validity_start.toISOString(),
      validity_end: weatherAlertJ0.validity_end.toISOString(),
      diffusion_date: weatherAlertJ0.diffusion_date.toISOString(),
      created_at: weatherAlertJ0.created_at.toISOString(),
      updated_at: weatherAlertJ0.updated_at.toISOString(),
      values: phenomenonsJ0,
    },
  };

  const weatherAlertJ1 = await getWeatherAlertForJ1({
    municipality_insee_code,
    date_UTC_ISO,
  });

  if (!weatherAlertJ1) {
    capture('No weatherAlertJ1 found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
    });
    return weatherAlertIndicator;
  }

  const phenomenonsJ1 = getSortedPhenomenonsByValue(weatherAlertJ1);
  const maxCodeIdJ1 = phenomenonsJ1[0].value;
  const worstPhenomenonCodeIdJ1 = phenomenonsJ1[0].id;

  const recommandationsJ1 = await prisma.recommandation
    .findMany({
      where:
        maxColorCodeIdJ0 > 2
          ? {
              indicator: IndicatorsSlugEnum.weather_alert,
              indicator_value: maxCodeIdJ1,
              type_weather_alert: worstPhenomenonCodeIdJ1,
            }
          : {
              indicator: IndicatorsSlugEnum.weather_alert,
              indicator_value: maxCodeIdJ1,
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

  weatherAlertIndicator.j1 = {
    id: weatherAlertJ1.id,
    summary: {
      value: maxCodeIdJ1,
      status: getAlertValueByColorId(maxCodeIdJ1),
      recommendations: recommandationsJ1,
    },
    validity_start: weatherAlertJ1.validity_start.toISOString(),
    validity_end: weatherAlertJ1.validity_end.toISOString(),
    diffusion_date: weatherAlertJ1.diffusion_date.toISOString(),
    created_at: weatherAlertJ1.created_at.toISOString(),
    updated_at: weatherAlertJ1.updated_at.toISOString(),
    values: phenomenonsJ1,
  };
  return weatherAlertIndicator;
}

async function getWeatherAlertForJ0({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const weatherAlertJ0 = await prisma.weatherAlert.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (weatherAlertJ0) return weatherAlertJ0;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (municipality?.COMPARENT) {
    return await getWeatherAlertForJ0({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

async function getWeatherAlertForJ1({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string | undefined;
}) {
  const weatherAlertJ1 = await prisma.weatherAlert.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().add(1, 'day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'desc' }],
  });
  if (weatherAlertJ1) return weatherAlertJ1;
  const municipality = await prisma.municipality.findUnique({
    where: { COM: municipality_insee_code },
  });
  if (municipality?.COMPARENT) {
    return await getWeatherAlertForJ1({
      municipality_insee_code: municipality.COMPARENT,
      date_UTC_ISO,
    });
  }
  return null;
}

export {
  getWeatherAlertFromMunicipalityAndDate,
  getWeatherAlertForJ0,
  getWeatherAlertForJ1,
};
