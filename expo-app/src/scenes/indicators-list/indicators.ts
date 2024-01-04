import { RouteEnum } from '~/constants/route';

export type IndicatorItem = {
  name: string;
  navigateTo?: string;
  disabled?: boolean;
};

export const indicators: IndicatorItem[] = [
  { name: 'Indice UV', navigateTo: RouteEnum.DASHBOARD },
  { name: 'Eau du robinet', disabled: true },
  { name: 'Vigilance météo', disabled: true },
  { name: 'Eaux de baignades', disabled: true },
  { name: 'Feux de forêt', disabled: true },
  { name: 'Indice ATMO', disabled: true },
];
