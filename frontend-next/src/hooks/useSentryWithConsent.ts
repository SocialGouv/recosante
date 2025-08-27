'use client';

import { useEffect, useRef } from 'react';
import * as Sentry from '@sentry/nextjs';
import { useCookieConsent } from './useCookieConsent';

export function useSentryWithConsent() {
  const { isAnalyticsAccepted, isLoaded } = useCookieConsent();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Initialiser Sentry seulement si les cookies d'analyse sont acceptés
    if (isAnalyticsAccepted() && !isInitialized.current) {
      // Activer Sentry avec les fonctionnalités d'analyse
      Sentry.init({
        dsn: 'https://59bb180e87e0a82a731432c8df6db4a3@sentry2.fabrique.social.gouv.fr/43',
        enabled: true,
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0.01,
        replaysOnErrorSampleRate: 1.0,
        enableLogs: true,
        debug: false,
        beforeSend(event) {
          // Vérifier à nouveau le consentement avant l'envoi
          const currentConsent = sessionStorage.getItem('cookieConsent');
          if (currentConsent) {
            try {
              const consent = JSON.parse(currentConsent);
              if (!consent.analytics) {
                return null; // Bloquer l'envoi si le consentement a été révoqué
              }
            } catch (error) {
              console.warn('Erreur lors de la vérification du consentement:', error);
              return null; // Bloquer en cas d'erreur
            }
          }
          return event;
        },
      });

      isInitialized.current = true;
      console.log('🔍 Sentry activé avec consentement des cookies');
    } else if (!isAnalyticsAccepted() && isInitialized.current) {
      // Désactiver Sentry si le consentement est révoqué
      Sentry.close();
      isInitialized.current = false;
      console.log('🔍 Sentry désactivé - consentement des cookies révoqué');
    }
  }, [isAnalyticsAccepted, isLoaded]);

  // Fonction pour capturer des erreurs de manière conditionnelle
  const captureError = (error: Error, context?: any) => {
    if (isAnalyticsAccepted()) {
      Sentry.captureException(error, context);
    } else {
      console.log('🔍 [COOKIES] Erreur non capturée - consentement refusé:', error);
    }
  };

  // Fonction pour capturer des messages de manière conditionnelle
  const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
    if (isAnalyticsAccepted()) {
      Sentry.captureMessage(message, level);
    } else {
      console.log(`🔍 [COOKIES] Message ${level} non capturé - consentement refusé:`, message);
    }
  };

  // Fonction pour définir le contexte utilisateur de manière conditionnelle
  const setUser = (user: Sentry.User | null) => {
    if (isAnalyticsAccepted()) {
      Sentry.setUser(user);
    }
  };

  // Fonction pour définir le contexte de manière conditionnelle
  const setContext = (name: string, context: Record<string, any>) => {
    if (isAnalyticsAccepted()) {
      Sentry.setContext(name, context);
    }
  };

  // Fonction pour démarrer une transaction de manière conditionnelle
  const startTransaction = (options: any) => {
    if (isAnalyticsAccepted()) {
      // Utiliser getCurrentHub pour créer une transaction
      try {
        const hub = (Sentry as any).getCurrentHub?.();
        if (hub?.startTransaction) {
          return hub.startTransaction(options);
        }
      } catch (error) {
        console.warn('Impossible de démarrer une transaction Sentry:', error);
      }
    }
    // Retourner un objet mock si Sentry n'est pas activé
    return {
      finish: () => {},
      setTag: () => {},
      setData: () => {},
    } as any;
  };

  return {
    isEnabled: isAnalyticsAccepted(),
    isLoaded,
    captureError,
    captureMessage,
    setUser,
    setContext,
    startTransaction,
  };
}
