# Mail Recosante

Ce projet contient le template Brevo (ex SendInBlue) pour les indicateurs. L'id de ce template correspond à la variable d'environnement `SIB_EMAIL_TEMPLATE_ID`. Il utilise [`panini`](https://www.npmjs.com/package/panini), [`node-sass`](https://www.npmjs.com/package/node-sass) et [`foundation-emails`](https://www.npmjs.com/package/foundation-emails) pour générer le template.

## Développement

Ce projet utilise `node-sass`. Par conséquent certains breaking change sont à prévoir en fonction de votre version de node. La version dans les dépendances est compatible node 18.

### Installation

Pour installer les dépendances, vous pouvez utiliser la commande

```bash
yarn
```

### Lancer le projet

Pour visualiser le template dans votre navigateur, vous pouvez utiliser la commande

```bash
yarn start
```

Une fenêtre de votre navigateur va s'ouvrir sur [http://localhost:3000](http://localhost:3000), naviguez vers [http://localhost:3000/indicateurs.html](http://localhost:3000/indicateurs.html) pour visualiser le rendu.

### Builder le template

```bash
yarn build
```

Il faut ensuite aller le mettre à jour [sur Brevo (ex SendInBlue)](https://my.brevo.com/camp/lists/template)

### Test

Il n'y pas de tests en place. Cependant il existe une tâche gulp d'envoi d'email avec AWS et litmus. La config nécessaire dans `config.json` reste à documenter.

### Lint

Pour lancer le lint, utilisez la commande

```bash
yarn lint
```
