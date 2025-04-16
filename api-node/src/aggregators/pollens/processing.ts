import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  type Municipality,
} from '@prisma/client';
import type {
  PollensAPIProperties,
  PollensByCodeZone,
} from '~/types/api/pollens';
import { PollensAPIToDatabaseMapping } from '~/types/api/pollens';
import { AlertStatusThresholdEnum } from '~/utils/alert_status';
import { capture } from '~/third-parties/sentry';
import { validatePollensDataRow } from './validation';

export interface PollenRow {
  diffusion_date: Date;
  validity_start: Date;
  validity_end: Date;
  municipality_insee_code: string;
  data_availability: DataAvailabilityEnum;
  alert_status: AlertStatusEnum;
  total?: number;
  ambroisies?: number;
  armoises?: number;
  aulne?: number;
  bouleau?: number;
  graminees?: number;
  olivier?: number;
  noisetier?: number;
  charme?: number;
  chene?: number;
  chataignier?: number;
  cypres?: number;
  frene?: number;
  platane?: number;
  peuplier?: number;
  plantain?: number;
  rumex?: number;
  saule?: number;
  tilleul?: number;
  urticacees?: number;
}

export function organizePollensDataByInseeCode(
  data: Array<{
    type: string;
    geometry: null;
    properties: PollensAPIProperties;
  }>,
): Record<Municipality['COM'], PollensByCodeZone> {
  const pollensByInseeCode: Record<Municipality['COM'], PollensByCodeZone> = {};

  for (const row of data) {
    try {
      validatePollensDataRow(row);

      const isCommune = row.properties.type_zone.toLowerCase() === 'commune';
      if (!isCommune) {
        // Nous pouvons aussi récupérer des données par département ou région
        // mais pour l'instant nous nous concentrons sur les communes
        continue;
      }

      const inseeCode = row.properties.code_zone;
      if (!inseeCode) {
        capture('[POLLENS AGGREGATION] inseeCode null', {
          extra: {
            functionCall: 'organizePollensDataByInseeCode',
            data: row.properties,
          },
        });
        continue;
      }

      pollensByInseeCode[inseeCode] = row.properties;
    } catch (zodError: any) {
      capture(zodError, {
        extra: {
          functionCall: 'organizePollensDataByInseeCode',
          row,
          zodError,
        },
      });
    }
  }

  return pollensByInseeCode;
}

/**
 * Crée les objets de données de pollens pour chaque commune
 */
export function createPollensRowsForMunicipalities(
  municipalities: Municipality[],
  pollensByInseeCode: Record<Municipality['COM'], PollensByCodeZone>,
  diffusionDate: Date,
  validityEnd: Date,
): {
  pollensRows: Array<PollenRow>;
  missingData: number;
} {
  const pollensRows: PollenRow[] = [];
  let missingData = 0;

  for (const municipality of municipalities) {

    let pollenData = pollensByInseeCode[municipality.COM];

   if (
      !pollenData &&
      municipality.COMPARENT &&
      municipality.COMPARENT !== municipality.COM
    ) {
      pollenData = pollensByInseeCode[municipality.COMPARENT];
    }

   if (!pollenData) {
      pollensRows.push(
        createUnavailablePollenRow(municipality, diffusionDate, validityEnd),
      );
      missingData++;
      continue;
    }

    pollensRows.push(
      createAvailablePollenRow(
        municipality,
        pollenData,
        diffusionDate,
        validityEnd,
      ),
    );
  }

  return { pollensRows, missingData };
}

/**
 * Crée un objet pour les données de pollens non disponibles
 */
export function createUnavailablePollenRow(
  municipality: Municipality,
  diffusionDate: Date,
  validityEnd: Date,
): PollenRow {
  return {
    diffusion_date: diffusionDate,
    validity_start: diffusionDate,
    validity_end: validityEnd,
    municipality_insee_code: municipality.COM,
    data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
    alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
  };
}

export function createAvailablePollenRow(
  municipality: Municipality,
  pollenData: PollensByCodeZone,
  diffusionDate: Date,
  validityEnd: Date,
): PollenRow {
  const alertStatus =
    pollenData.code_qual >= AlertStatusThresholdEnum.POLLENS
      ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
      : AlertStatusEnum.NOT_ALERT_THRESHOLD;

  const pollensRowData: PollenRow = {
    diffusion_date: new Date(pollenData.date_maj),
    validity_start: diffusionDate,
    validity_end: validityEnd,
    municipality_insee_code: municipality.COM,
    data_availability: DataAvailabilityEnum.AVAILABLE,
    alert_status: alertStatus,
    total: pollenData.code_qual,
  };

  for (const [apiField, dbField] of Object.entries(
    PollensAPIToDatabaseMapping,
  )) {
    const value = pollenData[apiField as keyof typeof pollenData] ?? 0;
    (pollensRowData as any)[dbField] = value;
  }

  return pollensRowData;
}
