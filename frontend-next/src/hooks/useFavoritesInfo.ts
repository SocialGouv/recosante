import { useState, useEffect } from 'react';

const FAVORITES_INFO_STORAGE_KEY = 'recosante_favorites_info_shown';

export function useFavoritesInfo() {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    
    if (typeof window === 'undefined') return;
    
    try {
      const hasShownInfo = localStorage.getItem(FAVORITES_INFO_STORAGE_KEY);
      if (!hasShownInfo) {
        setShowInfo(true);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du message d\'information:', error);
      setShowInfo(true);
    }
  }, []);

  const hideInfo = () => {
    try {
      localStorage.setItem(FAVORITES_INFO_STORAGE_KEY, 'true');
      setShowInfo(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état du message:', error);
      setShowInfo(false);
    }
  };

  return {
    showInfo,
    hideInfo,
  };
} 