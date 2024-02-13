import { type WeatherAlert } from '@prisma/client';
import {
  WeatherAlertPhenomenonIdEnum,
  WeatherAlertPhenomenonDBKeyEnum,
  WeatherAlertPhenomenonEnum,
  WeatherAlertValuesEnum,
  WeatherAlertColorIdEnum,
  WeatherAlertDotColor,
  type Phenomenon,
} from '~/types/api/weather_alert';

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

export function getAlertValueByColorId(
  id: WeatherAlertColorIdEnum | null,
): WeatherAlertValuesEnum {
  if (id === null) {
    return WeatherAlertValuesEnum.NO_DATA;
  }
  switch (id) {
    case WeatherAlertColorIdEnum.GREEN:
      return WeatherAlertValuesEnum.GREEN;
    case WeatherAlertColorIdEnum.YELLOW:
      return WeatherAlertValuesEnum.YELLOW;
    case WeatherAlertColorIdEnum.ORANGE:
      return WeatherAlertValuesEnum.ORANGE;
    case WeatherAlertColorIdEnum.RED:
      return WeatherAlertValuesEnum.RED;
    default:
      throw new Error(`Color id ${id as string} not found`);
  }
}

export function getWeatherAlertDotColor(
  id: WeatherAlertColorIdEnum | null,
): WeatherAlertDotColor | null {
  if (id === null) return null;
  switch (id) {
    case WeatherAlertColorIdEnum.GREEN:
      return WeatherAlertDotColor.GREEN;
    case WeatherAlertColorIdEnum.YELLOW:
      return WeatherAlertDotColor.YELLOW;
    case WeatherAlertColorIdEnum.ORANGE:
      return WeatherAlertDotColor.ORANGE;
    case WeatherAlertColorIdEnum.RED:
      return WeatherAlertDotColor.RED;
    default:
      throw new Error(`Color id ${id as string} not found`);
  }
}

export function getSortedPhenomenonsByValue(
  weather_alert: WeatherAlert,
): Phenomenon[] {
  if (!weather_alert) {
    return [];
  }
  const phenomenons = [
    {
      id: WeatherAlertPhenomenonIdEnum.VIOLENT_WIND,
      name: WeatherAlertPhenomenonEnum.VIOLENT_WIND,
      slug: WeatherAlertPhenomenonDBKeyEnum.VIOLENT_WIND,
      value: weather_alert.violent_wind ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.RAIN_FLOOD,
      name: WeatherAlertPhenomenonEnum.RAIN_FLOOD,
      slug: WeatherAlertPhenomenonDBKeyEnum.RAIN_FLOOD,
      value: weather_alert.rain_flood ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.STORM,
      name: WeatherAlertPhenomenonEnum.STORM,
      slug: WeatherAlertPhenomenonDBKeyEnum.STORM,
      value: weather_alert.storm ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.FLOOD,
      name: WeatherAlertPhenomenonEnum.FLOOD,
      slug: WeatherAlertPhenomenonDBKeyEnum.FLOOD,
      value: weather_alert.flood ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.SNOW_ICE,
      name: WeatherAlertPhenomenonEnum.SNOW_ICE,
      slug: WeatherAlertPhenomenonDBKeyEnum.SNOW_ICE,
      value: weather_alert.snow_ice ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.HEAT_WAVE,
      name: WeatherAlertPhenomenonEnum.HEAT_WAVE,
      slug: WeatherAlertPhenomenonDBKeyEnum.HEAT_WAVE,
      value: weather_alert.heat_wave ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.COLD_WAVE,
      name: WeatherAlertPhenomenonEnum.COLD_WAVE,
      slug: WeatherAlertPhenomenonDBKeyEnum.COLD_WAVE,
      value: weather_alert.cold_wave ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.AVALANCHE,
      name: WeatherAlertPhenomenonEnum.AVALANCHE,
      slug: WeatherAlertPhenomenonDBKeyEnum.AVALANCHE,
      value: weather_alert.avalanche ?? 1,
    },
    {
      id: WeatherAlertPhenomenonIdEnum.WAVES_SUBMERSION,
      name: WeatherAlertPhenomenonEnum.WAVES_SUBMERSION,
      slug: WeatherAlertPhenomenonDBKeyEnum.WAVES_SUBMERSION,
      value: weather_alert.waves_submersion ?? 1,
    },
  ].sort((a, b) => {
    if (a.value === null) {
      return 1;
    }
    if (b.value === null) {
      return -1;
    }
    return b.value - a.value;
  });

  return phenomenons;
}
