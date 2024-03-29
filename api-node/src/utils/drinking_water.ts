import {
  type PrelevementResult,
  ConformityEnum,
} from '~/types/api/drinking_water';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

type PrelevementConformity = {
  conclusion_conformite_prelevement: string | null;
  conformite_limites_bact_prelevement: string | null;
  conformite_limites_pc_prelevement: string | null;
  conformite_references_bact_prelevement: string | null;
  conformite_references_pc_prelevement: string | null;
};

function checkPrelevementConformity(
  // only conformite_limites_pc_prelevement, conformite_references_pc_prelevement, conformite_limites_bact_prelevement, conformite_references_bact_prelevement are used
  prelevement?: PrelevementConformity,
): ConformityEnum {
  if (!prelevement) return ConformityEnum.NOT_TESTED;
  if (!prelevement.conclusion_conformite_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_limites_pc_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_references_pc_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_limites_bact_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_references_bact_prelevement)
    return ConformityEnum.NOT_TESTED;

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

function checkPrelevementConformityChemical(
  prelevement?: PrelevementConformity,
): ConformityEnum {
  if (!prelevement) return ConformityEnum.NOT_TESTED;
  if (!prelevement) return ConformityEnum.NOT_TESTED;
  if (!prelevement.conclusion_conformite_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_limites_pc_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_references_pc_prelevement)
    return ConformityEnum.NOT_TESTED;

  const conformityLimitChemical = prelevement.conformite_limites_pc_prelevement;
  const conformityReferenceChemical =
    prelevement.conformite_references_pc_prelevement;

  if (conformityLimitChemical === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (conformityReferenceChemical === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (
    conformityLimitChemical === ConformityEnum.NOT_TESTED &&
    conformityReferenceChemical === ConformityEnum.NOT_TESTED
  ) {
    return ConformityEnum.NOT_TESTED;
  }
  return ConformityEnum.CONFORM;
}

function checkPrelevementConformityBacteriological(
  prelevement?: PrelevementConformity,
): ConformityEnum {
  if (!prelevement) return ConformityEnum.NOT_TESTED;
  if (!prelevement) return ConformityEnum.NOT_TESTED;
  if (!prelevement.conclusion_conformite_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_limites_bact_prelevement)
    return ConformityEnum.NOT_TESTED;
  if (!prelevement.conformite_references_bact_prelevement)
    return ConformityEnum.NOT_TESTED;

  const conformityLimitBacteriological =
    prelevement.conformite_limites_bact_prelevement;
  const conformityReferenceBacteriological =
    prelevement.conformite_references_bact_prelevement;

  if (conformityLimitBacteriological === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (conformityReferenceBacteriological === ConformityEnum.NOT_CONFORM) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (
    conformityLimitBacteriological === ConformityEnum.NOT_TESTED &&
    conformityReferenceBacteriological === ConformityEnum.NOT_TESTED
  ) {
    return ConformityEnum.NOT_TESTED;
  }
  return ConformityEnum.CONFORM;
}

function getWorstConformity(
  conformity1: ConformityEnum,
  conformity2: ConformityEnum,
): ConformityEnum {
  if (
    conformity1 === ConformityEnum.NOT_CONFORM ||
    conformity2 === ConformityEnum.NOT_CONFORM
  ) {
    return ConformityEnum.NOT_CONFORM;
  }
  if (
    conformity1 === ConformityEnum.NOT_TESTED ||
    conformity2 === ConformityEnum.NOT_TESTED
  ) {
    return ConformityEnum.NOT_TESTED;
  }
  return ConformityEnum.CONFORM;
}

function getWorstConclusion(conclusion1: string, conclusion2: string): string {
  return conclusion1.length > conclusion2.length ? conclusion1 : conclusion2;
}

export {
  checkPrelevementConformity,
  checkPrelevementConformityChemical,
  checkPrelevementConformityBacteriological,
  getWorstConformity,
  getWorstConclusion,
};
