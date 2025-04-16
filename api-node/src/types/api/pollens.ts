export enum PollensRiskNumberEnum {
  NO_RISK = 0,
  VERY_LOW = 1,
  LOW = 2,
  MODERATE = 3,
  HIGH = 4,
  VERY_HIGH = 5,
}

export enum PollensRiskStatusEnum {
  NO_DATA = 'Aucune donnée',
  NO_RISK = 'Risque nul',
  VERY_LOW = 'Très faible',
  LOW = 'Faible',
  MODERATE = 'Moyen',
  HIGH = 'Élevé',
  VERY_HIGH = 'Très élevé',
}

// Énum pour les identifiants des données de pollens dans l'API Atmo
export enum PollensAPIDataIdsEnum {
  pollens_current_year = 122, // Les risques d'allergie aux pollens sur l'année courante
}

// Type pour la date au format YYYY-MM-DD
export type DATE_CALENDAR_YYYY_MM_DD = string;

// Interface pour la réponse de l'API des pollens d'Atmo
export interface PollensAPIResponse {
  type: string;
  name: string;
  features: Array<{
    type: string;
    geometry: null;
    properties: PollensAPIProperties;
  }>;
}

// Interface pour les propriétés d'un enregistrement de pollens de l'API Atmo
export interface PollensAPIProperties {
  aasqa: string;
  date_maj: string;
  alerte: boolean;
  code_ambr?: number;
  code_arm?: number;
  code_aul?: number;
  code_boul?: number;
  code_gram?: number;
  code_oliv?: number;
  code_noix?: number;
  code_char?: number;
  code_chen?: number;
  code_chat?: number;
  code_cyp?: number;
  code_fren?: number;
  code_plat?: number;
  code_peup?: number;
  code_plant?: number;
  code_rum?: number;
  code_saul?: number;
  code_till?: number;
  code_urt?: number;

  conc_ambr?: number;
  conc_arm?: number;
  conc_aul?: number;
  conc_boul?: number;
  conc_gram?: number;
  conc_oliv?: number;
  conc_noix?: number;
  conc_char?: number;
  conc_chen?: number;
  conc_chat?: number;
  conc_cyp?: number;
  conc_fren?: number;
  conc_plat?: number;
  conc_peup?: number;
  conc_plant?: number;
  conc_rum?: number;
  conc_saul?: number;
  conc_till?: number;
  conc_urt?: number;

  code_zone: string; // Code de la zone (commune, département, etc.)
  date_dif: string; // Date de diffusion
  date_ech: string; // Date d'échéance
  lib_qual: string; // Libellé qualité (ex: "Faible")
  lib_zone: string; // Libellé zone (nom de la commune/département)
  type_zone: string; // Type de zone (commune, département, etc.)
  pollen_resp: string; // Pollen responsable (ex: "GRAMINEE")
  source: string;
  code_qual: number; // Code qualité global (0-5)
  name?: string;

  // Champs potentiellement présents mais pas dans l'exemple
  partition_field?: string;
  gml_id?: number;
  epsg_reg?: string;
  x_reg?: number;
  x_wgs84?: number;
  y_reg?: number;
  y_wgs84?: number;
}

// Interface pour les données de pollens par code de zone
export interface PollensByCodeZone extends PollensAPIProperties {}

// Mapping entre les codes API et les champs de notre BDD
export const PollensAPIToDatabaseMapping: Record<string, string> = {
  code_ambr: 'ambroisies',
  code_arm: 'armoises',
  code_aul: 'aulne',
  code_boul: 'bouleau',
  code_gram: 'graminees',
  code_oliv: 'olivier',
  code_noix: 'noisetier',
  code_char: 'charme',
  code_chen: 'chene',
  code_chat: 'chataignier',
  code_cyp: 'cypres',
  code_fren: 'frene',
  code_plat: 'platane',
  code_peup: 'peuplier',
  code_plant: 'plantain',
  code_rum: 'rumex',
  code_saul: 'saule',
  code_till: 'tilleul',
  code_urt: 'urticacees',
};

export interface PollensAPIData {
  cypres: PollensRiskNumberEnum;
  noisetier: PollensRiskNumberEnum;
  aulne: PollensRiskNumberEnum;
  peuplier: PollensRiskNumberEnum;
  saule: PollensRiskNumberEnum;
  frene: PollensRiskNumberEnum;
  charme: PollensRiskNumberEnum;
  bouleau: PollensRiskNumberEnum;
  platane: PollensRiskNumberEnum;
  chene: PollensRiskNumberEnum;
  olivier: PollensRiskNumberEnum;
  tilleul: PollensRiskNumberEnum;
  chataignier: PollensRiskNumberEnum;
  rumex: PollensRiskNumberEnum;
  graminees: PollensRiskNumberEnum;
  plantain: PollensRiskNumberEnum;
  urticacees: PollensRiskNumberEnum;
  armoises: PollensRiskNumberEnum;
  ambroisies: PollensRiskNumberEnum;
  Total: PollensRiskNumberEnum;
}
