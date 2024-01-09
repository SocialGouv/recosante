import type {
  IndiceUVNumber,
  IndiceUVLabel,
  IndiceUVColor,
} from '~/types/api/indice_uv';

const getIndiceUVLabel = (indice_uv: IndiceUVNumber): IndiceUVLabel => {
  if (indice_uv >= 11) {
    return 'Extrême';
  } else if (indice_uv >= 8) {
    return 'Très fort';
  } else if (indice_uv >= 6) {
    return 'Fort';
  } else if (indice_uv >= 3) {
    return 'Modéré';
  } else if (indice_uv >= 1) {
    return 'Faible';
  } else {
    return 'Nul';
  }
};

const getIndiceUVColor = (indice_uv: IndiceUVNumber): IndiceUVColor => {
  if (indice_uv >= 11) {
    return '#B600AE';
  } else if (indice_uv >= 8) {
    return '#D8001D';
  } else if (indice_uv >= 6) {
    return '#EB5000';
  } else if (indice_uv >= 3) {
    return '#EFD100';
  } else if (indice_uv >= 1) {
    return '#207900';
  } else {
    return '#757575';
  }
};

export { getIndiceUVLabel, getIndiceUVColor };
