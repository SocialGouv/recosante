import { View, Pressable } from 'react-native';
import { type IndicatorItem, type IndicatorDay } from '~/types/indicator';
import MyText from '../ui/my-text';
import { IndicatorService } from '~/services/indicator';
import dayjs from 'dayjs';
import { cn } from '~/utils/tailwind';
import { Info } from '~/assets/icons/info';
import { LineChart } from './graphs/line';
import { useIndicatorsDto } from '~/zustand/indicator/useIndicatorsDto';
import { useAddress } from '~/zustand/address/useAddress';
import { useNavigation } from '@react-navigation/native';
import { RouteEnum } from '~/constants/route';

interface IndicatorPreviewProps {
  indicator: IndicatorItem;
  isFavorite?: boolean;
  day: IndicatorDay;
}

export function IndicatorPreview(props: IndicatorPreviewProps) {
  const { address } = useAddress((state) => state);
  const navigation = useNavigation();
  const { indicatorsDto } = useIndicatorsDto((state) => state);
  const currentIndicatorData = indicatorsDto[props.indicator.slug];

  function handleSelect() {
    if (!currentIndicatorData) return;
    // @ts-ignore
    navigation.navigate(RouteEnum.INDICATOR_DETAIL, {
      indicator: currentIndicatorData,
      day: props.day,
    });
  }

  const indicatorDataInCurrentDay = currentIndicatorData?.[props.day];

  return (
    <View
      style={{
        borderColor: props.isFavorite
          ? indicatorDataInCurrentDay?.color
          : 'transparent',
      }}
      className={cn(
        '   mx-auto my-5 basis-[47%]  rounded-2xl bg-white p-2 ',
        `${props.isFavorite ? 'mx-2 -mt-2 border-[3px] ' : ''}
    }`,
      )}
    >
      <View className="flex flex-row justify-between">
        <View className=" flex w-full justify-center">
          <View
            className=" -top-6  mx-auto items-center  rounded-full  px-6 py-1"
            style={{
              backgroundColor: indicatorDataInCurrentDay?.color,
            }}
          >
            <MyText font="MarianneBold" className="uppercase">
              {indicatorDataInCurrentDay?.label}
            </MyText>
          </View>
          <Pressable className="-top-6 flex items-end" onPress={handleSelect}>
            <Info />
          </Pressable>
          <View className="-top-6 flex items-center justify-center">
            {IndicatorService.getPicto({
              slug: props.indicator.slug,
              indicatorValue: indicatorDataInCurrentDay?.value,
              color: indicatorDataInCurrentDay?.color,
            })}
          </View>

          <MyText
            className="text-wrap text-md uppercase text-black"
            font="MarianneBold"
          >
            {props.indicator.name}
          </MyText>
          <MyText
            className=" mb-4 text-xs uppercase text-gray-500"
            font="MarianneRegular"
          >
            {address?.label} {dayjs().format('DD/MM')}
          </MyText>
          <LineChart value={indicatorDataInCurrentDay?.value} />
          {currentIndicatorData?.slug != null ? (
            <MyText className="mt-4 text-xs">
              {IndicatorService.getDescriptionBySlug(
                currentIndicatorData?.slug,
              )}
            </MyText>
          ) : null}
        </View>
      </View>
    </View>
  );
}
