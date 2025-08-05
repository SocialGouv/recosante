import React from 'react';
import StarIcon from './StarIcon';

interface FavoriteStarProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FavoriteStar({ 
  isFavorite, 
  onToggle, 
  size = 'md',
  className = '' 
}: FavoriteStarProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 ${className}`}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      tabIndex={0}
    >
      <StarIcon 
        isFilled={isFavorite}
        size={size}
        className={isFavorite 
          ? 'text-yellow-500 fill-current' 
          : 'text-gray-400 hover:text-yellow-400'
        }
      />
    </button>
  );
} 