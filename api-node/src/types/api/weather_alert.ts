import type { Department, DepartmentCoastalArea } from '~/utils/departments.ts';

export enum WeatherAlertColorIdEnum {
  GREEN = 1,
  YELLOW = 2,
  ORANGE = 3,
  RED = 4,
}

export enum WeatherAlertColorEnum {
  GREEN = 'Vert',
  YELLOW = 'Jaune',
  ORANGE = 'Orange',
  RED = 'Rouge',
}

export enum WeatherAlertValuesEnum {
  NO_DATA = 'Aucune donnée',
  GREEN = 'Aucun risque',
  YELLOW = 'Attentif',
  ORANGE = 'Très vigilant',
  RED = 'Vigilance absolue',
}

export enum WeatherAlertPhenomenonIdEnum {
  VIOLENT_WIND = '1',
  RAIN_FLOOD = '2',
  STORM = '3',
  FLOOD = '4',
  SNOW_ICE = '5',
  HEAT_WAVE = '6',
  COLD_WAVE = '7',
  AVALANCHE = '8',
  WAVES_SUBMERSION = '9',
}

export enum WeatherAlertPhenomenonEnum {
  VIOLENT_WIND = 'Vent violent',
  RAIN_FLOOD = 'Pluie-Inondation',
  STORM = 'Orages',
  FLOOD = 'Crues',
  SNOW_ICE = 'Neige-verglas',
  HEAT_WAVE = 'Canicule',
  COLD_WAVE = 'Grand Froid',
  AVALANCHE = 'Avalanches',
  WAVES_SUBMERSION = 'Vagues-Submersion',
}

export type Phenomenon = {
  id: WeatherAlertPhenomenonIdEnum;
  name: WeatherAlertPhenomenonEnum;
  slug: WeatherAlertPhenomenonDBKeyEnum;
  value: WeatherAlertColorIdEnum;
};

export enum WeatherAlertPhenomenonDBKeyEnum {
  VIOLENT_WIND = 'violent_wind',
  RAIN_FLOOD = 'rain_flood',
  STORM = 'storm',
  FLOOD = 'flood',
  SNOW_ICE = 'snow_ice',
  HEAT_WAVE = 'heat_wave',
  COLD_WAVE = 'cold_wave',
  AVALANCHE = 'avalanche',
  WAVES_SUBMERSION = 'waves_submersion',
}

export interface WeatherAlertResponse {
  product: {
    warning_type: string;
    type_cdp: string;
    version_vigilance: string;
    version_cdp: string;
    update_time: string;
    domain_id: 'FRA';
    global_max_color_id: string;
    periods: Array<{
      echeance: 'J' | 'J1';
      begin_validity_time: string;
      end_validity_time: string;
      text_items: {
        title: string;
        text: any[];
      };
      timelaps: {
        domain_ids: Array<{
          domain_id: Department | 'FRA' | DepartmentCoastalArea;
          max_color_id: WeatherAlertColorIdEnum;
          phenomenon_items: Array<{
            phenomenon_id: WeatherAlertPhenomenonIdEnum;
            phenomenon_max_color_id: WeatherAlertColorIdEnum;
            timelaps_items: Array<{
              begin_time: string;
              end_time: string;
              color_id: WeatherAlertColorIdEnum;
            }>;
          }>;
        }>;
      };
      max_count_items: Array<{
        color_id: WeatherAlertColorIdEnum; // example: 2
        color_name: WeatherAlertColorEnum; // example: 'Jaune'
        count: number; // example: 5
        text_count: string; // example: "5 départements en Jaune"
      }>;
      per_phenomenon_items: Array<{
        phenomenon_id: WeatherAlertPhenomenonIdEnum;
        any_color_count: number;
        phenomenon_counts: Array<{
          color_id: WeatherAlertColorIdEnum;
          color_name: WeatherAlertColorEnum;
          count: number;
          text_count: string;
        }>;
      }>;
    }>;
  };
  meta: {
    snapshot_id: string;
    product_datetime: string;
    generation_timestamp: string;
  };
}
