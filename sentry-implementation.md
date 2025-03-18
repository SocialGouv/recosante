# Implémentation de Sentry dans le projet Recosanté

Ce document présente un aperçu de l'implémentation de Sentry dans les différents composants du projet.

## 1. api-node (API Node.js)

**Packages utilisés**
- `@sentry/node` (version 7.84.0+)
- `@sentry/tracing` (version 7.84.0+)

**Configuration**
- Initialisé dans `src/index.ts` et `src/cronjobs/index.ts`
- DSN: `https://3451d3d9799d44d59ef0e63eb0f2cdf7@sentry.fabrique.social.gouv.fr/95`
- Activé uniquement en production (désactivé en développement et test)

**Fonctionnalités**
- Middleware Express pour la capture des requêtes et des erreurs
- Traçage des performances avec `Sentry.Integrations.Http` et `Sentry.Integrations.Express`
- Utilitaire personnalisé `capture()` dans `src/third-parties/sentry.ts`
- Contexte utilisateur et tags pour les versions d'application, l'appareil, et la route courante
- Endpoint de test `/sentry-check`

## 2. api (API Python)

**Packages utilisés**
- `sentry-sdk` (version 1.24.0)

**Configuration**
- Initialisé dans `wsgi.py` et `celery_worker.py`
- Activation conditionnelle basée sur la variable d'environnement `SENTRY_DSN`

**Intégrations**
- `FlaskIntegration` pour Flask
- `CeleryIntegration` pour Celery
- `RedisIntegration` pour Redis

**Utilisation**
- `capture_event` dans `pages/blueprint.py`

## 3. frontend-next (Next.js) et frontend (Gatsby)

Aucune implémentation de Sentry n'a été trouvée dans ces composants frontend.
