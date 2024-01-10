import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { LocationIcon } from '~/assets/icons/location';
import { useIndicatorsList } from '~/zustand/indicator/useIndicatorsList';
import { IndicatorsListPreview } from './indicators-list-preview';
import API from '~/services/api';
import useMunicipality from '~/zustand/municipality/useMunicipality';
import { IndicatorDetail } from './indicator-detail';
import { IndicatorSelectorSheet } from './indicator-selector-sheet';
import { useIndicatorsData } from '~/zustand/indicator/useIndicatorsData';
import dayjs from 'dayjs';

export function DashboardPage() {
  const { favoriteIndicator, indicators } = useIndicatorsList((state) => state);
  const { setData } = useIndicatorsData((state) => state);
  const { municipality } = useMunicipality((state) => state);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    if (!municipality?.code) return;
    let ignore = false;
    API.get({
      path: '/indicators',
      query: {
        municipality_insee_code: municipality?.code,
        date_ISO: dayjs().toISOString(),
      },
    }).then((response) => {
      if (!!ignore) return;
      if (!response.ok) return setError(response.error);
      setData(response.data);
    });
    return () => {
      ignore = true;
    };
  }, [municipality?.code]);

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
