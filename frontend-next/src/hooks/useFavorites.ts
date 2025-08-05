import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'recosante_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
  
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  };

  const addFavorite = (slug: string) => {
    if (!favorites.includes(slug)) {
      saveFavorites([...favorites, slug]);
    }
  };

  const removeFavorite = (slug: string) => {
    saveFavorites(favorites.filter(fav => fav !== slug));
  };

  const toggleFavorite = (slug: string) => {
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  const isFavorite = (slug: string) => {
    return favorites.includes(slug);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
} 