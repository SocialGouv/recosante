import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import dotenv from 'dotenv';
import { MunicipalityJSON } from '~/types/municipality';
dotenv.config({ path: './.env' });
dayjs.extend(utc);

let now = Date.now();
function logStep(step: string) {
  console.log(Date.now() - now, step);
  now = Date.now();
}
const nowUtcFormat = dayjs.utc().format();

// Type \\
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

import municipalitiesJson from './../../data/municipalities.json';

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

export async function getAtmoIndicator() {
  const getCorseAtmo = await fetch(CORSE_URL).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getCorseAtmo error! status: ${response.status}`);
    }
    const data = await response.json();
    // TODO: validate data
    logStep('getCorseAtmo DONE');
    return data.features as Response[];
  });
  const getGrandEstAtmo = await fetch(GRAND_EST_URL).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getGrandEstAtmo error! status: ${response.status}`);
    }

    const data = await response.json();
    // TODO: validate data
    logStep('getGrandEstAtmo DONE');
    return data.features as Response[];
  });
  const getGuadeloupeAtmo = await fetch(GUADELOUPE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`getGuadeloupeAtmo error! status: ${response.status}`);
      }
      const data = await response.json();
      // TODO: validate data
      logStep('getGuadeloupeAtmo DONE');
      return data.features as Response[];
    },
  );
  const getHautsDeFranceAtmo = await fetch(HAUTS_DE_FRANCE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(
          `getHautsDeFranceAtmo error! status: ${response.status}`,
        );
      }
      const data = await response.json();
      logStep('getHautsDeFranceAtmo DONE');
      return data.features as Response[];
    },
  );
  const getMartiniqueAtmo = await fetch(MARTINIQUE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`getMartiniqueAtmo error! status: ${response.status}`);
      }
      const data = await response.json();
      logStep('getMartiniqueAtmo DONE');
      return data.features as Response[];
    },
  );
  const getNormandieAtmo = await fetch(NORMANDIE_URL).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getNormandieAtmo error! status: ${response.status}`);
    }
    const data = await response.json();
    logStep('getNormandieAtmo DONE');
    return data.features as Response[];
  });

  const getNouvelleAquitaineAtmo = await fetch(NOUVELLE_AQUITAINE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(
          `getNouvelleAquitaineAtmo error! status: ${response.status}`,
        );
      }
      type AquitaineResponse = {
        type: string;
        id: string;
        geometry: null;
        properties: {
          code_zone: string;
          lib_zone: string;
          date_ech: string;
          date_dif: string;
          code_pol: string;
          lib_pol: string;
          etat: string;
          couleur: string;
          com_court: string | null;
          com_long: string | null;
        };
      };
      const data = await response.json();
      logStep('getNouvelleAquitaineAtmo DONE');
      return data.features as AquitaineResponse[];
    },
  );

  const getPaysDeLaLoireAtmo = await fetch(PAYS_DE_LA_LOIRE_URL).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(
          `getPaysDeLaLoireAtmo error! status: ${response.status}`,
        );
      }
      const data = await response.json();
      logStep('getPaysDeLaLoireAtmo DONE');
      return data.features as Response[];
    },
  );
  const getSudAtmo = await fetch(SUD_URL).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getSudAtmo error! status: ${response.status}`);
    }
    const data = await response.json();
    logStep('getSudAtmo DONE');
    return data.features as Response[];
  });
  const getIleDeFranceAtmo = await fetch(ILE_DE_FRANCE_URL, {
    headers: {
      'X-Api-Key': process.env.AIRPARIF_API_KEY as string,
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getIleDeFranceAtmo error! status: ${response.status}`);
    }
    const data = await response.json();
    logStep('getIleDeFranceAtmo DONE');
    return data as Response[];
  });
}
