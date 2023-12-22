import fetch from 'node-fetch';
// @ts-ignore
import csv from './v_commune_2023.csv';
// @ts-ignore
import csv2json from 'csvjson-csv2json/csv2json.js';

export namespace MunicipalityService {
  export function getMunicipality() {
    fetch(csv).then(async (response) => {
      console.log(response);
    });
    const formatedJson = csv2json(csv, {
      parseNumbers: true,
    });
    return formatedJson;
  }
}
