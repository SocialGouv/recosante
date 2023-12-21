import { useState, useRef, useCallback } from 'react';

type SuggestionType = {
  id: string;
  title: string;
  code: string;
  nom: string;
  codesPostaux: string[];
  _score: number;
  displayCodesPostaux: string;
};
export function useAutoComplete() {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState<SuggestionType[]>([]);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (query: string | number) => {
    if (typeof query !== 'string' || query.length < 3) {
      setSuggestionsList([]);
      return;
    }

    const filterToken = query.toLowerCase();
    setLoading(true);
    const url = new URL('https://geo.api.gouv.fr/communes');
    url.searchParams.append('boost', 'population');
    url.searchParams.append('limit', '5');
    url.searchParams.append('fields', 'nom,code,codesPostaux');
    // TODO: can not work, filterToken is a string
    // @ts-ignore
    if (Number(filterToken) == filterToken) {
      url.searchParams.append('codePostal', filterToken);
    } else {
      url.searchParams.append('nom', filterToken);
    }
    const response = await fetch(url);
    const items = await response.json();
    const suggestions: SuggestionType[] = items.map(
      (item: {
        code: string;
        nom: string;
        codesPostaux: string[];
        _score: number;
      }) => ({
        id: item.code,
        title: item.nom,
        code: item.code,
        nom: item.nom,
        codesPostaux: item.codesPostaux,
        _score: item._score,
        displayCodesPostaux:
          item.codesPostaux.length > 2
            ? `${item.codesPostaux[0]}..${item.codesPostaux.at(-1)}`
            : item.codesPostaux.length === 2
              ? `${item.codesPostaux[0]}, ${item.codesPostaux[1]}`
              : item.codesPostaux[0],
      }),
    );
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList([]);
  }, []);

  const onOpenSuggestionsList = useCallback(() => {}, []);

  return {
    loading,
    suggestionsList,
    getSuggestions,
    dropdownController,
    searchRef,
    onClearPress,
    onOpenSuggestionsList,
  };
}
