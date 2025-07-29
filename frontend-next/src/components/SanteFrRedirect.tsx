'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SanteFrRedirectProps {
  redirectUrl: string;
  delay?: number; // Délai en millisecondes avant la redirection (défaut: 0)
  showRedirectMessage?: boolean; // Afficher un message de redirection
}

export default function SanteFrRedirect({ 
  redirectUrl, 
  delay = 0, 
  showRedirectMessage = true 
}: SanteFrRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirection vers sante.fr
      window.location.href = redirectUrl;
    }, delay);

    return () => clearTimeout(timer);
  }, [redirectUrl, delay]);

  if (!showRedirectMessage) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg 
            className="mx-auto h-12 w-12 text-blue-600 animate-pulse" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Redirection en cours...
        </h2>
        
        <p className="text-gray-600 mb-6">
          Vous allez être redirigé vers le site sante.fr pour consulter cet article.
        </p>
        
        <div className="text-sm text-gray-500">
          Si la redirection ne fonctionne pas automatiquement,{' '}
          <a 
            href={redirectUrl}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            cliquez ici
          </a>
        </div>
      </div>
    </div>
  );
} 