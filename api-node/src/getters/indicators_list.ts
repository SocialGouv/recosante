import { IndicatorsSlugEnum } from '@prisma/client';
import type { IndicatorItem } from '~/types/api/indicator';

const indicatorsObject: Record<IndicatorsSlugEnum, IndicatorItem> = {
  [IndicatorsSlugEnum.indice_atmospheric]: {
    name: "Qualité de l'air",
    short_name: "Qualité de l'air",
    long_name: "La qualité de l'air",
    slug: IndicatorsSlugEnum.indice_atmospheric,
  },
  [IndicatorsSlugEnum.indice_uv]: {
    name: 'Indice UV',
    short_name: 'Indice UV',
    long_name: 'Le risque UV',
    slug: IndicatorsSlugEnum.indice_uv,
  },
  [IndicatorsSlugEnum.pollen_allergy]: {
    name: 'Allergie aux Pollens',
    short_name: 'Pollens',
    long_name: "Le risque d'allergie aux pollens",
    slug: IndicatorsSlugEnum.pollen_allergy,
  },
  [IndicatorsSlugEnum.weather_alert]: {
    name: 'Vigilance Météo',
    long_name: 'Vigilance météo',
    short_name: 'Météo',
    slug: IndicatorsSlugEnum.weather_alert,
  },
  // [IndicatorsSlugEnum.episode_pollution_atmospheric]: {
  //   name: 'Épisode Pollution Atmosphérique',
  //   slug: IndicatorsSlugEnum.episode_pollution_atmospheric,
  // },
  [IndicatorsSlugEnum.bathing_water]: {
    name: 'Eau de baignade',
    long_name: 'La qualité des eaux de baignade',
    short_name: 'Baignade',
    slug: IndicatorsSlugEnum.bathing_water,
  },
  [IndicatorsSlugEnum.drinking_water]: {
    name: 'Eau du robinet',
    long_name: "La qualité de l'eau du robinet",
    short_name: 'Eau du robinet',
    slug: IndicatorsSlugEnum.drinking_water,
    active: false,
  },
};

const indicatorsList: IndicatorItem[] = Object.values(indicatorsObject).filter(
  (indicator) => indicator.active !== false,
);

export { indicatorsList, indicatorsObject };
