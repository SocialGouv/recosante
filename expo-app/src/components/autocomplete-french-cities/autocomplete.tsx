import React from 'react';
import { Dimensions, Text, Platform, StyleSheet } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useAutoComplete } from './hooks/autocomplete.hooks';
import { Municipality } from '~/types/municipality';

interface AutoCompleteProps {
  setSelectedCommune: (municipality: Municipality) => void;
}
export default function AutoComplete(props: AutoCompleteProps) {
  const {
    loading,
    suggestionsList,
    getSuggestions,
    dropdownController,
    searchRef,
    onClearPress,
    onOpenSuggestionsList,
  } = useAutoComplete();

  return (
    <AutocompleteDropdown
      ref={searchRef}
      controller={(controller) => {
        // @ts-ignore
        dropdownController.current = controller;
      }}
      // direction={Platform.select({ ios: 'down' })}
      dataSet={suggestionsList}
      onChangeText={getSuggestions}
      onSelectItem={(item) => {
        if (!item) return;
        const selectedItem = item as unknown as Municipality;
        props.setSelectedCommune(selectedItem);
      }}
      debounce={600}
      suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
      onClear={onClearPress}
      onOpenSuggestionsList={onOpenSuggestionsList}
      loading={loading}
      useFilter={false}
      textInputProps={{
        placeholder: 'Écrivez votre ville ici',
        autoCorrect: true,
        autoCapitalize: 'words',
        style: styles.textInput,
      }}
      rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      suggestionsListContainerStyle={styles.suggestionsListContainerStyle}
      containerStyle={styles.containerStyle}
      renderItem={(item) => {
        return (
          <Text style={styles.suggestionStyle}>
            {/* TODO: Check how to infer item type from Suggestion type in hooks */}
            {/* @ts-ignore */}
            <Text style={styles.communeName}>{item.nom}</Text> (
            {/* @ts-ignore */}
            {item.displayCodesPostaux})
          </Text>
        );
      }}
      inputHeight={50}
      showChevron={false}
      closeOnBlur={false}
      emptyResultText="Aucun résultat 🧐"
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 18,
  },
  rightButtonsContainerStyle: {
    right: 8,
    height: 30,
    alignSelf: 'center',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 200,
  },
  suggestionsListContainerStyle: {
    backgroundColor: '#fff',
  },
  containerStyle: {
    flexGrow: 1,
    flexShrink: 1,
  },
  suggestionStyle: {
    color: '#000',
    padding: 16,
  },
  communeName: {
    fontWeight: 'bold',
  },
});
