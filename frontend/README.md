# Recosanté - Site Web

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

## Personnalisation via variable d’environnement

La variable d’environnement`GATSBY_API_BASE_URL` permet de personnaliser l’URL de base de l’API Recosanté à laquelle se connecter (par défaut : https://api.recosante.beta.gouv.fr)

## Développement

### Installation

Pour installer les dépendances, vous pouvez utiliser la commande

```bash
yarn
```

### Lancer le projet

Pour lancer le serveur de développement, vous pouvez utiliser la commande

```bash
yarn start
```

Naviguez vers [http://localhost:8000](http://localhost:8000) pour visualiser le rendu.

### Builder le projet

```bash
yarn build
```

### Lancer en mode production

Une fois le build effectué, lancer la commande

```bash
yarn serve
```

### Test

Il n'y pas de tests en place.

### Lint

Pour lancer le lint, utilisez la commande

```bash
yarn lint
```

Le lint n'utilise que `prettier` car gatsby s'occupe du lint `eslint`.
