# TODO

## Doc

- doc rapide de l'architecture (api et workers, front, SIB, etc.)
- doc du modèle de données
- doc de prise en main et dev en local (start /tests)

## Dev

- cleanup code python et gestion des paquets
  - locker tout ça en passant à poetry et supprimer les setup.py / setup.cfg (utiliser les fichiers requirements dumpés d'une prod fonctionnelle via pip freeze)
  - faire un mono repo python-compatible, qui link le code d'indice_pollution dans l'api recosante sans publier le paquet python
- docker-compose fonctionnel qui permet de tout lancer en local

## Lint/autoformat/etc.

- à setuper pour back et front

## Tests

- intégrer les tests dans la CI
- compléter ?
- ajouter tests e2e

## Perf

- docker
  - améliorer les images docker python (optim via multi stage + viretualenv)
  - optimiser images node
  - check rootless
- intégrer l'index SQL pour l'api /stats/emails `CREATE INDEX idx_newsletter_appliquee ON public.newsletter USING btree (appliquee)` dans une migration alembic

## Monitoring

- utiliser un compte healthchecks.io (gratuit opensource) pour monitorer les crons ?
- script python check_newsletter.py à refaire marcher

## Data

- supprimer l'historique ancien des grosses tables (notamment dans indice_schema.indiceATMO de plus de 70M de lignes)
