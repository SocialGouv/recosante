/*

const inseeCode = '<your_insee_code>'; // replace with desired insee code
const sqlQuery = `
  SELECT
    bw1.*
  FROM
    BathingWater bw1
  LEFT JOIN
    BathingWater bw2
  ON
    (bw1.id_site = bw2.id_site AND bw1.diffusion_date < bw2.diffusion_date)
  WHERE
    bw1.municipality_insee_code = $1
  AND
    bw2.id_site IS NULL;
`;

const result = await prisma.$queryRaw(sqlQuery, inseeCode);


*/

/*

SELECT
    bw.*
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER(PARTITION BY id_site ORDER BY diffusion_date DESC) as row_number
    FROM
        BathingWater
    WHERE
        municipality_insee_code = $1
) bw
WHERE
    bw.row_number = 1


*/
