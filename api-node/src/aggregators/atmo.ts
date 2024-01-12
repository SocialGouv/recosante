import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dotenv from 'dotenv';
import { type MunicipalityJSON } from '~/types/municipality';
import municipalitiesJson from './../../data/municipalities.json';
import { AIRPARIF_API_KEY } from '~/config';
import { capture } from '~/third-parties/sentry';

dotenv.config({ path: './.env' });
dayjs.extend(utc);

let now = Date.now();
function logStep(step: string) {
  console.log(Date.now() - now, step);
  now = Date.now();
}
const nowUtcFormat = dayjs.utc().format();

// Types \\
type Response = {
  attributes: {
    date_ech: number;
    code_qual: number;
    lib_qual: string;
    coul_qual: string;
    date_dif: number;
    source: string;
    type_zone: string;
    code_zone: string;
    lib_zone: string;
    code_no2: number;
    code_so2: number;
    code_o3: number;
    code_pm10: number;
    code_pm25: number;
    conc_no2: number | null;
    conc_so2: number | null;
    conc_o3: number | null;
    conc_pm10: number | null;
    conc_pm25: number | null;
    x_wgs84: number;
    y_wgs84: number;
    x_reg: number;
    y_reg: number;
    epsg_reg: string;
    ESRI_OID: number;
  };
  geometry: {
    x: number;
    y: number;
  };
};

type AtmoSchema = Record<
  string,
  {
    no2: number;
    so2: number;
    o3: number;
    pm10: number;
    pm25: number;
    max_value: number;
  }
>;

// URL \\
const CORSE_URL =
  "https://services9.arcgis.com/VQopoXNvUqHYZHjY/arcgis/rest/services/indice_atmo_communal_corse/FeatureServer/0/query?outFields=*&outSR=4326&f=json&orderByFields=date_ech DESC&where=date_ech >= CURRENT_DATE - INTERVAL '1' DAY";

const GRAND_EST_URL =
  'https://opendata.arcgis.com/api/v3/datasets/b0d57e8f0d5e4cb786cb554eb15c3bcb_0/downloads/data?format=geojson&spatialRefId=4326';

const GUADELOUPE_URL =
  "https://services8.arcgis.com/7RrxpwWeFIQ8JGGp/arcgis/rest/services/ind_guadeloupe_1/FeatureServer/0/query?outFields=*&outSR=4326&f=json&orderByFields=date_ech DESC&where=date_ech >= CURRENT_DATE - INTERVAL '1' DAY";
const HAUTS_DE_FRANCE_URL =
  "https://services8.arcgis.com/rxZzohbySMKHTNcy/arcgis/rest/services/ind_hdf_2021/FeatureServer/0/query?outFields=*&outSR=4326&f=json&orderByFields=date_ech DESC&where=date_ech >= CURRENT_DATE - INTERVAL '1' DAY";

const MARTINIQUE_URL =
  'https://services1.arcgis.com/y8pKCLYeLI1K2217/arcgis/rest/services/Indice_QA/FeatureServer/0/query?where=1=1&f=json&returnGeometry=False&orderByFields=ESRI_OID&outFields=*';

const NORMANDIE_URL =
  'https://api.atmonormandie.fr/index.php/lizmap/service/?project=flux_indice_atmo_normandie&repository=dindice&OUTPUTFORMAT=GeoJSON&SERVICE=WFS&REQUEST=GetFeature&dl=1&TYPENAME=ind_normandie_3jours&VERSION=1.0.0';

const NOUVELLE_AQUITAINE_URL =
  'https://opendata.atmo-na.org/geoserver/alrt3j_nouvelle_aquitaine/wfs?service=wfs&request=getfeature&typeName=alrt3j_nouvelle_aquitaine:alrt3j_nouvelle_aquitaine&outputFormat=json&PropertyName=code_zone,lib_zone,date_ech,date_dif,code_pol,lib_pol,etat,couleur,com_court,com_long';

const PAYS_DE_LA_LOIRE_URL = `https://data.airpl.org/geoserver/ind_pays_de_la_loire/wfs?version=2.0.0&typeName=ind_pays_de_la_loire:ind_pays_de_la_loire&service=WFS&outputFormat=application/json&request=GetFeature&CQL_FILTER=date_ech >= ${nowUtcFormat}`;
const SUD_URL = `https://geoservices.atmosud.org/geoserver/ind_sudpaca/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=ind_sudpaca:ind_sudpaca&CQL_FILTER=date_ech >= ${nowUtcFormat}&outputFormat=json`;

// 8 DEPTS OF ILE DE FRANCE
const ILE_DE_FRANCE_DEPARTEMENTS_CODE = [
  '75',
  '77',
  '78',
  '91',
  '92',
  '93',
  '94',
  '95',
];
// Retrieve all insee code of Ile de France
const municipalities = municipalitiesJson as MunicipalityJSON[];
const ileDeFranceInseeCodes = ILE_DE_FRANCE_DEPARTEMENTS_CODE.map((code) => {
  return municipalities
    .filter((municipality) => municipality.DEP === code)
    .map((municipality) => municipality.COM)
    .flat();
})
  .flat()
  .slice(0, 10);
// TODO: remove slice(0, 10) but we need to fetch all insee code of Ile de France ... (too long)

function getIleDeFranceInseeCodeQueryParams() {
  const query = ileDeFranceInseeCodes
    .map((code, index) => {
      if (index === 0) return `?insee=${code}`;
      return `insee=${code}`;
    })
    .join('&');
  return query;
}
const ILE_DE_FRANCE_URL = `https://api.airparif.asso.fr/indices/prevision/commune${getIleDeFranceInseeCodeQueryParams()}`;

function formatResponse(data: Response[]): AtmoSchema[] {
  return data.map((feature) => {
    if (!feature.attributes) throw new Error('attributes is undefined');
    const { attributes } = feature;
    const { code_no2, code_so2, code_o3, code_pm10, code_pm25, code_zone } =
      attributes;
    return {
      [code_zone]: {
        no2: code_no2,
        so2: code_so2,
        o3: code_o3,
        pm10: code_pm10,
        pm25: code_pm25,
        max_value: Math.max(code_no2, code_so2, code_o3, code_pm10, code_pm25),
      },
    };
  });
}

export async function getAtmoIndicator() {
  const getCorseAtmo: AtmoSchema[] = await fetch(CORSE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`getCorseAtmo error! status: ${response.status}`);
      }
      const data = await response.json();
      logStep('getCorseAtmo DONE');
      return formatResponse(data.features);
    },
  );
  const getGrandEstAtmo: AtmoSchema[] = await fetch(GRAND_EST_URL).then(
    async (response) => {
      type GrandEstResponse = {
        type: 'Feature';
        properties: {
          id: number;
          date_ech: string; // ISO 8601 date format
          code_qual: number;
          lib_qual: string;
          coul_qual: string; // Hex color code
          date_dif: string; // ISO 8601 date format
          source: string;
          type_zone: string;
          code_zone: string;
          lib_zone: string;
          code_no2: number;
          code_so2: number;
          code_o3: number;
          code_pm10: number;
          code_pm25: number;
          x_wgs84: number;
          y_wgs84: number;
          x_reg: number;
          y_reg: number;
          epsg_reg: string;
        };
        geometry: {
          type: 'Point';
          coordinates: number[]; // Array of numbers for coordinates
        };
      };

      if (!response.ok) {
        throw new Error(`getGrandEstAtmo error! status: ${response.status}`);
      }

      const data = await response.json();
      // TODO: validate data
      logStep('getGrandEstAtmo DONE');
      return data.features.map((feature: GrandEstResponse) => {
        if (!feature.properties) throw new Error('properties is undefined');
        const { properties } = feature;
        const { code_no2, code_so2, code_o3, code_pm10, code_pm25, code_zone } =
          properties;
        return {
          [code_zone]: {
            no2: code_no2,
            so2: code_so2,
            o3: code_o3,
            pm10: code_pm10,
            pm25: code_pm25,
            max_value: Math.max(
              code_no2,
              code_so2,
              code_o3,
              code_pm10,
              code_pm25,
            ),
          },
        };
      });
    },
  );
  const getGuadeloupeAtmo: AtmoSchema[] = await fetch(GUADELOUPE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`getGuadeloupeAtmo error! status: ${response.status}`);
      }
      const data = await response.json();
      logStep('getGuadeloupeAtmo DONE');
      return formatResponse(data.features);
    },
  );
  const getHautsDeFranceAtmo: AtmoSchema[] = await fetch(
    HAUTS_DE_FRANCE_URL,
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getHautsDeFranceAtmo error! status: ${response.status}`);
    }
    const data = await response.json();
    logStep('getHautsDeFranceAtmo DONE');
    return formatResponse(data.features);
  });
  const getMartiniqueAtmo: AtmoSchema[] = await fetch(MARTINIQUE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`getMartiniqueAtmo error! status: ${response.status}`);
      }

      type MartiniqueResponse = {
        attributes: {
          date_ech: number;
          valeur: number;
          qualif: string;
          source: string;
          type_zone: string;
          code_zone: string;
          lib_zone: string;
          val_no2: number;
          val_so2: number;
          val_o3: number;
          val_pm10: number;
          couleur: string;
          x_wgs84: number;
          y_wgs84: number;
          x_reg: number;
          y_reg: number;
          ESRI_OID: number;
        };
      };
      const data = await response.json();
      logStep('getMartiniqueAtmo DONE');
      return data.features.map((feature: MartiniqueResponse) => {
        if (!feature.attributes) throw new Error('attributes is undefined');
        const { attributes } = feature;
        const { val_no2, val_so2, val_o3, val_pm10, code_zone } = attributes;
        return {
          [code_zone]: {
            no2: val_no2,
            so2: val_so2,
            o3: val_o3,
            pm10: val_pm10,
            pm25: null,
            max_value: Math.max(val_no2, val_so2, val_o3, val_pm10),
          },
        };
      });
    },
  );
  const getNormandieAtmo: AtmoSchema[] = await fetch(NORMANDIE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`getNormandieAtmo error! status: ${response.status}`);
      }

      type NormandieResponse = {
        type: 'Feature';
        id: string;
        bbox: number[];
        geometry: {
          type: 'Point';
          coordinates: number[];
        };
        properties: {
          id: number;
          date_ech: string;
          code_qual: number;
          lib_qual: string;
          coul_qual: string;
          date_dif: string;
          source: string;
          type_zone: string;
          code_zone: string;
          lib_zone: string;
          code_no2: number;
          code_so2: number;
          code_o3: number;
          code_pm10: number;
          code_pm25: number;
          x_wgs84: number;
          y_wgs84: number;
          x_reg: number;
          y_reg: number;
          epsg_reg: string;
        };
      };
      const data = await response.json();
      logStep('getNormandieAtmo DONE');
      return data.features.map((feature: NormandieResponse) => {
        if (!feature.properties) throw new Error('properties is undefined');
        const { properties } = feature;
        const { code_no2, code_so2, code_o3, code_pm10, code_pm25, code_zone } =
          properties;
        return {
          [code_zone]: {
            no2: code_no2,
            so2: code_so2,
            o3: code_o3,
            pm10: code_pm10,
            pm25: code_pm25,
            max_value: Math.max(
              code_no2,
              code_so2,
              code_o3,
              code_pm10,
              code_pm25,
            ),
          },
        };
      });
    },
  );

  // TODO: Checker le payload et voir ce qu'on peut faire
  const getNouvelleAquitaineAtmo = await fetch(NOUVELLE_AQUITAINE_URL).then(
    async (response) => {
      if (!response.ok) {
        capture(`getNouvelleAquitaineAtmo error! status: ${response.status}`, {
          extra: { response },
        });
        return [];
      }

      // type AquitaineResponse = {
      //   type: string;
      //   id: string;
      //   geometry: null;
      //   properties: {
      //     code_zone: string;
      //     lib_zone: string;
      //     date_ech: string;
      //     date_dif: string;
      //     code_pol: string;
      //     lib_pol: string;
      //     etat: string;
      //     couleur: string;
      //     com_court: string | null;
      //     com_long: string | null;
      //   };
      // };

      const data = await response.json();
      logStep('getNouvelleAquitaineAtmo DONE');
      return data;
    },
  );
  const getPaysDeLaLoireAtmo = await fetch(PAYS_DE_LA_LOIRE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(
          `getPaysDeLaLoireAtmo error! status: ${response.status}`,
        );
      }
      type PaysDeLaLoireResponse = {
        type: 'Feature';
        id: string;
        geometry: {
          type: 'Point';
          coordinates: number[];
        };
        geometry_name: string;
        properties: {
          date_ech: string; // ISO 8601 date format
          code_qual: number;
          lib_qual: string;
          coul_qual: string; // Hex color code
          date_dif: string; // ISO 8601 date format
          source: string;
          type_zone: string;
          code_zone: string;
          lib_zone: string;
          code_no2: number;
          code_so2: number;
          code_o3: number;
          code_pm10: number;
          code_pm25: number;
          x_wgs84: number;
          y_wgs84: number;
          x_reg: number;
          y_reg: number;
          epsg_reg: string;
        };
      };
      const data = await response.json();
      logStep('getPaysDeLaLoireAtmo DONE');

      return data.features.map((feature: PaysDeLaLoireResponse) => {
        if (!feature.properties) throw new Error('properties is undefined');
        const { properties } = feature;
        const { code_no2, code_so2, code_o3, code_pm10, code_pm25 } =
          properties;
        return {
          no2: code_no2,
          so2: code_so2,
          o3: code_o3,
          pm10: code_pm10,
          pm25: code_pm25,
          max_value: Math.max(
            code_no2,
            code_so2,
            code_o3,
            code_pm10,
            code_pm25,
          ),
        };
      });
    },
  );
  const getSudAtmo: AtmoSchema[] = await fetch(SUD_URL).then(
    async (response) => {
      if (!response.ok) {
        capture(`getSudAtmo error! status: ${response.status}`, {
          extra: { response },
        });
        return [];
      }
      type SudResponse = {
        type: 'Feature';
        id: string;
        geometry: {
          type: 'Point';
          coordinates: number[];
        };
        geometry_name: string;
        properties: {
          date_ech: string; // ISO 8601 date format
          code_qual: number;
          lib_qual: string;
          coul_qual: string; // Hex color code
          date_dif: string; // ISO 8601 date format
          source: string;
          type_zone: string;
          code_zone: string;
          lib_zone: string;
          code_no2: number;
          code_so2: number;
          code_o3: number;
          code_pm10: number;
          code_pm25: number;
          x_wgs84: number;
          y_wgs84: number;
          x_reg: number;
          y_reg: number;
          epsg_reg: string;
          conc_no2: number | null;
          conc_so2: number | null;
          conc_o3: number | null;
          conc_pm10: number | null;
          conc_pm25: number | null;
        };
      };
      const data = await response.json();
      logStep('getSudAtmo DONE');
      return data.features.map((feature: SudResponse) => {
        if (!feature.properties) throw new Error('properties is undefined');
        const { properties } = feature;
        const { code_no2, code_so2, code_o3, code_pm10, code_pm25, code_zone } =
          properties;
        return {
          [code_zone]: {
            no2: code_no2,
            so2: code_so2,
            o3: code_o3,
            pm10: code_pm10,
            pm25: code_pm25,
            max_value: Math.max(
              code_no2,
              code_so2,
              code_o3,
              code_pm10,
              code_pm25,
            ),
          },
        };
      });
    },
  );
  const getIleDeFranceAtmo = await fetch(ILE_DE_FRANCE_URL, {
    headers: {
      'X-Api-Key': AIRPARIF_API_KEY,
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getIleDeFranceAtmo error! status: ${response.status}`);
    }

    type IleDeFranceItem = {
      date: string;
      no2: string;
      o3: string;
      pm10: string;
      pm25: string;
      so2: string;
      indice: string;
    };

    type IleDeFranceResponse = Record<string, IleDeFranceItem[]>;
    const data = await response.json();
    logStep('getIleDeFranceAtmo DONE');
    return data as IleDeFranceResponse[];
  });
  Promise.all([
    getCorseAtmo,
    getGrandEstAtmo,
    getGuadeloupeAtmo,
    getHautsDeFranceAtmo,
    getMartiniqueAtmo,
    getNormandieAtmo,
    getNouvelleAquitaineAtmo,
    getPaysDeLaLoireAtmo,
    getSudAtmo,
    getIleDeFranceAtmo,
  ]).then(async (responses) => {
    // type AtmoByDepartment = Record<string, {
    //     no2: number;
    //     so2: number;
    //     o3: number;
    //     pm10: number;
    //     pm25: number;
    //     max_value: number;
    //   }>;
    let atmoByDepartment = responses.flat();
    atmoByDepartment = Object.entries(atmoByDepartment).flat();
    return atmoByDepartment;
    // TODO: Il y'a des doublons dans les données
    // 1. Une des causes est que certaines api retournent des données pour deux jours (ile de france notamment)
    // 2. Une autre cause est que certaines api retournent des données pour plusieurs communes
    // A CHECKER !!

    // console.dir(atmoByDepartment, { maxArrayLength: null });

    // const municipalities: Array<MunicipalityJSON> = await new Promise(
    //   (resolve) => {
    //     fs.readFile('./data/municipalities.json', 'utf8', async (err, data) => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       const municipalities = JSON.parse(data);
    //       resolve(municipalities);
    //     });
    //   },
    // );
    // logStep('fetching municipalities DONE');
    // const atmoRows = [];
    // for (const municipality of municipalities) {
    //   const atmoData = atmoByDepartment[municipality.DEP];
    //   console.log(atmoData);
    //   // TODO: Le formatage n'est pas ok;
    //   // if no data for this department, we say that data is not available.
    //   if (!atmoData) {
    //     atmoRows.push({
    //       // diffusion_date: diffusionDate,
    //       // validity_start: diffusionDate,
    //       // validity_end: validityEnd,
    //       municipality_insee_code: municipality.COM,
    //       data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
    //     });
    //     continue;
    //   }
    //   atmoRows.push({
    //     // diffusion_date: diffusionDate,
    //     // validity_start: diffusionDate,
    //     // validity_end: validityEnd,
    //     municipality_insee_code: municipality.COM,
    //     data_availability: DataAvailabilityEnum.AVAILABLE,
    //     no2: atmoData.no2,
    //     so2: atmoData.so2,
    //     o3: atmoData.o3,
    //     pm10: atmoData.pm10,
    //     pm25: atmoData.pm25,
    //     max_value: atmoData.max_value,
    //   });
    // }
  });
}
