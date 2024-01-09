import { View } from 'react-native';
import { Portal, PortalHost } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { IndicatorsSelector } from '~/components/indicators/indicators-selector';
import { Indicator } from '~/types/indicator';

interface IndicatorSelectorSheetProps {
  navigation: any;
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
  setFavoriteIndicator: (indicator: Indicator | null) => void;
  handleSubmit: (indicator: Indicator | null) => void;
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

  function onSubmit(indicator: Indicator | null) {
    props.handleSubmit(indicator);
    closeBottomSheet();
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
            <IndicatorsSelector
              onSubmit={onSubmit}
              navigation={props.navigation}
              indicators={props.indicators}
              favoriteIndicator={props.favoriteIndicator}
              setFavoriteIndicator={props.setFavoriteIndicator}
            />
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name="indicators-list" />
    </View>
  );
}
