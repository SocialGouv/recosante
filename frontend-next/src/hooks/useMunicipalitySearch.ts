import { useState, useEffect, useCallback } from 'react';
import { MunicipalityService, Municipality } from '@/services/municipality';

export function useMunicipalitySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Municipality[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMunicipalities = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const municipalities = await MunicipalityService.searchMunicipalities(searchQuery);
      setResults(municipalities);
    } catch (err) {
      setError('Erreur lors de la recherche');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMunicipalities(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchMunicipalities]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    searchMunicipalities
  };
} 