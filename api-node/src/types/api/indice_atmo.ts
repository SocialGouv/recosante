import type { MunicipalityJSON, EPCIJSON } from '~/types/municipality';

export enum IndiceAtmoAPIDataIdsEnum {
  indice_current_year = 112,
  episodes_pollution_current_year = 113,
  episodes_pollution_yesterday_today_tomorrow = 114,
  emissions_regions = 119,
}

export type YYYYMMDD = string; // Expected format: YYYY-MM-DD

// Pour les qualificatifs des sous-indices et de l’indice ATMO, les valeurs possibles vont
// - de 1 (bon) à 6 (extrêmement mauvais)
// - avec 0 (indisponible)
// - et 8 (événement).
export enum PolluantQualificatifsNumberEnum {
  NOT_AVAILABLE = 0,
  SPECIAL_EVENT = 8,
  GOOD = 1,
  FAIR = 2,
  MODERATE = 3,
  POOR = 4,
  VERY_POOR = 5,
  EXTREMELY_POOR = 6,
}

export enum PolluantQualificatifsLabelEnum {
  GOOD = 'Bon',
  FAIR = 'Moyen',
  MODERATE = 'Dégradé',
  POOR = 'Mauvais',
  VERY_POOR = 'Très Mauvais',
  EXTREMELY_POOR = 'Extrêmement Mauvais',
}

// source: https://www.atmo-auvergnerhonealpes.fr/sites/aura/files/content/migrated/atoms/files/atmo_ppt-kit-com-nouvel-indice-v2_0.pdf
export enum PolluantQualificatifsColorEnum {
  GOOD = '#50f0e6',
  FAIR = '#50ccaa',
  MODERATE = '#f0e641',
  POOR = '#ff5050',
  VERY_POOR = '#960032',
  EXTREMELY_POOR = '#872181',
}

export enum SourcesEnum {
  QUALITAIR_CORSE = 'Qualitair Corse',
  ATMO_SUD = 'AtmoSud',
  ATMO_AUVERGNE_RHONE_ALPES = 'Atmo Auvergne-Rhône-Alpes',
  ATMO_OCCITANIE = 'Atmo-Occitanie',
  ATMO_NOUVELLE_AQUITAINE = 'Atmo Nouvelle-Aquitaine',
  AIR_BREIZH = 'Air Breizh',
  AIR_PAYS_DE_LA_LOIRE = 'Air Pays de la Loire',
  ATMO_GRAND_EST = 'Atmo Grand Est',
  ATMO_HDF = 'Atmo HDF',
  ATMO_GUYANE = 'Atmo Guyane',
  ATMO_BOURGOGNE_FRANCHE_COMTE = 'ATMO Bourgogne-Franche-Comté',
  LIG_AIR = "Lig'Air",
  MADININAIR = 'Madininair',
  GWAD_AIR = "Gwad'Air",
  AIRPARIF = 'Airparif',
}

export enum TypeZoneEnum {
  MUNICIPALITY = 'commune',
  EPCI = 'EPCI',
}

export enum ESPGEnum {
  Lambert93 = '2154',
  WGS84 = '4326',
  Lambert93Alt = '5490',
}

type IndiceAtmoSearchOperatorIndice = {
  code_zone: MunicipalityJSON['COM']; // code commune ou EPCI selon l’INSEE ;
  date_ech: YYYYMMDD; // date de l’indice, au format international (YYYY-MM-DD) ;
  code_no2: PolluantQualificatifsNumberEnum; // qualificatif pour le sous-indice du polluant NO₂ ;
  code_o3: PolluantQualificatifsNumberEnum; // qualificatif pour le sous-indice du polluant l’indice O₃ ;
  code_pm10: PolluantQualificatifsNumberEnum; // qualificatif pour le sous-indice du polluant PM10 ;
  code_pm25: PolluantQualificatifsNumberEnum; // qualificatif pour le sous-indice du polluant PM2,5 ;
  code_so2: PolluantQualificatifsNumberEnum; // qualificatif pour le sous-indice du polluant l’indice SO₂ ;
  code_qual: PolluantQualificatifsNumberEnum; // qualificatif de l’indice ATMO.
};

type IndiceAtmoLibPol = 'PM2.5' | 'PM10' | 'O3' | 'NO2' | 'SO2';

export type IndiceAtmoSearchOperatorEpisodePollution = {
  code_zone: MunicipalityJSON['DEP']; // code département selon l’INSEE;
  date_ech: YYYYMMDD; // date de l’alerte, au format international (YYYY-DD-MM);
  etat: 'information et recommandation' | 'alerte sur persistance' | 'alerte'; // niveau d’alerte
  lib_pol: IndiceAtmoLibPol; // le polluant déclencheur
};

type IndiceAtmoCodePCAET = {
  '34': string; // Résidentiel-Tertiaire
  All: string; // tous secteurs confondus
  '2': string; // Industrie manufacturière et construction
  '5': string; // Agriculture, pisciculture et aquaculture
  '6': string; // Transport routier
  '7': string; // Mode de transport autre que le routier
};

interface IndiceAtmoEmissionsRegions {
  code: MunicipalityJSON['REG']; //  code région selon l’INSEE
  code_pcaet: IndiceAtmoCodePCAET; // Les codes des secteurs au format PCAET
  ges: string; // Emissions de gaz à effet de serre
  nox: string; // Emissions d’oxydes d’azote
  pm10: string; // Emissions de particules de diamètre inférieur à 10 µm
  pm25: string; // Emissions de particules de diamètre inférieur à 2,5 µm
  population: string; //  La population de la région
  Superficie: string; //  La superficie de la région
}

export interface IndiceAtmoSearchOperator {
  indice_current_year: IndiceAtmoSearchOperatorIndice;
  episodes_pollution_current_year: IndiceAtmoSearchOperatorEpisodePollution;
  episodes_pollution_yesterday_today_tomorrow: IndiceAtmoSearchOperatorEpisodePollution;
  emissions_regions: IndiceAtmoEmissionsRegions;
}

export interface IndiceAtmoByCodeZone {
  gml_id: number; // example: 835197777; no idea what this is
  aasqa: MunicipalityJSON['DEP'];
  date_maj: string; // example: '2024/01/16 12:11:49.728+01';
  partition_field: string; // example: '112024w3'; no idea what this is
  code_no2: PolluantQualificatifsNumberEnum;
  code_o3: PolluantQualificatifsNumberEnum;
  code_pm10: PolluantQualificatifsNumberEnum;
  code_pm25: PolluantQualificatifsNumberEnum;
  code_qual: PolluantQualificatifsNumberEnum;
  code_so2: PolluantQualificatifsNumberEnum;
  code_zone: MunicipalityJSON['COM'] | EPCIJSON['EPCI'];
  coul_qual: PolluantQualificatifsColorEnum;
  date_dif: string; // example: '2024/01/16';
  date_ech: string; // example: '2024-01-15';
  epsg_reg: ESPGEnum; // EPSG Geodetic Parameter Dataset
  lib_qual: PolluantQualificatifsLabelEnum;
  lib_zone: string; // Label/name of Municipality or EPCI. example: 'Gastins';
  source: SourcesEnum;
  type_zone: TypeZoneEnum;
  x_reg: number; // example: 650403.898030424;
  x_wgs84: number; // example: 3.01999928628953;
  y_reg: number; // example: 2403379.42595027;
  y_wgs84: number; // example: 48.6270847202683;
}

export type IndiceAtmoAPIResponse = {
  type: 'FeatureCollection';
  name: 'national_data.national_ind_atmo';
  crs: {
    type: 'name';
    properties: {
      name: string; // example: 'urn:ogc:def:crs:EPSG::3857';
    };
  };
  features: Array<{
    type: 'Feature';
    geometry: null;
    properties: IndiceAtmoByCodeZone;
  }>;
};
