// @ts-ignore
import csv2json from 'csvjson-csv2json/csv2json.js';
import { PollenAllergyRisk } from '@prisma/client';
import prisma from '~/prisma';
import fs from 'fs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import type { MunicipalityJSON, DepartmentCode } from '~/types/municipality';

import { pollenResponseSchema } from './validation-schemas/pollens.schema';
import { ZodService } from '~/services/zod.service';

const URL = 'https://www.pollens.fr/docs/ecosante.csv';

let now = Date.now();
function logStep(step: string) {
  console.log(Date.now() - now, step);
  now = Date.now();
}

export default async function getPollensIndicator() {
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

  const date = Object.keys(data[0])[0];
  logStep(`diffusionDate: ${date}`);
  const pollensByDepartment: Record<DepartmentCode, PollenAllergyRisk> = {};
  for (const row of data) {
    const departmentCode = row[date];
    let formattedDepCode =
      departmentCode < 10 && departmentCode != '2A' && departmentCode != '2B'
        ? '0' + departmentCode
        : '' + departmentCode;
    delete row[date];
    pollensByDepartment[formattedDepCode] = row;
  }

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
  logStep('fetching muunicipalities DONE');

  const diffusionDate = dayjs(date, 'DD/MM/YYYY').startOf('day').toISOString();
  const validityEnd = dayjs(diffusionDate)
    .add(7, 'days')
    .endOf('day')
    .toISOString();

  const pollensRows = [];
  for (const municipality of municipalities) {
    const pollenData = pollensByDepartment[municipality.DEP];
    if (!pollenData) {
      continue;
    }
    pollensRows.push({
      diffusion_date: diffusionDate,
      validity_start: diffusionDate,
      validity_end: validityEnd,
      municipality_insee_code: municipality.COM,
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

  ZodService.checkSchema(
    'pollenResponseSchema',
    pollenResponseSchema,
    pollensRows,
  );

  const result = await prisma.pollenAllergyRisk.createMany({
    data: pollensRows,
    skipDuplicates: true,
  });

  logStep(
    `DONE INSERTING POLLENS: ${result.count} rows inserted upon ${municipalities.length} municipalities`,
  );
}
