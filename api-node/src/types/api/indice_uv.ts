import type { IndicatorsSlugEnum, IndiceUv } from '@prisma/client';
import type { IndicatorCommonData } from './indicator';

// règles correspondantes: ./src/utils/indice_uv.ts

export type IndiceUVNumber =
  | 0 // 'Nul'
  | 1 // 'Faible'
  | 2 // 'Faible'
  | 3 // 'Modéré'
  | 4 // 'Modéré'
  | 5 // 'Modéré'
  | 6 // 'Fort'
  | 7 // 'Fort'
  | 8 // 'Très fort'
  | 9 // 'Très fort'
  | 10 // 'Très fort'
  | 11 // 'Extrême'
  | 12 // 'Extrême'
  | 13 // 'Extrême'
  | 14 // 'Extrême'
  | 15 // 'Extrême'
  | 16; // 'Extrême'

export type IndiceUVColor =
  | '#757575' // 'Nul'
  | '#207900' // 'Faible'
  | '#EFD100' // 'Modéré'
  | '#EB5000' // 'Fort'
  | '#D8001D' // 'Très fort'
  | '#B600AE'; // 'Extrême'

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
  validity_start: Date;
  validity_end: Date;
  diffusion_date: Date;
  created_at: Date;
  updated_at: Date;
};

// omit created_at updated_at uv_j0 uv_j1 uv_j2 uv_j3
export interface IndiceUVAPIData extends IndicatorCommonData {
  j0: IndiceUVDay;
  j1?: IndiceUVDay;
}
