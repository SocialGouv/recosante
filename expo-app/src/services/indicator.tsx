import { IndicatorsSlugEnum } from '~/types/indicator';
import { AirIcon } from '~/assets/icons/indicators/air';
import { PollensIcon } from '~/assets/icons/indicators/pollens';
import { WaterIcon } from '~/assets/icons/indicators/water';
import { UltraVioletIcon } from '~/assets/icons/indicators/ultra-violet';
import { WeatherIcon } from '~/assets/icons/indicators/weather';

export namespace IndicatorService {
  export function getIconBySlug(slug: IndicatorsSlugEnum) {
    switch (slug) {
      case IndicatorsSlugEnum.ultra_violet:
        return <UltraVioletIcon />;
      case IndicatorsSlugEnum.pollen:
        return <PollensIcon />;
      case IndicatorsSlugEnum.weather:
        return <WeatherIcon />;
      case IndicatorsSlugEnum.indice_atmospheric:
        return <AirIcon />;
      case IndicatorsSlugEnum.pollution_atmospheric:
        return <AirIcon />;
      case IndicatorsSlugEnum.water:
        return <WaterIcon />;
      case IndicatorsSlugEnum.air_quality:
        return <AirIcon />;
      default:
        throw new Error('No icon found');
    }
  }
}
