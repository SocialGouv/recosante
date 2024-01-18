import {
  PolluantQualificatifsNumberEnum,
  PolluantQualificatifsLabelEnum,
  PolluantQualificatifsColorEnum,
} from '~/types/api/indice_atmo';

function getIndiceAtmoLabel(
  code_indice_atmo: PolluantQualificatifsNumberEnum,
): PolluantQualificatifsLabelEnum {
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

export { getIndiceAtmoLabel, getIndiceAtmoColor };
