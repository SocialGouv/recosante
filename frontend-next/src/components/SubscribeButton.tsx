'use client';

import React, { useState } from 'react';

interface SubscribeButtonProps {
  indicator: string;
  disabled?: boolean;
  onClick?: () => void;
  place?: {
    code: string;
    nom: string;
  };
  className?: string;
}

export default function SubscribeButton({ 
  indicator, 
  disabled = false, 
  onClick, 
  place,
  className = ''
}: SubscribeButtonProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleClick = async () => {
    if (disabled || isSubscribing) return;
    
    setIsSubscribing(true);
    
    try {
      if (onClick) {
        await onClick();
      } else {
        // Redirection vers la page d'abonnement
        const params = new URLSearchParams({
          indicator,
          ...(place && { place: `${place.code}-${place.nom}` })
        });
        
        window.open(`/subscribe?${params.toString()}`, '_blank');
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const getIndicatorName = (slug: string) => {
    switch (slug) {
      case 'indice_atmospheric':
        return "l'indice ATMO";
      case 'indice_uv':
        return "l'indice UV";
      case 'pollen_allergy':
        return 'le taux de pollen';
      case 'weather_alert':
        return 'les alertes météo';
      case 'bathing_water':
        return 'les eaux de baignade';
      default:
        return slug;
    }
  };

  return (
    <></>
  );
}

export function FixedSubscribeButton({ place }: { place?: { code: string; nom: string } }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SubscribeButton
        indicator="all"
        place={place}
        className="shadow-lg"
      />
    </div>
  );
} 