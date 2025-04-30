/**
 * Module principal pour l'agrégateur d'indice UV
 * Coordonne l'ensemble du processus de récupération et traitement des données
 */

import { capture } from '~/third-parties/sentry';
import fs from 'fs';
import {
  getAuthHeader,
  submitUVForecastJob,
  waitForGribURL,
  downloadGribFile,
} from './api';
import {
  checkExistingUVData,
  getMunicipalities,
  insertUVData,
} from './database';
import {
  parseGribData,
  mapUVDataToMunicipalities,
  createUVRowsForMunicipalities,
} from './processing';
import { validateUVDataPoints, isUVDataUsable } from './validation';
import {
  resetTimer,
  logStep,
  getTempFilePath,
  calculateDates,
  cleanupTempFile,
} from './utils';

/**
 * Récupère et traite les données d'indice UV depuis Copernicus
 */
export async function getUVIndicator() {
  let gribFilePath: string | null = null;

  try {
    resetTimer();
    logStep('Récupération des indices UV');

    // Calculer les dates
    const { diffusionDate, validityEnd } = calculateDates();

    // Vérifier si les données existent déjà
    const existingUVData = await checkExistingUVData(diffusionDate);
    if (existingUVData > 0) {
      logStep(
        `Indices UV déjà récupérés pour la date ${diffusionDate.toISOString()}: ${existingUVData} lignes`,
      );
      return;
    }

    // Étape 1: Authentification
    logStep("Authentification à l'API Copernicus");
    const authHeader = await getAuthHeader();

    // Étape 2: Soumettre le job
    logStep('Soumission du job de récupération des données');
    const jobID = await submitUVForecastJob(authHeader);

    // Étape 3: Attendre la disponibilité des résultats
    logStep(`Job soumis avec ID ${jobID}, attente des résultats...`);
    const gribURL = await waitForGribURL(jobID, authHeader);

    // Étape 4: Télécharger le fichier GRIB
    logStep('Téléchargement du fichier GRIB');
    const gribData = await downloadGribFile(gribURL, authHeader);

    // Étape 5: Sauvegarder le fichier temporairement
    gribFilePath = getTempFilePath('uv-forecast', 'grib');
    fs.writeFileSync(gribFilePath, gribData);
    logStep(`Fichier GRIB sauvegardé dans ${gribFilePath}`);

    // Étape 6: Analyser le fichier GRIB
    logStep('Analyse du fichier GRIB');
    const uvDataPoints = await parseGribData(gribData);

    // Étape 7: Valider les données
    logStep('Validation des données');
    const validatedDataPoints = validateUVDataPoints(uvDataPoints);

    // Vérifier si les données sont utilisables
    if (!isUVDataUsable(validatedDataPoints)) {
      throw new Error(
        'Les données UV ne couvrent pas suffisamment le territoire',
      );
    }

    // Étape 8: Récupérer la liste des communes
    logStep('Récupération des communes');
    const municipalities = await getMunicipalities();

    // Étape 9: Associer les données aux communes
    logStep('Association des données aux communes');
    const uvDataByInseeCode = mapUVDataToMunicipalities(
      validatedDataPoints,
      municipalities,
    );

    // Étape 10: Créer les objets à insérer en base
    logStep('Préparation des objets pour insertion en base');
    const { uvRows, missingData } = createUVRowsForMunicipalities(
      municipalities,
      uvDataByInseeCode,
      diffusionDate,
      validityEnd,
    );

    // Étape 11: Insérer en base
    logStep('Insertion en base de données');
    const insertedCount = await insertUVData(uvRows);

    logStep(
      `INSERTION TERMINÉE: ${insertedCount} lignes insérées sur ${municipalities.length} communes`,
    );
    logStep(
      `DONNÉES MANQUANTES: ${missingData} communes sur ${municipalities.length}`,
    );

    // Étape 12: Nettoyage
    if (gribFilePath) {
      cleanupTempFile(gribFilePath);
      logStep(`Fichier temporaire supprimé: ${gribFilePath}`);
    }
  } catch (error) {
    // Nettoyage en cas d'erreur
    if (gribFilePath) {
      cleanupTempFile(gribFilePath);
    }

    capture(error as Error, { extra: { functionCall: 'getUVIndicator' } });
    console.error('Erreur lors de la récupération des indices UV:', error);
  }
}
