import React, { Fragment } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { Email } from '~/assets/share/email';
import { Illu } from '~/assets/share/illu';
import { Message } from '~/assets/share/message';
import { More } from '~/assets/share/more';
import { Whatsapp } from '~/assets/share/whatsapp';
import MyText from '~/components/ui/my-text';

const buttons = [
  {
    icon: <Message />,
    label: 'Message',
  },
  {
    icon: <Whatsapp />,
    label: 'Whatsapp',
  },
  {
    icon: <Email />,
    label: 'Email',
  },
  {
    icon: <More />,
    label: 'Plus',
  },
];

export function SharePage({ navigation }: { navigation: any }) {
  return (
    <View className="flex flex-1 items-center justify-around bg-app-gray px-4">
      <View className="top-8 flex w-full">
        <MyText font="MarianneBold" className=" text-3xl">
          Partagez l’app !
        </MyText>
        <MyText font="MarianneRegular" className=" text-lg">
          Pour agir ensemble en faveur de votre santé et de l'environnement.
        </MyText>
      </View>
      <View className="-top-12">
        <Illu />
      </View>
      <View>
        <MyText
          font="MarianneRegular"
          className="-mt-40 px-4 text-center text-lg"
        >
          Vous tenez à eux !{'\n'} Permettez à vos proches de recevoir des
          <MyText font="MarianneBold"> informations essentielles</MyText> pour
          <MyText font="MarianneBold">
            {' '}
            protéger leur santé au quotidien.
          </MyText>
        </MyText>
      </View>
      <View className="bottom-24 flex flex-row space-x-6">
        {buttons.map((button) => (
          <View key={button.label}>
            <Pressable
              key={button.label}
              className="mb-4 rounded-full bg-app-yellow p-6"
              onPress={() => {
                Alert.alert(
                  'Partager',
                  'Partager l’app avec vos proches',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Not Implemented',
                      onPress: () => console.log('OK Pressed'),
                    },
                  ],
                  { cancelable: false },
                );
              }}
            >
              {button.icon}
            </Pressable>
            <MyText
              font="MarianneRegular"
              className="-mt-2 text-center text-xs"
            >
              {button.label}
            </MyText>
          </View>
        ))}
      </View>
    </View>
  );
}
