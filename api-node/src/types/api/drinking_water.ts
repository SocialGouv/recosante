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

export type CodeParametreSISEEaux =
  | 'PH'
  | 'TEAU'
  | 'PESTOT'
  | 'COULF'
  | 'SAVQ'
  | 'COULQ'
  | 'ASP'
  | 'ODQ';

export type LibelleParametre = string;

type LibelleParametreMaj = string;

export interface ParameterInDataRow {
  value: string;
  conformity: ConformityEnum;
  code_prelevement: string;
  date_prelevement: string | null;
  conclusion_conformite_prelevement: string; // this is what we use for recommandation
}

export interface PrelevementResult {
  // code_departement?: string;
  // nom_departement?: string;
  code_prelevement: string; // useful
  // code_parametre?: string;
  code_parametre_se: CodeParametreSISEEaux; // useful
  // code_parametre_cas?: string;
  libelle_parametre: LibelleParametre; // useful
  libelle_parametre_maj: LibelleParametreMaj; // useful
  // libelle_parametre_web?: string;
  code_type_parametre?: 'O' | 'N'; // O is qualitative, N is quantitative
  // code_lieu_analyse?: 'T' | 'L'; // Type de résultat Terrain ou Laboratoire
  resultat_alphanumerique?: string; // useful
  resultat_numerique: string; // useful
  libelle_unite?: string; // useful when code_type_parametre is N (quantitative)
  // code_unite?: string;
  limite_qualite_parametre?: string; // useful
  reference_qualite_parametre?: string; // useful
  // code_commune?: string;
  // nom_commune?: string;
  nom_uge?: string;
  nom_distributeur?: string;
  nom_moa?: string;
  date_prelevement: string; // useful
  conclusion_conformite_prelevement?: string; // super useful
  conformite_limites_bact_prelevement?: ConformityEnum;
  conformite_limites_pc_prelevement?: ConformityEnum;
  conformite_references_bact_prelevement?: ConformityEnum;
  conformite_references_pc_prelevement?: ConformityEnum;
  // reference_analyse?: string;
  // code_installation_amont?: string;
  // nom_installation_amont?: string;
  // reseaux?: Array<{
  //   code?: string;
  //   nom?: string;
  //   debit?: string;
  // }>;
}

export interface HubEAUResponse {
  count: number;
  first: string; // "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=014000659&page=1&size=200",
  last: string | null; // "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=014000659&page=2&size=200",
  prev: string | null;
  next: string | null; // "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_reseau=014000659&page=2&size=200",
  api_version: 'v1';
  data: Array<PrelevementResult>;
}
