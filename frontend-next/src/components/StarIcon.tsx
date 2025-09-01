import React from 'react';

interface StarIconProps {
  isFilled: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StarIcon({
  isFilled,
  size = 'md',
  className = '',
}: StarIconProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={`${sizeClasses[size]} transition-all duration-200 ${className}`}
      viewBox='0 0 24 24'
      fill={isFilled ? 'currentColor' : 'none'}
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26' />
    </svg>
  );
}
