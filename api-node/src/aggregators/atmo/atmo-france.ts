// @ts-expect-error csvjson-csv2json is not typed
import csv2json from 'csvjson-csv2json/csv2json.js';
import { type PollenAllergyRisk, DataAvailabilityEnum } from '@prisma/client';
import prisma from '~/prisma';
import fs from 'fs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { MunicipalityJSON, EPCIJSON } from '~/types/municipality';
import { IndiceAtmoAPIDataIdsEnum } from '~/types/api/indice_atmo';
import type {
  YYYYMMDD,
  IndiceAtmoAPIResponse,
  IndiceAtmoByCodeZone,
} from '~/types/api/indice_atmo';

import { z } from 'zod';
import { capture } from '~/third-parties/sentry';
import { ATMODATA_PASSWORD, ATMODATA_USERNAME } from '~/config';
dayjs.extend(customParseFormat);

let now = Date.now();
function logStep(step: string) {
  console.log(Date.now() - now, step);
  now = Date.now();
}

// const dataIds = {
//   indice_current_year: 112, // Les indices de la qualité de l’air « indice ATMO » depuis le début de l’année passée
//   episodes_pollution_current_year: 113, // Les épisodes de pollution constatés sur l’année passée (id 113) :
//   episodes_pollution_yesterday_today_tomorrow: 114, // Les épisodes de pollution constatés pour la veille et le jour même, et prévu pour le lendemain
//   emissions_regions: 119, // Les émissions des régions
// };

// const searchOperatorEpisodePollution = {
//   code_zone: 'code_zone', // code département selon l’INSEE;
//   date_ech: 'date_ech', // date de l’alerte, au format international (YYYY-DD-MM) ;
//   etat: 'etat', // niveau d’alerte avec 3valeurs possibles : information et recommandation, alerte sur persistance et alerte,
//   lib_pol: {
//     //  le polluant déclencheur :
//     code_no2: 'code_no2', // qualificatif pour le sous-indice du polluant NO₂
//     code_o3: 'code_o3', // qualificatif pour le sous-indice du polluantl’indice O₃
//     code_pm10: 'code_pm10', // qualificatif pour le sous-indice du polluant PM10
//     code_pm25: 'code_pm25', // qualificatif pour le sous-indice du polluant PM2,5
//     code_so2: 'code_so2', // qualificatif pour le sous-indice du polluant l’indice SO₂
//   },
// };

// const searchOperators = {
//   indice_current_year: {
//     code_zone: 'code_zone', // code commune ou EPCI selon l’INSEE
//     date_ech: 'date_ech', // date de l’indice, au format international (YYYY-DD-MM)
//     code_no2: 'code_no2', // qualificatif pour le sous-indice du polluant NO₂
//     code_o3: 'code_o3', // qualificatif pour le sous-indice du polluantl’indice O₃
//     code_pm10: 'code_pm10', // qualificatif pour le sous-indice du polluant PM10
//     code_pm25: 'code_pm25', // qualificatif pour le sous-indice du polluant PM2,5
//     code_so2: 'code_so2', // qualificatif pour le sous-indice du polluant l’indice SO₂
//     code_qual: 'code_qual', // qualificatif de l’indice ATMO. Pour les qualificatifs des sous-indices et de l’indice ATMO, les valeurs possibles vont de 1 (bon) à 6 (extrêmement mauvais), avec 0 (indisponible) et 8 (événement).
//   },
//   episodes_pollution_current_year: searchOperatorEpisodePollution,
//   episodes_pollution_yesterday_today_tomorrow: searchOperatorEpisodePollution,
//   emissions_regions: {
//     code: 'code', // code région selon l’INSEE
//     code_pcaet: {
//       // Les codes des secteurs au format PCAET
//       34: '34', // Résidentiel-Tertiaire
//       All: 'All', // tous secteurs confondus
//       2: '2', // Industrie manufacturière et construction
//       5: '5', // Agriculture, pisciculture et aquaculture
//       6: '6', // Transport routier
//       7: '7', // Mode de transport autre que le routier
//     },
//     ges: 'ges', // Emissions de gaz à effet de serre
//     nox: 'nox', // Emissions d’oxydes d’azote
//     pm10: 'pm10', // Emissions de particules de diamètre inférieur à 10 µm
//     pm25: 'pm25', // Emissions de particules de diamètre inférieur à 2,5 µm
//     population: 'population', // La population de la région
//     Superficie: 'Superficie', // La superficie de la région
//   },
// };

/*
QUELLES SONT LES BONNES PRATIQUES POUR UTILISER
L’API ?
Les flux sont mis à jour quotidiennement (c’est-à-dire 1 fois par jour), à partir de 13h00
(heure de Paris) jusqu’à 15h00 pour la métropole et à partir de 18h00 pour les outre-mer
Les serveurs d’Atmo Data connaissent donc un pic d’activité entre 13h et 15h. Les requêtes
sont à effectuer 1 à 2 fois par jour, en dehors de ces horaires.
Il est vivement recommandé d’utiliser « ?withGeom=false » à la fin de votre requête si vous
n’avez pas besoin des géométries incluses dans le flux. Le retour à votre requête n’en sera
que plus rapide, et les capacités des serveurs économisées.
Il est préférable, si vous avez besoin très régulièrement des données proposées par
AtmoData depuis un certain temps (par exemple l’historique des indices), de ne pas requêter
à chaque utilisation, mais de partitionner vos requêtes, et/ou de les mettre en cache.
Exemples :
Mon application a besoin à chaque utilisation des données de toute la France pour le
jour même :
Je requête une fois par jour, après la mise à jour, en précisant la date du jour dans les
paramètres de recherche ;
Mon application a besoin des données de tout le territoire depuis l’année dernière :
Avant le lancement de la fonctionnalité, j’effectue plusieurs requêtes dans la journée,
successivement, par tranche de 2 semaines, pour ensuite les mettre en cache dans mon
application, et ajouter l’indice du jour, selon l’exemple précédent.
*/

export async function getAtmoIndicator() {
  try {
    logStep('Getting Atmo indicator');
    // Documentation:
    // https://admindata.atmo-france.org/api/doc
    // https://www.atmo-france.org/article/les-portails-regionaux-open-data-des-aasqa
    // https://www.atmo-france.org/actualite/une-faq-pour-bien-utiliser-lapi-datmo-data
    // https://www.atmo-france.org/sites/federation/files/medias/documents/2023-10/FAQ_API_Atmo_Data_20231010_0.pdf

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

    type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'IN' | 'NOT IN';

    const indiceDataId = IndiceAtmoAPIDataIdsEnum.indice_current_year;
    const dateQuery: { operator: Operator; value: YYYYMMDD } = {
      operator: '=',
      value: dayjs().add(1, 'day').format('YYYY-MM-DD'),
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
    }).then(async (response) => {
      console.log({ response });
      return await response.json();
    });
    logStep('Step 2: Fetched Atmo data');

    const data = indicesRes.features;

    if (!data?.length) {
      capture('No atmo data found', {
        extra: { functionCall: 'getAtmoIndicator', data },
      });
      return;
    }

    /*
    *
    *
    Step 3: Load municipalities and EPCIS
    *
    *
    */

    const municipalities: MunicipalityJSON[] = await new Promise((resolve) => {
      fs.readFile('./data/municipalities.json', 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const municipalities = JSON.parse(data);
        resolve(municipalities);
      });
    });
    logStep('Step 3: Loaded municipalities');

    const epcis: EPCIJSON[] = await new Promise((resolve) => {
      fs.readFile('./data/municipalities.json', 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const municipalities = JSON.parse(data);
        resolve(municipalities);
      });
    });

    // we create an object that list all the municipalities Insee Codes by EPCI Code
    // then when we loop on the data, we can easily find all the municipalities Insee Code for a given EPCI Code
    const epcisObject: Record<
      EPCIJSON['EPCI'],
      Array<MunicipalityJSON['COM']>
    > = {};
    for (const epci of epcis) {
      if (!epcisObject[epci.EPCI]) {
        epcisObject[epci.EPCI] = [];
      }
      epcisObject[epci.EPCI].push(epci.CODGEO);
    }
    logStep('Step 4: Loaded and formatted EPCIS');

    /*
    *
    *
    Step 4: Loop on data and organize it by municipality Insee Code
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
      const isEPCI = row.properties.type_zone === 'EPCI';
      if (isEPCI) {
        const epciCode = row.properties.code_zone;
        const epci = epcisObject[epciCode];
        if (!epci) {
          capture('[INDICE ATMO AGGREGATION] No EPCI found for code', {
            extra: { functionCall: 'getAtmoIndicator', data: row.properties },
          });
          continue;
        }
        for (const municipalityInseeCode of epci) {
          indiceAtmoByMunicipalityInseeCode[municipalityInseeCode] =
            row.properties;
          continue;
        }
        continue;
      }
      const isMunicipality = row.properties.type_zone === 'commune';
      if (!isMunicipality) {
        capture('[INDICE ATMO AGGREGATION] Unknown type_zone', {
          extra: { functionCall: 'getAtmoIndicator', data: row.properties },
        });
        continue;
      }
      const municipalityInseeCode = row.properties.code_zone;
      indiceAtmoByMunicipalityInseeCode[municipalityInseeCode] = row.properties;
    }

    /*
    *
    *
    Step 5: Loop on municipalities and create rows to insert
    *
    *
    */

    const diffusionDate = dayjs().startOf('day').toDate();
    const validityEnd = dayjs(diffusionDate).endOf('day').toDate();

    const indiceAtmoByMunicipalityRows = [];
    let missingData = 0;
    for (const municipality of municipalities) {
      const indiceAtmoData =
        indiceAtmoByMunicipalityInseeCode[municipality.COM];
      // if no data for this department, we say that data is not available.
      if (!indiceAtmoData) {
        indiceAtmoByMunicipalityRows.push({
          diffusion_date: diffusionDate,
          validity_start: diffusionDate,
          validity_end: validityEnd,
          municipality_insee_code: municipality.COM,
          data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
        });
        missingData++;
        continue;
      }
      indiceAtmoByMunicipalityRows.push({
        diffusion_date: diffusionDate,
        validity_start: diffusionDate,
        validity_end: validityEnd,
        municipality_insee_code: municipality.COM,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        uv_j0: indiceUvData.UV_J0,
        uv_j1: indiceUvData.UV_J1,
        uv_j2: indiceUvData.UV_J2,
        uv_j3: indiceUvData.UV_J3,
      });
    }
    // Step 9: insert data

    console.log(JSON.stringify(indicesRes, null, 2));
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getAtmoIndicator' } });
  }
}
