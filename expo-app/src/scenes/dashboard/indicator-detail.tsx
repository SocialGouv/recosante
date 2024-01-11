import { View, Pressable } from 'react-native';
import { Portal, PortalHost } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { useSelectedIndicator } from '~/zustand/indicator/useSelectedIndicator';
import { Close } from '~/assets/icons/close';
import { LineChart } from '~/components/indicators/graphs/line';
import { useIndicatorsDto } from '~/zustand/indicator/useIndicatorsDto';
import { DateService } from '~/services/date';
import { useDay } from '~/zustand/day/useDay';

export function IndicatorDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedIndicator, setSelectedIndicator } = useSelectedIndicator(
    (state) => state,
  );
  const { day } = useDay((state) => state);
  const { indicatorsDto } = useIndicatorsDto((state) => state);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const isOpenedRef = useRef(false);
  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      isOpenedRef.current = false;
    }
  }, []);

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    if (selectedIndicator?.slug) setSelectedIndicator(null);
    isOpenedRef.current = false;
  }
  function openBottomSheet() {
    bottomSheetRef.current?.expand();
    isOpenedRef.current = true;
  }

  useEffect(() => {
    if (!!selectedIndicator?.slug && !isOpenedRef.current) {
      isOpenedRef.current = true;
      openBottomSheet();
    }
  }, [selectedIndicator?.slug]);

  const indicatorData = useMemo(
    () =>
      selectedIndicator?.slug ? indicatorsDto[selectedIndicator?.slug] : null,
    [selectedIndicator?.slug, indicatorsDto],
  );

  const currentDayIndicatorData = useMemo(
    () => indicatorData?.[day],
    [indicatorData, day],
  );

  return (
    <View>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
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
                {indicatorData?.name}
              </MyText>
              <MyText
                font="MarianneRegular"
                className="pb-2 text-sm text-white"
              >
                Mise à jour le{' '}
                {DateService.getTimeFromNow(indicatorData?.created_at)}
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
              {indicatorData?.recommendations?.map((recommendation) => {
                return (
                  <View
                    key={recommendation}
                    className="mt-2 flex flex-row items-center rounded-md bg-white p-2"
                  >
                    <MyText className=" text-xs">{recommendation}</MyText>
                  </View>
                );
              })}

              <Title label="à propos de la qualité de l’air et l’indice ATMO" />
              <MyText className=" mt-2 ">{indicatorData?.about}</MyText>
              <MyText className=" mt-2 ">En savoir plus</MyText>
            </View>
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name="indicator-detail" />
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
