# Recosante

Recosante : Un service public numérique de recommandations d'actions pour réduire l'impact de l'environnement sur sa santé.

Accessible sur https://recosante.beta.gouv.fr/

Ce dépôt est un monorepo créé pour faciliter le déploiement sur l'infrastructure de la [Fabrique numérique des ministères sociaux](https://fabrique.social.gouv.fr).

Les sous-dossiers ont été repris du travail effectué par l'équipe dédiée de beta.gouv.fr, à partir des dépôts suivant :

- https://github.com/betagouv/recosante : frontend
- https://github.com/betagouv/recosante-api : data, envoi des emails
- https://github.com/betagouv/recosante-mail : templates email
- https://github.com/betagouv/indice_pollution : import des indices et utilisation via l’API

## Brève description

Recosanté est composé de trois services :

- Une API d’exposition des indicateurs qui est dans ce dépot, techniquement il s’agit d’une API écrite en python avec le framework Flask.
  Cette API sert aussi à gérer les abonnements au service.

- Un service qui envoie les newsletters, techniquement c’est un worker celery qui est passe toutes les heures pour voir s’il doit envoyer des mails ou bien des notifications web.

- Un service qui sauvegarde les différents indices (indice ATMO, épisodes de pollution, Risque d'allergie lié à l'exposition aux pollens (RAEP), vigilance météo, indice UV). Le code de ce service se trouve [ici](./libs/indice_pollution).

Les données sont stockées dans une base de données postgresql, dans le schéma public pour les données d’abonnements, et dans le schéma `indice_schema` pour les données de prévisions des différents indices renvoyés.

## Structure et projets

### indice_pollution

Ce projet utilise [`celery`](https://docs.celeryq.dev/en/stable/index.html) pour interroger différentes API (AirParif, indice ATMO régionaux, ...) et alimenter sa propre base de données (shema `indice_schema`) toutes les heures.

Il s'exporte de plus comme une librairie utilisable par nimporte quel projet.

Plus d'information dans le [`README.md`](./libs/indice_pollution/README.md) du projet.

### api

Ce projet utilise également [`celery`](https://docs.celeryq.dev/en/stable/index.html) pour générer des envois de mails aux utilisateurs ayant souscrit à la newsletter via Brevo (ex sendInBlue). Il contient une API [`flask`](https://flask.palletsprojects.com/en/2.3.x/) qui sert la data nécessaire au site web. Il comporte un schema propre lui permettant de stocker les utilisateurs, newsletters et incriptions. Il utilise enfin la librarie `indice_pollution` pour interroger le schema `indice_schema`.

Plus d'information dans le [`README.md`](./api/README.md) du projet.

### frontend

Ce projet est le site recosanté. Il utilise [Gatsby](https://www.gatsbyjs.com/).

Plus d'information dans le [`README.md`](./frontend/README.md) du projet.

### mail

Ce projet contient les templates mails utilisés par Brevo (ex sendInBlue).

Plus d'information dans le [`README.md`](./mail/README.md) du projet.

### Stack technique

Notre stack technique est principalement composée de :

- front-end : React, Gatsby.
- back-end : Python, Flask, Celery / Redis, PostgreSQL.
- hébergement et autres services : Docker, Kubernetes, Brevo (ex Sendinblue).

### shema simplifié d'architecture

```mermaid
flowchart TD
    subgraph Internet
        user[Utilisateur]
        brevo["Brevo (Ex SendInBlue)"]
        subgraph apis[APIs externes]
            atmo[API ATMO data par région]
            airparif[API AirParif]
            ftp[FTP clever cloud]
        end
    end

    subgraph Azure
        subgraph Kubernetes
            frontend[Service FrontEnd]
            flower["Service Flower (Celery UI)"]
            redis[Sevice Redis]
            subgraph serviceAPI[Service API]
                api[API]
                celeryAPI[Celery]
                indiceLib[Librairie Indice pollution]
            end

            subgraph serviceIndice[Service Indice pollution]
                indice[Indice pollution]
                celeryIndice[Celery]
            end
        end

        subgraph PostgreSQL
            apiSchema[API Schema]
            indiceSchema[Indice Schema]
        end
    end

    user-->|consulte|frontend
    user-->|no auth|api
    user-->|basic-auth|flower
    flower-->redis
    celeryAPI-->redis
    celeryIndice-->redis
    frontend<-->|data|serviceAPI
    serviceAPI<-->|data|apiSchema
    brevo<-->|sync + gestion mails|celeryAPI
    celeryIndice-->|synchro toutes les heures|indiceSchema
    apis-->|data|celeryIndice
    indiceSchema-->|requêtes|indiceLib
    indiceLib-->|requêtes|api
```

## Développement

### Requirements

Le projet est basé sur les outils suivant

```
# Environnements conteneurisés
docker
docker-compose

# Projets python
python
pip
poetry

# Projets JavaScript
node
npm
yarn
```

Si vous souhaitez lancer le projet en local, nous vous invitons à installer tous ces binaires et à les avoir diponibles dans le `PATH` de votre terminal.

### Lancer tous les services

Tous les services peuvent être lancés via la commande

```bash
yarn start
```

ou

```bash
docker-compose up
```

### Lancer les services en local

Merci de vous référer au `README.md` de chaque projet que vous souhaitez lancer en local. Gardez en mémoire que ces projets ont besoin d'autres services pour fonctionner (base de données, redis...). Afin de lancer en local le minimum nécessaire à l'exécution de chaque projet, vous pouvez utiliser la commande

```bash
yarn up
```

### Stopper les conteneurs

A tout moment, vous pouvez stopper les conteneurs docker via les commandes

```bash
yarn stop
```

ou

```bash
docker-compose stop
```

Stoppera les conteneurs

```bash
yarn down
```

ou

```bash
docker-compose down
```

Stoppera et supprimera les conteneurs

Les volumes bases de données seront conservés. Si vous souhaitez les supprimer, veuillez le faire manuellement avec `docker volume`.

### Tester

Afin d'exécuter les tests unitaires, merci de vous référer au `README.md` de chaque projet afin de préparer les variables d'environnement nécessaires. Une fois les instructions complétées, vous pouvez utiliser la commande

```bash
yarn test
```

à la racine du projet.

### Linter

Afin d'exécuter le lint, merci de vous référer au `README.md` de chaque projet afin de préparer les dépendances nécessaires. Une fois les instructions complétées, vous pouvez utiliser la commande

```bash
yarn lint
```

Le projet utilise [pylint](https://github.com/pylint-dev/pylint). Pour autoformatter votre code avec `vsCode`, nous vous conseillons les extensions suivantes

- [Pylint](https://github.com/microsoft/vscode-pylint)
- [Pylance](https://github.com/microsoft/pylance-release)
- [isort](https://github.com/microsoft/vscode-isort)
- [autopep8](https://github.com/microsoft/vscode-autopep8)

`Nota Bene`

Lorsque vous développez sur la librairie `indice_pollution` ou sur l'`api`, vous devez utiliser leur virtual environnement respectifs. Cela peut être fait sous vscode en utilisant la commande `command + shift + p`, puis `Python: Select Interpreter` et choisir celui que vous souhaitez dans la liste afin que les dépendances soient résolues correctement.

Il faut que les `.venv` des projets soient installés avec `poetry` pour que `vsCode` les détecte. Merci de vous référer aux `README.md` de chaque projet.

`pylint` va vérifier l'ordre des imports. Pour les formatter automatiquement, nous vous conseillons d'utiliser `isort`. Cependant, il y a une limitation d'`isort` considérant les répertoires locaux comme des libraries. Vous pouvez lui spécifier de la configuration via vos settings `vsCode` (`settings.json` racine ou workspace).

```json
{
  "isort.args": [
    "--known-local-folder",
    "ecosante",
    "--known-local-folder",
    "tests"
  ]
}
```

Pour l'`api`

```json
{
  "isort.args": ["--known-local-folder", "indice_pollution"]
}
```

Pour la librairie `indice_pollution`

## Contribution et deploiement continu

Chaque contribution fonctionnelle se fait sous la forme de pull-requests.

A chaque création et mise à jour de pull-request, une nouvelle version de l’application est déployée sur le cluster kubernetes de la fabrique dans un environnement de démo (preview) qui lui est propre.

Une fois la pull-request validée, le merge dans la branche master va déclencher le déploiement dans l'environnement de pré-production sans interruption de service.

Pour déployer en production, une task github est disponible.

## Licence

Apache 2.0 - Direction du numérique des ministère sociaux.

Voir [LICENSE](./LICENSE)
