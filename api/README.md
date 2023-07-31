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
