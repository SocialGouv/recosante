import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'recosante_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Charger les favoris depuis localStorage au montage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
  }, []);

  // Sauvegarder les favoris dans localStorage
  const saveFavorites = (newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  };

  // Ajouter un indicateur aux favoris
  const addFavorite = (slug: string) => {
    if (!favorites.includes(slug)) {
      saveFavorites([...favorites, slug]);
    }
  };

  // Retirer un indicateur des favoris
  const removeFavorite = (slug: string) => {
    saveFavorites(favorites.filter(fav => fav !== slug));
  };

  // Basculer le statut favori d'un indicateur
  const toggleFavorite = (slug: string) => {
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  // Vérifier si un indicateur est en favori
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