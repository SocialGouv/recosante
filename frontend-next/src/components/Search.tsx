'use client';

import React, { useState, useEffect } from 'react';
import { useMunicipalitySearch } from '@/hooks/useMunicipalitySearch';
import { MunicipalityService, Municipality } from '@/services/municipality';
import Indicators from './Indicators';
import { useSearchParams } from 'next/navigation';

interface SearchProps {
  handlePlaceSelection?: (place: any) => void;
  fullScreen?: boolean;
}

export default function Search({ fullScreen }: SearchProps) {
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { query, setQuery, results, loading, error } = useMunicipalitySearch();
  const searchParams = useSearchParams();

  // Lire les paramètres d'URL au chargement
  useEffect(() => {
    const code = searchParams.get('code');
    const nom = searchParams.get('nom');
    
    if (code && nom) {
      // Sélectionner automatiquement la commune depuis les paramètres d'URL
      const municipality: Municipality = {
        code,
        nom: decodeURIComponent(nom),
        codeDepartement: code.substring(0, 2),
        codeRegion: '', // Sera rempli par le service si nécessaire
        population: 0,
        codesPostaux: []
      };
      
      setSelectedMunicipality(municipality);
      setQuery(municipality.nom);
    }
  }, [searchParams, setQuery]);

  const handleMunicipalitySelect = (municipality: Municipality) => {
    setSelectedMunicipality(municipality);
    setQuery(municipality.nom);
    setShowResults(false);
  };

  const handleSuggestionClick = async (codeInsee: string, name: string) => {
    try {
      const municipality = await MunicipalityService.getMunicipalityByCode(codeInsee);
      if (municipality) {
        handleMunicipalitySelect(municipality);
        // TODO: Ajouter le tracking Matomo
        console.log('Suggestion clicked:', name);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la commune:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.length >= 3);
    if (value.length < 3) {
      setSelectedMunicipality(null);
    }
  };

  const handleInputFocus = () => {
    if (query.length >= 3) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  // Si une commune est sélectionnée, afficher les indicateurs
  if (selectedMunicipality) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setSelectedMunicipality(null);
              setQuery('');
            }}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la recherche
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            Indicateurs pour {MunicipalityService.formatMunicipalityDisplay(selectedMunicipality)}
          </h2>
        </div>
        <Indicators 
          place={{
            code: selectedMunicipality.code,
            nom: selectedMunicipality.nom
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative box-border flex w-full flex-col items-center justify-start bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] ${
        fullScreen ? 'min-h-screen' : ''
      }`}
    >
      <section className="relative mx-auto flex w-full max-w-6xl flex-col pb-6 xl:pt-24">
        <div className="flex flex-col px-6 xl:flex-row-reverse xl:items-start xl:justify-center xl:px-0">
          <CloudAnimated />
          <TitleAnimated />
        </div>
        <div className="relative mb-4 px-6 xl:my-8 xl:px-0">
          <SearchInput
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            loading={loading}
            showResults={showResults}
            results={results}
            onMunicipalitySelect={handleMunicipalitySelect}
            error={error}
          />
        </div>
        <SuggestionsButtons onSuggestionClick={handleSuggestionClick} />
      </section>
    </div>
  );
}

// Composants temporaires - à remplacer par les vrais composants
function CloudAnimated() {
  return (
    <div className="relative mb-8 xl:mb-0 xl:ml-8">
      <div className="relative h-32 w-32 xl:h-40 xl:w-40">
        <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
        <div className="absolute inset-2 rounded-full bg-white/30"></div>
        <div className="absolute inset-4 rounded-full bg-white/40"></div>
        <div className="absolute inset-6 rounded-full bg-white/50"></div>
      </div>
    </div>
  );
}

function TitleAnimated() {
  return (
    <div className="mb-8 xl:mb-0">
      <h1 className="text-3xl font-bold text-gray-900 xl:text-4xl">
        Voyez l'impact de l'environnement sur votre santé
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Recevez des alertes et prévisions en temps réel
      </p>
    </div>
  );
}

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  loading: boolean;
  showResults: boolean;
  results: Municipality[];
  onMunicipalitySelect: (municipality: Municipality) => void;
  error: string | null;
}

function SearchInput({ 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  loading, 
  showResults, 
  results, 
  onMunicipalitySelect,
  error 
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      onMunicipalitySelect(results[0]);
    }
  };

  return (
    <div className="relative">
      <form
        className="z-[100] mx-auto w-full border border-b-2 border-blue-500/5 border-b-blue-500 bg-white/30 text-[2rem] focus:border-blue-500/20 max-w-xs xl:left-auto xl:mx-0 xl:max-w-2xl xl:translate-x-0 text-xl xl:text-base"
        onSubmit={handleSubmit}
      >
        <div className="relative overflow-hidden">
          <input
            type="text"
            className="w-full border-none bg-transparent py-2 pl-4 pr-12 text-base text-gray-900 outline-blue-500 placeholder:text-gray-500/80 focus:border-blue-500/20"
            title="Entrez votre ville ici"
            placeholder="Entrez votre ville ici"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <button
            className="absolute bottom-0 right-0 top-0 m-px cursor-pointer border-none bg-gradient-to-r from-white/10 to-[#eef7ff] to-[30%] pl-6 pr-3 transition-opacity focus:opacity-100 focus:outline-none"
            type="submit"
            aria-label="Valider cette ville"
            disabled={loading || results.length === 0}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            ) : (
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                className="block h-auto w-4"
              >
                <path
                  className="fill-blue-500"
                  d="M2.52447 23.948C2.69632 23.9759 2.87024 23.9888 3.04425 23.9865L32.6744 23.9865L32.0283 24.287C31.3968 24.5859 30.8222 24.9928 30.3304 25.4891L22.0214 33.7981C20.9271 34.8427 20.7432 36.5232 21.5857 37.7798C22.5662 39.1189 24.4465 39.4096 25.7856 38.4291C25.8938 38.3499 25.9967 38.2635 26.0933 38.1705L41.1187 23.1451C42.2929 21.9722 42.2939 20.0695 41.121 18.8953C41.1203 18.8945 41.1194 18.8937 41.1187 18.8929L26.0933 3.86753C24.9181 2.69564 23.0154 2.69827 21.8435 3.87344C21.7512 3.96594 21.6651 4.06436 21.5857 4.16803C20.7432 5.42463 20.9271 7.10512 22.0214 8.14976L30.3154 16.4738C30.7563 16.9152 31.2632 17.2853 31.818 17.5707L32.7195 17.9764L3.20963 17.9764C1.6745 17.9194 0.327661 18.9917 0.0392677 20.5006C-0.2264 22.1389 0.886232 23.6823 2.52447 23.948Z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Résultats de recherche */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {error && (
            <div className="p-3 text-red-600 text-sm">
              {error}
            </div>
          )}
          {loading && (
            <div className="p-3 text-gray-600 text-sm flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Recherche en cours...
            </div>
          )}
          {!loading && !error && results.length === 0 && value.length >= 3 && (
            <div className="p-3 text-gray-600 text-sm">
              Aucune commune trouvée
            </div>
          )}
          {!loading && !error && results.length > 0 && (
            <ul className="py-1">
              {results.map((municipality) => (
                <li key={municipality.code}>
                  <button
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    onClick={() => onMunicipalitySelect(municipality)}
                  >
                    <div className="font-medium text-gray-900">
                      {MunicipalityService.formatMunicipalityDisplay(municipality)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {municipality.codeDepartement} - {municipality.codeRegion}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SuggestionsButtons({ onSuggestionClick }: { onSuggestionClick: (codeInsee: string, name: string) => void }) {
  const suggestions = [
    { name: "Paris", codeInsee: "75056" },
    { name: "Marseille", codeInsee: "13055" },
    { name: "Lyon", codeInsee: "69123" },
    { name: "Toulouse", codeInsee: "31555" },
    { name: "Nice", codeInsee: "06088" },
    { name: "Nantes", codeInsee: "44109" },
    { name: "Montpellier", codeInsee: "34172" },
    { name: "Strasbourg", codeInsee: "67482" },
  ];

  return (
    <div className="overflow-hidden xl:pb-40">
      <ul className="m-0 mx-auto flex gap-3 overflow-x-scroll pb-4 sm:max-w-sm sm:flex-wrap sm:justify-center sm:overflow-auto xl:mx-0 xl:max-w-2xl xl:justify-start xl:pb-0 [&_li]:list-none">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={suggestion.codeInsee}
              className={`inline-flex w-auto rounded-full border-2 border-blue-500 ${
                index === 0 ? "ml-6 sm:ml-0" : ""
              } ${
                index === suggestions.length - 1 ? "mr-6 sm:mr-0" : ""
              }`}
            >
              <button
                className="px-4 py-1 text-xs xl:text-base text-blue-500 hover:text-blue-600 bg-transparent border-none cursor-pointer"
                onClick={() => {
                  onSuggestionClick(suggestion.codeInsee, suggestion.name);
                }}
              >
                {suggestion.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 