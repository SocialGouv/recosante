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

export enum IndiceUVColor {
  NO_DATA = '#D9D9EF', // 'Nul'
  NUL = '#D9D9EF', // 'Nul'
  FAIBLE = '#b1f3ef', // 'Faible'
  MODERE = '#73c8ae', // 'Modéré'
  FORT = '#ee817e', // 'Fort'
  TRES_FORT = '#a7546d', // 'Très fort'
  EXTREME = '#965f9b', // 'Extrême'
}

export enum IndiceUVDotColor {
  NUL = '🟢', // 'Faible'
  FAIBLE = '🟡', // 'Faible'
  MODERE = '🟡', // 'Modéré'
  FORT = '🟠', // 'Fort'
  TRES_FORT = '🔴', // 'Très fort'
  EXTREME = '🟣', // 'Extrême'
}

export enum IndiceUVLabel {
  NO_DATA = 'Aucune donnée',
  NUL = 'Risque nul',
  FAIBLE = 'Faible',
  MODERE = 'Modéré',
  FORT = 'Fort',
  TRES_FORT = 'Très fort',
  EXTREME = 'Extrême',
}
