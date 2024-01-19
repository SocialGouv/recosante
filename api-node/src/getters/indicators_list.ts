import { IndicatorsSlugEnum } from '@prisma/client';
import type { IndicatorItem } from '~/types/api/indicator';

const indicatorsObject: Record<IndicatorsSlugEnum, IndicatorItem> = {
  [IndicatorsSlugEnum.indice_atmospheric]: {
    name: "Pollution de l'air",
    short_name: 'Indice ATMO',
    slug: IndicatorsSlugEnum.indice_atmospheric,
  },
  [IndicatorsSlugEnum.indice_uv]: {
    name: 'Indice UV',
    short_name: 'Indice UV',
    slug: IndicatorsSlugEnum.indice_uv,
  },
  [IndicatorsSlugEnum.pollen_allergy]: {
    name: 'Allergie aux Pollens',
    short_name: 'Pollens',
    slug: IndicatorsSlugEnum.pollen_allergy,
  },
  [IndicatorsSlugEnum.weather_alert]: {
    name: 'Vigilance Météo',
    short_name: 'Météo',
    slug: IndicatorsSlugEnum.weather_alert,
  },
  // [IndicatorsSlugEnum.episode_pollution_atmospheric]: {
  //   name: 'Épisode Pollution Atmosphérique',
  //   slug: IndicatorsSlugEnum.episode_pollution_atmospheric,
  // },
  [IndicatorsSlugEnum.bathing_water]: {
    name: 'Eau de baignade',
    short_name: 'Baignade',
    slug: IndicatorsSlugEnum.bathing_water,
  },
  // [IndicatorsSlugEnum.tap_water]: {
  //   name: 'Eau du robinet',
  //   slug: IndicatorsSlugEnum.tap_water,
  // },
};

const indicatorsList: IndicatorItem[] = Object.values(indicatorsObject);

export { indicatorsList, indicatorsObject };
