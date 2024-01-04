export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
  id: string;
};

export enum IndicatorsSlugEnum {
  ultra_violet = 'ultra_violet',
  pollen = 'pollen',
  weather = 'weather',
  indice_atmospheric = 'indice_atmospheric',
  pollution_atmospheric = 'pollution_atmospheric',
  water = 'water',
  air_quality = 'air_quality',
}
