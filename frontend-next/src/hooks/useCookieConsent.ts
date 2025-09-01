'use client';

import { useState, useEffect } from 'react';

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>({
    analytics: false,
    marketing: false,
    necessary: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Charger le consentement depuis sessionStorage
    const savedConsent = sessionStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (error) {
        console.warn('Erreur lors du chargement du consentement des cookies:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    
    sessionStorage.setItem('cookieConsent', JSON.stringify(updatedConsent));
    
    if (updatedConsent.analytics) {
      sessionStorage.setItem('hideCookieBanner', 'true');
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      analytics: true,
      marketing: true,
      necessary: true,
    };
    updateConsent(allAccepted);
  };

  const acceptSelection = (analytics: boolean, marketing: boolean) => {
    updateConsent({ analytics, marketing });
  };

  const rejectAll = () => {
    const allRejected = {
      analytics: false,
      marketing: false,
      necessary: true,
    };
    updateConsent(allRejected);
  };

  // Vérifier si les cookies d'analyse sont acceptés
  const isAnalyticsAccepted = () => consent.analytics;
  
  // Vérifier si les cookies marketing sont acceptés
  const isMarketingAccepted = () => consent.marketing;
  
  // Vérifier si les cookies nécessaires sont acceptés (toujours true)
  const isNecessaryAccepted = () => consent.necessary;

  return {
    consent,
    isLoaded,
    updateConsent,
    acceptAll,
    acceptSelection,
    rejectAll,
    isAnalyticsAccepted,
    isMarketingAccepted,
    isNecessaryAccepted,
  };
}
