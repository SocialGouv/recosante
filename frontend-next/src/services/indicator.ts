const indicators = [
  'indice-atmo',
  'indice-uv',
  'pollens',
  'alerte-meteo',
  'eau-de-baignade',
];

export namespace IndicatorService {
  export function getNameBySlug(slug: string) {
    switch (slug) {
      case 'indice-atmo':
        return "l'indice ATMO";
      case 'indice-uv':
        return "l'indice UV";
      case 'pollens':
        return 'le taux de pollen';
      case 'alerte-meteo':
        return 'les alertes météo';
      case 'eau-de-baignade':
        return 'les eaux de baignade';
      default:
        return '';
    }
  }
}
