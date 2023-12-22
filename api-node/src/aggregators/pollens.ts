import fetch from 'node-fetch';
import dotenv from 'dotenv';
// @ts-ignore
import csv2json from 'csvjson-csv2json/csv2json.js';
import { PollenAllergyRisk } from '@prisma/client';
import prisma from '../prisma';
dotenv.config({ path: './.env' });
const URL = 'https://www.pollens.fr/docs/ecosante.csv';

export default function getPollensIndicator() {
  fetch(URL).then(async (response) => {
    if (!response.ok) {
      throw new Error(`getPollensIndicator error! status: ${response.status}`);
    }
    const data = await response.text();
    const formatedJson = csv2json(data, { parseNumbers: true });
    formatedJson.forEach((row: any) => {
      // // get the first key (date)
      const key = Object.keys(row)[0];
      // // get the value
      const value = row[key];
      row.municipality_insee_code = value.toString();
      // // delete the key
      delete row[key];
      // // add the new key
      // row.diffusion_date = new Date(key).toISOString();
      row.diffusion_date = new Date();
      row.validity_start = new Date();
      row.validity_end = new Date();
      delete row.departements;
      delete row.Total;
    });

    formatedJson.forEach(async (row: PollenAllergyRisk, index: number) => {
      await prisma.pollenAllergyRisk.create({ data: row });
    });
  });
  /*
  1. fetch data
  2. map the v_commune_2023.csv file by insee_code
  3. for each insee_code, we know the department codd
  v_commune_2023.map(commune => {
    const pollenRow = pollenData.find(pollen => pollen.depratement_code === commune.DEP);
    return {
      validity_start: pollenRow.validity_start,
      validity_end: pollenRow.validity_end,
      diffusion_date: pollenRow.diffusion_date,
      municipality_insee_code: commune.insee_code,
      cypres: pollenRow.cypres,
      noisetier: pollenRow.noisetier,
      ....
    }
  })
  */
}

getPollensIndicator();
