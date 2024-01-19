import type { IndicatorsSlugEnum } from '@prisma/client';

export type IndicatorItem = {
  name: string;
  short_name: string;
  slug: IndicatorsSlugEnum;
};

export type IndicatorDay = 'j0' | 'j1';

export interface IndicatorByPeriod {
  id: string;
  validity_start: string;
  validity_end: string;
  diffusion_date: string;
  created_at: string;
  updated_at: string;
  summary: {
    value: number;
    status: string;
    status_description?: string;
    recommendations?: string[];
  };
  values?: Array<{
    slug: string;
    name: string;
    value: number;
  }>;
}

export interface Indicator {
  slug: IndicatorsSlugEnum;
  name: string;
  short_name: string;
  municipality_insee_code: string;
  about_title: string;
  about_description: string;
  j0: IndicatorByPeriod;
  j1?: IndicatorByPeriod;
}
