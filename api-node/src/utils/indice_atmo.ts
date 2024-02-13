import {
  PolluantQualificatifsNumberEnum,
  PolluantQualificatifsLabelEnum,
  PolluantQualificatifsColorEnum,
  IndiceAtmoDotColor,
} from '~/types/api/indice_atmo';

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
): IndiceAtmoDotColor | null {
  switch (code_indice_atmo) {
    case PolluantQualificatifsNumberEnum.SPECIAL_EVENT:
      return IndiceAtmoDotColor.SPECIAL_EVENT;
    case PolluantQualificatifsNumberEnum.GOOD:
      return IndiceAtmoDotColor.GOOD;
    case PolluantQualificatifsNumberEnum.FAIR:
      return IndiceAtmoDotColor.FAIR;
    case PolluantQualificatifsNumberEnum.MODERATE:
      return IndiceAtmoDotColor.MODERATE;
    case PolluantQualificatifsNumberEnum.POOR:
      return IndiceAtmoDotColor.POOR;
    case PolluantQualificatifsNumberEnum.VERY_POOR:
      return IndiceAtmoDotColor.VERY_POOR;
    case PolluantQualificatifsNumberEnum.EXTREMELY_POOR:
      return IndiceAtmoDotColor.EXTREMELY_POOR;
    case PolluantQualificatifsNumberEnum.NOT_AVAILABLE:
    default:
      return null;
  }
}

export { getIndiceAtmoStatus, getIndiceAtmoColor, getIndiceAtmoDotColor };
