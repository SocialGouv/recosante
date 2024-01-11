import { useState, useRef, useCallback } from 'react';
import { LocationService } from '~/services/location';
import { Feature, LocationType } from '~/types/location';

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
  const [addressList, setAddressList] = useState<LocationType[]>([]);
  const dropdownController = useRef(null);
  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (query: string | number) => {
    if (typeof query !== 'string' || query.length < 3) {
      setAddressList([]);
      return;
    }

    const search = query.toLowerCase();
    setLoading(true);
    const url = new URL('https://api-adresse.data.gouv.fr/search/');
    url.searchParams.append('q', search);

    const response = await fetch(url);
    const items = await response.json();
    const adressReponse: LocationType[] = items.features.map(
      (feature: Feature) => {
        return LocationService.formatPropertyToLocationType(feature.properties);
      },
    );
    setAddressList(adressReponse);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setAddressList([]);
  }, []);

  const onOpenSuggestionsList = useCallback(() => {}, []);

  return {
    addressList,
    loading,
    getSuggestions,
    dropdownController,
    searchRef,
    onClearPress,
    onOpenSuggestionsList,
  };
}
