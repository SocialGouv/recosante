import * as React from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '~/components/ui/my-text';
import { IndicatorItem, indicators } from './indicators';

// TODO: type RootStackParamList to type navigation
// https://reactnavigation.org/docs/typescript/#annotating-usenavigation
function IndicatorsList({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-start bg-app-100">
      <FlatList
        data={indicators}
        ListHeaderComponent={Header}
        renderItem={({ item }) => (
          <Indicator item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.contentContainer}
        className="w-full"
      />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View className="border-b border-gray-300 py-4">
      <MyText font="MarianneExtraBold" className="text-center text-3xl">
        Liste des indicateurs
      </MyText>
    </View>
  );
}

function Indicator({
  item,
  navigation,
}: {
  item: IndicatorItem;
  navigation: any;
}) {
  return (
    <View className={['w-full border-b border-gray-300'].join(' ')}>
      <View
        className={[
          'w-full flex-row items-center justify-between px-4 py-4',
          item.disabled ? 'opacity-30' : 'opacity-100',
        ].join(' ')}
      >
        <MyText font="MarianneBold" className="text-xl">
          {item.name}
        </MyText>
        <View>
          {!!item.disabled ? (
            <MyText font="MarianneThin" className="ml-auto">
              Bientôt !
            </MyText>
          ) : (
            <Pressable onPress={() => navigation.navigate(item.navigateTo)}>
              <MyText font="MarianneThin">→</MyText>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
  },
});

export default IndicatorsList;
