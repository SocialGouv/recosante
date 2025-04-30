/**
 * Module de validation des données UV
 */

import { z } from 'zod';
import { capture } from '~/third-parties/sentry';
import { UVDataPoint } from './processing';

// Schema de validation pour un point de données UV
const uvDataPointSchema = z.object({
  latitude: z.number().min(41).max(51), // Limites approximatives pour la France
  longitude: z.number().min(-5).max(10), // Limites approximatives pour la France
  uv_j0: z.number().min(0).max(12).nullable(),
  uv_j1: z.number().min(0).max(12).nullable(),
  uv_j2: z.number().min(0).max(12).nullable(),
  uv_j3: z.number().min(0).max(12).nullable(),
});

// Schema de validation pour un ensemble de points
const uvDataPointsSchema = z.array(uvDataPointSchema);

/**
 * Valide les points de données UV
 * @param dataPoints Points de données UV à valider
 * @returns Les points validés (erreur si invalides)
 */
export function validateUVDataPoints(dataPoints: UVDataPoint[]): UVDataPoint[] {
  try {
    return uvDataPointsSchema.parse(dataPoints);
  } catch (error) {
    capture(error as Error, {
      extra: {
        functionCall: 'validateUVDataPoints',
        sample: dataPoints.slice(0, 2),
      },
    });
    throw new Error(
      `Validation des données UV échouée: ${(error as Error).message}`,
    );
  }
}

/**
 * Vérifie si les données UV sont utilisables
 * @param dataPoints Points de données UV
 * @returns true si les données sont utilisables, false sinon
 */
export function isUVDataUsable(dataPoints: UVDataPoint[]): boolean {
  try {
    // Vérifier qu'il y a suffisamment de points pour couvrir la France
    if (dataPoints.length < 10) {
      return false;
    }

    // Vérifier que les points couvrent bien la France (ici simplifié)
    const latitudes = dataPoints.map((p) => p.latitude);
    const longitudes = dataPoints.map((p) => p.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    // Vérifier que la zone couverte est assez large
    const latRange = maxLat - minLat;
    const lonRange = maxLon - minLon;

    if (latRange < 5 || lonRange < 5) {
      return false;
    }

    return true;
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'isUVDataUsable' } });
    return false;
  }
}
