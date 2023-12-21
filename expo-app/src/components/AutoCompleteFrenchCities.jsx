import React, { memo, useCallback, useRef, useState } from "react";
import { Button, Dimensions, Text, View, Platform, StyleSheet } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export default function AutoCompleteFrenchCities({ setSelectedCity }) {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    // `https://geo.api.gouv.fr/communes?&boost=population&limit=10&fields=nom,code,codesPostaux&${
    //     Number(search) == search
    //     ? "codePostal=" + search
    //     : "nom=" + search
    // }`
    const url = new URL("https://geo.api.gouv.fr/communes");
    url.searchParams.append("boost", "population");
    url.searchParams.append("limit", "5");
    url.searchParams.append("fields", "nom,code,codesPostaux");
    if (Number(filterToken) == filterToken) {
      url.searchParams.append("codePostal", filterToken);
    } else {
      url.searchParams.append("nom", filterToken);
    }
    const response = await fetch(url);
    const items = await response.json();
    const suggestions = items.map((item) => ({
      id: item.code,
      title: item.nom,
      code: item.code,
      nom: item.nom,
      codesPostaux: item.codesPostaux,
      displayCodesPostaux:
        item.codesPostaux.length > 2
          ? `${item.codesPostaux[0]}..${item.codesPostaux.at(-1)}`
          : item.codesPostaux.length === 2
          ? `${item.codesPostaux[0]}, ${item.codesPostaux[1]}`
          : item.codesPostaux[0],
      _score: item._score,
    }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  return (
    <View style={{ zIndex: 1 }}>
      <AutocompleteDropdown
        ref={searchRef}
        controller={(controller) => {
          dropdownController.current = controller;
          dropdownController.current.toggle();
        }}
        // initialValue={'1'}
        direction={Platform.select({ ios: "down" })}
        dataSet={suggestionsList}
        onChangeText={getSuggestions}
        onSelectItem={(item) => {
          item && setSelectedCity(item);
        }}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
        onClear={onClearPress}
        //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
        onOpenSuggestionsList={onOpenSuggestionsList}
        loading={loading}
        useFilter={false} // set false to prevent rerender twice
        textInputProps={{
          placeholder: "Écrivez votre ville ici",
          autoCorrect: true,
          autoCapitalize: "words",
          style: styles.textInput,
        }}
        rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        suggestionsListContainerStyle={styles.suggestionsListContainerStyle}
        containerStyle={styles.containerStyle}
        renderItem={(item, text) => {
          return (
            <Text style={styles.suggestionStyle}>
              <Text style={styles.cityName}>{item.nom}</Text> ({item.displayCodesPostaux})
            </Text>
          );
        }}
        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
        inputHeight={50}
        showChevron={false}
        closeOnBlur={false}
        emptyResultText="Aucun résultat 🧐"
        //  showClear={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 4,
    backgroundColor: "#fff",
    color: "#000",
    paddingLeft: 18,
  },
  rightButtonsContainerStyle: {
    right: 8,
    height: 30,
    alignSelf: "center",
  },
  inputContainerStyle: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  suggestionsListContainerStyle: {
    backgroundColor: "#fff",
  },
  containerStyle: {
    flexGrow: 1,
    flexShrink: 1,
  },
  suggestionStyle: {
    color: "#000",
    padding: 16,
  },
  cityName: {
    fontWeight: "bold",
  },
});
