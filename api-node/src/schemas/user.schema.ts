import { z } from 'zod';

export const createUserSchema = z.object({
  matomo_id: z.string().length(16, 'matomo_id doit faire exactement 16 caractères'),
}).strict();

export const updateUserSchema = z.object({
  granularity: z.string().optional(),
  municipality_insee_code: z.string().optional(),
  municipality_name: z.string().optional(),
  municipality_zip_code: z.string().optional(),
  udi: z.string().optional(),
  push_notif_token: z.string().optional(),
  favorite_indicator: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number().min(-90).max(90, 'Latitude doit être entre -90 et 90'),
      lon: z.number().min(-180).max(180, 'Longitude doit être entre -180 et 180'),
    })
    .optional(),
  notifications_preference: z.array(z.string()).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
