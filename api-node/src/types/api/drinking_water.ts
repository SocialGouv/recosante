export enum ConformityEnum {
  C = 'C', // Conforme
  D = 'D', // Conforme dans le cadre d’une dérogation
  N = 'N', // Non conforme
  S = 'S', // Sans objet lorsqu'aucun paramètre microbio n'a été mesuré
}

export enum CodeParametreSISEEauxEnum {
  ACPT = 'ACPT',
  ANPHT = 'ANPHT',
  NH4 = 'NH4',
  ANTHRA = 'ANTHRA',
  SB = 'SB',
  ASP = 'ASP',
  GT22_68 = 'GT22_68',
  GT36_44 = 'GT36_44',
  BSIR = 'BSIR',
  CTF = 'CTF',
  BENZAN = 'BENZAN',
  BAPYR = 'BAPYR',
  BBFLUO = 'BBFLUO',
  BGPERY = 'BGPERY',
  BKFLUO = 'BKFLUO',
  CD = 'CD',
  CL2LIB = 'CL2LIB',
  CL2TOT = 'CL2TOT',
  CLVYL = 'CLVYL',
  CRT = 'CRT',
  CHRYS = 'CHRYS',
  CDT25 = 'CDT25',
  COULQ = 'COULQ',
  DBENZAN = 'DBENZAN',
  STRF = 'STRF',
  ECOLI = 'ECOLI',
  FET = 'FET',
  FLUORA = 'FLUORA',
  FLUORE = 'FLUORE',
  HPAT4 = 'HPAT4',
  HPAT = 'HPAT',
  INDPYR = 'INDPYR',
  ME2FL = 'ME2FL',
  ME2NA = 'ME2NA',
  NAPHTA = 'NAPHTA',
  NO3 = 'NO3',
  NO3_NO2 = 'NO3_NO2',
  NO2 = 'NO2',
  ODQ = 'ODQ',
  PH = 'PH',
  PHENAN = 'PHENAN',
  PYR = 'PYR',
  SAVQ = 'SAVQ',
  TEAU = 'TEAU',
  TURBNFU = 'TURBNFU',
}

export enum LibelleParametreEnum {
  ACPT = 'Acénaphtène',
  ANPHT = 'Acénaphthylène',
  NH4 = 'Ammonium (en NH4)',
  ANTHRA = 'Anthracène',
  SB = 'Antimoine',
  ASP = 'Aspect (qualitatif)',
  GT22_68 = 'Bact. aér. revivifiables à 22°-68h',
  GT36_44 = 'Bact. aér. revivifiables à 36°-44h',
  BSIR = 'Bact. et spores sulfito-rédu./100ml',
  CTF = 'Bactéries coliformes /100ml-MS',
  BENZAN = 'Benzanthracène',
  BAPYR = 'Benzo(a)pyrène *',
  BBFLUO = 'Benzo(b)fluoranthène',
  BGPERY = 'Benzo(g,h,i)pérylène',
  BKFLUO = 'Benzo(k)fluoranthène',
  CD = 'Cadmium',
  CL2LIB = 'Chlore libre',
  CL2TOT = 'Chlore total',
  CLVYL = 'Chlorure de vinyl monomère',
  CRT = 'Chrome total',
  CHRYS = 'Chrysène',
  CDT25 = 'Conductivité à 25°C',
  COULQ = 'Couleur (qualitatif)',
  DBENZAN = 'Dibenzo(a,h)anthracène',
  STRF = 'Entérocoques /100ml-MS',
  ECOLI = 'Escherichia coli /100ml - MF',
  FET = 'Fer total',
  FLUORA = 'Fluoranthène *',
  FLUORE = 'Fluorène',
  HPAT4 = 'Hydrocarbures polycycliques aromatiques (4 substances)',
  HPAT = 'Hydrocarbures polycycliques aromatiques (6 subst.*)',
  INDPYR = 'Indéno(1,2,3-cd)pyrène',
  ME2FL = 'Méthyl(2)fluoranthène',
  ME2NA = 'Méthyl(2)naphtalène',
  NAPHTA = 'Naphtalène',
  NO3 = 'Nitrates (en NO3)',
  NO3_NO2 = 'Nitrates/50 + Nitrites/3',
  NO2 = 'Nitrites (en NO2)',
  ODQ = 'Odeur (qualitatif)',
  PH = 'pH',
  PHENAN = 'Phénantrène',
  PYR = 'Pyrène',
  SAVQ = 'Saveur (qualitatif)',
  TEAU = "Température de l'eau",
  TURBNFU = 'Turbidité néphélométrique NFU',
}

enum LibelleParametreMajEnum {
  ACPT = 'ACÉNAPHTÈNE',
  ANPHT = 'ACÉNAPHTHYLÈNE',
  NH4 = 'AMMONIUM (EN NH4)',
  ANTHRA = 'ANTHRACÈNE',
  SB = 'ANTIMOINE',
  ASP = 'ASPECT (QUALITATIF)',
  GT22_68 = 'BACT. AÉR. REVIVIFIABLES À 22°-68H',
  GT36_44 = 'BACT. AÉR. REVIVIFIABLES À 36°-44H',
  BSIR = 'BACT. ET SPORES SULFITO-RÉDU./100ML',
  CTF = 'BACTÉRIES COLIFORMES /100ML-MS',
  BENZAN = 'BENZANTHRACÈNE',
  BAPYR = 'BENZO(A)PYRÈNE *',
  BBFLUO = 'BENZO(B)FLUORANTHÈNE',
  BGPERY = 'BENZO(G,H,I)PÉRYLÈNE',
  BKFLUO = 'BENZO(K)FLUORANTHÈNE',
  CD = 'CADMIUM',
  CL2LIB = 'CHLORE LIBRE',
  CL2TOT = 'CHLORE TOTAL',
  CLVYL = 'CHLORURE DE VINYL MONOMÈRE',
  CRT = 'CHROME TOTAL',
  CHRYS = 'CHRYSÈNE',
  CDT25 = 'CONDUCTIVITÉ À 25°C',
  COULQ = 'COULEUR (QUALITATIF)',
  DBENZAN = 'DIBENZO(A,H)ANTHRACÈNE',
  STRF = 'ENTÉROCOQUES /100ML-MS',
  ECOLI = 'ESCHERICHIA COLI /100ML - MF',
  FET = 'FER TOTAL',
  FLUORA = 'FLUORANTHÈNE *',
  FLUORE = 'FLUORÈNE',
  HPAT4 = 'HYDROCARBURES POLYCYCLIQUES AROMATIQUES (4 SUBSTANCES)',
  HPAT = 'HYDROCARBURES POLYCYCLIQUES AROMATIQUES (6 SUBST.*)',
  INDPYR = 'INDÉNO(1,2,3-CD)PYRÈNE',
  ME2FL = 'MÉTHYL(2)FLUORANTHÈNE',
  ME2NA = 'MÉTHYL(2)NAPHTALÈNE',
  NAPHTA = 'NAPHTALÈNE',
  NO3 = 'NITRATES (EN NO3)',
  NO3_NO2 = 'NITRATES/50 + NITRITES/3',
  NO2 = 'NITRITES (EN NO2)',
  ODQ = 'ODEUR (QUALITATIF)',
  PH = 'PH ',
  PHENAN = 'PHÉNANTRÈNE',
  PYR = 'PYRÈNE',
  SAVQ = 'SAVEUR (QUALITATIF)',
  TEAU = "TEMPÉRATURE DE L'EAU",
  TURBNFU = 'TURBIDITÉ NÉPHÉLOMÉTRIQUE NFU',
}

export interface PrelevementResult {
  // code_departement?: string;
  // nom_departement?: string;
  code_prelevement: string; // useful
  // code_parametre?: string;
  code_parametre_se: CodeParametreSISEEauxEnum; // useful
  // code_parametre_cas?: string;
  libelle_parametre: LibelleParametreEnum; // useful
  libelle_parametre_maj: LibelleParametreMajEnum;
  // libelle_parametre_web?: string;
  code_type_parametre?: 'O' | 'N'; // O is qualitative, N is quantitative
  code_lieu_analyse?: 'T' | 'L'; // Type de résultat Terrain ou Laboratoire
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
