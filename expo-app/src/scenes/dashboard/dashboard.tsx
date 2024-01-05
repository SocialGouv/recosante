import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
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
import useMunicipality from '~/zustand/municipality/useMunicipality';

export function DashboardPage({ navigation }: { navigation: any }) {
  const { setFavoriteIndicator, favoriteIndicator, indicators, setIndicators } =
    useIndicator((state) => state);
  const { municipality } = useMunicipality((state) => state);
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

  function handleSubmit(indicator: Indicator | null) {
    setFavoriteIndicator(indicator);
    closeBottomSheet();
  }

  const hideIndicatorsList = Boolean(favoriteIndicator?.id);
  return (
    <>
      <View className="bg-app-gray  flex items-center justify-start px-4 py-4">
        <View className="top-4 flex w-full  items-end">
          <Pressable className="top-6 w-fit rounded-full  bg-app-primary p-3 text-sm text-white">
            <LocationIcon />
          </Pressable>
        </View>
        <View className="mt-4 flex w-full   ">
          <MyText font="MarianneRegular" className="text-md text-black">
            Bonjour,
          </MyText>
          <MyText font="MarianneBold" className="text-2xl text-black">
            Découvrez {'\n'}vos indicateurs favoris !
          </MyText>
          {municipality?.nom ? (
            <View className="flex flex-row items-center">
              <MyText
                font="MarianneRegular"
                className="text-md text-app-gray-100 mt-2 uppercase"
              >
                {municipality?.nom}
              </MyText>
              <View className="relative -bottom-1 ml-2 ">
                <LocationIcon fill="#AEB1B7" stroke="#AEB1B7" />
              </View>
            </View>
          ) : null}
        </View>

        {hideIndicatorsList ? null : (
          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              index={2}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <View className="flex flex-1 bg-app-primary p-6">
                <IndicatorsSelector
                  onSubmit={handleSubmit}
                  navigation={navigation}
                  indicators={indicators}
                  favoriteIndicator={favoriteIndicator}
                  setFavoriteIndicator={setFavoriteIndicator}
                />
              </View>
            </BottomSheet>
          </Portal>
        )}
        <PortalHost name="indicators-list" />
      </View>
      <IndicatorsListPreview
        indicators={indicators}
        favoriteIndicator={favoriteIndicator}
      />
    </>
  );
}
