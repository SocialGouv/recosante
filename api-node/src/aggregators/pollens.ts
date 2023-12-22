import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import prisma from '~/prisma';

function getIndiceUV() {
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

getIndiceUV();
