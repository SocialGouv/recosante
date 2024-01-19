import prisma from '~/prisma';
import type { Municipality } from '@prisma/client';
import fs from 'fs';

interface EPCIJSON {
  CODGEO: Municipality['COM']; // Code géographique
  LIBGEO: Municipality['LIBELLE']; // Libellé géographique
  EPCI: number; // Code EPCI - Code géographique de l'établissement public à fiscalité propre ou métropole
  LIBEPCI: string; // Libellé de l'EPCI ou métropole
  DEP: Municipality['DEP']; // Code département
  REG: Municipality['REG']; // Code région
}

type GeoApiCommune = {
  nom: string;
  code: Municipality['COM'];
  codeDepartement: Municipality['DEP'];
  siren: string;
  codeEpci: EPCIJSON['EPCI'];
  codeRegion: Municipality['REG'];
  codesPostaux: string[];
  population: number;
};

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[FILL MUNICIPALITIES] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}
async function fillMunicipalityDB() {
  /*
  Steps:
  1. grab the municipalities list (around 37500 in 2023)
  2. fetch the DEP from the Geo API for municipalities without DEP and without COMPARENT (around 570)
  3. grab the DEP from the COMPARENT for municipalities without DEP and with COMPARENT
  4: add the EPCI Code to the municipalities which need one
  5: save that in the database
  */

  /*
   *
   *
   *
   * Step 1: grab the municipalities list (around 37500 in 2023)
   * downloaded from: "INSEE - Code officiel géographique au 1er janvier 2023"
   * on https://www.insee.fr/fr/information/6800675
   * CSV file transformed into JSON with https://csvjson.com/csv2json
   *
   */
  const municipalitiesJSON: Municipality[] = await new Promise((resolve) => {
    fs.readFile('./data/municipalities.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const municipalities = JSON.parse(data);
      resolve(municipalities);
    });
  });
  logStep('Step 1: grabbed the municipalities list (around 37500 in 2023)');
  /*
   *
   *
   *
   * Step 2: fetch the DEP from the Geo API for municipalities without DEP and without COMPARENT (around 570)
   *
   */

  // let's build an object to further reduce complexity from O(n^2) to O(n)
  const municipalitiesObject: Record<Municipality['COM'], Municipality> = {};
  for (const municipality of municipalitiesJSON) {
    if (!municipality.COM) {
      console.log('municipality without COM', municipality);
    }
    if (!municipality.DEP && municipality.COMPARENT === municipality.COM) {
      const commune: GeoApiCommune = await fetch(
        `https://geo.api.gouv.fr/communes/${municipality.COM}`,
      ).then(async (res) => await res.json());
      // limit: 50 request per second https://geo.api.gouv.fr/faq
      await new Promise((resolve) => setTimeout(resolve, 30));
      // console.log(
      //   'municipality',
      //   municipality.COM,
      //   municipality.LIBELLE,
      //   commune.codeDepartement,
      // );
      municipalitiesObject[municipality.COM] = {
        ...municipality,
        DEP: commune.codeDepartement,
      };
      continue;
    }
    municipalitiesObject[municipality.COM] = municipality;
  }
  logStep(
    'Step 2: fetched the DEP from the Geo API for municipalities without DEP and without COMPARENT (around 570)',
  );
  /*
   *
   *
   *
   * Step 3. grab the DEP from the COMPARENT for municipalities without DEP and with COMPARENT
   *
   */

  function findDepartmentRecursive(
    municipality: Municipality,
  ): Municipality['DEP'] {
    if (municipality.DEP) {
      return municipality.DEP;
    }
    if (!municipality.COMPARENT) {
      console.log(
        'municipality without DEP and without COMPARENT',
        municipality,
      );
      throw new Error(
        `municipality without DEP and without COMPARENT: ${municipality.COM}`,
      );
    }
    if (municipality.COMPARENT === municipality.COM) {
      const DEP = municipalitiesObject[municipality.COM].DEP;
      if (!DEP) {
        console.log('municipality COMPARENT=COM without DEP', municipality.COM);
        throw new Error(
          `municipality COMPARENT=COM without DEP: ${municipality.COM}`,
        );
      }
      return DEP;
    }
    const parentMunicipality = municipalitiesObject[municipality.COMPARENT];
    if (!parentMunicipality) {
      console.log('no parent municipality found', municipality);
      throw new Error(`no parent municipality found for ${municipality.COM}`);
    }
    return findDepartmentRecursive(parentMunicipality);
  }

  const municipalitiesWithDEP = municipalitiesJSON.map((municipality) => {
    if (municipality.DEP) return municipality;
    const DEP = findDepartmentRecursive(municipality);
    return {
      ...municipality,
      DEP,
    };
  });

  console.assert(municipalitiesWithDEP.filter((m) => !m.DEP).length === 0);

  // now all the municipalities have a DEP
  logStep(
    'Step 3: grabbed the DEP from the COMPARENT for municipalities without DEP and with COMPARENT',
  );

  /*
   *
   *
   *
   * Step 4: add the EPCI Code to the municipalities which need one
   *
   */

  const epcisJSON: EPCIJSON[] = await new Promise((resolve) => {
    fs.readFile('./data/epci.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
  const municipalitiesEPCIByINSEECode: Record<
    Municipality['COM'],
    EPCIJSON['EPCI']
  > = {};
  for (const epci of epcisJSON) {
    if (!epci.EPCI) {
      console.log('epci without EPCI', epci);
      continue;
    }
    if (!epci.CODGEO) {
      console.log('epci without CODGEO', epci);
      continue;
    }
    municipalitiesEPCIByINSEECode[epci.CODGEO] = epci.EPCI;
  }

  const municipalitiesWithEPCI = municipalitiesJSON.map((municipality) => {
    if (!municipalitiesEPCIByINSEECode[municipality.COM]) return municipality;
    return {
      ...municipality,
      EPCI: `${municipalitiesEPCIByINSEECode[municipality.COM]}`,
    };
  });

  logStep('Step 4: added the EPCI Code to the municipalities which need one');

  /*
   *
   *
   *
   * Step 5: save that in the database
   *
   */

  await prisma.municipality.createMany({
    data: municipalitiesWithEPCI,
    skipDuplicates: true,
  });
  logStep('Step 5: saved that in the database');
}

fillMunicipalityDB();
