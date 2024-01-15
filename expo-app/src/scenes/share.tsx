import React from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShareLink } from '~/assets/icons/share-link';
import { Illu } from '~/assets/share/illu';
import MyText from '~/components/ui/my-text';
import { ShareService } from '~/services/share';

export function SharePage({ navigation }: { navigation: any }) {
  return (
    <ScrollView className="flex-1 bg-app-gray">
      <SafeAreaView className="flex flex-1 items-center justify-start gap-y-6 bg-app-gray px-4 pt-12">
        <View className="flex w-full">
          <MyText font="MarianneBold" className=" text-3xl">
            Partagez l’app !
          </MyText>
          <MyText font="MarianneRegular" className=" text-lg">
            Pour agir ensemble en faveur de votre santé et de l'environnement.
          </MyText>
        </View>
        <View className="w-full">
          <Illu />
        </View>
        <View>
          <MyText font="MarianneRegular" className="px-4 text-center text-lg">
            Vous tenez à eux !{'\n'} Permettez à vos proches de recevoir des
            <MyText font="MarianneBold"> informations essentielles</MyText> pour
            <MyText font="MarianneBold">
              {' '}
              protéger leur santé au quotidien.
            </MyText>
          </MyText>
        </View>
        <View className="flex flex-row space-x-6">
          <View>
            <Pressable
              className="mb-4 flex flex-row items-center justify-center space-x-4 rounded-full bg-app-yellow p-6"
              onPress={async () => {
                await ShareService.shareApp();
              }}
            >
              <ShareLink />
              <MyText font="MarianneBold">Partager l’application</MyText>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
