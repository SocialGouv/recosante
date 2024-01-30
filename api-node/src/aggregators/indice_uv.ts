// @ts-expect-error csvtojson
import csv2json from 'csvjson-csv2json/csv2json.js';
import fs from 'fs';
import ftp from 'basic-ftp';
import dayjs from 'dayjs';
import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  type Municipality,
} from '@prisma/client';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
// import { AlertStatusThresholdEnum } from '~/utils/alert_status';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
let now = Date.now();
function logStep(step: string) {
  console.info(`[INDICE UV] Duration: ${Date.now() - now}ms`.padEnd(40), step);
  now = Date.now();
}

const client = new ftp.Client();
client.ftp.verbose = false;

type IndiceUVRow = {
  insee: string | number;
  commune: string;
  date: string;
  UV_J0: number | '';
  UV_J1: number | '';
  UV_J2: number | '';
  UV_J3: number | '';
};

export async function getIndiceUVIndicator() {
  try {
    now = Date.now();
    logStep('Getting Indice UV');
    // Step1: Connect to FTP
    await client.access({
      host: process.env.FS_BUCKET_URL,
      user: process.env.FS_BUCKET_USERNAME,
      password: process.env.FS_BUCKET_PASSWORD,
      secure: true,
    });
    logStep('Connected to FTP');
    // Step2: Access to the file of the day
    // File name format: (YYYYMMDD.csv)
    const response = await client.list();
    const today_name = dayjs().format('YYYYMMDD');
    const file = response.find((file) => file.name.includes(today_name));

    if (!file) {
      throw new Error('No file found');
    }
    logStep('Found the file');
    // Step3: Download the file
    // create a file to stream archive data to.
    const folder = 'src/aggregators/_indice-uv-temp';
    const dir = `${folder}/${file.name}`;

    try {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    } catch (err) {
      console.error(err);
    }
    logStep('Created the folder');
    fs.writeFileSync(dir, '');
    await client.downloadTo(dir, file.name);
    logStep('Downloaded the file');
    const data = fs.readFileSync(dir, {
      encoding: 'utf8',
    });
    client.close();
    logStep('Closed the connection');

    // Step4: Format the file
    const rawFormatedJson = csv2json(data, {
      parseNumbers: true,
    }) as IndiceUVRow[];

    // TODO: validate data

    logStep('Formatted the file');
    // Step5: Check if the data exists in the database

    const date = rawFormatedJson[0].date;
    const diffusionDate = dayjs(date).utc().startOf('day').toDate();
    const validityEnd = dayjs(diffusionDate).endOf('day').toDate();

    logStep('Checked if the data exists in the database');
    const existingIndiceUVData = await prisma.indiceUv.count({
      where: {
        diffusion_date: diffusionDate,
      },
    });

    if (existingIndiceUVData > 0) {
      logStep(
        `Indice UV already fetched for diffusionDate ${date}: ${existingIndiceUVData} rows`,
      );
      fs.rmSync(folder, { recursive: true, force: true });
      logStep('Deleted the file');
      return;
    }
    // Step 6: grab the municipalities list
    logStep('formatting indice UV by department DONE');
    const municipalities = await prisma.municipality.findMany();
    // Step 7: format data by department to iterate quickly on municipalities
    const indiceUVByInseeCode: Record<
      Municipality['DEP'],
      {
        UV_J0: number | null;
        UV_J1: number | null;
        UV_J2: number | null;
        UV_J3: number | null;
      }
    > = {};
    for (const row of rawFormatedJson) {
      // NOT SURE OF THIS ... !!
      if (!row.insee) {
        continue;
      }

      function formatUV(uv: number | string): number | null {
        if (uv === '') {
          return null;
        }
        return Number(uv);
      }
      const inseeCode = row.insee.toString();
      indiceUVByInseeCode[inseeCode] = {
        UV_J0: formatUV(row.UV_J0),
        UV_J1: formatUV(row.UV_J1),
        UV_J2: formatUV(row.UV_J2),
        UV_J3: formatUV(row.UV_J3),
      };
    }

    logStep('fetching municipalities DONE');
    // Step 8: loop on municipalities and create rows to insert
    const indiceUVByMunicipalityRows = [];
    let missingData = 0;
    for (const municipality of municipalities) {
      // for corsica, the insee code in the indice_uv file is formatted like this: 2A001 for the city Afa
      // but in the indice_uv file, the insee code is formatted like this: 20001 for the city Afa
      // a rough analysis tells us that all the A or B in the insee dictionnary are replaced by 0 in the indice_uv file
      const inseeCodeWithNoLetter = municipality.COM.replace(/[AB]/g, '0');
      const indiceUvData = indiceUVByInseeCode[inseeCodeWithNoLetter];

      // if no data for this department, we say that data is not available.
      if (!indiceUvData) {
        indiceUVByMunicipalityRows.push({
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
      indiceUVByMunicipalityRows.push({
        diffusion_date: diffusionDate,
        validity_start: diffusionDate,
        validity_end: validityEnd,
        municipality_insee_code: municipality.COM,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        alert_status:
          (indiceUvData.UV_J0 ?? 0) >= 6
            ? AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
            : AlertStatusEnum.NOT_ALERT_THRESHOLD,
        uv_j0: indiceUvData.UV_J0,
        uv_j1: indiceUvData.UV_J1,
        uv_j2: indiceUvData.UV_J2,
        uv_j3: indiceUvData.UV_J3,
      });
    }
    // Step 9: insert data

    const result = await prisma.indiceUv.createMany({
      data: indiceUVByMunicipalityRows,
      skipDuplicates: true,
    });
    logStep(
      `DONE INSERTING INDICE UV : ${result.count} rows inserted upon ${municipalities.length} municipalities`,
    );
    logStep(
      `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    );
    // Step: Delete the file
    fs.rmSync(folder, { recursive: true, force: true });
    logStep('Deleted the file');
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getPollensIndicator' } });
  }
}
