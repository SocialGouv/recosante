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
