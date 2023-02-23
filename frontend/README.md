# Recosanté

## Présentation

Recosanté (recosante.beta.gouv.fr) propose un service d’information sur la santé environnement organisé en trois supports :

1. Un tableau de bord pour accéder aux indicateurs sur la qualité de l’environnement autour de soi, intégrable par les sites partenaire.
2. Un service d’abonnement aux indicateurs, au quotidien ou en cas de vigilance pour connaître la qualité de son environnement.
3. Une lettre d’information hebdomadaire pour comprendre son environnement et mieux se protéger.

Aujourd’hui, les données intégrées au service sont :
- l’indice national de qualité de l’air ATMO ;
- le risque d’allergie d’exposition aux pollens ;
- la vigilance météo ;
- l’indice UV ;
- le potentiel radon ;
- la qualité des eaux de baignades.

Pour en savoir davantage, consultez la fiche produit : https://beta.gouv.fr/startups/recosante.html

## Structure du site web

Le site web est structuré de la manière suivante :
- une page d’accueil donnant accès aux tableaux de bord communaux (6 indicateurs et recommandations associées) et au parcours d’inscription
- des pages annexes dont nos statistiques d’usage
- des pages article reprenant le contenu des lettres d’information hebdomadaires
- des pages d’information sur les données
- une page d’intégration du widget
- des landing pages ciblées
- une page d’édition de son profil accessible via lien magique

La technologie employée nous permet de mêler des pages générées statiquement (pages invariantes et pages des communes de plus de 20 000 habitants) à celles générées dynamiquement (pages des communes de moins de 20 000 habitants car plus rarement recherchées).

## Organisation des dépôts

Le code source de Recosanté est organisé en 4 dépots :
- [recosante](https://github.com/betagouv/recosante) : celui-ci soit le dépôt de l’application web front-end
- [recosante-api](https://github.com/betagouv/recosante-api) : le dépôt de l’application back-end principale (API, envoi d’emails / notifications)
- [indice_pollution](https://github.com/betagouv/indice_pollution) : le dépôt de l’application back-end secondaire d’import des données
- [recosante-mail](https://github.com/betagouv/recosante-mail) : le dépôt dédié aux templates email

## Stack technique

Notre stack technique est principalement composée de :
- front-end : React, Gatsby.
- back-end : Python, Flask, Celery / Redis, PostgreSQL.
- hébergement et autres services : Gatsby Cloud, PaaS Clever Cloud, Sendinblue.

## Installation et lancement du front-end en développement

`yarn` ou `yarn install` permet d’installer l’application front-end.

`yarn start` permet de lancer l’application en développement avec rechargement à chaud sur http://localhost:8000.

`yarn build` permet de construire une application de production (effectué automatiquement sur Clever Cloud à partir du code source).

`yarn serve` permet de lancer l’application de production (effectué automatiquement sur Clever Cloud à partir du code source).

De manière à conserver un projet consistant selon les différents environnement d’exécution, nous partageons à la fois les fichiers `package.json` et `yarn.lock`.

## Personnalisation via variable d’environnement

La variable d’environnement`GATSBY_API_BASE_URL` permet de personnaliser l’URL de base de l’API Recosanté à laquelle se connecter (par défaut : https://api.recosante.beta.gouv.fr) 

## Contribution au front-end et deploiement continu

Chaque contribution fonctionnelle se fait sous la forme de pull-requests.

A chaque création et mise à jour de pull-request, une nouvelle version de l’application est déployée chez Gatsby Cloud dans un environnement de démo (preview) qui lui est propre.

Une fois la pull-request validée, le merge dans la branche master va déclencher le déploiement dans notre environnement de production chez Clever Cloud sans interruption de service (durée de moins de 10 minutes).
