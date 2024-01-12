import { IndicatorsSlugEnum } from '~/types/indicator';
import { AirIcon } from '~/assets/icons/indicators/air';
import { PollensIcon } from '~/assets/icons/indicators/pollens';
import { WaterIcon } from '~/assets/icons/indicators/water';
import { UltraVioletIcon } from '~/assets/icons/indicators/ultra-violet';
import { WeatherIcon } from '~/assets/icons/indicators/weather';
import { Air } from '~/assets/icons/indicators/big/air';
import { Uv } from '~/assets/icons/indicators/big/uv';
import { Pollen } from '~/assets/icons/indicators/big/pollen';
import { Weather } from '~/assets/icons/indicators/big/weather';
import { Swimming } from '~/assets/icons/indicators/big/swimming';

export namespace IndicatorService {
  // export function getColorByLabel(
  //   label: LabelEnum | undefined,
  // ): IndicatorColorEnum {
  //   if (!label) return IndicatorColorEnum.NUL;
  //   switch (label) {
  //     case LabelEnum.EXTREME:
  //       return IndicatorColorEnum.EXTREME;
  //     case LabelEnum.ABSOLUE:
  //       return IndicatorColorEnum.ABSOLUE;
  //     case LabelEnum.MAUVAIS:
  //       return IndicatorColorEnum.MAUVAIS;
  //     case LabelEnum.MODEREE:
  //       return IndicatorColorEnum.MODEREE;
  //     case LabelEnum.MOYEN:
  //       return IndicatorColorEnum.MOYEN;
  //     case LabelEnum.BON:
  //       return IndicatorColorEnum.BON;
  //     case LabelEnum.NUL:
  //       return IndicatorColorEnum.NUL;
  //     default:
  //       return IndicatorColorEnum.NUL;
  //       throw new Error('No color found');
  //   }
  // }
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
  export function getPicto({
    slug,
    indicatorValue,
    color,
  }: {
    slug: IndicatorsSlugEnum;
    indicatorValue: number | undefined;
    color: string | undefined;
  }) {
    switch (slug) {
      case IndicatorsSlugEnum.indice_atmospheric:
        return <Uv value={indicatorValue} color={color} />;
      case IndicatorsSlugEnum.indice_uv:
        return <Uv value={indicatorValue} color={color} />;
      case IndicatorsSlugEnum.pollen_allergy:
        return <Pollen />;
      case IndicatorsSlugEnum.weather_alert:
        return <Weather />;
      case IndicatorsSlugEnum.episode_pollution_atmospheric:
        return <Air />;
      case IndicatorsSlugEnum.tap_water:
        return <Swimming />;
      case IndicatorsSlugEnum.bathing_water:
        return <Swimming />;
      default:
        console.log('No picto found');
      // throw new Error('No picto found');
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
