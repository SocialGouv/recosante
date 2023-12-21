import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "~/components/MyText";

function IndicatorsList({ navigation }) {
  const data = [
    { name: "Indice UV" },
    { name: "Eau du robinet", disabled: true },
    { name: "Vigilance météo", disabled: true },
    { name: "Eaux de baignades", disabled: true },
    { name: "Feux de forêt", disabled: true },
    { name: "Indice ATMO", disabled: true },
  ];

  return (
    <SafeAreaView className="flex flex-1 items-center justify-start bg-app-100">
      <FlatList
        data={data}
        ListHeaderComponent={Header}
        renderItem={Indicator}
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

function Indicator({ item }) {
  return (
    <View className={["w-full border-b border-gray-300"].join(" ")}>
      <View
        className={[
          "w-full flex-row items-center justify-between px-4 py-4",
          item.disabled ? "opacity-30" : "opacity-100",
        ].join(" ")}>
        <MyText font="MarianneBold" className="text-xl">
          {item.name}
        </MyText>
        <View>
          {!!item.disabled ? (
            <MyText font="MarianneThin" className="ml-auto">
              Bientôt !
            </MyText>
          ) : (
            <MyText font="MarianneBold" className="ml-auto text-xl text-app-950">
              {">"}
            </MyText>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
  },
});

export default IndicatorsList;
