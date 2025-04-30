/**
 * Module principal pour l'agrégateur de pollens
 * Coordonne l'ensemble du processus de récupération et traitement des données
 */

// @ts-expect-error csvjson-csv2json is not typed
import csv2json from 'csvjson-csv2json/csv2json.js';
import fetchRetry from 'fetch-retry';
import {
  DataAvailabilityEnum,
  AlertStatusEnum,
  type Municipality,
  IndicatorsSlugEnum,
} from '@prisma/client';
import dayjs from 'dayjs';
import { z } from 'zod';
import prisma from '~/prisma';
import type { PollensAPIData } from '~/types/api/pollens';
import { capture } from '~/third-parties/sentry';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { sendAlertNotification } from '~/utils/notifications/alert';
import { AlertStatusThresholdEnum } from '~/utils/alert_status';

// Extensions dayjs
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const fetch = fetchRetry(global.fetch);

let now = Date.now();
function logStep(step: string) {
  console.info(`[POLLENS] Duration: ${Date.now() - now}ms`.padEnd(40), step);
  now = Date.now();
}

/**
 * Récupère et traite les données d'allergie aux pollens
 */
export async function getPollensIndicator() {
  try {
    // Étape 1: Récupération des données
    now = Date.now();
    logStep('Getting Pollens');
    const data = await fetch('https://www.pollens.fr/docs/ecosante.csv', {
      retryDelay: 1000,
      retries: 3,
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `getPollensIndicator error! status: ${response.status}`,
        );
      }
      const data = await response.text();
      logStep('Formatting into json');
      const rawFormatedJson = csv2json(data, { parseNumbers: true });
      logStep('Formatting into json DONE');
      return rawFormatedJson;
    });

    // Étape 2: Validation des données
    const date = Object.keys(data[0])[0];
    logStep(`diffusionDate: ${date}`);
    try {
      z.array(
        z.object({
          [date]: z.number(), // code département
          cypres: z.number().min(0).max(6),
          noisetier: z.number().min(0).max(6),
          aulne: z.number().min(0).max(6),
          peuplier: z.number().min(0).max(6),
          saule: z.number().min(0).max(6),
          frene: z.number().min(0).max(6),
          charme: z.number().min(0).max(6),
          bouleau: z.number().min(0).max(6),
          platane: z.number().min(0).max(6),
          chene: z.number().min(0).max(6),
          olivier: z.number().min(0).max(6),
          tilleul: z.number().min(0).max(6),
          chataignier: z.number().min(0).max(6),
          rumex: z.number().min(0).max(6),
          graminees: z.number().min(0).max(6),
          plantain: z.number().min(0).max(6),
          urticacees: z.number().min(0).max(6),
          armoises: z.number().min(0).max(6),
          ambroisies: z.number().min(0).max(6),
          Total: z.number().min(0).max(6),
        }),
      ).parse(data);
    } catch (error: any) {
      capture(error, {
        extra: {
          functionCall: 'getPollensIndicator',
          dataSample: data.filter((_: any, index: number) => index < 2),
        },
      });
      return;
    }

    // Étape 3: Vérifier si les données existent déjà
    const diffusionDate = dayjs(date, 'DD/MM/YYYY')
      .set('hour', 12) // because from Paris, UTC would bring the date to D-1
      .utc()
      .startOf('day')
      .toDate();
    const validityEnd = dayjs(diffusionDate)
      .add(7, 'days')
      .utc()
      .endOf('day')
      .toDate();

    const existingPollens = await prisma.pollenAllergyRisk.count({
      where: {
        diffusion_date: diffusionDate,
      },
    });

    if (existingPollens > 0) {
      logStep(
        `Pollens already fetched for diffusionDate ${date}: ${existingPollens} rows`,
      );
      return;
    }

    // Étape 4: Formater les données par département pour itérer rapidement sur les communes
    const pollensByDepartment: Record<Municipality['DEP'], PollensAPIData> = {};
    for (const row of data) {
      const departmentCode = row[date];
      // Formater le code de département pour avoir une chaîne de 2 chiffres
      const formattedDepCode =
        departmentCode < 10 &&
        departmentCode !== '2A' &&
        departmentCode !== '2B'
          ? '0' + departmentCode
          : '' + departmentCode;
      const rowWithoutDate = { ...row, date };
      pollensByDepartment[formattedDepCode] = rowWithoutDate;
    }

    // Étape 5: Récupérer la liste des communes
    logStep('formatting pollens by department DONE');
    const municipalities = await prisma.municipality.findMany();

    // Étape 6: Boucler sur les communes et créer les lignes à insérer
    logStep('fetching municipalities DONE');
    const pollensRows = [];
    let missingData = 0;
    for (const municipality of municipalities) {
      const pollenData = pollensByDepartment[municipality.DEP];
      // Si pas de données pour ce département, on indique que les données ne sont pas disponibles
      if (!pollenData) {
        pollensRows.push({
          diffusion_date: diffusionDate,
          validity_start: diffusionDate,
          validity_end: validityEnd,
          municipality_insee_code: municipality.COM,
          data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
          alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
        });
        missingData++;
        continue;
      }
      pollensRows.push({
        diffusion_date: diffusionDate,
        validity_start: diffusionDate,
        validity_end: validityEnd,
        municipality_insee_code: municipality.COM,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        alert_status:
          pollenData.Total >= AlertStatusThresholdEnum.POLLENS
            ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
            : AlertStatusEnum.NOT_ALERT_THRESHOLD,
        cypres: pollenData.cypres,
        noisetier: pollenData.noisetier,
        aulne: pollenData.aulne,
        peuplier: pollenData.peuplier,
        saule: pollenData.saule,
        frene: pollenData.frene,
        charme: pollenData.charme,
        bouleau: pollenData.bouleau,
        platane: pollenData.platane,
        chene: pollenData.chene,
        olivier: pollenData.olivier,
        tilleul: pollenData.tilleul,
        chataignier: pollenData.chataignier,
        rumex: pollenData.rumex,
        graminees: pollenData.graminees,
        plantain: pollenData.plantain,
        urticacees: pollenData.urticacees,
        armoises: pollenData.armoises,
        ambroisies: pollenData.ambroisies,
        total: pollenData.Total,
      });
    }

    // Étape 7: Insérer les données
    let results = 0;
    for (const pollensRowByMunicipality of pollensRows) {
      await prisma.pollenAllergyRisk
        .create({
          data: pollensRowByMunicipality,
        })
        .then(async (pollensRow) => {
          results++;
          if (
            pollensRow.alert_status ===
            AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
          ) {
            const alertSent = await sendAlertNotification(
              IndicatorsSlugEnum.pollen_allergy,
              pollensRow,
            );
            await prisma.pollenAllergyRisk.update({
              where: {
                id: pollensRow.id,
              },
              data: {
                alert_status: alertSent
                  ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
                  : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    logStep(
      `DONE INSERTING POLLENS: ${results} rows inserted upon ${municipalities.length} municipalities`,
    );
    logStep(
      `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    );
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getPollensIndicator' } });
  }
}
