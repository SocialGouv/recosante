import {
  BathingWaterCurrentYearGradingEnum,
  BathingWaterResultEnum,
} from '@prisma/client';

export type ScrapingResult = {
  result_date: string; // YYYY-MM-DD
  result_value: BathingWaterResultEnum;
  swimming_season_start: string; // YYYY-MM-DD
  swimming_season_end: string; // YYYY-MM-DD
  current_year_grading: BathingWaterCurrentYearGradingEnum;
};

export enum BathingWaterCurrentYearGradingValueEnum {
  EXCELLENT = 'Excellent',
  GOOD = 'Bon',
  SUFFICIENT = 'Suffisant',
  POOR = 'Insuffisant',
  INSUFFICIENTLY_SAMPLED = 'Insuffisamment de prélèvements',
  UNRANKED_SITE = 'Site non classé',
  PROHIBITION = 'Interdiction',
}

export enum BathingWaterResultValueEnum {
  GOOD = 'Bon résultat',
  AVERAGE = 'Résultat moyen',
  POOR = 'Mauvais résultat',
}
