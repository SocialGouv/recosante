import type { MunicipalityJSON, EPCIJSON } from '~/types/municipality';
import fs from 'fs';

export async function grabMunicipalities(): Promise<MunicipalityJSON[]> {
  const municipalities: MunicipalityJSON[] = await new Promise((resolve) => {
    fs.readFile(
      './data/municipalities-consolidated.json',
      'utf8',
      async (err, data) => {
        if (err) {
          console.log(
            'Error reading municipalities-consolidated.json from disk:',
            err,
          );
          console.error(err);
          return;
        }
        resolve(JSON.parse(data));
      },
    );
  });
  return municipalities;
}

export async function grabEPCIs(): Promise<EPCIJSON[]> {
  const epcis: EPCIJSON[] = await new Promise((resolve) => {
    fs.readFile('./data/epci.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });

  return epcis;
}

export async function grabMunicipalitiesINSEECodeByEPCI(): Promise<
  Record<EPCIJSON['EPCI'], Array<MunicipalityJSON['COM']>>
> {
  const epcis = await grabEPCIs();

  // we create an object that list all the municipalities Insee Codes by EPCI Code
  // then when we loop on the data, we can easily find all the municipalities Insee Code for a given EPCI Code
  const municipalitiesINSEECodeByEPCI: Record<
    EPCIJSON['EPCI'],
    Array<MunicipalityJSON['COM']>
  > = {};
  for (const epci of epcis) {
    if (!epci.EPCI) {
      console.log('epci without EPCI', epci);
      continue;
    }
    if (!municipalitiesINSEECodeByEPCI[epci.EPCI]) {
      municipalitiesINSEECodeByEPCI[epci.EPCI] = [];
    }
    municipalitiesINSEECodeByEPCI[epci.EPCI].push(epci.CODGEO);
  }
  return municipalitiesINSEECodeByEPCI;
}

type GeoApiCommune = {
  nom: string;
  code: MunicipalityJSON['COM'];
  codeDepartement: MunicipalityJSON['DEP'];
  siren: string;
  codeEpci: EPCIJSON['EPCI'];
  codeRegion: MunicipalityJSON['REG'];
  codesPostaux: string[];
  population: number;
};

async function populateMunicipalitiesDepartments() {
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

  const originalMunicipalitiesWithoutDepartment = municipalities.filter(
    (m) => !m.COMPARENT,
  );
  console.log(
    'originalMunicipalitiesWithoutDepartment',
    originalMunicipalitiesWithoutDepartment.length,
  );

  let numberOfComEqualtComparent = 0;
  // let's build an object to reduce complexity from O(n^2) to O(n)
  const municipalitiesObject: Record<
    MunicipalityJSON['COM'],
    MunicipalityJSON
  > = {};
  for (const municipality of municipalities) {
    if (!municipality.COM) {
      console.log('municipality without COM', municipality);
    }
    if (!municipality.DEP && municipality.COMPARENT === municipality.COM) {
      numberOfComEqualtComparent++;
      const commune: GeoApiCommune = await fetch(
        `https://geo.api.gouv.fr/communes/${municipality.COM}`,
      ).then(async (res) => await res.json());
      await new Promise((resolve) => setTimeout(resolve, 30));
      console.log(
        numberOfComEqualtComparent,
        'municipality',
        municipality.COM,
        municipality.LIBELLE,
        commune.codeDepartement,
      );
      municipalitiesObject[municipality.COM] = {
        ...municipality,
        DEP: commune.codeDepartement,
      };
      continue;
    }
    municipalitiesObject[municipality.COM] = municipality;
  }

  await new Promise((res) => {
    fs.writeFile(
      './data/municipalities-object-temp.json',
      JSON.stringify(municipalitiesObject),
      (err) => {
        if (err) {
          console.error('An error ocurred during writing file', err);
          throw err;
        }
        console.log('File has been saved.');
        res('File has been saved.');
      },
    );
  });

  function findDepartmentRecursive(
    municipality: MunicipalityJSON,
  ): MunicipalityJSON['DEP'] {
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

  console.log('numberOfComEqualtComparent', numberOfComEqualtComparent);

  const nextMunicipalities = municipalities.map((municipality) => {
    if (municipality.DEP) return municipality;
    const DEP = findDepartmentRecursive(municipality);
    return {
      ...municipality,
      DEP,
    };
  });

  const munNoDep = nextMunicipalities.filter((m) => !m.DEP);
  console.log('munNoDep', munNoDep.length);
  await new Promise((res) => {
    fs.writeFile(
      './data/municipalities-consolidated.json',
      JSON.stringify(nextMunicipalities),
      (err) => {
        if (err) {
          console.error('An error ocurred during writing file', err);
          throw err;
        }
        console.log('File has been saved.');
        res('File has been saved.');
      },
    );
  });

  // delete data/municipalities-object-temp.json',
  fs.unlink('./data/municipalities-object-temp.json', (err) => {
    if (err) {
      console.error('An error ocurred during deleting file', err);
      throw err;
    }
    console.log('File has been deleted.');
  });
}

// populateMunicipalitiesDepartments();
