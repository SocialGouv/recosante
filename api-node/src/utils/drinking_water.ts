import {
  type PrelevementResult,
  CodeParametreSISEEauxEnum,
  LibelleParametreEnum,
  ConformityEnum,
} from '~/types/api/drinking_water';
import { type IndicatorByPeriodValue } from '~/types/api/indicator';

function extractOnlyNumber(str: string): number {
  return parseFloat(str?.replace(/[^0-9,]/g, '').replace(',', '.'));
}

function isPrelevementConform(prelevement?: PrelevementResult): ConformityEnum {
  if (!prelevement) return ConformityEnum.S;
  const conformityLimitChemical = prelevement.conformite_limites_pc_prelevement;
  const conformityReferenceChemical =
    prelevement.conformite_references_pc_prelevement;
  const conformityLimitBacteriological =
    prelevement.conformite_limites_bact_prelevement;
  const conformityReferenceBacteriological =
    prelevement.conformite_references_bact_prelevement;

  if (conformityLimitChemical === ConformityEnum.N) return ConformityEnum.N;
  if (conformityReferenceChemical === ConformityEnum.N) return ConformityEnum.N;
  if (conformityLimitBacteriological === ConformityEnum.N) {
    return ConformityEnum.N;
  }
  if (conformityReferenceBacteriological === ConformityEnum.N) {
    return ConformityEnum.N;
  }
  if (
    conformityLimitChemical === ConformityEnum.S &&
    conformityReferenceChemical === ConformityEnum.S &&
    conformityLimitBacteriological === ConformityEnum.S &&
    conformityReferenceBacteriological === ConformityEnum.S
  ) {
    return ConformityEnum.S;
  }
  return ConformityEnum.C;
}

function formatResultValue(
  prelevement?: PrelevementResult,
): IndicatorByPeriodValue | null {
  if (!prelevement) return null;
  switch (prelevement.code_parametre_se) {
    case CodeParametreSISEEauxEnum.ACPT: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ACPT,
        name: LibelleParametreEnum.ACPT,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.ANPHT: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ANPHT,
        name: LibelleParametreEnum.ANPHT,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.NH4: {
      // example of result: <0,01
      // example of unit: mg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: <=0,1 mg/L
      // first keep only the number in reference_qualite_parametre
      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.NH4,
          name: LibelleParametreEnum.NH4,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.reference_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.NH4,
        name: LibelleParametreEnum.NH4,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.ANTHRA: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ANTHRA,
        name: LibelleParametreEnum.ANTHRA,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.SB: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=10 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)

      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.SB,
          name: LibelleParametreEnum.SB,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.SB,
        name: LibelleParametreEnum.SB,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.ASP: {
      // example of result: Aspect normal
      // example of unit: SANS OBJET
      // example of limite_qualite_parametre: NULL
      // example of reference_qualite_parametre: NULL
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ASP,
        name: LibelleParametreEnum.ASP,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.GT22_68: {
      // example of result: 9
      // example of unit: n/mL
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.GT22_68,
        name: LibelleParametreEnum.GT22_68,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.GT36_44: {
      // example of result: 9
      // example of unit: n/mL
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.GT36_44,
        name: LibelleParametreEnum.GT36_44,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.BSIR: {
      // example of result: <1
      // example of unit: n/(100mL)
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: <=0 n/(100mL)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default

      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.BSIR,
          name: LibelleParametreEnum.BSIR,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.reference_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.BSIR,
        name: LibelleParametreEnum.BSIR,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.CTF: {
      // example of result: <1
      // example of unit: n/(100mL)
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: <=0 n/(100mL)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default

      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.CTF,
          name: LibelleParametreEnum.CTF,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.reference_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.CTF,
        name: LibelleParametreEnum.CTF,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.BENZAN: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.BENZAN,
        name: LibelleParametreEnum.BENZAN,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.BAPYR: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.BAPYR,
          name: LibelleParametreEnum.BAPYR,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.BAPYR,
        name: LibelleParametreEnum.BAPYR,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.BBFLUO: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.BBFLUO,
          name: LibelleParametreEnum.BBFLUO,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.BBFLUO,
        name: LibelleParametreEnum.BBFLUO,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.BGPERY: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.BGPERY,
          name: LibelleParametreEnum.BGPERY,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.BGPERY,
        name: LibelleParametreEnum.BGPERY,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }

    case CodeParametreSISEEauxEnum.BKFLUO: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.BKFLUO,
          name: LibelleParametreEnum.BKFLUO,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.BKFLUO,
        name: LibelleParametreEnum.BKFLUO,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }

    case CodeParametreSISEEauxEnum.CD: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.CD,
          name: LibelleParametreEnum.CD,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.CD,
        name: LibelleParametreEnum.CD,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.CL2LIB: {
      // example of result: 0,18
      // example of unit: mg(Cl2)/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.CL2LIB,
        name: LibelleParametreEnum.CL2LIB,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.CL2TOT: {
      // example of result: 0,18
      // example of unit: mg(Cl2)/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.CL2TOT,
        name: LibelleParametreEnum.CL2TOT,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.CLVYL: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.CLVYL,
          name: LibelleParametreEnum.CLVYL,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.CLVYL,
        name: LibelleParametreEnum.CLVYL,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.CRT: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.CRT,
          name: LibelleParametreEnum.CRT,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.CRT,
        name: LibelleParametreEnum.CRT,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.CHRYS: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.CHRYS,
        name: LibelleParametreEnum.CHRYS,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.CDT25: {
      // example of result: <0,01
      // example of unit: µS/cm
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: >=200 et <=1100 µS/cm
      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.CDT25,
          name: LibelleParametreEnum.CDT25,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const max = extractOnlyNumber(
        prelevement.reference_qualite_parametre.split('et')[1],
      );
      const min = extractOnlyNumber(
        prelevement.reference_qualite_parametre.split('et')[0],
      );
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value >= min && value <= max;
      return {
        slug: CodeParametreSISEEauxEnum.CDT25,
        name: LibelleParametreEnum.CDT25,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.COULQ: {
      // example of result: Aucun changement anormal
      // example of unit: SANS OBJET
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.COULQ,
        name: LibelleParametreEnum.COULQ,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.DBENZAN: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.DBENZAN,
        name: LibelleParametreEnum.DBENZAN,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.STRF: {
      // example of result: <0,01
      // example of unit: n/(100mL)
      // example of limite_qualite_parametre: <=0 n/(100mL)
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.STRF,
          name: LibelleParametreEnum.STRF,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.STRF,
        name: LibelleParametreEnum.STRF,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.ECOLI: {
      // example of result: <0,01
      // example of unit: n/(100mL)
      // example of limite_qualite_parametre: <=0 n/(100mL)
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.ECOLI,
          name: LibelleParametreEnum.ECOLI,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.ECOLI,
        name: LibelleParametreEnum.ECOLI,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.FET: {
      // example of result: <0,0030
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0.01 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.FET,
          name: LibelleParametreEnum.FET,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.reference_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.FET,
        name: LibelleParametreEnum.FET,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.FLUORA: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.FLUORA,
        name: LibelleParametreEnum.FLUORA,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.FLUORE: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.FLUORE,
        name: LibelleParametreEnum.FLUORE,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.HPAT4: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0,1 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.HPAT4,
          name: LibelleParametreEnum.HPAT4,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.HPAT4,
        name: LibelleParametreEnum.HPAT4,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.HPAT: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.HPAT,
        name: LibelleParametreEnum.HPAT,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.INDPYR: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: <=0,1 µg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.INDPYR,
          name: LibelleParametreEnum.INDPYR,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.INDPYR,
        name: LibelleParametreEnum.INDPYR,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.ME2FL: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ME2FL,
        name: LibelleParametreEnum.ME2FL,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.ME2NA: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ME2NA,
        name: LibelleParametreEnum.ME2NA,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.NAPHTA: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.NAPHTA,
        name: LibelleParametreEnum.NAPHTA,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.NO3: {
      // example of result: <0,01
      // example of unit: mg/L
      // example of limite_qualite_parametre: <=50 mg/L
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.NO3,
          name: LibelleParametreEnum.NO3,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.NO3,
        name: LibelleParametreEnum.NO3,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.NO3_NO2: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.NO3_NO2,
          name: LibelleParametreEnum.NO3_NO2,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.NO3_NO2,
        name: LibelleParametreEnum.NO3_NO2,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.NO2: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      if (
        !prelevement.limite_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.NO2,
          name: LibelleParametreEnum.NO2,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.limite_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.NO2,
        name: LibelleParametreEnum.NO2,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.ODQ: {
      // example of result: Aucun changement anormal
      // example of unit: SANS OBJET
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.ODQ,
        name: LibelleParametreEnum.ODQ,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.PH: {
      // example of result: 7
      // example of unit: unité pH
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: >=6,5 et <=9 unité pH
      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.CDT25,
          name: LibelleParametreEnum.CDT25,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const max = extractOnlyNumber(
        prelevement.reference_qualite_parametre.split('et')[1],
      );
      const min = extractOnlyNumber(
        prelevement.reference_qualite_parametre.split('et')[0],
      );
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value >= min && value <= max;
      return {
        slug: CodeParametreSISEEauxEnum.CDT25,
        name: LibelleParametreEnum.CDT25,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.PHENAN: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.PHENAN,
        name: LibelleParametreEnum.PHENAN,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.PYR: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.PYR,
        name: LibelleParametreEnum.PYR,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.SAVQ: {
      // example of result: Aucun changement anormal
      // example of unit: SANS OBJET
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      return {
        slug: CodeParametreSISEEauxEnum.SAVQ,
        name: LibelleParametreEnum.SAVQ,
        result: prelevement.resultat_alphanumerique,
        conformity: true,
      };
    }
    case CodeParametreSISEEauxEnum.TEAU: {
      // example of result: 21,6
      // example of unit: °C
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: <=25 °C
      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.TEAU,
          name: LibelleParametreEnum.TEAU,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.reference_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.TEAU,
        name: LibelleParametreEnum.TEAU,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
    case CodeParametreSISEEauxEnum.TURBNFU: {
      // example of result: <0,01
      // example of unit: µg/L
      // example of limite_qualite_parametre: NULL (no case yet)
      // example of reference_qualite_parametre: NULL (no case yet)
      // => cannot compare the result to the limit so cannot judge conformity yet
      // so confirmity is true by default
      if (
        !prelevement.reference_qualite_parametre ||
        !prelevement.resultat_alphanumerique
      ) {
        return {
          slug: CodeParametreSISEEauxEnum.TURBNFU,
          name: LibelleParametreEnum.TURBNFU,
          result: prelevement.resultat_alphanumerique,
          conformity: true,
        };
      }
      const limit = extractOnlyNumber(prelevement.reference_qualite_parametre);
      const value = extractOnlyNumber(prelevement.resultat_numerique);
      const isConform = value <= limit;
      return {
        slug: CodeParametreSISEEauxEnum.TURBNFU,
        name: LibelleParametreEnum.TURBNFU,
        result: prelevement.resultat_alphanumerique,
        conformity: isConform,
      };
    }
  }
}

export { formatResultValue, isPrelevementConform };
