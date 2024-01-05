import { View, StyleSheet } from 'react-native';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Portal, PortalHost } from '@gorhom/portal';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '~/components/ui/my-text';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from '~/components/ui/button';
import { LocationIcon } from '~/assets/icons/location';
import { IndicatorsSelector } from '~/components/indicators/indicators-selector';
import { useIndicator } from '~/zustand/indicator/useIndicator';
import { IndicatorsListPreview } from './indicators-list-preview';
import { Indicator } from '~/types/indicator';
import Api from '~/services/api';

export function DashboardPage({ navigation }: { navigation: any }) {
  const { setFavoriteIndicator, favoriteIndicator, indicators, setIndicators } =
    useIndicator((state) => state);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let ignore = false;
    setIndicators([]);
    async function getIndicators() {
      return Api.get({
        path: '/indicators',
      }).then((response) => {
        const indicators = response.data as Indicator[];
        if (!ignore) {
          if (!response.ok) {
            setError(response.error);
          } else setIndicators(indicators);
        }
      });
    }
    getIndicators();
    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    return (
      <View>
        <MyText>{error}</MyText>
      </View>
    );
  }
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
  }

  return (
    <View className="flex flex-1 items-center justify-start bg-app-100 px-4">
      <View className="flex w-full items-end  pt-4">
        <Button
          viewClassName="bg-app-primary w-fit  "
          textClassName="text-white text-sm "
          font="MarianneMedium"
        >
          Localisez-moi
          <View className="pl-2 pt-1">
            <LocationIcon />
          </View>
        </Button>
      </View>
      <View className="mt-4 flex w-full   ">
        <MyText font="MarianneRegular" className="text-md text-black">
          Bonjour
        </MyText>
        <MyText font="MarianneBold" className="text-2xl text-black">
          Découvrez {'\n'}vos indicateurs favoris !
        </MyText>

        <IndicatorsListPreview
          indicators={indicators}
          favoriteIndicator={favoriteIndicator}
        />
      </View>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={2}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View className="flex flex-1 bg-app-primary p-6">
            <IndicatorsSelector
              navigation={navigation}
              closeBottomSheet={closeBottomSheet}
              indicators={indicators}
              favoriteIndicator={favoriteIndicator}
              setFavoriteIndicator={setFavoriteIndicator}
            />
          </View>
        </BottomSheet>
      </Portal>

      <PortalHost name="custom_host" />
    </View>
  );
}
