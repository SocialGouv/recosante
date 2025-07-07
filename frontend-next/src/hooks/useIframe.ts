'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useIframe() {
  const [isIframe, setIsIframe] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const detectIframe = () => {
      const iframeParam = searchParams.get('iframe');
      const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
      setIsIframe(iframeParam === 'true' || isInIframe);
    };

    detectIframe();
  }, [searchParams]);

  return isIframe;
}

export function useIframeMessage() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data === 'onScreen') {
        // TODO: Ajouter le tracking Matomo
        console.log('Widget onScreen');
      }
      if (data === 'offScreen') {
        // TODO: Ajouter le tracking Matomo
        console.log('Widget offScreen');
      }
    };

    // Vérifier si on est dans une iframe
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    
    if (isInIframe) {
      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);
} 