// @ts-expect-error csvjson-csv2json is not typed
import csv2json from 'csvjson-csv2json/csv2json.js';
import { DataAvailabilityEnum } from '@prisma/client';
import dayjs from 'dayjs';
import { z } from 'zod';
import prisma from '~/prisma';
import type { DepartmentCode } from '~/types/municipality';
import type { PollensAPIData } from '~/types/api/pollens';
import { capture } from '~/third-parties/sentry';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { grabMunicipalities } from '~/utils/municipalities';
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const URL = 'https://www.pollens.fr/docs/ecosante.csv';

let now = Date.now();
function logStep(step: string) {
  console.info(`[POLLENS] Duration: ${Date.now() - now}ms`.padEnd(40), step);
  now = Date.now();
}

export async function getPollensIndicator() {
  try {
    // Step 1: Fetch data
    now = Date.now();
    logStep('Getting Pollens');
    const data = await fetch(URL).then(async (response) => {
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

    // Step 2: Validate data
    const date = Object.keys(data[0])[0];
    logStep(`diffusionDate: ${date}`);
    try {
      z.array(
        z.object({
          [date]: z.number(), // department code
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

    // Step 3: check if data already exists
    const diffusionDate = dayjs(date, 'DD/MM/YYYY')
      .startOf('day')
      .utc()
      .toDate();
    const validityEnd = dayjs(diffusionDate)
      .add(7, 'days')
      .endOf('day')
      .utc()
      .toDate();

    const existingPollens = await prisma.pollenAllergyRisk.count({
      where: {
        diffusion_date: diffusionDate,
      },
    });
    // TODO: Maybe Add check if the data in the db is data_availability: NOT_AVAILABLE
    // In some scenarios, the data is not available and can be available later, no ?.
    if (existingPollens > 0) {
      logStep(
        `Pollens already fetched for diffusionDate ${date}: ${existingPollens} rows`,
      );
      return;
    }

    // Step 4: format data by department to iterate quickly on municipalities
    const pollensByDepartment: Record<DepartmentCode, PollensAPIData> = {};
    for (const row of data) {
      const departmentCode = row[date];
      // we need to format the department code to have a 2 digits string
      const formattedDepCode =
        departmentCode < 10 &&
        departmentCode !== '2A' &&
        departmentCode !== '2B'
          ? '0' + departmentCode
          : '' + departmentCode;
      const rowWithoutDate = { ...row, date };
      pollensByDepartment[formattedDepCode] = rowWithoutDate;
    }

    // Step 5: grab the municipalities list
    logStep('formatting pollens by department DONE');
    const municipalities = await grabMunicipalities();

    // Step 6: loop on municipalities and create rows to insert
    logStep('fetching municipalities DONE');
    const pollensRows = [];
    let missingData = 0;
    for (const municipality of municipalities) {
      const pollenData = pollensByDepartment[municipality.DEP];
      // if no data for this department, we say that data is not available.
      if (!pollenData) {
        pollensRows.push({
          diffusion_date: diffusionDate,
          validity_start: diffusionDate,
          validity_end: validityEnd,
          municipality_insee_code: municipality.COM,
          data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
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

    // Step 7: insert data
    const result = await prisma.pollenAllergyRisk.createMany({
      data: pollensRows,
      skipDuplicates: true,
    });

    logStep(
      `DONE INSERTING POLLENS: ${result.count} rows inserted upon ${municipalities.length} municipalities`,
    );
    logStep(
      `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    );
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getPollensIndicator' } });
  }
}
