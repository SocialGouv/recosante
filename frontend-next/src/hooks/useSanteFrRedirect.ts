import { useEffect, useState } from 'react';
import { getRedirectUrl, hasRedirect } from '../utils/santeFrRedirects';

interface UseSanteFrRedirectReturn {
  hasRedirect: boolean;
  redirectUrl: string | undefined;
  isLoading: boolean;
  redirect: () => void;
}

export function useSanteFrRedirect(slug: string): UseSanteFrRedirectReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);
  const [hasRedirectFlag, setHasRedirectFlag] = useState(false);

  useEffect(() => {
    const url = getRedirectUrl(slug);
    const hasRedirectFlagValue = hasRedirect(slug);
    
    setRedirectUrl(url);
    setHasRedirectFlag(hasRedirectFlagValue);
  }, [slug]);

  const redirect = () => {
    if (redirectUrl) {
      setIsLoading(true);
      // Redirection vers le client
      window.location.href = redirectUrl;
    }
  };

  return {
    hasRedirect: hasRedirectFlag,
    redirectUrl,
    isLoading,
    redirect,
  };
}

// Hook pour vérifier si un article a une redirection sans effectuer la redirection
export function useHasSanteFrRedirect(slug: string): boolean {
  const [hasRedirectFlag, setHasRedirectFlag] = useState(false);

  useEffect(() => {
    setHasRedirectFlag(hasRedirect(slug));
  }, [slug]);

  return hasRedirectFlag;
} 