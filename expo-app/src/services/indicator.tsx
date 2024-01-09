import { IndicatorsSlugEnum } from '~/types/indicator';
import { AirIcon } from '~/assets/icons/indicators/air';
import { PollensIcon } from '~/assets/icons/indicators/pollens';
import { WaterIcon } from '~/assets/icons/indicators/water';
import { UltraVioletIcon } from '~/assets/icons/indicators/ultra-violet';
import { WeatherIcon } from '~/assets/icons/indicators/weather';

export namespace IndicatorService {
  export function getIconBySlug(slug: IndicatorsSlugEnum) {
    switch (slug) {
      case IndicatorsSlugEnum.indice_atmospheric:
        return <AirIcon />;
      case IndicatorsSlugEnum.indice_uv:
        return <UltraVioletIcon />;
      case IndicatorsSlugEnum.pollen_allergy:
        return <PollensIcon />;
      case IndicatorsSlugEnum.weather_alert:
        return <WeatherIcon />;
      case IndicatorsSlugEnum.episode_pollution_atmospheric:
        return <AirIcon />;
      case IndicatorsSlugEnum.tap_water:
        return <WaterIcon />;
      case IndicatorsSlugEnum.bathing_water:
        return <WaterIcon />;
      default:
        throw new Error('No icon found');
    }
  }

  export function getDescriptionBySlug(slug: IndicatorsSlugEnum) {
    switch (slug) {
      case IndicatorsSlugEnum.indice_atmospheric:
        return 'Appliquez une crème solaire et portez des vêtements protecteurs pour vous protéger du soleil.';
      case IndicatorsSlugEnum.indice_uv:
        return "En cas d'allergie diagnostiquée, penser à prendre le traitement prescrit par votre médecin.";
      case IndicatorsSlugEnum.pollen_allergy:
        return 'Anticipez les variations météorologiques en portant des vêtements adaptés à tout changement de température.';
      case IndicatorsSlugEnum.weather_alert:
        return "En cas d'allergie diagnostiquée, penser à prendre le traitement prescrit par votre médecin.";
      case IndicatorsSlugEnum.episode_pollution_atmospheric:
        return "En cas d'allergie diagnostiquée, penser à prendre le traitement prescrit par votre médecin.";
      case IndicatorsSlugEnum.tap_water:
        return 'Anticipez les variations météorologiques en portant des vêtements adaptés à tout changement de température.';
      case IndicatorsSlugEnum.bathing_water:
        return 'Anticipez les variations météorologiques en portant des vêtements adaptés à tout changement de température.';
      default:
        throw new Error('No description found');
    }
  }
}
