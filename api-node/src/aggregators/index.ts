/**
 * Agrégateurs de données
 * Ce fichier exporte tous les agrégateurs disponibles
 */

import { getPollensIndicator } from './pollens';
import { getAtmoIndicator } from './indice_atmo';
import { getIndiceUVIndicator } from './indice_uv';
import { getUVIndicator } from './uv';
import { getWeatherAlert } from './weather_alert';
import { getBathingWaterIndicator } from './bathing_water';
import { getDrinkingWaterIndicator } from './drinking_water';

export {
  getPollensIndicator,
  getAtmoIndicator,
  // Garder l'ancien agrégateur pour rétrocompatibilité temporaire
  getIndiceUVIndicator,
  // Nouveau agrégateur UV utilisant Copernicus
  getUVIndicator,
  getWeatherAlert,
  getBathingWaterIndicator,
  getDrinkingWaterIndicator,
};
