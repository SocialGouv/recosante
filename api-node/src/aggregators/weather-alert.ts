import { capture } from '~/third-parties/sentry';

import { z } from 'zod';
import dayjs from 'dayjs';
import prisma from '~/prisma';
import {
  CodeAlertEnums,
  DataAvailabilityEnum,
  PhenomenonsEnum,
  type Municipality,
} from '@prisma/client';
import { type WeatherAlertResponse } from '~/types/api/weather-alert';
import { PORTAL_API_METEOFRANCE_API_KEY } from '~/config';

const URL =
  'https://public-api.meteofrance.fr/public/DPVigilance/v1/cartevigilance/encours';

let now = Date.now();
function logStep(step: string) {
  console.info(
    `[WEATHER ALERT] Duration: ${Date.now() - now}ms`.padEnd(40),
    step,
  );
  now = Date.now();
}

// Doc => https://meteofrance-api.readthedocs.io/_/downloads/en/latest/pdf/
export async function getWeatherAlert() {
  // Step 1: Fetch data
  now = Date.now();
  logStep('Getting Weather Alert');
  const data: WeatherAlertResponse = await fetch(URL, {
    headers: {
      apiKey: PORTAL_API_METEOFRANCE_API_KEY,
    },
  }).then(async (response) => {
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
    const TimelapsItemSchema = z.object({
      begin_time: z.string(),
      end_time: z.string(),
      color_id: z.number(),
    });

    const PhenomenonItemSchema = z.object({
      phenomenon_id: z.string(),
      phenomenon_max_color_id: z.number(),
      timelaps_items: z.array(TimelapsItemSchema),
    });

    const DomainIdSchema = z.object({
      domain_id: z.string(),
      max_color_id: z.number(),
      phenomenon_items: z.array(PhenomenonItemSchema),
    });

    const TextItemsSchema = z.object({
      title: z.string(),
      text: z.array(z.string()),
    });

    const PeriodSchema = z.object({
      echeance: z.string(),
      begin_validity_time: z.string(),
      end_validity_time: z.string(),
      text_items: TextItemsSchema,
      timelaps: z.object({
        domain_ids: z.array(DomainIdSchema),
      }),
    });

    z.object({
      product: z.object({
        warning_type: z.string(),
        type_cdp: z.string(),
        version_vigilance: z.string(),
        version_cdp: z.string(),
        update_time: z.string(),
        domain_id: z.string(),
        global_max_color_id: z.string(),
        periods: z.array(PeriodSchema),
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

  function getPhenomenonNameById(id: string) {
    switch (id) {
      case '1':
        return PhenomenonsEnum.VIOLENT_WIND;
      case '2':
        return PhenomenonsEnum.RAIN_FLOOD;
      case '3':
        return PhenomenonsEnum.STORM;
      case '4':
        return PhenomenonsEnum.FLOOD;
      case '5':
        return PhenomenonsEnum.SNOW_ICE;
      case '6':
        return PhenomenonsEnum.HEAT_WAVE;
      case '7':
        return PhenomenonsEnum.COLD_WAVE;
      case '8':
        return PhenomenonsEnum.AVALANCHE;
      case '9':
        return PhenomenonsEnum.WAVES_SUBMERSION;
      default:
        throw new Error(`Phenomenon id ${id} not found`);
    }
  }

  function getPhenomenonColorById(id: number) {
    switch (id) {
      case 1:
        return CodeAlertEnums.GREEN;
      case 2:
        return CodeAlertEnums.YELLOW;
      case 3:
        return CodeAlertEnums.ORANGE;
      case 4:
        return CodeAlertEnums.RED;

      default:
        throw new Error(`Phenomenon id ${id} not found`);
    }
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
