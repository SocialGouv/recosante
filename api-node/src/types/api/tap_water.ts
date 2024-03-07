export interface TabWaterResponse {
  count: number;
  first: string;
  last: string;
  prev: any;
  next: string;
  api_version: string;
  data: TabWaterData[];
}

export interface TabWaterData {
  code_departement: string;
  nom_departement: string;
  code_prelevement: string;
  code_parametre: string;
  code_parametre_se: string;
  code_parametre_cas?: string;
  libelle_parametre: string;
  libelle_parametre_maj: string;
  libelle_parametre_web: any;
  code_type_parametre: string;
  code_lieu_analyse: string;
  resultat_alphanumerique: string;
  resultat_numerique: number;
  libelle_unite: string;
  code_unite: string;
  limite_qualite_parametre?: string;
  reference_qualite_parametre?: string;
  code_commune: string;
  nom_commune: string;
  nom_uge: string;
  nom_distributeur: string;
  nom_moa: string;
  date_prelevement: string;
  conclusion_conformite_prelevement: string;
  conformite_limites_bact_prelevement: string;
  conformite_limites_pc_prelevement: string;
  conformite_references_bact_prelevement: string;
  conformite_references_pc_prelevement: string;
  reference_analyse?: string;
  code_installation_amont: any;
  nom_installation_amont: any;
  reseaux: Reseaux[];
}

export interface Reseaux {
  code: string;
  nom: string;
}
