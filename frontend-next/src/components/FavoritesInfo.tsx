import React from 'react';
import { useFavoritesInfo } from '@/hooks/useFavoritesInfo';

interface FavoritesInfoProps {
  className?: string;
}

export default function FavoritesInfo({ className = '' }: FavoritesInfoProps) {
  const { showInfo, hideInfo } = useFavoritesInfo();

  if (!showInfo) {
    return null;
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Système de favoris
            </h3>
            <p className="text-sm text-blue-700">
              Cliquez sur l'étoile en haut à droite de chaque indicateur pour le marquer comme favori. 
              Vos favoris apparaîtront en premier dans la liste.
            </p>
          </div>
        </div>
        <button
          onClick={hideInfo}
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="Fermer ce message"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
} 