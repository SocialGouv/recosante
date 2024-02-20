import { capture } from '~/third-parties/sentry';
import fetchRetry from 'fetch-retry';
const fetch = fetchRetry(global.fetch);

import { z } from 'zod';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import {
  DataAvailabilityEnum,
  AlertStatusEnum,
  type Municipality,
  type WeatherAlert,
  IndicatorsSlugEnum,
} from '@prisma/client';
import {
  WeatherAlertColorIdEnum,
  WeatherAlertPhenomenonIdEnum,
  type WeatherAlertResponse,
} from '~/types/api/weather_alert';
// import { AlertStatusThresholdEnum } from '~/utils/alert_status';
import { PORTAL_API_METEOFRANCE_API_KEY } from '~/config';
import { departments, departmentsCoastalArea } from '~/utils/departments';
import { getPhenomenonDBKeyById } from '~/utils/weather_alert';
import utc from 'dayjs/plugin/utc';
import { AlertStatusThresholdEnum } from '~/utils/alert_status';
import { sendAlertNotification } from '~/utils/notifications/alert';
dayjs.extend(utc);
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
        retries: 3,
        retryDelay: 1000,
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
                        // .max(1),
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

    try {
      for (const period of data.product.periods) {
        for (const domain of period.timelaps.domain_ids) {
          for (const phenomenon_items of domain.phenomenon_items) {
            if (phenomenon_items.timelaps_items.length > 1) {
              // capture('getWeatherAlert: timelaps_items length > 1', {
              //   extra: {
              //     functionCall: 'getWeatherAlert',
              //     dataSample: domain,
              //   },
              // });
            }
          }
        }
      }
    } catch (error: any) {
      capture(error, {
        extra: {
          functionCall:
            'getWeatherAlertIndicators check timelaps_items length > 1',
          dataSample: data,
        },
      });
      return;
    }

    // Step 3: check if data already exists
    const diffusion_date = data.product.update_time;

    const diffusionDate = dayjs(diffusion_date).utc().toDate();

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
          alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
        };

        weatherAlertsByDepartment[departmentCode] =
          domain.phenomenon_items.reduce((weatherAlert, phenomenon) => {
            const weatherWalertDbKey = getPhenomenonDBKeyById(
              phenomenon.phenomenon_id,
            );
            const value = phenomenon.phenomenon_max_color_id;
            weatherAlert[weatherWalertDbKey] = value;
            if (value >= AlertStatusThresholdEnum.WEATHER_ALERT) {
              weatherAlert.alert_status =
                AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET;
            }
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
            alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
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
      let results = 0;
      for (const weatherAlertByMunicipalityRow of weatherAlertRows) {
        await prisma.weatherAlert
          .create({
            data: weatherAlertByMunicipalityRow,
          })
          .then(async (weatherAlertRow) => {
            results++;
            if (
              weatherAlertRow.alert_status ===
              AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
            ) {
              const alertSent = await sendAlertNotification(
                IndicatorsSlugEnum.weather_alert,
                weatherAlertRow,
              );
              await prisma.weatherAlert.update({
                where: {
                  id: weatherAlertRow.id,
                },
                data: {
                  alert_status: alertSent
                    ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
                    : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
                },
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

      logStep(
        `DONE INSERTING WEATHER ALERTS: ${results} rows inserted (${municipalities.length} municipalities)`,
      );
    }
    logStep('DONE INSERTING WEATHER ALERTS');
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getWeatherAlert' } });
  }
}
