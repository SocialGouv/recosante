import {
  PolluantQualificatifsNumberEnum,
  PolluantQualificatifsLabelEnum,
  PolluantQualificatifsColorEnum,
} from '~/types/api/indice_atmo';
import { NotificationDotColor } from '~/types/notifications';

function getIndiceAtmoStatus(
  code_indice_atmo: PolluantQualificatifsNumberEnum | null,
): PolluantQualificatifsLabelEnum {
  if (code_indice_atmo === null) {
    return PolluantQualificatifsLabelEnum.NO_DATA;
  }
  switch (code_indice_atmo) {
    case PolluantQualificatifsNumberEnum.SPECIAL_EVENT:
      return PolluantQualificatifsLabelEnum.SPECIAL_EVENT;
    case PolluantQualificatifsNumberEnum.GOOD:
      return PolluantQualificatifsLabelEnum.GOOD;
    case PolluantQualificatifsNumberEnum.FAIR:
      return PolluantQualificatifsLabelEnum.FAIR;
    case PolluantQualificatifsNumberEnum.MODERATE:
      return PolluantQualificatifsLabelEnum.MODERATE;
    case PolluantQualificatifsNumberEnum.POOR:
      return PolluantQualificatifsLabelEnum.POOR;
    case PolluantQualificatifsNumberEnum.VERY_POOR:
      return PolluantQualificatifsLabelEnum.VERY_POOR;
    case PolluantQualificatifsNumberEnum.EXTREMELY_POOR:
      return PolluantQualificatifsLabelEnum.EXTREMELY_POOR;
    case PolluantQualificatifsNumberEnum.NOT_AVAILABLE:
    default:
      return PolluantQualificatifsLabelEnum.NOT_AVAILABLE;
  }
}

function getIndiceAtmoColor(
  code_indice_atmo: PolluantQualificatifsNumberEnum,
): PolluantQualificatifsColorEnum {
  switch (code_indice_atmo) {
    case PolluantQualificatifsNumberEnum.SPECIAL_EVENT:
      return PolluantQualificatifsColorEnum.SPECIAL_EVENT;
    case PolluantQualificatifsNumberEnum.GOOD:
      return PolluantQualificatifsColorEnum.GOOD;
    case PolluantQualificatifsNumberEnum.FAIR:
      return PolluantQualificatifsColorEnum.FAIR;
    case PolluantQualificatifsNumberEnum.MODERATE:
      return PolluantQualificatifsColorEnum.MODERATE;
    case PolluantQualificatifsNumberEnum.POOR:
      return PolluantQualificatifsColorEnum.POOR;
    case PolluantQualificatifsNumberEnum.VERY_POOR:
      return PolluantQualificatifsColorEnum.VERY_POOR;
    case PolluantQualificatifsNumberEnum.EXTREMELY_POOR:
      return PolluantQualificatifsColorEnum.EXTREMELY_POOR;
    case PolluantQualificatifsNumberEnum.NOT_AVAILABLE:
    default:
      return PolluantQualificatifsColorEnum.NOT_AVAILABLE;
  }
}

function getIndiceAtmoDotColor(
  code_indice_atmo: PolluantQualificatifsNumberEnum,
): NotificationDotColor | null {
  switch (code_indice_atmo) {
    case PolluantQualificatifsNumberEnum.SPECIAL_EVENT:
      return NotificationDotColor.EXTREMELY_POOR;
    case PolluantQualificatifsNumberEnum.GOOD:
      return NotificationDotColor.GOOD;
    case PolluantQualificatifsNumberEnum.FAIR:
      return NotificationDotColor.POOR; // to be consistent with "Moyen" in "getPollensDotColor" in "pollens.ts"
    case PolluantQualificatifsNumberEnum.MODERATE:
      return NotificationDotColor.POOR;
    case PolluantQualificatifsNumberEnum.POOR:
      return NotificationDotColor.POOR;
    case PolluantQualificatifsNumberEnum.VERY_POOR:
      return NotificationDotColor.VERY_POOR;
    case PolluantQualificatifsNumberEnum.EXTREMELY_POOR:
      return NotificationDotColor.EXTREMELY_POOR;
    case PolluantQualificatifsNumberEnum.NOT_AVAILABLE:
    default:
      return null;
  }
}

export { getIndiceAtmoStatus, getIndiceAtmoColor, getIndiceAtmoDotColor };
