import { CodeAlertEnums, PhenomenonsEnum } from '@prisma/client';
import {
  WeatherAlertPhenomenonId,
  WeatherAlertColorId,
} from '~/types/api/weather-alert';

export function getPhenomenonNameById(id: string) {
  switch (id) {
    case WeatherAlertPhenomenonId.VIOLENT_WIND:
      return PhenomenonsEnum.VIOLENT_WIND;
    case WeatherAlertPhenomenonId.RAIN_FLOOD:
      return PhenomenonsEnum.RAIN_FLOOD;
    case WeatherAlertPhenomenonId.STORM:
      return PhenomenonsEnum.STORM;
    case WeatherAlertPhenomenonId.FLOOD:
      return PhenomenonsEnum.FLOOD;
    case WeatherAlertPhenomenonId.SNOW_ICE:
      return PhenomenonsEnum.SNOW_ICE;
    case WeatherAlertPhenomenonId.HEAT_WAVE:
      return PhenomenonsEnum.HEAT_WAVE;
    case WeatherAlertPhenomenonId.COLD_WAVE:
      return PhenomenonsEnum.COLD_WAVE;
    case WeatherAlertPhenomenonId.AVALANCHE:
      return PhenomenonsEnum.AVALANCHE;
    case WeatherAlertPhenomenonId.WAVES_SUBMERSION:
      return PhenomenonsEnum.WAVES_SUBMERSION;
    default:
      throw new Error(`Phenomenon id ${id} not found`);
  }
}

export function getPhenomenonColorById(id: number) {
  switch (id) {
    case WeatherAlertColorId.GREEN:
      return CodeAlertEnums.GREEN;
    case WeatherAlertColorId.YELLOW:
      return CodeAlertEnums.YELLOW;
    case WeatherAlertColorId.ORANGE:
      return CodeAlertEnums.ORANGE;
    case WeatherAlertColorId.RED:
      return CodeAlertEnums.RED;

    default:
      throw new Error(`Phenomenon id ${id} not found`);
  }
}
