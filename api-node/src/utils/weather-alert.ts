import {
  WeatherAlertPhenomenonIdEnum,
  WeatherAlertPhenomenonDBKeyEnum,
} from '~/types/api/weather-alert';

export function getPhenomenonDBKeyById(
  id: WeatherAlertPhenomenonIdEnum,
): WeatherAlertPhenomenonDBKeyEnum {
  switch (id) {
    case WeatherAlertPhenomenonIdEnum.VIOLENT_WIND:
      return WeatherAlertPhenomenonDBKeyEnum.VIOLENT_WIND;
    case WeatherAlertPhenomenonIdEnum.RAIN_FLOOD:
      return WeatherAlertPhenomenonDBKeyEnum.RAIN_FLOOD;
    case WeatherAlertPhenomenonIdEnum.STORM:
      return WeatherAlertPhenomenonDBKeyEnum.STORM;
    case WeatherAlertPhenomenonIdEnum.FLOOD:
      return WeatherAlertPhenomenonDBKeyEnum.FLOOD;
    case WeatherAlertPhenomenonIdEnum.SNOW_ICE:
      return WeatherAlertPhenomenonDBKeyEnum.SNOW_ICE;
    case WeatherAlertPhenomenonIdEnum.HEAT_WAVE:
      return WeatherAlertPhenomenonDBKeyEnum.HEAT_WAVE;
    case WeatherAlertPhenomenonIdEnum.COLD_WAVE:
      return WeatherAlertPhenomenonDBKeyEnum.COLD_WAVE;
    case WeatherAlertPhenomenonIdEnum.AVALANCHE:
      return WeatherAlertPhenomenonDBKeyEnum.AVALANCHE;
    case WeatherAlertPhenomenonIdEnum.WAVES_SUBMERSION:
      return WeatherAlertPhenomenonDBKeyEnum.WAVES_SUBMERSION;
    default:
      throw new Error(`Phenomenon id ${id as string} not found`);
  }
}
