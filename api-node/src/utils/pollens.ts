import {
  PollensRiskNumberEnum,
  PollensRiskStatusEnum,
  PollensDotColor,
} from '~/types/api/pollens';
import type { PollenAllergyRisk } from '@prisma/client';
import type { IndicatorByPeriodValues } from '~/types/api/indicator';

export function getPollensStatus(
  pollensRiskNumber: PollensRiskNumberEnum | null,
): PollensRiskStatusEnum {
  if (pollensRiskNumber === null) {
    return PollensRiskStatusEnum.NO_DATA;
  }
  switch (pollensRiskNumber) {
    case PollensRiskNumberEnum.VERY_LOW:
      return PollensRiskStatusEnum.VERY_LOW;
    case PollensRiskNumberEnum.LOW:
      return PollensRiskStatusEnum.LOW;
    case PollensRiskNumberEnum.MODERATE:
      return PollensRiskStatusEnum.MODERATE;
    case PollensRiskNumberEnum.HIGH:
      return PollensRiskStatusEnum.HIGH;
    case PollensRiskNumberEnum.VERY_HIGH:
      return PollensRiskStatusEnum.VERY_HIGH;
    case PollensRiskNumberEnum.NO_RISK:
    default:
      return PollensRiskStatusEnum.NO_RISK;
  }
}

export function getPollensDotColor(
  pollensRiskNumber: PollensRiskNumberEnum | null,
): PollensDotColor | null {
  if (pollensRiskNumber === null) return null;
  switch (pollensRiskNumber) {
    case PollensRiskNumberEnum.VERY_LOW:
      return PollensDotColor.VERY_LOW;
    case PollensRiskNumberEnum.LOW:
      return PollensDotColor.LOW;
    case PollensRiskNumberEnum.MODERATE:
      return PollensDotColor.MODERATE;
    case PollensRiskNumberEnum.HIGH:
      return PollensDotColor.HIGH;
    case PollensRiskNumberEnum.VERY_HIGH:
      return PollensDotColor.VERY_HIGH;
    case PollensRiskNumberEnum.NO_RISK:
      return PollensDotColor.NO_RISK;
    default:
      return null;
  }
}

const treeKeys = [
  'cypres',
  'noisetier',
  'aulne',
  'peuplier',
  'saule',
  'frene',
  'charme',
  'bouleau',
  'platane',
  'chene',
  'olivier',
  'tilleul',
  'chataignier',
  'rumex',
  'graminees',
  'plantain',
  'urticacees',
  'armoises',
  'ambroisies',
];

export function formatPollensAPIValues(
  pollens: PollenAllergyRisk,
): IndicatorByPeriodValues {
  const values = treeKeys
    .map((treeKey) => {
      const value = (pollens as any)[treeKey];
      return {
        slug: treeKey,
        name: treeKey,
        value,
      };
    })
    .filter((pollen) => pollen.value > 0)
    .sort((a, b) => b.value - a.value);

  return values;
}
