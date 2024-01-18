import type { IndicatorsSlugEnum } from '@prisma/client';
import type { MunicipalityJSON } from '~/types/municipality';

export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
};

export type IndicatorDay = 'j0' | 'j1';

export interface IndicatorData {
  value: number;
  color: string;
  label: string;
  recommendation?: string;
  about?: string;
}
export interface IndicatorDataDay {
  id: string;
  validity_start: Date;
  validity_end: Date;
  diffusion_date: Date;
  created_at: Date;
  updated_at: Date;
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
