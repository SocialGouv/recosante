import { Pressable, View } from "react-native";
import MyText from "./MyText";
import type { Fonts } from "./MyText";

interface ButtonProps {
  children: string;
  font: Fonts;
  viewClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export default function Button({
  font = "MarianneBold",
  children,
  viewClassName = "",
  textClassName = "",
  disabled = false,
  onPress,
}: ButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        className={`flex-col justify-center rounded-full px-4 py-2 ${
          disabled ? "opacity-30" : "opacity-100"
        } ${viewClassName}`}>
        <MyText font={font} className={`-mt-1 text-center text-xl text-white ${textClassName}`}>
          {children}
        </MyText>
      </View>
    </Pressable>
  );
}
