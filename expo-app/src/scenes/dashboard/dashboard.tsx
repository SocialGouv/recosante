import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { LocationIcon } from '~/assets/icons/location';
import { useIndicatorsList } from '~/zustand/indicator/useIndicatorsList';
import { IndicatorsListPreview } from './indicators-list-preview';
import API from '~/services/api';
import { useIndicatorsDto } from '~/zustand/indicator/useIndicatorsDto';
import { RouteEnum } from '~/constants/route';
import { useAddress } from '~/zustand/address/useAddress';
import { registerForPushNotificationsAsync } from '~/services/expo-push-notifs';

export function DashboardPage({ navigation }: { navigation: any }) {
  const { favoriteIndicator, indicators } = useIndicatorsList((state) => state);
  const { setIndicatorsDto } = useIndicatorsDto((state) => state);
  const { address } = useAddress((state) => state);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    if (!address?.citycode) return;
    let ignore = false;
    API.get({ path: '/indicators' }).then((response) => {
      if (ignore) return;
      if (!response.ok) {
        setError(response.error);
        return;
      }
      setIndicatorsDto(response.data);
    });
    registerForPushNotificationsAsync({
      force: false,
      expo: true,
    }).then((token) => {
      if (ignore) return;
      if (!token) return;
      API.put({
        path: '/user',
        body: { push_notif_token: JSON.stringify(token) },
      });
    });
    return () => {
      ignore = true;
    };
  }, [address?.citycode]);

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
        <View className="relative top-8 flex w-full items-end">
          <Pressable
            className="w-fit rounded-full bg-app-primary p-3 text-sm text-white"
            onPress={() => navigation.navigate(RouteEnum.LOCATION)}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
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
          {address?.city ? (
            <View className="flex flex-row items-center">
              <MyText
                font="MarianneRegular"
                className="text-md mt-2 uppercase text-app-gray-100"
              >
                {address?.label ?? address?.city}
              </MyText>
              <View className="relative -bottom-1 ml-2 ">
                <LocationIcon fill="#AEB1B7" stroke="#AEB1B7" />
              </View>
            </View>
          ) : null}
        </View>
      </View>
      <IndicatorsListPreview
        indicators={indicators}
        favoriteIndicator={favoriteIndicator}
      />
    </>
  );
}
