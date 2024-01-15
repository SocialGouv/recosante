import React from 'react';
import { ScrollView, Alert, Pressable, View } from 'react-native';

import MyText from '~/components/ui/my-text';
import { NotificationsList } from './notifications-list';
import { Arrow } from '~/assets/icons/arrow';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteEnum } from '~/constants/route';

export function SettingsPage({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-around bg-app-gray px-4">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="top-8 flex w-full flex-1"
      >
        <MyText font="MarianneBold" className=" text-3xl">
          Vos préférences
        </MyText>
        <MyText font="MarianneBold" className=" mt-4 text-sm uppercase">
          Notifications
        </MyText>
        <NotificationsList />
        <Title label="Indicateurs" />

        <TextRow
          text="Votre indicateur favoris"
          onPress={() =>
            navigation.navigate(RouteEnum.INDICATORS_SELECTOR, {
              enablePanDownToClose: true,
            })
          }
        />

        <Pressable
          onPress={() => {
            Alert.alert('TODO');
          }}
        >
          <MyText
            font="MarianneExtraBold"
            className=" mt-8 text-xs uppercase underline"
          >
            nous contacter
          </MyText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
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

interface TextRowProps {
  text: string;
  onPress: () => void;
}
function TextRow(props: TextRowProps) {
  return (
    <View>
      <Pressable
        onPress={props.onPress}
        hitSlop={{
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        }}
        className="-mt-2 flex flex-row items-center justify-between pr-8"
      >
        <MyText font="MarianneRegular" className=" mt-4 text-lg ">
          {props.text}
        </MyText>
        <View className="mt-4">
          <Arrow />
        </View>
      </Pressable>
    </View>
  );
}
