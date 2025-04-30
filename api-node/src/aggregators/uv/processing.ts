/**
 * Module de traitement des données GRIB pour extraire les indices UV
 */

import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  type Municipality,
} from '@prisma/client';
import { capture } from '~/third-parties/sentry';
import { AlertStatusThresholdEnum } from '~/utils/alert_status';
import { promisify } from 'util';
import grib2json from '@weacast/grib2json';

// Type pour les données UV extraites du fichier GRIB
export interface UVDataPoint {
  latitude: number;
  longitude: number;
  uv_j0: number | null;
  uv_j1: number | null;
  uv_j2: number | null;
  uv_j3: number | null;
}

// Données UV indexées par code INSEE pour faciliter le lookup
export type UVDataByInseeCode = Record<
  string,
  {
    uv_j0: number | null;
    uv_j1: number | null;
    uv_j2: number | null;
    uv_j3: number | null;
  }
>;

/**
 * Parse le fichier GRIB et extrait les données UV
 * @param gribBuffer Buffer contenant les données GRIB
 * @returns Tableau de points de données UV
 */
export async function parseGribData(
  gribBuffer: Buffer,
): Promise<UVDataPoint[]> {
  try {
    // Utiliser la bibliothèque grib2json pour parser le fichier GRIB
    const parseGribAsync = promisify(grib2json);

    // Création d'un tableau pour stocker les données des différents jours
    let uvDataPoints: Record<string, UVDataPoint> = {};

    // Options de parsing pour grib2json
    const options = {
      data: true,
      inventory: false,
      regex: 'uv_biologically_effective_dose',
      filter: false,
    };

    // Parser le buffer GRIB
    const parsedData = await parseGribAsync(gribBuffer, options);

    console.log(parsedData);

    if (!parsedData || !parsedData.length) {
      throw new Error('Aucune donnée UV trouvée dans le fichier GRIB');
    }

    console.log(`Données GRIB parsées: ${parsedData.length} messages trouvés`);

    // Parcourir les messages GRIB
    for (const message of parsedData) {
      const data = message.data;
      const header = message.header;

      if (!data || !data.length) {
        continue;
      }

      // Déterminer quel jour de prévision est concerné (J0, J1, J2, J3)
      const forecastDay = determineForecastDay(header);

      if (forecastDay === null) {
        console.warn(
          'Jour de prévision non déterminé, message ignoré:',
          header,
        );
        continue;
      }

      // Extraire les données de latitude, longitude et valeur UV
      for (const point of data) {
        const lat = point.lat;
        const lon = point.lon;
        const value = point.value;

        if (lat === undefined || lon === undefined || value === undefined) {
          continue;
        }

        // Créer une clé unique pour chaque point géographique
        const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;

        // Si ce point n'existe pas encore, l'initialiser
        if (!uvDataPoints[key]) {
          uvDataPoints[key] = {
            latitude: lat,
            longitude: lon,
            uv_j0: null,
            uv_j1: null,
            uv_j2: null,
            uv_j3: null,
          };
        }

        // Mettre à jour la valeur UV pour le jour correspondant
        switch (forecastDay) {
          case 0:
            uvDataPoints[key].uv_j0 = Math.round(value);
            break;
          case 1:
            uvDataPoints[key].uv_j1 = Math.round(value);
            break;
          case 2:
            uvDataPoints[key].uv_j2 = Math.round(value);
            break;
          case 3:
            uvDataPoints[key].uv_j3 = Math.round(value);
            break;
        }
      }
    }

    // Convertir l'objet en tableau
    const result = Object.values(uvDataPoints);

    console.log(`Données UV extraites: ${result.length} points géographiques`);

    if (result.length === 0) {
      throw new Error('Aucun point de données UV extrait du fichier GRIB');
    }

    return result;
  } catch (error) {
    capture(error as Error, {
      extra: {
        functionCall: 'parseGribData',
        error: (error as Error).message,
      },
    });
    throw error;
  }
}

/**
 * Détermine le jour de prévision (J0, J1, J2, J3) à partir de l'en-tête GRIB
 * @param header En-tête du message GRIB
 * @returns Le jour de prévision (0, 1, 2 ou 3) ou null si non déterminé
 */
function determineForecastDay(header: any): number | null {
  if (!header || !header.forecastTime) {
    return null;
  }

  // Le temps de prévision est généralement en heures
  const forecastTimeHours = header.forecastTime;

  // Convertir les heures en jours
  const forecastDay = Math.floor(forecastTimeHours / 24);

  // Nous ne nous intéressons qu'aux prévisions de J0 à J3
  if (forecastDay >= 0 && forecastDay <= 3) {
    return forecastDay;
  }

  return null;
}

/**
 * Associe les données UV aux communes en trouvant le point le plus proche
 * @param uvDataPoints Points de données UV
 * @param municipalities Liste des communes
 * @returns Données UV indexées par code INSEE
 */
export function mapUVDataToMunicipalities(
  uvDataPoints: UVDataPoint[],
  municipalities: Municipality[],
): UVDataByInseeCode {
  try {
    // Pour associer les points UV aux communes, nous cherchons le point le plus proche
    const uvDataByInseeCode: UVDataByInseeCode = {};

    // Préparer un cache des coordonnées des communes (à implémenter avec les vraies coordonnées)
    const municipalityCoordinates: Record<
      string,
      { lat: number; lon: number }
    > = {};

    // STUB: Dans une vraie implémentation, on utiliserait les coordonnées géographiques des communes
    // Pour l'instant, nous utilisons des coordonnées approximatives pour quelques grandes villes
    const knownCities: Record<string, { lat: number; lon: number }> = {
      // Paris
      '75056': { lat: 48.8566, lon: 2.3522 },
      // Lyon
      '69123': { lat: 45.7578, lon: 4.832 },
      // Marseille
      '13055': { lat: 43.2965, lon: 5.3698 },
      // Toulouse
      '31555': { lat: 43.6047, lon: 1.4442 },
      // Nice
      '06088': { lat: 43.7102, lon: 7.262 },
      // Nantes
      '44109': { lat: 47.2184, lon: -1.5536 },
      // Strasbourg
      '67482': { lat: 48.5734, lon: 7.7521 },
      // Montpellier
      '34172': { lat: 43.6119, lon: 3.8772 },
      // Bordeaux
      '33063': { lat: 44.8378, lon: -0.5792 },
      // Lille
      '59350': { lat: 50.6292, lon: 3.0573 },
    };

    console.log(
      `Association des données UV à ${municipalities.length} communes...`,
    );

    // Pour chaque commune
    for (const municipality of municipalities) {
      let lat: number, lon: number;

      // Si on a déjà les coordonnées de cette commune
      if (knownCities[municipality.COM]) {
        lat = knownCities[municipality.COM].lat;
        lon = knownCities[municipality.COM].lon;
      }
      // Pour les communes inconnues, attribuer des coordonnées basées sur leur département
      else {
        // Extraire le code département (2 premiers caractères du code INSEE, sauf cas spéciaux)
        let depCode = municipality.DEP;

        // Coordonnées approximatives pour la France métropolitaine par défaut
        lat = 46.5; // Centre approximatif de la France
        lon = 2.5; // Centre approximatif de la France

        // Ajuster en fonction des départements connus
        switch (depCode) {
          // Île-de-France
          case '75':
          case '77':
          case '78':
          case '91':
          case '92':
          case '93':
          case '94':
          case '95':
            lat = 48.8;
            lon = 2.5;
            break;
          // PACA
          case '13':
          case '83':
          case '84':
          case '04':
          case '05':
          case '06':
            lat = 43.5;
            lon = 6.0;
            break;
          // Occitanie
          case '11':
          case '30':
          case '34':
          case '12':
          case '48':
          case '46':
          case '82':
          case '31':
          case '32':
          case '65':
          case '09':
          case '66':
            lat = 43.6;
            lon = 2.0;
            break;
          // Nouvelle-Aquitaine
          case '33':
          case '40':
          case '47':
          case '24':
          case '19':
          case '87':
          case '23':
          case '86':
          case '79':
          case '17':
          case '16':
          case '64':
            lat = 45.0;
            lon = 0.0;
            break;
          // Hauts-de-France
          case '59':
          case '62':
          case '80':
          case '60':
          case '02':
            lat = 50.0;
            lon = 2.5;
            break;
          // Grand Est
          case '67':
          case '68':
          case '57':
          case '54':
          case '55':
          case '88':
          case '52':
          case '10':
          case '51':
          case '08':
            lat = 48.5;
            lon = 6.0;
            break;
          // DOM-TOM (à adapter selon les besoins)
          case '971': // Guadeloupe
            (lat = 16.2), (lon = -61.5);
            break;
          case '972': // Martinique
            (lat = 14.6), (lon = -61.0);
            break;
          case '973': // Guyane
            (lat = 4.0), (lon = -53.0);
            break;
          case '974': // La Réunion
            (lat = -21.1), (lon = 55.5);
            break;
          case '976': // Mayotte
            (lat = -12.8), (lon = 45.1);
            break;
        }
      }

      // Trouver le point de données UV le plus proche de cette commune
      const closestPoint = findClosestPoint(uvDataPoints, lat, lon);

      if (closestPoint) {
        uvDataByInseeCode[municipality.COM] = {
          uv_j0: closestPoint.uv_j0,
          uv_j1: closestPoint.uv_j1,
          uv_j2: closestPoint.uv_j2,
          uv_j3: closestPoint.uv_j3,
        };
      }
    }

    console.log(
      `Données UV associées à ${
        Object.keys(uvDataByInseeCode).length
      } communes`,
    );

    return uvDataByInseeCode;
  } catch (error) {
    capture(error as Error, {
      extra: { functionCall: 'mapUVDataToMunicipalities' },
    });
    throw error;
  }
}

/**
 * Trouve le point géographique le plus proche des coordonnées données
 * @param points Liste des points disponibles
 * @param targetLat Latitude cible
 * @param targetLon Longitude cible
 * @returns Le point le plus proche ou undefined si aucun point n'est disponible
 */
function findClosestPoint(
  points: UVDataPoint[],
  targetLat: number,
  targetLon: number,
): UVDataPoint | undefined {
  if (!points.length) return undefined;

  let closestPoint = points[0];
  let minDistance = calculateDistance(
    targetLat,
    targetLon,
    points[0].latitude,
    points[0].longitude,
  );

  for (let i = 1; i < points.length; i++) {
    const distance = calculateDistance(
      targetLat,
      targetLon,
      points[i].latitude,
      points[i].longitude,
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = points[i];
    }
  }

  return closestPoint;
}

/**
 * Calcule la distance entre deux points géographiques en utilisant la formule de Haversine
 * @param lat1 Latitude du premier point
 * @param lon1 Longitude du premier point
 * @param lat2 Latitude du deuxième point
 * @param lon2 Longitude du deuxième point
 * @returns La distance en kilomètres
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  // Rayon de la Terre en kilomètres
  const R = 6371;

  // Convertir en radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Formule de Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Convertit des degrés en radians
 * @param degrees Angle en degrés
 * @returns Angle en radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Crée un objet indice UV pour une commune sans données disponibles
 * @param municipality Commune
 * @param diffusionDate Date de diffusion
 * @param validityEnd Date de fin de validité
 * @returns Objet indice UV
 */
export function createUnavailableUVRow(
  municipality: Municipality,
  diffusionDate: Date,
  validityEnd: Date,
) {
  return {
    municipality_insee_code: municipality.COM,
    diffusion_date: diffusionDate,
    validity_start: diffusionDate,
    validity_end: validityEnd,
    data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
    alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
  };
}

/**
 * Crée un objet indice UV pour une commune avec données disponibles
 * @param municipality Commune
 * @param uvData Données UV
 * @param diffusionDate Date de diffusion
 * @param validityEnd Date de fin de validité
 * @returns Objet indice UV
 */
export function createAvailableUVRow(
  municipality: Municipality,
  uvData: {
    uv_j0: number | null;
    uv_j1: number | null;
    uv_j2: number | null;
    uv_j3: number | null;
  },
  diffusionDate: Date,
  validityEnd: Date,
) {
  // Déterminer si le niveau d'UV dépasse le seuil d'alerte
  const alertStatus =
    (uvData.uv_j0 ?? 0) >= AlertStatusThresholdEnum.INDICE_UV
      ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
      : AlertStatusEnum.NOT_ALERT_THRESHOLD;

  return {
    municipality_insee_code: municipality.COM,
    diffusion_date: diffusionDate,
    validity_start: diffusionDate,
    validity_end: validityEnd,
    data_availability: DataAvailabilityEnum.AVAILABLE,
    alert_status: alertStatus,
    uv_j0: uvData.uv_j0,
    uv_j1: uvData.uv_j1,
    uv_j2: uvData.uv_j2,
    uv_j3: uvData.uv_j3,
  };
}

/**
 * Crée des objets indice UV pour toutes les communes
 * @param municipalities Liste des communes
 * @param uvDataByInseeCode Données UV indexées par code INSEE
 * @param diffusionDate Date de diffusion
 * @param validityEnd Date de fin de validité
 * @returns Objets indice UV et nombre de communes sans données
 */
export function createUVRowsForMunicipalities(
  municipalities: Municipality[],
  uvDataByInseeCode: UVDataByInseeCode,
  diffusionDate: Date,
  validityEnd: Date,
) {
  try {
    const uvRows = [];
    let missingData = 0;

    for (const municipality of municipalities) {
      let uvData;

      // Chercher d'abord les données pour cette commune
      uvData = uvDataByInseeCode[municipality.COM];

      // Si pas de données mais la commune a un parent, utiliser les données du parent
      if (!uvData && municipality.COMPARENT) {
        uvData = uvDataByInseeCode[municipality.COMPARENT];
      }

      // Si toujours pas de données, marquer comme non disponible
      if (!uvData) {
        uvRows.push(
          createUnavailableUVRow(municipality, diffusionDate, validityEnd),
        );
        missingData++;
        continue;
      }

      // Sinon, créer une ligne avec les données disponibles
      uvRows.push(
        createAvailableUVRow(municipality, uvData, diffusionDate, validityEnd),
      );
    }

    return { uvRows, missingData };
  } catch (error) {
    capture(error as Error, {
      extra: { functionCall: 'createUVRowsForMunicipalities' },
    });
    throw error;
  }
}
