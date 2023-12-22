import { z } from 'zod';

export const pollenSchema = z.object({
  cypres: z.number(),
  noisetier: z.number(),
  aulne: z.number(),
  peuplier: z.number(),
  saule: z.number(),
  frene: z.number(),
  charme: z.number(),
  bouleau: z.number(),
  platane: z.number(),
  chene: z.number(),
  olivier: z.number(),
  tilleul: z.number(),
  chataignier: z.number(),
  rumex: z.number(),
  graminees: z.number(),
  plantain: z.number(),
  urticacees: z.number(),
  armoises: z.number(),
  ambroisies: z.number(),
  municipality_insee_code: z.string(),
  diffusion_date: z.string(),
  validity_start: z.string(),
  validity_end: z.string(),
});

export const pollenResponseSchema = z.array(pollenSchema);
