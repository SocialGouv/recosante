import {
  BathingWaterCurrentYearGradingEnum,
  BathingWaterResultEnum,
} from '@prisma/client';

export type ScrapingResult = {
  result_date: string | null; // YYYY-MM-DD
  result_value: BathingWaterResultEnum;
  swimming_season_start: string | null; // YYYY-MM-DD
  swimming_season_end: string | null; // YYYY-MM-DD
  current_year_grading: BathingWaterCurrentYearGradingEnum;
};

// export enum BathingWaterCurrentYearGradingValueEnum {
//   EXCELLENT = 'Excellent', // excellente qualité
//   GOOD = 'Bon', // bonne qualité
//   SUFFICIENT = 'Suffisant', // qualité suffisante
//   POOR = 'Insuffisant', // qualité insuffisante
//   INSUFFICIENTLY_SAMPLED = 'Insuffisamment de prélèvements', // Site n'ayant pas suffisamment de prélèvements cette saison pour être classé
//   UNRANKED_SITE = 'Site non classé', // Site non classé
//   PROHIBITION = 'Interdiction', // interdiction
//   OFF_SEASON = 'Hors saison', // Site hors saison de baignade
// }

// export enum BathingWaterResultValueEnum {
//   GOOD = 'Bon résultat',
//   AVERAGE = 'Résultat moyen',
//   POOR = 'Mauvais résultat',
//   NO_RESULT_FOUND = 'Pas de résultat trouvé',
// }

export enum BathingWaterNumberValueEnum {
  OFF_SEASON = 0, // Site hors saison de baignade
  UNRANKED_SITE = 0, // Site non classé - Site n'ayant pas suffisamment de prélèvements cette saison pour être classé
  GOOD = 1, // bonne qualité
  AVERAGE = 2, // qualité suffisante
  POOR = 3, // mauvaise qualité
  PROHIBITION = 4, // interdiction
}

export enum BathingWaterStatusEnum {
  NO_DATA = 'Aucune donnée',
  OFF_SEASON = 'Aucune donnée',
  UNRANKED_SITE = 'Site non classé',
  GOOD = 'Bon',
  AVERAGE = 'Moyen',
  POOR = 'Mauvais',
  PROHIBITION = 'Interdiction',
}
