import type { Municipality, User } from '@prisma/client';

export enum ConformityEnum {
  CONFORM = 'C', // Conforme
  CONFORM_DEROGATION = 'D', // Conforme dans le cadre d’une dérogation
  NOT_CONFORM = 'N', // Non conforme
  NOT_TESTED = 'S', // Sans objet lorsqu'aucun paramètre microbio n'a été mesuré
}

export enum ConformityStatusEnum {
  CONFORM = 'Conforme', // Conforme
  CONFORM_DEROGATION = 'Conforme', // Conforme dans le cadre d’une dérogation
  NOT_CONFORM = 'Non conforme', // Non conforme
  NOT_TESTED = 'Pas de mesure', // Sans objet lorsqu'aucun paramètre microbio n'a été mesuré
}

export enum ConformityNumberEnum {
  CONFORM = 0, // Conforme
  CONFORM_DEROGATION = 0, // Conforme dans le cadre d’une dérogation
  NOT_CONFORM = 1, // Non conforme
  NOT_TESTED = 0, // Sans objet lorsqu'aucun paramètre microbio n'a été mesuré
}

export type CodeParametreSISEEauxTop50 =
  | 'A2H' //	ATRAZINE-2-HYDROXY
  | 'ACRYL' //	ACRYLAMIDE
  | 'ADET' //	ATRAZINE DÉSÉTHYL
  | 'ADSP' //	ATRAZINE-DÉISOPROPYL
  | 'ALTMICR' //	ALUMINIUM TOTAL µG/L
  | 'ASP' //	ASPECT (QUALITATIF)
  | 'ATRZ' //	ATRAZINE
  | 'BRF' //	BROMOFORME
  | 'BSIR' //	BACT. ET SPORES SULFITO-RÉDU./100ML
  | 'CA' //	CALCIUM
  | 'CDT25' //	CONDUCTIVITÉ À 25°C
  | 'CL' //	CHLORURES
  | 'CL2COMB' //	CHLORE COMBINÉ
  | 'CL2LIB' //	CHLORE LIBRE
  | 'CL2TOT' //	CHLORE TOTAL
  | 'CLF' //	CHLOROFORME
  | 'CLO2' //	BIOXYDE DE CHLORE MG/L CLO2
  | 'CLVYL' //	CHLORURE DE VINYL MONOMÈRE
  | 'COT' //	CARBONE ORGANIQUE TOTAL
  | 'COULF' //	COLORATION
  | 'COULQ' //	COULEUR (QUALITATIF)
  | 'CTF' //	BACTÉRIES COLIFORMES /100ML-MS
  | 'DBRMCL' //	CHLORODIBROMOMÉTHANE
  | 'DCLMBR' //	DICHLOROMONOBROMOMÉTHANE
  | 'ECOLI' //	ESCHERICHIA COLI /100ML - MF
  | 'FET' //	FER TOTAL
  | 'GT22_68' //	BACT. AÉR. REVIVIFIABLES À 22°-68H
  | 'GT36_44' //	BACT. AÉR. REVIVIFIABLES À 36°-44H
  | 'HCO3' //	HYDROGÉNOCARBONATES
  | 'MG' //	MAGNÉSIUM
  | 'MN' //	MANGANÈSE TOTAL
  | 'MTCESA' //	ESA METOLACHLORE
  | 'NH4' //	AMMONIUM (EN NH4)
  | 'NO2' //	NITRITES (EN NO2)
  | 'NO3' //	NITRATES (EN NO3)
  | 'NO3_NO2' //	NITRATES/50 + NITRITES/3
  | 'ODQ' //	ODEUR (QUALITATIF)
  | 'PESTOT' //	TOTAL DES PESTICIDES ANALYSÉS
  | 'PH' //	PH
  | 'SAVQ' //	SAVEUR (QUALITATIF)
  | 'SO4' //	SULFATES
  | 'STRF' //	ENTÉROCOQUES /100ML-MS
  | 'TA' //	TITRE ALCALIMÉTRIQUE
  | 'TAC' //	TITRE ALCALIMÉTRIQUE COMPLET
  | 'TAIR' //	TEMPÉRATURE DE L'AIR
  | 'TEAU' //	TEMPÉRATURE DE L'EAU
  | 'TEMP_PH' //	TEMPÉRATURE DE MESURE DU PH
  | 'TH' //	TITRE HYDROTIMÉTRIQUE
  | 'THM4' //	TRIHALOMÉTHANES (4 SUBSTANCES)
  | 'TURBNFU'; //	TURBIDITÉ NÉPHÉLOMÉTRIQUE NFU

export type LibelleParametre = string;

type LibelleParametreMaj = string;

export interface ParameterInDataRow {
  value: string;
  conformity: ConformityEnum;
  code_prelevement: string;
  date_prelevement: string | null;
  conclusion_conformite_prelevement: string; // this is what we use for recommandation
}

// https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/resultats
export interface HubEAUResultsParameters {
  borne_inf_resultat?: number;
  borne_sup_resultat?: number;
  code_commune?: Array<Municipality['COM']>;
  code_departement?: Array<Municipality['DEP']>;
  code_lieu_analyse?: 'T' | 'L';
  code_parametre?: Array<string>;
  code_parametre_cas?: Array<string>;
  code_parametre_se?: Array<CodeParametreSISEEauxTop50>;
  code_prelevement?: string;
  code_reseau?: Array<User['udi']>;
  conformite_limites_bact_prelevement?: ConformityEnum;
  conformite_limites_pc_prelevement?: ConformityEnum;
  conformite_references_bact_prelevement?: ConformityEnum;
  conformite_references_pc_prelevement?: ConformityEnum;
  date_max_prelevement?: string; // YYYY-MM-DD
  date_min_prelevement?: string; // YYYY-MM-DD
  fields?: Array<keyof PrelevementResult>;
  libelle_parametre?: string;
  libelle_parametre_maj?: string;
  nom_commune?: Array<string>;
  nom_distributeur?: string;
  nom_moa?: string;
  page?: number;
  size?: number;
  sort?: 'asc' | 'desc';
}

export interface PrelevementResult {
  code_departement: string;
  nom_departement: string;
  code_prelevement: string; // useful
  code_parametre: string;
  code_parametre_se: CodeParametreSISEEauxTop50; // useful
  code_parametre_cas: string;
  libelle_parametre: LibelleParametre; // useful
  libelle_parametre_maj: LibelleParametreMaj; // useful
  libelle_parametre_web: string;
  code_type_parametre: 'O' | 'N'; // O is qualitative, N is quantitative
  code_lieu_analyse: 'T' | 'L'; // Type de résultat Terrain ou Laboratoire
  resultat_alphanumerique: string; // useful
  resultat_numerique: string; // useful
  libelle_unite: string; // useful when code_type_parametre is N (quantitative)
  code_unite: string;
  limite_qualite_parametre: string; // useful
  reference_qualite_parametre: string; // useful
  code_commune: string;
  nom_commune: string;
  nom_uge: string;
  nom_distributeur: string;
  nom_moa: string;
  date_prelevement: string; // useful
  conclusion_conformite_prelevement: string; // super useful
  conformite_limites_bact_prelevement: ConformityEnum;
  conformite_limites_pc_prelevement: ConformityEnum;
  conformite_references_bact_prelevement: ConformityEnum;
  conformite_references_pc_prelevement: ConformityEnum;
  reference_analyse?: string;
  code_installation_amont?: string;
  nom_installation_amont?: string;
  reseaux?: Array<{
    code?: string;
    nom?: string;
    debit?: string;
  }>;
}

export type ShortPrelevementResult = Pick<
  PrelevementResult,
  | 'code_prelevement'
  | 'date_prelevement'
  | 'conclusion_conformite_prelevement'
  | 'conformite_limites_bact_prelevement'
  | 'conformite_limites_pc_prelevement'
  | 'conformite_references_bact_prelevement'
  | 'conformite_references_pc_prelevement'
>;

export interface ExtendedShortPrelevementResult extends ShortPrelevementResult {
  parameters_count: number;
}

interface HubEAUResponse<T> {
  count: number;
  first: string; // "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=014000659&page=1&size=200",
  last: string | null; // "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=014000659&page=2&size=200",
  prev: string | null;
  next: string | null; // "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=014000659&page=2&size=200",
  api_version: 'v1';
  data: Array<T>;
}

export type HubEAUCompleteResponse = HubEAUResponse<PrelevementResult>;
export type HubEAUShortResponse = HubEAUResponse<ShortPrelevementResult>;
