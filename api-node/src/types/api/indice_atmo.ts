import type { MunicipalityJSON } from '~/types/municipality';

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
type PolluantQualificatifs = {
  NotAvailable: '0';
  SpecialEvent: '8';
  Specified: '1' | '2' | '3' | '4' | '5' | '6';
};

type IndiceAtmoSearchOperatorIndice = {
  code_zone: MunicipalityJSON['COM']; // code commune ou EPCI selon l’INSEE ;
  date_ech: YYYYMMDD; // date de l’indice, au format international (YYYY-MM-DD) ;
  code_no2: PolluantQualificatifs; // qualificatif pour le sous-indice du polluant NO₂ ;
  code_o3: PolluantQualificatifs; // qualificatif pour le sous-indice du polluant l’indice O₃ ;
  code_pm10: PolluantQualificatifs; // qualificatif pour le sous-indice du polluant PM10 ;
  code_pm25: PolluantQualificatifs; // qualificatif pour le sous-indice du polluant PM2,5 ;
  code_so2: PolluantQualificatifs; // qualificatif pour le sous-indice du polluant l’indice SO₂ ;
  code_qual: PolluantQualificatifs; // qualificatif de l’indice ATMO.
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
