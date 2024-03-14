import {
  type PrelevementResult,
  ConformityEnum,
  ConformityStatusEnum,
  ConformityNumberEnum,
} from '~/types/api/drinking_water';
import type { DrinkingWater } from '@prisma/client';
// import { type IndicatorByPeriodValue } from '~/types/api/indicator';

// function extractOnlyNumber(str: string): number {
//   return parseFloat(str?.replace(/[^0-9,]/g, '').replace(',', '.'));
// }

function checkPrelevementConformity(
  prelevement?: PrelevementResult | DrinkingWater,
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

function getPrelevementConformityStatus(drinkingWater: DrinkingWater) {
  switch (checkPrelevementConformity(drinkingWater)) {
    case ConformityEnum.CONFORM:
      return ConformityStatusEnum.CONFORM;
    case ConformityEnum.NOT_CONFORM:
      return ConformityStatusEnum.NOT_CONFORM;
    case ConformityEnum.NOT_TESTED:
    default:
      return ConformityStatusEnum.NOT_TESTED;
  }
}

function getPrelevementConformityValue(drinkingWater: DrinkingWater) {
  switch (checkPrelevementConformity(drinkingWater)) {
    case ConformityEnum.CONFORM:
      return ConformityNumberEnum.CONFORM;
    case ConformityEnum.NOT_CONFORM:
      return ConformityNumberEnum.NOT_CONFORM;
    case ConformityEnum.NOT_TESTED:
    default:
      return ConformityNumberEnum.NOT_TESTED;
  }
}

export {
  checkPrelevementConformity,
  getPrelevementConformityStatus,
  getPrelevementConformityValue,
};
