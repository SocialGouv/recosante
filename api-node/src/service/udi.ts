import { type Udis } from '~/types/data/udis';
import udis from './../../data/udis.json';
import * as turf from '@turf/turf';
// import proj4 from 'proj4';

// const firstProjection =
//   'PROJCS["RGF93 v1 / Lambert-93",GEOGCS["RGF93 v1",DATUM["Reseau_Geodesique_Francais_1993_v1",SPHEROID["GRS 1980",6378137,298.257222101],TOWGS84[0,0,0,0,0,0,0]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4171"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["latitude_of_origin",46.5],PARAMETER["central_meridian",3],PARAMETER["standard_parallel_1",49],PARAMETER["standard_parallel_2",44],PARAMETER["false_easting",700000],PARAMETER["false_northing",6600000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","2154"]]';
// const secondProjection =
//   'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';
export namespace UdiService {
  const udisData = udis as Udis;
  export async function getUdiByCoordinates(
    lat: number,
    long: number,
  ): Promise<Array<string | null>> {
    const currentCoordinates = turf.point([long, lat]);
    return udisData.features
      .map((feature) => {
        const multiPolygon = turf.multiPolygon(feature.geometry.coordinates);
        const isInside = turf.booleanPointInPolygon(
          currentCoordinates,
          multiPolygon,
        );
        if (isInside) {
          return feature.properties.code_udi;
        } else return null;
      })
      .filter((feature) => feature);
  }
}
