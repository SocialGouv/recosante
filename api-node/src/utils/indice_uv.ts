import {
  IndiceUVColor,
  IndiceUVLabel,
  type IndiceUVNumber,
} from '~/types/api/indice_uv';

function getIndiceUVStatus(indice_uv: IndiceUVNumber): IndiceUVLabel {
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
  } else {
    return IndiceUVLabel.NUL;
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
  } else {
    return IndiceUVColor.NUL;
  }
}

export { getIndiceUVStatus, getIndiceUVColor };
