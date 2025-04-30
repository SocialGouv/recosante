/**
 * Module d'interaction avec la base de données pour l'indice UV
 */

import {
  AlertStatusEnum,
  IndicatorsSlugEnum,
  type Municipality,
  type PrismaClient,
} from '@prisma/client';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import { sendAlertNotification } from '~/utils/notifications/alert';

/**
 * Récupère toutes les communes de la base de données
 * @param prismClient Client Prisma (optionnel, pour tests)
 * @returns Liste des communes
 */
export async function getMunicipalities(
  prismClient: PrismaClient = prisma,
): Promise<Municipality[]> {
  try {
    return await prismClient.municipality.findMany();
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'getMunicipalities' } });
    throw error;
  }
}

/**
 * Vérifie si des données d'indice UV existent déjà pour une date donnée
 * @param diffusionDate Date de diffusion à vérifier
 * @param prismClient Client Prisma (optionnel, pour tests)
 * @returns Nombre d'entrées trouvées
 */
export async function checkExistingUVData(
  diffusionDate: Date,
  prismClient: PrismaClient = prisma,
): Promise<number> {
  try {
    return await prismClient.indiceUv.count({
      where: {
        diffusion_date: diffusionDate,
      },
    });
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'checkExistingUVData' } });
    throw error;
  }
}

/**
 * Insère les données d'indice UV dans la base de données
 * @param uvRows Données d'indice UV à insérer
 * @param prismClient Client Prisma (optionnel, pour tests)
 * @returns Nombre d'entrées insérées
 */
export async function insertUVData(
  uvRows: any[],
  prismClient: PrismaClient = prisma,
): Promise<number> {
  try {
    let inserted = 0;

    for (const uvRow of uvRows) {
      const row = await prismClient.indiceUv.create({
        data: uvRow,
      });

      inserted++;

      // Si alerte à envoyer
      if (
        row.alert_status === AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
      ) {
        const alertSent = await sendAlertNotification(
          IndicatorsSlugEnum.indice_uv,
          row,
        );

        // Mettre à jour le statut de l'alerte
        await prismClient.indiceUv.update({
          where: { id: row.id },
          data: {
            alert_status: alertSent
              ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
              : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
          },
        });
      }
    }

    return inserted;
  } catch (error) {
    capture(error as Error, { extra: { functionCall: 'insertUVData' } });
    throw error;
  }
}
