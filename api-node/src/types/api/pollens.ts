export enum PollensRiskNumberEnum {
  NO_RISK = 0,
  VERY_LOW = 1,
  LOW = 2,
  MODERATE = 3,
  HIGH = 4,
  VERY_HIGH = 5,
}

export enum PollensRiskStatusEnum {
  NO_DATA = 'Aucune donnée',
  NO_RISK = 'Risque nul',
  VERY_LOW = 'Très faible',
  LOW = 'Faible',
  MODERATE = 'Moyen',
  HIGH = 'Élevé',
  VERY_HIGH = 'Très élevé',
}

export enum PollensDotColor {
  NO_RISK = '🟢', // 'Risque nul'
  VERY_LOW = '🟡', // 'Très faible'
  LOW = '🟡', // 'Faible'
  MODERATE = '🟠', // 'Moyen'
  HIGH = '🔴', // 'Élevé'
  VERY_HIGH = '🟣', // 'Très élevé'
}

export interface PollensAPIData {
  cypres: PollensRiskNumberEnum;
  noisetier: PollensRiskNumberEnum;
  aulne: PollensRiskNumberEnum;
  peuplier: PollensRiskNumberEnum;
  saule: PollensRiskNumberEnum;
  frene: PollensRiskNumberEnum;
  charme: PollensRiskNumberEnum;
  bouleau: PollensRiskNumberEnum;
  platane: PollensRiskNumberEnum;
  chene: PollensRiskNumberEnum;
  olivier: PollensRiskNumberEnum;
  tilleul: PollensRiskNumberEnum;
  chataignier: PollensRiskNumberEnum;
  rumex: PollensRiskNumberEnum;
  graminees: PollensRiskNumberEnum;
  plantain: PollensRiskNumberEnum;
  urticacees: PollensRiskNumberEnum;
  armoises: PollensRiskNumberEnum;
  ambroisies: PollensRiskNumberEnum;
  Total: PollensRiskNumberEnum;
}
