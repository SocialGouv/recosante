import type { IndicatorsSlugEnum } from '@prisma/client';
import type { MunicipalityJSON } from '~/types/municipality';

export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
};

export type IndicatorDay = 'j0' | 'j1';

type DataDay = {
  value: number;
  color: string;
  label: string;
  recommendation: string;
};

export type IndicatorCommonData = {
  id: string;
  slug: string;
  name: string;
  municipality_insee_code: MunicipalityJSON['COM'];
  validity_start: Date;
  validity_end: Date;
  diffusion_date: Date;
  created_at: Date;
  updated_at: Date;
  recommendations: Array<string>;
  about: string;
  j0: DataDay; // specific to each indicator
  j1?: DataDay; // specific to each indicator
};
