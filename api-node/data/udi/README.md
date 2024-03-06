# Unité de Distribution Informatique (UDI)

Pour l'indicateur "eau du robinet", nous avons des résultat par "Unité de Distribution Informatique" (UDI) disponibles soit en opendata via un CSV (https://www.data.gouv.fr/fr/datasets/resultats-du-controle-sanitaire-de-leau-du-robinet/ ou https://www.data.gouv.fr/fr/datasets/resultats-du-controle-sanitaire-de-leau-distribuee-commune-par-commune/) soit via l'api Hub'eau (https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/communes)

## Enregistrement des UDIS dans la base de données

Le processus que nous proposons est le suivant:

Dans un premier temps nous récupérons les données géographiques des UDI via le projet https://gitlab.com/data-challenge-gd4h/localis-eau/-/tree/main/data/raw/udi_shape

Puis nous traduisons les fichiers .shp en .sql : `shp2pgsql -I -s 2154 ars_r53_bretagne_udi_couche_vivante.shp Udis > bretagne.sql` par exemple,

	•	`Udis` est le nom de la table dans notre base de données
	•	`-I` : Cette option ordonne à `shp2pgsql` de créer un index GiST (Generalized Search Tree) sur la colonne de géométrie. Cet index améliore considérablement les performances lors de l'exécution de requêtes spatiales.
	•	`-s 4326` : L'option `-s` est utilisée pour spécifier le SRID (Spatial Reference Identifier) de la géographie à importer. `2154` fait référence au système de coordonnées Lambert 93 (EPSG:2154), qui est un système de référence pour les coordonnées géographiques en France.

ENfin nous enregistrons les données dans notre base de données: `psql "postgresql://recosante:{password}@localhost:5442/recosante" -f bretagne.sql` par exemple

## Requête pour obtenir les UDIS en fonction de coordonnées

ATTENTION: les coordonnées doivent être dans un format RGF93 / Lambert 93 et non GPS (il y a donc une conversion à faire entre le GPS renvoyé par les téléphones et les coordonnées utilisées pour requêter la base de données)

Ensuite, la requête sera de type (exemple pour un point au pif dans Brest)

```
SELECT ins_code
FROM Udis
WHERE ST_Within(
    ST_Transform(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326), 2154),
    geom
);
```

Cette requête signifie :
	1.	`SELECT ins_code FROM Udis`: Sélectionnez le champ `ins_code` de la table ﻿Udis.
	2.	`ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)`: Créez un point géographique avec les coordonnées GPS fournies (en remplaçant `longitude` et `latitude` par les coordonnées réelles) dans le système de référence de coordonnées WGS 84 (EPSG: 4326).
	3.	`ST_Transform(..., 2154)`: Convertissez les coordonnées de ce point du système WGS 84 en Lambert 93 (EPSG: 2154). Le point en Lambert 93 peut maintenant être comparé aux géométries dans la table `Udis`.
	4.	`ST_Within( ..., geom)`: Vérifiez si le point converti est à l'intérieur de la géométrie `geom` de chaque enregistrement de la table `Udis`.