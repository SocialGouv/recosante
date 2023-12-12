import { Pressable, View } from "react-native";
import MyText from "./MyText";
import type { Fonts } from "./MyText";

interface ButtonProps {
  children: string;
  font: Fonts;
  viewClassName?: string;
  textClassName?: string;
  onPress?: () => void;
}

export default function Button({
  font = "MarianneBold",
  children,
  viewClassName = "",
  textClassName = "",
  onPress,
}: ButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View className={`flex-col justify-center rounded-full px-4 py-2 ${viewClassName}`}>
        <MyText font={font} className={`-mt-1 text-center text-xl text-white ${textClassName}`}>
          {children}
        </MyText>
      </View>
    </Pressable>
  );
}
