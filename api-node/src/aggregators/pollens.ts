// @ts-ignore
import csv2json from 'csvjson-csv2json/csv2json.js';
import { PollenAllergyRisk, DataAvailabilityEnum } from '@prisma/client';
import prisma from '~/prisma';
import fs from 'fs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import type { MunicipalityJSON, DepartmentCode } from '~/types/municipality';

import { z } from 'zod';
import { capture } from '~/third-parties/sentry';

const URL = 'https://www.pollens.fr/docs/ecosante.csv';

let now = Date.now();
function logStep(step: string) {
  console.log(Date.now() - now, step);
  now = Date.now();
}

export default async function getPollensIndicator() {
  // Step 1: Fetch data
  logStep('Fetching Pollens Data');
  const data = await fetch(URL).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getPollensIndicator error! status: ${response.status}`);
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
        cypres: z.number().optional(),
        noisetier: z.number().optional(),
        aulne: z.number().optional(),
        peuplier: z.number().optional(),
        saule: z.number().optional(),
        frene: z.number().optional(),
        charme: z.number().optional(),
        bouleau: z.number().optional(),
        platane: z.number().optional(),
        chene: z.number().optional(),
        olivier: z.number().optional(),
        tilleul: z.number().optional(),
        chataignier: z.number().optional(),
        rumex: z.number().optional(),
        graminees: z.number().optional(),
        plantain: z.number().optional(),
        urticacees: z.number().optional(),
        armoises: z.number().optional(),
        ambroisies: z.number().optional(),
        total: z.number().optional(),
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
  const diffusionDate = dayjs(date, 'DD/MM/YYYY').startOf('day').toDate();
  const validityEnd = dayjs(diffusionDate).add(7, 'days').endOf('day').toDate();

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
  const pollensByDepartment: Record<DepartmentCode, PollenAllergyRisk> = {};
  for (const row of data) {
    const departmentCode = row[date];
    // we need to format the department code to have a 2 digits string
    let formattedDepCode =
      departmentCode < 10 && departmentCode != '2A' && departmentCode != '2B'
        ? '0' + departmentCode
        : '' + departmentCode;
    delete row[date];
    pollensByDepartment[formattedDepCode] = row;
  }

  // Step 5: grab the municipalities list
  logStep('formatting pollens by department DONE');
  const municipalities: Array<MunicipalityJSON> = await new Promise(
    (resolve) => {
      fs.readFile('./data/municipalities.json', 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const municipalities = JSON.parse(data);
        resolve(municipalities);
      });
    },
  );

  // Step 6: loop on municipalities and create rows to insert
  logStep('fetching municipalities DONE');
  const pollensRows = [];
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
      total: pollenData.total,
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
}
