export interface MunicipalityJSON {
  TYPECOM: 'ARM' | 'COM' | 'COMD'; // Type de commune
  COM: string; // Code commune
  REG: string; // Code région
  DEP: DepartmentCode; // Code département
  CTCD: string; // Code de la collectivité territoriale ayant les compétences départementales
  ARR: string; // Code arrondissement
  TNCC: TNCC; // Type de nom en clair
  NCC: string; // Nom en clair (majuscules)
  NCCENR: string; // Nom en clair (typographie riche)
  LIBELLE: string; // Nom en clair (typographie riche) avec article
  CAN: string; // Code canton. Pour les communes « multi-cantonales », code décliné de 99 à 90 (pseudo-canton) ou de 89 à 80 (communes nouvelles)
  COMPARENT: string; // Code de la commune parente pour les arrondissements municipaux et les communes associées ou déléguées.
}

export type DepartmentCode = string;

type TNCC =
  | '0' // Pas d'article et le nom commence par une consonne sauf H muet	charnière = DE
  | '1' // Pas d'article et le nom commence par une voyelle ou un H muet	charnière = D'
  | '2' // Article = LE	charnière = DU
  | '3' // Article = LA	charnière = DE LA
  | '4' // Article = LES	charnière = DES
  | '5' // Article = L'	charnière = DE L'
  | '6' // Article = AUX	charnière = DES
  | '7' // Article = LAS	charnière = DE LAS
  | '8'; // Article = LOS	charnière = DE LOS
