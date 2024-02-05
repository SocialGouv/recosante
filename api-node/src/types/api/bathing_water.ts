import {
  BathingWaterCurrentYearGradingEnum,
  BathingWaterResultEnum,
} from '@prisma/client';

export type ScrapingResult = {
  result_date?: string; // YYYY-MM-DD
  result_value: BathingWaterResultEnum;
  swimming_season_start?: string; // YYYY-MM-DD
  swimming_season_end?: string; // YYYY-MM-DD
  current_year_grading?: BathingWaterCurrentYearGradingEnum;

};

export enum BathingWaterCurrentYearGradingValueEnum {
  EXCELLENT = 'Excellent', // excellente qualité
  GOOD = 'Bon', // bonne qualité
  SUFFICIENT = 'Suffisant', // qualité suffisante
  POOR = 'Insuffisant', // qualité insuffisante
  INSUFFICIENTLY_SAMPLED = 'Insuffisamment de prélèvements', // Site n'ayant pas suffisamment de prélèvements cette saison pour être classé
  UNRANKED_SITE = 'Site non classé', // Site non classé
  PROHIBITION = 'Interdiction', // interdiction
}

export enum BathingWaterResultValueEnum {
  GOOD = 'Bon résultat',
  AVERAGE = 'Résultat moyen',
  POOR = 'Mauvais résultat',
  UNRANKED_SITE = 'Site non classé',
}

export enum BathingWaterNumberValueEnum {
  UNRANKED_SITE = 0, // Site non classé - Site n'ayant pas suffisamment de prélèvements cette saison pour être classé
  EXCELLENT = 1, // excellente qualité
  GOOD = 2, // bonne qualité
  SUFFICIENT = 3, // qualité suffisante
  POOR = 4, // qualité insuffisante
  PROHIBITION = 5, // interdiction
}

export enum BathingWaterStatusEnum {
  UNRANKED_SITE = 'Site non classé',
  EXCELLENT = 'Excellent',
  GOOD = 'Bon',
  SUFFICIENT = 'Suffisant',
  POOR = 'Insuffisant',
  PROHIBITION = 'Interdiction',
}
