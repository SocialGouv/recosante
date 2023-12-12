import { StyleSheet, Text, TextProps } from "react-native";
import { styled } from "nativewind";
import { useFonts } from "expo-font";

// MyText is required to
// - have a default font
// - fix android color issue
// - fix globally some issues with android chinese phones sometimes

export type Fonts =
  | "MarianneBold"
  | "MarianneBoldItalic"
  | "MarianneExtraBold"
  | "MarianneExtraBoldItalic"
  | "MarianneLight"
  | "MarianneLightItalic"
  | "MarianneMedium"
  | "MarianneMediumItalic"
  | "MarianneRegular"
  | "MarianneRegularItalic"
  | "MarianneThin"
  | "MarianneThinItalic";

interface MyTextProps extends TextProps {
  children: React.ReactNode;
  font?: Fonts;
}

// Bare in mind that NativeWind converts `className` to `style` prop
function MyText({ font, style, children, ...props }: MyTextProps) {
  const fontStyle = font ? styles[font] : styles.default;
  const [fontsLoaded] = useFonts({
    MarianneBold: require("../assets/fonts/Marianne-Bold.otf"),
    MarianneBoldItalic: require("../assets/fonts/Marianne-BoldItalic.otf"),
    MarianneExtraBold: require("../assets/fonts/Marianne-ExtraBold.otf"),
    MarianneExtraBoldItalic: require("../assets/fonts/Marianne-ExtraBoldItalic.otf"),
    MarianneLight: require("../assets/fonts/Marianne-Light.otf"),
    MarianneLightItalic: require("../assets/fonts/Marianne-LightItalic.otf"),
    MarianneMedium: require("../assets/fonts/Marianne-Medium.otf"),
    MarianneMediumItalic: require("../assets/fonts/Marianne-MediumItalic.otf"),
    MarianneRegular: require("../assets/fonts/Marianne-Regular.otf"),
    MarianneRegularItalic: require("../assets/fonts/Marianne-RegularItalic.otf"),
    MarianneThin: require("../assets/fonts/Marianne-Thin.otf"),
    MarianneThinItalic: require("../assets/fonts/Marianne-ThinItalic.otf"),
  });

  if (!fontsLoaded) {
    return (
      <Text style={[style]} {...props}>
        {children}
      </Text>
    );
  }

  return (
    <Text style={[fontStyle, style]} {...props}>
      {children}
    </Text>
  );
}

export default styled(MyText);

const styles = StyleSheet.create({
  default: {
    // fontFamily: "MarianneRegular",
    color: "#000",
  },
  MarianneBold: {
    fontFamily: "MarianneBold",
    color: "#000",
  },
  MarianneBoldItalic: {
    fontFamily: "MarianneBoldItalic",
    color: "#000",
  },
  MarianneExtraBold: {
    fontFamily: "MarianneExtraBold",
    color: "#000",
  },
  MarianneExtraBoldItalic: {
    fontFamily: "MarianneExtraBoldItalic",
    color: "#000",
  },
  MarianneLight: {
    fontFamily: "MarianneLight",
    color: "#000",
  },
  MarianneLightItalic: {
    fontFamily: "MarianneLightItalic",
    color: "#000",
  },
  MarianneMedium: {
    fontFamily: "MarianneMedium",
    color: "#000",
  },
  MarianneMediumItalic: {
    fontFamily: "MarianneMediumItalic",
    color: "#000",
  },
  MarianneRegular: {
    fontFamily: "MarianneRegular",
    color: "#000",
  },
  MarianneRegularItalic: {
    fontFamily: "MarianneRegularItalic",
    color: "#000",
  },
  MarianneThin: {
    fontFamily: "MarianneThin",
    color: "#000",
  },
  MarianneThinItalic: {
    fontFamily: "MarianneThinItalic",
    color: "#000",
  },
});
