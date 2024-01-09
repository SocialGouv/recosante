export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
  id: string;
};

export enum IndicatorsSlugEnum {
  indice_atmospheric = 'indice_atmospheric',
  indice_uv = 'indice_uv',
  pollen_allergy = 'pollen_allergy',
  weather_alert = 'weather_alert',
  episode_pollution_atmospheric = 'episode_pollution_atmospheric',
  tap_water = 'tap_water',
  bathing_water = 'bathing_water',
}
