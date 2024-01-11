import { InteractionManager, View } from 'react-native';
import { Portal, PortalHost } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { IndicatorsSelector } from '~/components/indicators/indicators-selector';
import { IndicatorItem } from '~/types/indicator';
import { RouteEnum, type RootStackParamList } from '~/constants/route';
import { useIndicatorsList } from '~/zustand/indicator/useIndicatorsList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { withModalProvider } from '~/utils/withModalProvider';

type IndicatorSelectorSheetProps = NativeStackScreenProps<
  RootStackParamList,
  RouteEnum.INDICATORS_SELECTOR
>;

export function IndicatorSelectorSheet({
  navigation,
  route,
}: IndicatorSelectorSheetProps) {
  const { indicators } = useIndicatorsList((state) => state);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    console.log('lol');
    bottomSheetRef.current?.expand();
  }, []);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  }

  return (
    <View className="flex-1 bg-black/80">
      <BottomSheet ref={bottomSheetRef} index={2} snapPoints={snapPoints}>
        <View className="flex h-full w-full flex-1 bg-app-primary p-6">
          <MyText className="mb-4 text-white">
            Sélectionnez votre indicateur favori&nbsp;?
          </MyText>
          <IndicatorsSelector
            onSubmit={closeBottomSheet}
            indicators={indicators}
          />
        </View>
      </BottomSheet>
    </View>
  );
}
