import { Municipality } from '@/types/municipality';
import municipalitiesJson from '../data/municipalities.json';
import { slugify } from '@/utils/slugify';

const municipalities = municipalitiesJson as Municipality[];
export namespace PageBuilderService {
  export function getMunicipalitiesParams() {
    return municipalities.map((municipality) => {
      return {
        params: {
          'insee-code': municipality.COM,
          city: slugify(municipality.NCCENR),
          indicator: 'population',
        },
      };
    });
  }
}
