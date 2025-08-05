import { useState, useEffect } from 'react';

const CITY_FAVORITES_STORAGE_KEY = 'recosante_city_favorites';

export interface CityFavorite {
  codeInsee: string;
  name: string;
  codeDepartement: string;
  codeRegion: string;
}

export function useCityFavorites() {
  const [favorites, setFavorites] = useState<CityFavorite[]>([]);

  useEffect(() => {
  
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(CITY_FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des villes favorites:', error);
    }
  }, []);

  const saveFavorites = (newFavorites: CityFavorite[]) => {
    try {
      localStorage.setItem(CITY_FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des villes favorites:', error);
    }
  };

  const addFavorite = (city: CityFavorite) => {
    if (!favorites.find(fav => fav.codeInsee === city.codeInsee)) {
      saveFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (codeInsee: string) => {
    saveFavorites(favorites.filter(fav => fav.codeInsee !== codeInsee));
  };

  // Basculer le statut favori d'une ville
  const toggleFavorite = (city: CityFavorite) => {
    const existing = favorites.find(fav => fav.codeInsee === city.codeInsee);
    if (existing) {
      removeFavorite(city.codeInsee);
    } else {
      addFavorite(city);
    }
  };

  const isFavorite = (codeInsee: string) => {
    return favorites.some(fav => fav.codeInsee === codeInsee);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
} 