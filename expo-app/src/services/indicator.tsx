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

  export function getDescriptionBySlug(slug: IndicatorsSlugEnum) {
    switch (slug) {
      case IndicatorsSlugEnum.ultra_violet:
        return 'Appliquez une crème solaire et portez des vêtements protecteurs pour vous protéger du soleil.';
      case IndicatorsSlugEnum.pollen:
        return "En cas d'allergie diagnostiquée, penser à prendre le traitement prescrit par votre médecin.";
      case IndicatorsSlugEnum.weather:
        return 'Anticipez les variations météorologiques en portant des vêtements adaptés à tout changement de température.';
      case IndicatorsSlugEnum.indice_atmospheric:
        return "En cas d'allergie diagnostiquée, penser à prendre le traitement prescrit par votre médecin.";
      case IndicatorsSlugEnum.pollution_atmospheric:
        return "En cas d'allergie diagnostiquée, penser à prendre le traitement prescrit par votre médecin.";
      case IndicatorsSlugEnum.water:
        return 'Anticipez les variations météorologiques en portant des vêtements adaptés à tout changement de température.';
      case IndicatorsSlugEnum.air_quality:
        return 'Anticipez les variations météorologiques en portant des vêtements adaptés à tout changement de température.';
      default:
        throw new Error('No description found');
    }
  }
}
