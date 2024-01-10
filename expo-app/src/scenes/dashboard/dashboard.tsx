import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { LocationIcon } from '~/assets/icons/location';
import { useIndicator } from '~/zustand/indicator/useIndicator';
import { IndicatorsListPreview } from './indicators-list-preview';
import { Indicator } from '~/types/indicator';
import Api from '~/services/api';
import useMunicipality from '~/zustand/municipality/useMunicipality';
import { IndicatorDetail } from './indicator-detail';
import { IndicatorSelectorSheet } from './indicator-selector-sheet';

export function DashboardPage() {
  const { favoriteIndicator, indicators, setIndicators } = useIndicator(
    (state) => state,
  );
  const { municipality } = useMunicipality((state) => state);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    let ignore = false;
    Api.get({ path: '/indicators/list' }).then((response) => {
      const indicators = response.data as Indicator[];
      if (!!ignore) return;
      if (!response.ok) return setError(response.error);
      setIndicators(indicators);
    });
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

  return (
    <>
      <View className="flex  items-center justify-start bg-app-gray px-4 py-4">
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
                className="text-md mt-2 uppercase text-app-gray-100"
              >
                {municipality?.nom}
              </MyText>
              <View className="relative -bottom-1 ml-2 ">
                <LocationIcon fill="#AEB1B7" stroke="#AEB1B7" />
              </View>
            </View>
          ) : null}
        </View>

        {favoriteIndicator ? null : (
          <IndicatorSelectorSheet indicators={indicators} />
        )}

        <IndicatorDetail />
      </View>
      <IndicatorsListPreview
        indicators={indicators}
        favoriteIndicator={favoriteIndicator}
      />
    </>
  );
}
