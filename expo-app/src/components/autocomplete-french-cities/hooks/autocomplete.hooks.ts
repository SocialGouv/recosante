import { useState, useRef, useCallback } from 'react';
import { LocationService } from '~/services/location';
import { LocationType } from '~/types/location';

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
  const [locationsList, setAddresssList] = useState<LocationType[]>([]);
  const dropdownController = useRef(null);
  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (query: string | number) => {
    if (typeof query !== 'string' || query.length < 3) {
      setAddresssList([]);
      return;
    }

    const search = query.toLowerCase();
    setLoading(true);
    const url = new URL('https://api-adresse.data.gouv.fr/search/');
    url.searchParams.append('q', search);

    const response = await fetch(url);
    const items = await response.json();
    const adressReponse: LocationType[] = items.features.map((el: any) => {
      return LocationService.formatPropertyToLocationType(el.properties);
    });
    setAddresssList(adressReponse);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setAddresssList([]);
  }, []);

  const onOpenSuggestionsList = useCallback(() => {}, []);

  return {
    locationsList,
    loading,
    getSuggestions,
    dropdownController,
    searchRef,
    onClearPress,
    onOpenSuggestionsList,
  };
}
