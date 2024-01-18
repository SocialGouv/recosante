import type { IndicatorsSlugEnum } from '@prisma/client';
import type { MunicipalityJSON } from '~/types/municipality';

export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
};

export type IndicatorDay = 'j0' | 'j1';

export interface IndicatorData {
  name: string;
  value: number;
  color: string;
  label: string;
  recommendation?: string;
  about?: string;
}
export interface IndicatorDataDay {
  id: string;
  validity_start: Date | string;
  validity_end: Date | string;
  diffusion_date: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
  summary: IndicatorData;
  values: IndicatorData[];
}

export interface IndicatorDataTodayAndTomorrow {
  slug: IndicatorsSlugEnum;
  name: string;
  municipality_insee_code: string;
  recommendations: string[];
  about: string;
  j0: IndicatorDataDay;
  j1?: IndicatorDataDay;
}
