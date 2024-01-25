import { capture } from '~/third-parties/sentry';

import { z } from 'zod';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import {
  type CodeAlertEnums,
  DataAvailabilityEnum,
  type PhenomenonsEnum,
  type Municipality,
} from '@prisma/client';
import {
  WeatherAlertColorId,
  WeatherAlertPhenomenonId,
  type WeatherAlertResponse,
} from '~/types/api/weather-alert';
import { PORTAL_API_METEOFRANCE_API_KEY } from '~/config';
import { departments, departmentsCoastalArea } from '~/utils/departments';
import {
  getPhenomenonColorById,
  getPhenomenonNameById,
} from '~/utils/weather-alert';

/*
Documentation:
Réponse de l'api: https://donneespubliques.meteofrance.fr/client/document/descriptiftechnique_vigilancemetropole_donneespubliques_v4_20230911_307.pdf
Autre:
https://portail-api.meteofrance.fr/web/en/api/DonneesPubliquesVigilance
https://donneespubliques.meteofrance.fr
https://donneespubliques.meteofrance.fr/?fond=produit&id_produit=305&id_rubrique=50
https://meteofrance-api.readthedocs.io/_/downloads/en/latest/pdf/
https://donneespubliques.meteofrance.fr/?fond=produit&id_produit=305&id_rubrique=50
*/

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[WEATHER ALERT] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

export async function getWeatherAlert() {
  // Step 1: Fetch data
  now = Date.now();
  logStep('Getting Weather Alert');
  const data: WeatherAlertResponse = await fetch(
    'https://public-api.meteofrance.fr/public/DPVigilance/v1/cartevigilance/encours',
    {
      headers: {
        apiKey: PORTAL_API_METEOFRANCE_API_KEY,
      },
    },
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error(
        `getWeatherAlert error! status: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  });

  const diffusion_date = data.product.update_time;
  // Step 2: Validate data
  try {
    z.object({
      product: z.object({
        warning_type: z.literal('vigilance'),
        type_cdp: z.literal('cdp_carte_externe'),
        version_vigilance: z.literal('V6'),
        version_cdp: z.literal('1.0.0'),
        update_time: z.string().datetime(),
        domain_id: z.literal('FRA'),
        global_max_color_id: z.nativeEnum(WeatherAlertColorId),
        periods: z.array(
          z.object({
            echeance: z.union([z.literal('j0'), z.literal('j1')]),
            begin_validity_time: z.string().datetime(),
            end_validity_time: z.string().datetime(),
            text_items: z.object({
              title: z.string(),
              text: z.array(z.string()),
            }),
            timelaps: z.object({
              domain_ids: z.array(
                z.object({
                  domain_id: z.enum([
                    ...departments,
                    'FRA',
                    ...departmentsCoastalArea,
                  ]),
                  max_color_id: z.nativeEnum(WeatherAlertColorId),
                  phenomenon_items: z.array(
                    z.object({
                      phenomenon_id: z.nativeEnum(WeatherAlertPhenomenonId),
                      phenomenon_max_color_id:
                        z.nativeEnum(WeatherAlertColorId),
                      timelaps_items: z.array(
                        z.object({
                          begin_time: z.string().datetime(),
                          end_time: z.string().datetime(),
                          color_id: z.nativeEnum(WeatherAlertColorId),
                        }),
                      ),
                    }),
                  ),
                }),
              ),
            }),
          }),
        ),
      }),
      meta: z.object({
        snapshot_id: z.string(),
        product_datetime: z.string().datetime(),
        generation_timestamp: z.string().datetime(),
      }),
    }).parse(data);
  } catch (error: any) {
    capture(error, {
      extra: {
        functionCall: 'getWeatherAlertIndicators',
        dataSample: data,
      },
    });
    return;
  }

  // Step 3: check if data already exists
  const diffusionDate = dayjs(diffusion_date, 'DD/MM/YYYY')
    .startOf('day')
    .toDate();
  const validityEnd = dayjs(diffusionDate).add(1, 'days').endOf('day').toDate();

  const existingWeatherAlert = await prisma.weatherAlert.count({
    where: {
      diffusion_date: diffusionDate,
    },
  });
  if (existingWeatherAlert > 0) {
    logStep(
      `WeatherAlert already fetched for diffusionDate ${diffusionDate.toDateString()}: ${existingWeatherAlert} rows`,
    );
    return;
  }

  // Step 4: format data by department to iterate quickly on municipalities
  const weatherAlertByDepartment: Record<
    Municipality['DEP'],
    { code_alert: CodeAlertEnums; phenomenon: PhenomenonsEnum }
  > = {};
  for (const row of data.product.periods) {
    for (const domain of row.timelaps.domain_ids) {
      // we need to format the cantonCode code to have a 2 digits string departmentCode

      const cantonCode = domain.domain_id;
      // https://github.com/SocialGouv/recosante/blob/46e5d33a5475ff091eb286f6f86413e7a13e13e6/libs/indice_pollution/indice_pollution/history/models/vigilance_meteo.py#L75C28-L75C31
      if (cantonCode === '99') {
        continue;
      }
      if (cantonCode === 'FRA') {
        continue;
      }
      const formattedDepCode = cantonCode.slice(0, 2);
      weatherAlertByDepartment[formattedDepCode] = {
        code_alert: getPhenomenonColorById(domain.max_color_id),
        phenomenon: getPhenomenonNameById(
          domain.phenomenon_items[0].phenomenon_id,
        ),

        // TODO: add the phenomenon_items, there is more than one phenomenon per department => change db schema
        // phenomenons: domain.phenomenon_items.map((phenomenon) => {
        //   return {
        //     weatherAlertId: phenomenon.phenomenon_id,
        //     id: phenomenon.phenomenon_id,
        //     name: getPhenomenonNameById(phenomenon.phenomenon_id),
        //     code_alert: getPhenomenonColorById(
        //       phenomenon.phenomenon_max_color_id,
        //     ),
        //   };
        // }),
      };
    }
  }
  // Step 5: grab the municipalities list
  logStep('formatting weatherAlert by department DONE');
  const municipalities = await prisma.municipality.findMany();
  // Step 6: loop on municipalities and create rows to insert
  logStep('fetching municipalities DONE');
  const weatherAlertRows = [];
  for (const municipality of municipalities) {
    const weatherAlertData = weatherAlertByDepartment[municipality.DEP];
    // if no data for this department, we say that data is not available.
    if (!weatherAlertData) {
      weatherAlertRows.push({
        diffusion_date: diffusionDate,
        validity_start: diffusionDate,
        validity_end: validityEnd,
        municipality_insee_code: municipality.COM,
        data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
      });
      continue;
    }
    weatherAlertRows.push({
      diffusion_date: diffusionDate,
      validity_start: diffusionDate,
      validity_end: validityEnd,
      municipality_insee_code: municipality.COM,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      code_alert: weatherAlertData.code_alert,
      phenomenon: weatherAlertData.phenomenon,
    });
  }
  // Step 7: insert data

  const result = await prisma.weatherAlert.createMany({
    data: weatherAlertRows,
    skipDuplicates: true,
  });
  logStep(
    `DONE INSERTING WEATHER ALERT: ${result.count} rows inserted upon ${municipalities.length} municipalities`,
  );
}
