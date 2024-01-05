import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyText from '~/components/ui/my-text';
import { NotificationsList } from './notifications-list';
import { useNotification } from '~/zustand/notification/useNotification';
import { Arrow } from '~/assets/icons/arrow';

export function SettingsPage({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="bg-app-gray flex flex-1 items-center justify-around px-4">
      <View className="top-16 flex w-full flex-1">
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
          onPress={() => Alert.alert('TODO')}
        />
        <Title label="Données personnelles" />

        <TextRow
          text="Changer votre email"
          onPress={() => Alert.alert('TODO')}
        />
        <TextRow
          text="Supprimer votre compte"
          onPress={() => Alert.alert('TODO')}
        />
        <Pressable onPress={() => Alert.alert('TODO')}>
          <MyText
            font="MarianneExtraBold"
            className=" mt-8 text-xs uppercase underline"
          >
            nous contacter
          </MyText>
        </Pressable>
      </View>
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
    <View className="-mt-2 flex flex-row items-center justify-between pr-8">
      <MyText font="MarianneRegular" className=" mt-4 text-lg ">
        {props.text}
      </MyText>
      <Pressable onPress={props.onPress}>
        <View className="mt-4">
          <Arrow />
        </View>
      </Pressable>
    </View>
  );
}
