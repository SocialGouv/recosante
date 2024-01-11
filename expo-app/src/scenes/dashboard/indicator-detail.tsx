import { View, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback, useEffect } from 'react';
import MyText from '~/components/ui/my-text';
import { Close } from '~/assets/icons/close';
import { LineChart } from '~/components/indicators/graphs/line';
import { DateService } from '~/services/date';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, RouteEnum } from '~/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type IndicatorSelectorSheetProps = NativeStackScreenProps<
// @ts-expect-error TODO
  RootStackParamList,
  RouteEnum.INDICATOR_DETAIL
>;

export function IndicatorDetail(props: IndicatorSelectorSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const navigation = useNavigation();
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const isOpenedRef = useRef(false);
  const { indicator, day } = props.route.params;
  const currentDayIndicatorData = indicator?.[day];

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      isOpenedRef.current = false;
    }
  }, []);

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
<<<<<<< HEAD
=======
    if (selectedIndicator?.slug != null) setSelectedIndicator(null);
>>>>>>> cc74eda (lint and format expo app + husky)
    isOpenedRef.current = false;
    navigation.goBack();
  }

  useEffect(() => {
<<<<<<< HEAD
    bottomSheetRef.current?.expand();
  }, []);
=======
    if (!(selectedIndicator?.slug == null) && !isOpenedRef.current) {
      isOpenedRef.current = true;
      openBottomSheet();
    }
  }, [selectedIndicator?.slug]);

  const indicatorData = useMemo(
    () =>
      selectedIndicator?.slug != null
        ? indicatorsDto[selectedIndicator?.slug]
        : null,
    [selectedIndicator?.slug, indicatorsDto],
  );

  const currentDayIndicatorData = useMemo(
    () => indicatorData?.[day],
    [indicatorData, day],
  );
>>>>>>> cc74eda (lint and format expo app + husky)

  return (
    <View className="flex-1">
      <BottomSheet
        ref={bottomSheetRef}
        index={2}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={() => {
          closeBottomSheet();
        }}
        handleStyle={{
          backgroundColor: '#3343BD',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#3343BD',
        }}
      >
        <View className="flex flex-1 bg-app-gray ">
          <View
            className=" -top-2 left-0 right-0 flex items-center justify-center bg-app-primary
"
          >
            <MyText font="MarianneBold" className=" text-2xl text-white">
              {indicator?.name}
            </MyText>
            <MyText font="MarianneRegular" className="pb-2 text-sm text-white">
              Mise à jour le {DateService.getTimeFromNow(indicator?.created_at)}
            </MyText>
          </View>
          <Pressable
            onPress={() => {
              closeBottomSheet();
            }}
            className="absolute right-2 top-0"
          >
            <Close />
          </Pressable>
          <View className="px-6 pt-12">
            <MyText font="MarianneBold" className=" text-sm uppercase">
              {currentDayIndicatorData?.value}
            </MyText>
            <LineChart value={currentDayIndicatorData?.value} />
            <Title label="Nos recommandations" />
            {indicator?.recommendations?.map((recommendation) => {
              return (
                <View
                  key={recommendation}
                  className="mt-2 flex flex-row items-center rounded-md bg-white p-2"
                >
                  <MyText className=" text-xs">{recommendation}</MyText>
                </View>
              );
            })}
            <Title label="A propos" />
            <MyText className=" mt-2 ">{indicator?.about}</MyText>
            <MyText className=" mt-2 ">En savoir plus</MyText>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

interface TitleProps {
  label: string;
}
function Title(props: TitleProps) {
  return (
    <MyText font="MarianneBold" className=" mt-8 text-sm uppercase">
      {props.label}
    </MyText>
  );
}
