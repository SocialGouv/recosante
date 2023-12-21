import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

function getIndiceUV() {
  /*
  1. fetch data
  2. map the v_commune_2023.csv file by insee_code
  3. for each insee_code, concatenate the indice_uv data
  v_commune_2023.map(commune => {
    const iundiceUvRow = indicUvData.find(uv => uv.insee_code === commune.insee_code);
    return {
      validity_start: indiceUvRow.validity_start,
      validity_end: indiceUvRow.validity_end,
      diffusion_date: indiceUvRow.diffusion_date,
      municipality_insee_code: commune.insee_code,
      uv_j0: indiceUvRow.uv_j0,
      ....
    }
  })
  4. save data to database
  */
}

getIndiceUV();
