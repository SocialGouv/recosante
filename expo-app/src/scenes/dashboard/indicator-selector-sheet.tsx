import { View } from 'react-native';
import { Portal, PortalHost } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { IndicatorsSelector } from '~/components/indicators/indicators-selector';
import { Indicator } from '~/types/indicator';

interface IndicatorSelectorSheetProps {
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
}
export function IndicatorSelectorSheet(props: IndicatorSelectorSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
  }

  if (props.favoriteIndicator?.slug) {
    return <></>;
  }

  return (
    <View>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View className="flex flex-1 bg-app-primary p-6">
            <MyText className="mb-4 text-white">
              Sélectionnez votre indicateur favori&nbsp;?
            </MyText>
            <IndicatorsSelector
              onSubmit={closeBottomSheet}
              indicators={props.indicators}
              favoriteIndicator={props.favoriteIndicator}
            />
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name="indicators-list" />
    </View>
  );
}
