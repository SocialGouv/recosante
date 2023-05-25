import { useQueryParam } from "hooks/useQueryParam";
import React from "react";
import { ThemeProvider } from "styled-components";

import StyleContext from "utils/StyleContext";
import { themes } from "utils/styles";

export default function StyleProvider(props) {
  const [theme, setTheme] = useQueryParam("theme", "default");

  return (
    <StyleContext.Provider
      value={{
        themes,
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={{ ...themes[theme] }}>
        {props.children}
      </ThemeProvider>
    </StyleContext.Provider>
  );
}
