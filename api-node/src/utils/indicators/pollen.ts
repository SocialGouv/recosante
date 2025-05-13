/**
 * Utilitaires pour l'indicateur de pollens
 */
import {
  PollensRiskNumberEnum,
  PollensRiskStatusEnum,
} from '~/types/api/pollens';

/**
 * @param value Valeur numérique du risque pollen
 * @returns Statut textuel (Très faible, Faible, Modéré, etc.)
 */
export function getPollensStatus(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return PollensRiskStatusEnum.NO_DATA;
  }

  switch (value) {
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
    case PollensRiskNumberEnum.EXTREMEMLY_HIGH:
      return PollensRiskStatusEnum.EXTREMEMLY_HIGH;
    default:
      return PollensRiskStatusEnum.NO_DATA;
  }
}

/**
 * Obtient l'indicateur visuel de couleur pour un niveau de risque pollen
 *
 * @param value Valeur numérique du risque pollen
 * @returns Caractère symbolisant une couleur ou null si le niveau est trop bas
 */
export function getPollensDotColor(
  value: number | null | undefined,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  switch (value) {
    case PollensRiskNumberEnum.VERY_LOW:
      return '⚪';
    case PollensRiskNumberEnum.LOW:
      return '🟢';
    case PollensRiskNumberEnum.MODERATE:
      return '🟡';
    case PollensRiskNumberEnum.HIGH:
      return '🟠';
    case PollensRiskNumberEnum.VERY_HIGH:
      return '🔴';
    case PollensRiskNumberEnum.EXTREMEMLY_HIGH:
      return '🟣';
    default:
      return null;
  }
}
