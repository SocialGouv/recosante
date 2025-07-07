export function formatPlaceUrl(place: { code: string; nom: string }): string {
  const nomSlug = place.nom
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/'/g, '-')
    .replace(/\u2019/g, '-')
    .replace(/\u0153/g, 'oe')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  return `/place/${place.code}/${nomSlug}/`;
} 