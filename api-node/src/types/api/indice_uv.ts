import type { IndicatorsSlugEnum, IndiceUv } from '@prisma/client';

export type IndiceUVNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

export type IndiceUVColor =
  | '#757575'
  | '#207900'
  | '#EFD100'
  | '#EB5000'
  | '#D8001D'
  | '#B600AE';

export type IndiceUVLabel =
  | 'Extrême'
  | 'Très fort'
  | 'Fort'
  | 'Modéré'
  | 'Faible'
  | 'Nul';

export type IndiceUVDay = {
  value: number;
  color: string;
  label: IndiceUVLabel;
  recommendation: string;
};

// omit created_at updated_at uv_j0 uv_j1 uv_j2 uv_j3
export interface IndiceUVAPIData
  extends Omit<
    IndiceUv,
    'data_availability' | 'uv_j0' | 'uv_j1' | 'uv_j2' | 'uv_j3'
  > {
  slug: IndicatorsSlugEnum;
  name: string;
  recommendations: Array<string>;
  about: string;
  j0: IndiceUVDay;
  j1?: IndiceUVDay;
}
