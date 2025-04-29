import { z } from 'zod';
import type { PollensAPIProperties } from '~/types/api/pollens';
/**
 * Valide une ligne de données de pollens avec Zod
 */
export function validatePollensDataRow(row: {
  type: string;
  geometry: null;
  properties: PollensAPIProperties;
}): void {
  z.object({
    type: z.literal('Feature'),
    geometry: z.null(),
    properties: z.object({
      aasqa: z.string(),
      date_maj: z.string(),
      alerte: z.boolean(),
      code_zone: z.string(),
      type_zone: z.string(),
      date_dif: z.string(),
      date_ech: z.string(),
      lib_qual: z.string(),
      lib_zone: z.string(),
      source: z.string(),
      code_qual: z.number().min(0).max(6),
      pollen_resp: z.string().optional(),
      // Les champs optionnels de pollens avec les nouveaux noms (code_*)
      code_ambr: z.number().min(0).max(6).optional(),
      code_arm: z.number().min(0).max(6).optional(),
      code_aul: z.number().min(0).max(6).optional(),
      code_boul: z.number().min(0).max(6).optional(),
      code_gram: z.number().min(0).max(6).optional(),
      code_oliv: z.number().min(0).max(6).optional(),
      code_noix: z.number().min(0).max(6).optional(),
      code_char: z.number().min(0).max(6).optional(),
      code_chen: z.number().min(0).max(6).optional(),
      code_chat: z.number().min(0).max(6).optional(),
      code_cyp: z.number().min(0).max(6).optional(),
      code_fren: z.number().min(0).max(6).optional(),
      code_plat: z.number().min(0).max(6).optional(),
      code_peup: z.number().min(0).max(6).optional(),
      code_plant: z.number().min(0).max(6).optional(),
      code_rum: z.number().min(0).max(6).optional(),
      code_saul: z.number().min(0).max(6).optional(),
      code_till: z.number().min(0).max(6).optional(),
      code_urt: z.number().min(0).max(6).optional(),
      // Champs de concentration de taxons
      conc_ambr: z.number().optional(),
      conc_arm: z.number().optional(),
      conc_aul: z.number().optional(),
      conc_boul: z.number().optional(),
      conc_gram: z.number().optional(),
      conc_oliv: z.number().optional(),
      conc_noix: z.number().optional(),
      conc_char: z.number().optional(),
      conc_chen: z.number().optional(),
      conc_chat: z.number().optional(),
      conc_cyp: z.number().optional(),
      conc_fren: z.number().optional(),
      conc_plat: z.number().optional(),
      conc_peup: z.number().optional(),
      conc_plant: z.number().optional(),
      conc_rum: z.number().optional(),
      conc_saul: z.number().optional(),
      conc_till: z.number().optional(),
      conc_urt: z.number().optional(),
      // Autres champs optionnels
      name: z.string().optional().nullable(),
      partition_field: z.string().optional().nullable(),
      gml_id: z.number().optional().nullable(),
      epsg_reg: z.string().optional().nullable(),
      x_reg: z.number().optional().nullable(),
      x_wgs84: z.number().optional().nullable(),
      y_reg: z.number().optional().nullable(),
      y_wgs84: z.number().optional().nullable(),
    }),
  }).parse(row);
}
