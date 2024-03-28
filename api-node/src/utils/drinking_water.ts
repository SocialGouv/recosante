import {
  type PrelevementResult,
  ConformityEnum,
  ConformityStatusEnum,
  ConformityNumberEnum,
  type ParameterInDataRow,
} from '~/types/api/drinking_water';
import type { DrinkingWater } from '@prisma/client';
import { type IndicatorByPeriodValue } from '~/types/api/indicator';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
// function extractOnlyNumber(str: string): number {
//   return parseFloat(str?.replace(/[^0-9,]/g, '').replace(',', '.'));
// }

type PrelevementConformity = Pick<
  PrelevementResult,
  | 'conclusion_conformite_prelevement'
  | 'conformite_limites_bact_prelevement'
  | 'conformite_limites_pc_prelevement'
  | 'conformite_references_bact_prelevement'
  | 'conformite_references_pc_prelevement'
>;

function checkPrelevementConformity(
  // only conformite_limites_pc_prelevement, conformite_references_pc_prelevement, conformite_limites_bact_prelevement, conformite_references_bact_prelevement are used
  prelevement?: PrelevementConformity,
): ConformityEnum {
  if (!prelevement) return ConformityEnum.NOT_TESTED;
  const conformityLimitChemical = prelevement.conformite_limites_pc_prelevement;
  const conformityReferenceChemical =
    prelevement.conformite_references_pc_prelevement;
  const conformityLimitBacteriological =
    prelevement.conformite_limites_bact_prelevement;
  const conformityReferenceBacteriological =
    prelevement.conformite_references_bact_prelevement;

  if (conformityLimitChemical === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (conformityReferenceChemical === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (conformityLimitBacteriological === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (conformityReferenceBacteriological === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (
    conformityLimitChemical === ConformityEnum.NOT_TESTED &&
    conformityReferenceChemical === ConformityEnum.NOT_TESTED &&
    conformityLimitBacteriological === ConformityEnum.NOT_TESTED &&
    conformityReferenceBacteriological === ConformityEnum.NOT_TESTED
  ) {
    return ConformityEnum.NOT_TESTED;
  }
  return ConformityEnum.CONFORM;
}

function getUdiConformityStatus(drinkingWater: DrinkingWater) {
  let isNotTested = true;
  if (drinkingWater.PH_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.PH_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.TEAU_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.TEAU_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.PESTOT_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.PESTOT_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.COULF_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.COULF_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.SAVQ_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.SAVQ_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.COULQ_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.COULQ_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.ASP_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.ASP_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.ODQ_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityStatusEnum.NOT_CONFORM;
  }
  if (drinkingWater.ODQ_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (isNotTested) {
    return ConformityStatusEnum.NOT_TESTED;
  }
  return ConformityStatusEnum.CONFORM;
}

function getUdiConformityValue(drinkingWater: DrinkingWater) {
  let isNotTested = true;
  if (drinkingWater.PH_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.PH_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.TEAU_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.TEAU_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.PESTOT_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.PESTOT_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.COULF_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.COULF_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.SAVQ_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.SAVQ_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.COULQ_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.COULQ_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.ASP_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.ASP_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (drinkingWater.ODQ_conformity === ConformityEnum.NOT_CONFORM) {
    return ConformityNumberEnum.NOT_CONFORM;
  }
  if (drinkingWater.ODQ_conformity !== ConformityEnum.NOT_TESTED) {
    isNotTested = false;
  }
  if (isNotTested) {
    return ConformityNumberEnum.NOT_TESTED;
  }
  return ConformityNumberEnum.CONFORM;
}

function mapParameterToRowData(
  parameterPrelevement?: PrelevementResult,
): ParameterInDataRow {
  // source: https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000465574/
  // but the reality is: we took all the data from
  // https://www.data.gouv.fr/en/datasets/resultats-du-controle-sanitaire-de-leau-distribuee-commune-par-commune/
  // we checked for each parameter row the reference_qualite_parametre and limite_qualite_parametre
  // and we found that the values are what we have in the source above, and what we used below
  if (!parameterPrelevement) {
    return {
      value: '',
      conformity: ConformityEnum.NOT_TESTED,
      code_prelevement: '',
      date_prelevement: null,
      conclusion_conformite_prelevement: '',
    };
  }
  switch (parameterPrelevement.code_parametre_se) {
    case 'PH': {
      const max = 9;
      const min = 6.5;
      const value = parseFloat(parameterPrelevement.resultat_numerique);
      return {
        value: `${value}`,
        conformity:
          value >= min && value <= max
            ? ConformityEnum.CONFORM
            : ConformityEnum.NOT_CONFORM,
        code_prelevement: parameterPrelevement.code_prelevement,
        date_prelevement: parameterPrelevement.date_prelevement,
        conclusion_conformite_prelevement:
          parameterPrelevement.conclusion_conformite_prelevement ?? '',
      };
    }
    case 'TEAU': {
      const max = 25;
      const value = parseFloat(parameterPrelevement.resultat_numerique);
      return {
        value: `${value}${parameterPrelevement.libelle_unite}`,
        conformity:
          value <= max ? ConformityEnum.CONFORM : ConformityEnum.NOT_CONFORM,
        code_prelevement: parameterPrelevement.code_prelevement,
        date_prelevement: parameterPrelevement.date_prelevement,
        conclusion_conformite_prelevement:
          parameterPrelevement.conclusion_conformite_prelevement ?? '',
      };
    }
    case 'PESTOT': {
      const max = 0.5;
      const value = parseFloat(parameterPrelevement.resultat_numerique);
      return {
        value: `${value}${parameterPrelevement.libelle_unite}`,
        conformity:
          value <= max ? ConformityEnum.CONFORM : ConformityEnum.NOT_CONFORM,
        code_prelevement: parameterPrelevement.code_prelevement,
        date_prelevement: parameterPrelevement.date_prelevement,
        conclusion_conformite_prelevement:
          parameterPrelevement.conclusion_conformite_prelevement ?? '',
      };
    }
    case 'COULF': {
      const max = 15;
      const value = parseFloat(parameterPrelevement.resultat_numerique);
      return {
        value: `${value}${parameterPrelevement.libelle_unite}`,
        conformity:
          value <= max ? ConformityEnum.CONFORM : ConformityEnum.NOT_CONFORM,
        code_prelevement: parameterPrelevement.code_prelevement,
        date_prelevement: parameterPrelevement.date_prelevement,
        conclusion_conformite_prelevement:
          parameterPrelevement.conclusion_conformite_prelevement ?? '',
      };
    }
    case 'SAVQ':
    case 'COULQ':
    case 'ASP':
    case 'ODQ': {
      return {
        value: parameterPrelevement.resultat_alphanumerique ?? '',
        conformity: checkPrelevementConformity(parameterPrelevement),
        code_prelevement: parameterPrelevement.code_prelevement,
        date_prelevement: parameterPrelevement.date_prelevement,
        conclusion_conformite_prelevement:
          parameterPrelevement.conclusion_conformite_prelevement ?? '',
      };
    }
  }
}

function mapParameterRowDataToIndicatorByPeriodValues(
  drinkingWaterRow: DrinkingWater,
): Array<IndicatorByPeriodValue> {
  // source: https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000465574/
  // but the reality is: we took all the data from
  // https://www.data.gouv.fr/en/datasets/resultats-du-controle-sanitaire-de-leau-distribuee-commune-par-commune/
  // we checked for each parameter row the reference_qualite_parametre and limite_qualite_parametre
  // and we found that the values are what we have in the source above, and what we used below
  return [
    {
      slug: 'PH',
      name: 'pH',
      value: drinkingWaterRow.PH_value ?? '',
      isConform: drinkingWaterRow.PH_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.PH_date_prelevement
        ? dayjs(drinkingWaterRow.PH_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'TEAU',
      name: 'Température de l’eau',
      value: drinkingWaterRow.TEAU_value ?? '',
      isConform: drinkingWaterRow.TEAU_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.TEAU_date_prelevement
        ? dayjs(drinkingWaterRow.TEAU_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'PESTOT',
      name: 'Pesticides totaux',
      value: drinkingWaterRow.PESTOT_value ?? '',
      isConform: drinkingWaterRow.PESTOT_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.PESTOT_date_prelevement
        ? dayjs(drinkingWaterRow.PESTOT_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'COULF',
      name: 'Couleur',
      value: drinkingWaterRow.COULF_value ?? '',
      isConform: drinkingWaterRow.COULF_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.COULF_date_prelevement
        ? dayjs(drinkingWaterRow.COULF_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'SAVQ',
      name: 'Saveur',
      value: drinkingWaterRow.SAVQ_value ?? '',
      isConform: drinkingWaterRow.SAVQ_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.SAVQ_date_prelevement
        ? dayjs(drinkingWaterRow.SAVQ_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'COULQ',
      name: 'Couleur',
      value: drinkingWaterRow.COULQ_value ?? '',
      isConform: drinkingWaterRow.COULQ_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.COULQ_date_prelevement
        ? dayjs(drinkingWaterRow.COULQ_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'ASP',
      name: 'Aspect',
      value: drinkingWaterRow.ASP_value ?? '',
      isConform: drinkingWaterRow.ASP_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.ASP_date_prelevement
        ? dayjs(drinkingWaterRow.ASP_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
    {
      slug: 'ODQ',
      name: 'Odeur',
      value: drinkingWaterRow.ODQ_value ?? '',
      isConform: drinkingWaterRow.ODQ_conformity === ConformityEnum.CONFORM,
      datePrelevement: drinkingWaterRow.ODQ_date_prelevement
        ? dayjs(drinkingWaterRow.ODQ_date_prelevement).format('YYYY-MM-DD')
        : '',
    },
  ];
}

function getAllConclusions(drinkingWater: DrinkingWater): Array<string> {
  const allConclusions = [];
  if (
    drinkingWater.PH_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.PH_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.PH_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.TEAU_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.TEAU_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.TEAU_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.PESTOT_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.PESTOT_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.PESTOT_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.COULF_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.COULF_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.COULF_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.SAVQ_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.SAVQ_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.SAVQ_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.COULQ_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.COULQ_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.COULQ_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.ASP_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.ASP_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.ASP_conclusion_conformite_prelevement);
  }
  if (
    drinkingWater.ODQ_conformity === ConformityEnum.NOT_CONFORM &&
    !!drinkingWater.ODQ_conclusion_conformite_prelevement
  ) {
    allConclusions.push(drinkingWater.ODQ_conclusion_conformite_prelevement);
  }
  if (!allConclusions.length) {
    allConclusions.push(
      "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
    );
  }
  return allConclusions;
}

export {
  getUdiConformityStatus,
  getUdiConformityValue,
  mapParameterToRowData,
  mapParameterRowDataToIndicatorByPeriodValues,
  getAllConclusions,
};
