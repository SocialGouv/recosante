import { Municipality } from '@/types/municipality';
import municipalitiesJson from '../data/municipalities.json';
import { slugify } from '@/utils/slugify';

const indicators = [
  'indice-atmo',
  'indice-uv',
  'pollens',
  'alerte-meteo',
  'eau-de-baignade',
];

const municipalities = municipalitiesJson as Municipality[];
export namespace PageBuilderService {
  export function getMunicipalitiesParams() {
    return municipalities
      .map((municipality) => {
        return indicators
          .map((indicator) => {
            return {
              params: {
                city: slugify(municipality.NCCENR),
                indicator: indicator,
              },
            };
          })
          .flat();
      })
      .flat();
  }
}
