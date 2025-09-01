import { z } from 'zod';

export const createUserSchema = z.object({
  matomo_id: z.string().length(16, 'matomo_id doit faire exactement 16 caractères'),
}).strict();

const favoriteIndicatorSchema = z.union([
  
  z.enum([
    'indice_atmospheric',
    'indice_uv',
    'pollen_allergy',
    'weather_alert',
    'bathing_water',
    'drinking_water'
  ]),
  // Tableau d'indicateurs (on prend le premier)
  z.array(z.enum([
    'indice_atmospheric',
    'indice_uv',
    'pollen_allergy',
    'weather_alert',
    'bathing_water',
    'drinking_water'
  ])).transform(arr => arr.length > 0 ? arr[0] : null),
  // Valeur null/undefined
  z.null(),
  z.undefined()
]).nullable().optional();

export const updateUserSchema = z.object({
  granularity: z.enum(['street', 'city']).nullable().optional(),
  municipality_insee_code: z.string().nullable().optional(),
  municipality_name: z.string().nullable().optional(),
  municipality_zip_code: z.string().nullable().optional(),
  udi: z.string().nullable().optional(),
  push_notif_token: z.string().nullable().optional(),
  favorite_indicator: favoriteIndicatorSchema,
  favorite_indicators: favoriteIndicatorSchema,
  
  coordinates: z
    .object({
      lat: z.number().min(-90, 'Latitude doit être entre -90 et 90').max(90, 'Latitude doit être entre -90 et 90'),
      lon: z.number().min(-180, 'Longitude doit être entre -180 et 180').max(180, 'Longitude doit être entre -180 et 180'),
    })
    .nullable()
    .optional(),
  notifications_preference: z.array(
    z.enum(['morning', 'evening', 'alert'])
  ).nullable().optional(),
}).strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
