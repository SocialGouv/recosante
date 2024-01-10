export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
};

export type IndicatorDay = 'j0' | 'j1';

export enum IndicatorsSlugEnum {
  indice_atmospheric = 'indice_atmospheric',
  indice_uv = 'indice_uv',
  pollen_allergy = 'pollen_allergy',
  weather_alert = 'weather_alert',
  episode_pollution_atmospheric = 'episode_pollution_atmospheric',
  tap_water = 'tap_water',
  bathing_water = 'bathing_water',
}

type DataDay = {
  value: number;
  color: string;
  label: string;
  recommendation: string;
};

export type IndicatorCommonData = {
  id: string;
  slug: IndicatorsSlugEnum;
  name: string;
  municipality_insee_code: string;
  validity_start: string;
  validity_end: string;
  diffusion_date: string;
  created_at: string;
  updated_at: string;
  recommendations: Array<string>;
  about: string;
  j0: DataDay; // specific to each indicator
  j1?: DataDay; // specific to each indicator
};
