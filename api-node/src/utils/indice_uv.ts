import {
  IndiceUVColor,
  IndiceUVLabel,
  type IndiceUVNumber,
} from '~/types/api/indice_uv';
import { NotificationDotColor } from '~/types/notifications';

function getIndiceUVStatus(indice_uv: IndiceUVNumber | null): IndiceUVLabel {
  if (indice_uv === null) {
    return IndiceUVLabel.NO_DATA;
  }
  if (indice_uv >= 11) {
    return IndiceUVLabel.EXTREME;
  } else if (indice_uv >= 8) {
    return IndiceUVLabel.TRES_FORT;
  } else if (indice_uv >= 6) {
    return IndiceUVLabel.FORT;
  } else if (indice_uv >= 3) {
    return IndiceUVLabel.MODERE;
  } else if (indice_uv >= 1) {
    return IndiceUVLabel.FAIBLE;
  } else if (indice_uv === 0) {
    return IndiceUVLabel.NUL;
  } else {
    return IndiceUVLabel.NO_DATA;
  }
}

function getIndiceUVColor(indice_uv: IndiceUVNumber): IndiceUVColor {
  if (indice_uv >= 11) {
    return IndiceUVColor.EXTREME;
  } else if (indice_uv >= 8) {
    return IndiceUVColor.TRES_FORT;
  } else if (indice_uv >= 6) {
    return IndiceUVColor.FORT;
  } else if (indice_uv >= 3) {
    return IndiceUVColor.MODERE;
  } else if (indice_uv >= 1) {
    return IndiceUVColor.FAIBLE;
  } else if (indice_uv === 0) {
    return IndiceUVColor.NUL;
  } else {
    return IndiceUVColor.NO_DATA;
  }
}

function getIndiceUVDotColor(
  indice_uv: IndiceUVNumber,
): NotificationDotColor | null {
  if (indice_uv >= 11) {
    return NotificationDotColor.EXTREMELY_POOR;
  } else if (indice_uv >= 8) {
    return NotificationDotColor.VERY_POOR;
  } else if (indice_uv >= 6) {
    return NotificationDotColor.POOR;
  } else if (indice_uv >= 3) {
    return NotificationDotColor.FAIR;
  } else if (indice_uv >= 1) {
    return NotificationDotColor.FAIR;
  } else if (indice_uv === 0) {
    return NotificationDotColor.GOOD;
  } else {
    return null;
  }
}

export { getIndiceUVStatus, getIndiceUVColor, getIndiceUVDotColor };
