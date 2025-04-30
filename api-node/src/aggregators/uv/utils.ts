/**
 * Module d'utilitaires pour l'agrégateur d'indice UV
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { capture } from '~/third-parties/sentry';

// Ajouter le plugin UTC pour manipuler les dates
dayjs.extend(utc);

// Variable pour le suivi du temps
let previousTime = Date.now();

/**
 * Fonction de logging avec mesure de durée entre les étapes
 * @param step Description de l'étape
 */
export function logStep(step: string): void {
  const now = Date.now();
  const duration = now - previousTime;
  console.info(`[INDICE UV] Duration: ${duration}ms`.padEnd(40), step);
  previousTime = now;
}

/**
 * Réinitialise le timer pour le logging
 */
export function resetTimer(): void {
  previousTime = Date.now();
}

/**
 * Génère un chemin de fichier temporaire pour les téléchargements
 * @param prefix Préfixe du nom de fichier
 * @param extension Extension du fichier
 * @returns Chemin complet du fichier temporaire
 */
export function getTempFilePath(prefix: string, extension: string): string {
  try {
    const tempDir = path.join(os.tmpdir(), 'recosante-uv');

    // Créer le répertoire s'il n'existe pas
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${prefix}-${timestamp}.${extension}`;

    return path.join(tempDir, fileName);
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'getTempFilePath' } });
    throw error;
  }
}

/**
 * Calcule les dates de début et fin de validité pour les données UV
 * @returns Objet contenant les dates de diffusion et de fin de validité
 */
export function calculateDates(): { diffusionDate: Date; validityEnd: Date } {
  const diffusionDate = dayjs().utc().startOf('day').toDate();
  const validityEnd = dayjs(diffusionDate).add(3, 'days').endOf('day').toDate();

  return { diffusionDate, validityEnd };
}

/**
 * Supprime un fichier temporaire
 * @param filePath Chemin du fichier à supprimer
 */
export function cleanupTempFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    capture(error as Error, {
      extra: { functionCall: 'cleanupTempFile', filePath },
    });
    // On ne fait que logger l'erreur sans la remonter
    console.warn(`Impossible de supprimer le fichier temporaire: ${filePath}`);
  }
}
