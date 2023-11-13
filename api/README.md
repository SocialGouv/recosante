# Api

## Installation

Nous vous recommandons de commencer votre installation par le service indice pollution [accessible ici](../libs/indice_pollution). Si cela est déjà fait, vous pouvez passer à l'étape suivante.

### Vérification des variables d’environnement

Vous pouvez copier/coller le fichier `.env.example` vers un fichier `.env` ou bien adapter `.env.docker` si vous souhaitez utiliser docker

Changez les variables `SECRET_KEY`, `AUTHENTICATOR_SECRET` `CAPABILITY_ADMIN_TOKEN` et `CAPABILITY_ADMIN_TOKEN` par une chaine de caractères générée de manière aléatoire. Commande

```bash
openssl rand -base64 48
```

Par exemple

Pour `VAPID_PRIVATE_KEY` utilisez la commande

```bash
openssl ecparam -name prime256v1 -genkey -noout
```

Car la librairie attend un format bien spécifique pour envoyer des notifications à l’aide du service https://vapidkeys.com/

Il faut aller chercher une clé d’API send in blue ici https://app.brevo.com/settings/keys/smtp, et la mettre dans la variable `SIB_APIKEY`. Pour cela il faut ajouter votre email beta gouv aux utilisateurs. Attention ! Il n'y a qu'un compte pour tous les environnements. Soyez sur de ce que vous faîtes. Cette variable est optionnelle à part si vous désirez spécifiquement travailler sur les emails.

Ajoutez maintenant des adresses mails séparées par des espaces qui auront accès à l’interface d’administration dans la variable `ADMINS_LIST`.

### Avec Docker

Pour lancer les différents services vous pouvez utiliser le [`docker-compose` racine](../docker-compose.yml).

### Avec Linux

#### Dépendences système

Les dépendances sont présentes dans le `docker-compose` racine du projet. Soyez sur de les installer en local ou d'utiliser `docker`. Plus d'informations dans le [`README` racice](../README.md).

#### Service externe

Pour envoyer les mails il vout faut un compte https://app.brevo.com/

#### Installation dépendences python

Après avoir cloné ce répertoire vous pouvez installer les dépendences avec la commande

```bash
poetry install
```

#### Initialisation de la base de données

Il faut jouer les migrations de la base de données. Commande

```bash
poetry run flask db upgrade
```

Nota bene. Il faut avoir installé + migré le schéma `indice_schema` de la librairie `indice_pollution` pour que l'API remonte les indicateurs. Plus d'info [ici](../libs/indice_pollution/README.md).

## Démarrage

### Démarrage de l’API web

En développement vous pouvez démarrer l’API web avec la commande

```bash
poetry run flask run
```

Il faudra toutefois régler le problème des variables d'environnement.

### Démarrage des workers

Dans une autre fenêtre vous pouvez lancer les workers avec la commande

```bash
poetry run celery --app ecosante.celery_worker.celery worker -E
```

## Development

### Installation

This project uses [poetry](https://python-poetry.org/). Be sure to install it using

```bash
pip install poetry
```

Then install the dependencies

```bash
poetry install
```

These command will generate a virtual environment in the `.venv` folder with all you need to run everything.

### Run

Once the installation done, be sure to have the required services up and running. You can have a look at [the repository Dockerfile Compose file](../../docker-compose.yml).

It consists mainly of having the local postgres DB running.

Get the URL of your DB (such as `postgresql://postgres:postgres@localhost:5432/recosante` for example).

Then set your env in you terminal.
You can adapt the [`.env.example`](./.env.example) file in a newly created `.env` file that wil l be ignored by `git`. Keep in mind that it won't be automatically sourced and some secrets are kept empty, but you should have the minimum requirements with the example file. If you need secrets for your local env, you can have a look at the secrets storage on rancher.

Also install dotenv-cli package, so that thew environment vairables get loaded: `npm install -g dotenv-cli`

Once everything is ready, you can start the worker locally with the `start_all_local.sh` files in the project. Beware of the `alembic` migration.

To stop everything, warn shutdown is `CTRL+C` and hard shutdown is `CTRL+Z`.

If you want to run a custom script such as `/libs/indice_pollution/send_newsletter.py`, you can do: `dotenv -f .env run /bin/sh -c "python ./send_newsletter.py"`
You MIGHT have a problem with environment variable on first run (like `[2023-11-09 12:32:56,044: ERROR/ForkPoolWorker-8] The following env var is required: PORTAL_API_METEOFRANCE_API_KEY`). Just re-run the script it it could work :). Magic python.

## Tests

Pour lancer les tests, sourcez le ficher `.env.example` ou votre `.env`, assurez vous d'avoir lancé les dépendances nécessaires dans le `docker-compose` racine et utilisez la commande

```bash
poetry run pytest .
```

ou

```
./start_tests.sh
```

## Lint

Pour lancer le lint, utilisez la commande

```bash
yarn lint
```

ou

```
./start_lint.sh
```
