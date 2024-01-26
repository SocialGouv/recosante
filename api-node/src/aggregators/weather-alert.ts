import { capture } from '~/third-parties/sentry';

import { z } from 'zod';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import {
  DataAvailabilityEnum,
  type Municipality,
  type WeatherAlert,
} from '@prisma/client';
import {
  WeatherAlertColorIdEnum,
  WeatherAlertPhenomenonIdEnum,
  type WeatherAlertResponse,
} from '~/types/api/weather-alert';
import { PORTAL_API_METEOFRANCE_API_KEY } from '~/config';
import { departments, departmentsCoastalArea } from '~/utils/departments';
import { getPhenomenonDBKeyById } from '~/utils/weather-alert';

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

type WeatherAlertForDepartment = Omit<
  WeatherAlert,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'municipality_insee_code'
  | 'data_availability'
>;

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[WEATHER ALERT] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

export async function getWeatherAlert() {
  try {
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
          global_max_color_id: z.string(), // it's WeatherAlertColorIdEnum but as a string - can't make it work with zod
          periods: z.array(
            z.object({
              echeance: z.union([z.literal('J'), z.literal('J1')]),
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
                      'FRA',
                      ...departments,
                      ...departmentsCoastalArea,
                    ]),
                    max_color_id: z.nativeEnum(WeatherAlertColorIdEnum),
                    phenomenon_items: z.array(
                      z.object({
                        phenomenon_id: z.nativeEnum(
                          WeatherAlertPhenomenonIdEnum,
                        ),
                        phenomenon_max_color_id: z.nativeEnum(
                          WeatherAlertColorIdEnum,
                        ),
                        timelaps_items: z.array(
                          z.object({
                            begin_time: z.string().datetime(),
                            end_time: z.string().datetime(),
                            color_id: z.nativeEnum(WeatherAlertColorIdEnum),
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
          product_datetime: z.string(),
          generation_timestamp: z.string(),
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
    const diffusion_date = data.product.update_time;

    const diffusionDate = dayjs(diffusion_date, 'DD/MM/YYYY').utc().toDate();

    const existingWeatherAlert = await prisma.weatherAlert.count({
      where: {
        diffusion_date: dayjs(diffusionDate).utc().toDate(),
      },
    });
    if (existingWeatherAlert > 0) {
      logStep(
        `WeatherAlert already fetched for diffusionDate ${diffusionDate.toDateString()}: ${existingWeatherAlert} rows`,
      );
      return;
    }
    // Step 4: grab the municipalities list
    const municipalities = await prisma.municipality.findMany();
    logStep('fetching municipalities DONE');

    // Step 5: format data by department to iterate quickly on municipalities
    for (const [index, row] of Object.entries(data.product.periods)) {
      logStep(
        `doing formatting weatherAlert by department for ${row.echeance}`,
      );
      // 2 periods: J is today, J1 is tomorrow
      const weatherAlertsByDepartment: Record<
        Municipality['DEP'],
        WeatherAlertForDepartment
      > = {};
      for (const domain of row.timelaps.domain_ids) {
        // according to the doc https://donneespubliques.meteofrance.fr/client/document/descriptiftechnique_vigilancemetropole_donneespubliques_v4_20230911_307.pdf
        // "Le nombre d'éléments du tableau est fixe = 105 pour couvrir : FRA + 7 ZDF + 96 dd + Andorre"
        const domain_id = domain.domain_id;
        let departmentCode = null;
        if (domain_id === 'FRA') {
          // FRA is just the summary of all departments, we don't make a use of it
          continue;
        }
        if (departmentsCoastalArea.includes(domain_id)) {
          departmentCode = domain_id.slice(0, 2);
        }
        if (departments.includes(domain_id)) {
          departmentCode = domain_id;
        }

        if (!departmentCode) {
          capture(`departmentCode not found, ${domain_id}`);
          continue;
        }

        const weatherAlertForDepartment: WeatherAlertForDepartment = {
          validity_start: dayjs(row.begin_validity_time).toDate(),
          validity_end: dayjs(row.end_validity_time).toDate(),
          diffusion_date: diffusionDate,
          violent_wind: null,
          rain_flood: null,
          storm: null,
          flood: null,
          snow_ice: null,
          heat_wave: null,
          cold_wave: null,
          avalanche: null,
          waves_submersion: null,
        };

        weatherAlertsByDepartment[departmentCode] =
          domain.phenomenon_items.reduce((weatherAlert, phenomenon) => {
            const weatherWalertDbKey = getPhenomenonDBKeyById(
              phenomenon.phenomenon_id,
            );
            weatherAlert[weatherWalertDbKey] =
              phenomenon.phenomenon_max_color_id;
            return weatherAlert;
          }, weatherAlertForDepartment);
      }
      logStep(
        `formatting weatherAlert by department DONE : ${
          Object.keys(weatherAlertsByDepartment).length
        }`,
      );
      const weatherAlertRows = [];
      const defaultValidityStart = dayjs()
        .utc()
        .add(Number(index), 'day')
        .startOf('day')
        .toDate();
      const defaultValidityEnd = dayjs(defaultValidityStart)
        .utc()
        .endOf('day')
        .toDate();

      for (const municipality of municipalities) {
        const weatherAlertForDepartment =
          weatherAlertsByDepartment[municipality.DEP];
        // if no data for this department, we say that data is not available.
        if (!weatherAlertForDepartment) {
          const notAvailableRow = {
            diffusion_date: defaultValidityStart,
            validity_start: defaultValidityStart,
            validity_end: defaultValidityEnd,
            municipality_insee_code: municipality.COM,
            data_availability: DataAvailabilityEnum.NOT_AVAILABLE,
          };
          weatherAlertRows.push(notAvailableRow);
          continue;
        }
        weatherAlertRows.push({
          municipality_insee_code: municipality.COM,
          ...weatherAlertForDepartment,
        });
      }
      // Step 7: insert data
      const result = await prisma.weatherAlert.createMany({
        data: weatherAlertRows,
        skipDuplicates: true,
      });

      logStep(
        `DONE INSERTING WEATHER ALERTS: ${result.count} rows inserted (${municipalities.length} municipalities)`,
      );
    }
    logStep('DONE INSERTING WEATHER ALERTS');
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getWeatherAlert' } });
  }
}
