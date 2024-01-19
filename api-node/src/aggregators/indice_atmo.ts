import { DataAvailabilityEnum } from '@prisma/client';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { MunicipalityJSON } from '~/types/municipality';
import { IndiceAtmoAPIDataIdsEnum } from '~/types/api/indice_atmo';
import type {
  DATE_CALENDAR_YYYY_MM_DD,
  IndiceAtmoAPIResponse,
  IndiceAtmoByCodeZone,
  IndiceAtmoNotAvailable,
  IndiceAtmoAvailable,
} from '~/types/api/indice_atmo';

import { z } from 'zod';
import { capture } from '~/third-parties/sentry';
import { ATMODATA_PASSWORD, ATMODATA_USERNAME } from '~/config';
import {
  grabMunicipalitiesINSEECodeByEPCI,
  grabMunicipalities,
} from '~/utils/municipalities';
dayjs.extend(customParseFormat);
dayjs.extend(utc);

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[INDICE ATMO] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

/*
// https://www.atmo-france.org/sites/federation/files/medias/documents/2022-03/notice_decembre2020.pdf page 9/32
Lecture pour les dates dans les résultats
•
données horaires « DD/MM/YYYY HH » :
		 o date_debut = DD/MM/YYYY HH-1:00
		 o date_fin = DD/MM/YYYY HH-1:59
•
La journée commence à 0 h 00 UTC.
•
La première mesure horaire de la journée est l’heure 1 ; elle correspond aux mesures effectuées entre
0 h 00 UTC et 1 h 00 UTC.
•
La donnée horaire à l’heure h est la donnée issue des mesures effectuées entre h-1 UTC et h UTC.
•
La dernière mesure horaire du jour est l’heure 24 ; elle correspond aux mesures effectuées entre
23h00 UTC le jour J et 0h00 UTC le jour J+1.
•
L’heure 00 du jour J correspond à l’heure 24 du jour J-1.
*/

export async function getAtmoIndicator() {
  try {
    now = Date.now();
    logStep('Getting Atmo indicator');
    // Documentation:
    // https://admindata.atmo-france.org/api/doc
    // https://www.atmo-france.org/article/les-portails-regionaux-open-data-des-aasqa
    // https://www.atmo-france.org/actualite/une-faq-pour-bien-utiliser-lapi-datmo-data
    // https://www.atmo-france.org/sites/federation/files/medias/documents/2023-10/FAQ_API_Atmo_Data_20231010_0.pdf
    // https://www.atmo-france.org/sites/federation/files/medias/documents/2022-03/notice_decembre2020.pdf

    /*
    *
    *
    Step 1: Fetch Atmo JWT Token
    *
    *
    */
    const loginRes = await fetch(
      'https://admindata.atmo-france.org/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: ATMODATA_USERNAME,
          password: ATMODATA_PASSWORD,
        }),
      },
    ).then(async (response) => await response.json());
    const atmoJWTToken: string = loginRes.token;
    logStep('Step 1: Fetched Atmo JWT Token');

    /*
    *
    *
    Step 2: Fetch Atmo Data
    *
    *
    */
    await getAtmoIndicatorForDate(atmoJWTToken, dayjs().startOf('day').utc());

    logStep('Step 2: Fetched Atmo data for today');

    await getAtmoIndicatorForDate(
      atmoJWTToken,
      dayjs().add(1, 'day').startOf('day').utc(),
    );
    logStep('Step 3: Fetched Atmo data for tomorrow');
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getAtmoIndicator' } });
  }
}

export async function getAtmoIndicatorForDate(
  atmoJWTToken: string,
  indiceForDate: dayjs.Dayjs,
) {
  try {
    logStep(`Getting Atmo indicator for date ${indiceForDate.toISOString()}`);

    /*
    *
    *
    Step A: Fetch Atmo Data
    *
    *
    */

    type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'IN' | 'NOT IN';

    const indiceDataId = IndiceAtmoAPIDataIdsEnum.indice_current_year;

    const dateQuery: { operator: Operator; value: DATE_CALENDAR_YYYY_MM_DD } = {
      operator: '=',
      value: indiceForDate.format('YYYY-MM-DD'),
    };
    const rawQuery: Record<'date_ech', { operator: Operator; value: string }> =
      {
        date_ech: dateQuery,
      };
    const query = JSON.stringify(rawQuery);
    const url = `https://admindata.atmo-france.org/api/data/${indiceDataId}/${query}?withGeom=false`;

    const indicesRes: IndiceAtmoAPIResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${atmoJWTToken}`,
      },
    }).then(async (response) => await response.json());
    logStep(
      `Step A: Fetched Atmo data for ${indiceForDate.format(
        'YYYY-MM-DD dddd',
      )}`,
    );

    const data = indicesRes.features;
    // write down a file to debug
    // fs.writeFile(
    //   './data/atmo.json',
    //   JSON.stringify(data, null, 2),
    //   function (err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   },
    // );
    // return;

    if (!data?.length) {
      capture('No atmo data found', {
        extra: { functionCall: 'getAtmoIndicator', data },
      });
      return;
    }

    /*
    *
    *
    Step B: Load municipalities and EPCIS
    *
    *
    */

    const municipalities = await grabMunicipalities();
    logStep('Step B.i: Loaded municipalities');

    const municipalitiesINSEECodeByEPCI =
      await grabMunicipalitiesINSEECodeByEPCI();
    logStep('Step B.ii: Loaded and formatted EPCIS');

    /*
    *
    *
    Step C: Loop on data and organize it by municipality Insee Code
    so that when we loop over all the municipalities, we can easily find the data for each municipality
    (we reduce complexity from O(n^2) to O(n))
    *
    *
    */

    const indiceAtmoByMunicipalityInseeCode: Record<
      MunicipalityJSON['COM'],
      IndiceAtmoByCodeZone
    > = {};

    for (const row of data) {
      try {
        z.object({
          type: z.literal('Feature'),
          geometry: z.null(),
          properties: z.object({
            code_no2: z.number().min(0).max(8),
            code_o3: z.number().min(0).max(8),
            code_pm10: z.number().min(0).max(8),
            code_pm25: z.number().min(0).max(8),
            code_qual: z.number().min(0).max(8),
            code_so2: z.number().min(0).max(8),
            code_zone: z.string(),
            coul_qual: z.string().length(7),
            date_dif: z.string(),
            date_ech: z.string(),
            date_maj: z.string(),
            epsg_reg: z.string().optional().nullable(),
            gml_id: z.number().optional().nullable(),
            lib_qual: z.string().optional().nullable(),
            lib_zone: z.string().optional().nullable(),
            partition_field: z.string().optional().nullable(),
            source: z.string().optional().nullable(),
            type_zone: z.string().optional().nullable(),
            x_reg: z.number().optional().nullable(),
            x_wgs84: z.number().optional().nullable(),
            y_reg: z.number().optional().nullable(),
            y_wgs84: z.number().optional().nullable(),
          }),
        }).parse(row);
      } catch (zodError: any) {
        capture(zodError, {
          extra: {
            functionCall: 'getAtmoIndicator',
            row,
            zodError,
          },
        });
        continue;
      }
      const isEPCI = row.properties.type_zone === 'EPCI';
      if (isEPCI) {
        const epciCode = Number(row.properties.code_zone);
        const municipalityInseeCodes = municipalitiesINSEECodeByEPCI[epciCode];
        if (!municipalityInseeCodes?.length) {
          capture('[INDICE ATMO AGGREGATION] No EPCI found for code', {
            extra: {
              functionCall: 'getAtmoIndicator',
              epciCode,
              municipalityInseeCodes,
              // municipalitiesINSEECodeByEPCI,
              data: row.properties,
            },
          });
          continue;
        }
        for (const municipalityInseeCode of municipalityInseeCodes) {
          indiceAtmoByMunicipalityInseeCode[municipalityInseeCode] =
            row.properties;
          continue;
        }
        continue;
      }
      const isMunicipality =
        row.properties.type_zone.toLocaleLowerCase() === 'commune';
      if (!isMunicipality) {
        capture('[INDICE ATMO AGGREGATION] Unknown type_zone', {
          extra: { functionCall: 'getAtmoIndicator', data: row.properties },
        });
        continue;
      }
      const municipalityInseeCode = row.properties.code_zone;
      indiceAtmoByMunicipalityInseeCode[municipalityInseeCode] = row.properties;
    }
    logStep(
      `Step C: Loop on data and organized it by municipality Insee Code: ${
        Object.keys(indiceAtmoByMunicipalityInseeCode).length
      } rows upon ${municipalities.length} municipalities`,
    );
    /*
    *
    *
    Step D: Loop on municipalities and create rows to insert
    *
    *
    */

    const validityEnd = dayjs(indiceForDate).endOf('day').utc().toDate();

    const indiceAtmoByMunicipalityRows: Array<
      IndiceAtmoNotAvailable | IndiceAtmoAvailable
    > = [];
    let missingData = 0;
    const missingDepartments: Record<MunicipalityJSON['DEP'], number> = {};
    for (const municipality of municipalities) {
      const indiceAtmoData =
        indiceAtmoByMunicipalityInseeCode[municipality.COM] ??
        indiceAtmoByMunicipalityInseeCode[municipality.COMPARENT];
      // if no data for this department, we say that data is not available.

      if (!indiceAtmoData) {
        const unique_composed_key = `${
          municipality.COM
        }_${indiceForDate.toISOString()}`;
        indiceAtmoByMunicipalityRows.push({
          diffusion_date: dayjs().utc().toDate(),
          validity_start: indiceForDate.toDate(),
          validity_end: validityEnd,
          municipality_insee_code: municipality.COM,
          data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
          unique_composed_key,
        });
        missingData++;
        if (municipality.DEP) {
          if (!missingDepartments[municipality.DEP]) {
            missingDepartments[municipality.DEP] = 0;
          }
          missingDepartments[municipality.DEP]++;
        } else {
          console.log('No DEP for municipality', municipality);
        }
        continue;
      }
      const unique_composed_key = `${municipality.COM}_${indiceAtmoData.date_maj}_${indiceAtmoData.date_ech}`;
      indiceAtmoByMunicipalityRows.push({
        unique_composed_key,
        diffusion_date: new Date(indiceAtmoData.date_maj),
        validity_start: indiceForDate.toDate(),
        validity_end: validityEnd,
        municipality_insee_code: municipality.COM,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        code_no2: indiceAtmoData.code_no2,
        code_o3: indiceAtmoData.code_o3,
        code_pm10: indiceAtmoData.code_pm10,
        code_pm25: indiceAtmoData.code_pm25,
        code_so2: indiceAtmoData.code_so2,
        code_qual: indiceAtmoData.code_qual,
        lib_qual: indiceAtmoData.lib_qual,
        date_maj: indiceAtmoData.date_maj,
        date_dif: indiceAtmoData.date_dif,
        date_ech: indiceAtmoData.date_ech,
        code_zone: indiceAtmoData.code_zone,
        source: indiceAtmoData.source,
        type_zone: indiceAtmoData.type_zone,
        // unused fields from the API
        partition_field: indiceAtmoData.partition_field,
        coul_qual: indiceAtmoData.coul_qual,
        lib_zone: indiceAtmoData.lib_zone,
        aasqa: indiceAtmoData.aasqa,
        gml_id: indiceAtmoData.gml_id,
        epsg_reg: indiceAtmoData.epsg_reg,
        x_reg: indiceAtmoData.x_reg,
        x_wgs84: indiceAtmoData.x_wgs84,
        y_reg: indiceAtmoData.y_reg,
        y_wgs84: indiceAtmoData.y_wgs84,
      });
    }
    logStep(
      `Step D: Looped on municipalities and created rows to insert: ${indiceAtmoByMunicipalityRows.length} rows upon ${municipalities.length} municipalities`,
    );
    /*
    *
    *
    Step E: insert data
    *
    *
    */

    const result = await prisma.indiceAtmospheric.createMany({
      data: indiceAtmoByMunicipalityRows,
      skipDuplicates: true,
    });
    logStep(
      `DONE INSERTING INDICE ATMO: ${result.count} rows inserted upon ${municipalities.length} municipalities`,
    );
    /*
    *
    *
    Step F: final logs
    *
    *
    */

    const totalAvailableIndiceAtmoForToday =
      await prisma.indiceAtmospheric.count({
        where: {
          data_availability: DataAvailabilityEnum.AVAILABLE,
          validity_start: {
            gte: indiceForDate.toDate(),
          },
        },
        orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
      });
    logStep(
      `TOTAL DATA FOR TODAY: ${totalAvailableIndiceAtmoForToday} upon ${municipalities.length} municipalities`,
    );

    /*
    *
    *
    Step G: log missing departments
    *
    *
    */
    const depsArray = Object.keys(missingDepartments).map(
      (dep) => `${dep} (${missingDepartments[dep]})`,
    );
    const depsString = depsArray.join(', ');
    logStep(`Missing departments: ${depsArray.length}: ${depsString}`);
    logStep(
      `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    );
  } catch (error: any) {
    capture(error, {
      extra: { functionCall: 'getAtmoIndicatorForDate', indiceForDate },
    });
  }
}
