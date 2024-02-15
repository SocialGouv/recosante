import { Municipality } from '@/types/municipality';
import municipalitiesJson from '../data/municipalities.json';

const municipalities = municipalitiesJson as Municipality[];
export namespace PageBuilder {
  export function getMunicipalitiesParams() {
    return municipalities.map((municipality) => {
      return {
        params: {
          'insee-code': municipality.COM,
          city: municipality.NCCENR,
        },
      };
    });
  }
}
