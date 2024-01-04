import { View } from 'react-native';
import { Indicator } from '~/types/indicator';
import MyText from '../ui/my-text';
import { IndicatorService } from '~/services/indicator';

interface IndicatorPreviewProps {
  indicator: Indicator;
  isFavorite?: boolean;
}
export function IndicatorPreview(props: IndicatorPreviewProps) {
  return (
    <View className="m-1 flex   flex-1 rounded-lg border border-app-primary p-8 ">
      <MyText className="text-wrap text-3xl text-black ">
        {props.indicator.name}
      </MyText>
      {props.isFavorite ? (
        <View>
          <MyText className=" text-sm">Favorite</MyText>
        </View>
      ) : null}
    </View>
  );
}
