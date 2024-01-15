import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useEffect } from 'react';
import MyText from '~/components/ui/my-text';
import { IndicatorsSelector } from '~/components/indicators/indicators-selector';
import { type RouteEnum, type RootStackParamList } from '~/constants/route';
import { useIndicatorsList } from '~/zustand/indicator/useIndicatorsList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type IndicatorSelectorSheetProps = NativeStackScreenProps<
  // @ts-expect-error TODO
  RootStackParamList,
  RouteEnum.INDICATORS_SELECTOR
>;

export function IndicatorSelectorSheet({
  navigation,
  route,
}: IndicatorSelectorSheetProps) {
  const { indicators } = useIndicatorsList((state) => state);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { enablePanDownToClose } = route.params;
  useEffect(() => {
    // bottomSheetRef.current?.expand();
  }, []);

  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      // to make animation smoother
      navigation.goBack();
    }, 500);
  }

  return (
    <View className="flex-1 bg-black/80">
      <BottomSheet
        // enableDynamicSizing={true}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        onClose={() => {
          closeBottomSheet();
        }}
        handleStyle={{
          backgroundColor: '#3343BD',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#3343BD',
        }}
      >
        <View className="flex h-full w-full flex-1 bg-app-primary p-2">
          <MyText className="mx-2 mb-4 text-white">
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
