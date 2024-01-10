import { IndicatorsSlugEnum } from '@prisma/client';
import type { Indicator } from '~/types/api/indicator';

const indicatorsObject: Record<IndicatorsSlugEnum, Indicator> = {
  [IndicatorsSlugEnum.indice_atmospheric]: {
    name: 'Indice ATMO',
    slug: IndicatorsSlugEnum.indice_atmospheric,
  },
  [IndicatorsSlugEnum.indice_uv]: {
    name: 'Indice UV',
    slug: IndicatorsSlugEnum.indice_uv,
  },
  [IndicatorsSlugEnum.pollen_allergy]: {
    name: 'Allergie aux Pollens',
    slug: IndicatorsSlugEnum.pollen_allergy,
  },
  [IndicatorsSlugEnum.weather_alert]: {
    name: 'Alerte Météo',
    slug: IndicatorsSlugEnum.weather_alert,
  },
  // [IndicatorsSlugEnum.episode_pollution_atmospheric]: {
  //   name: 'Épisode Pollution Atmosphérique',
  //   slug: IndicatorsSlugEnum.episode_pollution_atmospheric,
  // },
  [IndicatorsSlugEnum.bathing_water]: {
    name: 'Eau de baignades',
    slug: IndicatorsSlugEnum.bathing_water,
  },
  // [IndicatorsSlugEnum.tap_water]: {
  //   name: 'Eau du robinet',
  //   slug: IndicatorsSlugEnum.tap_water,
  // },
};

const indicatorsList: Indicator[] = Object.values(indicatorsObject);

export { indicatorsList, indicatorsObject };
