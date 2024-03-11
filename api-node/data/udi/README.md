# Unité de Distribution Informatique (UDI)

Pour l'indicateur "eau du robinet", nous avons des résultat par "Unité de Distribution Informatique" (UDI) disponibles soit en opendata via un CSV (https://www.data.gouv.fr/fr/datasets/resultats-du-controle-sanitaire-de-leau-du-robinet/ ou https://www.data.gouv.fr/fr/datasets/resultats-du-controle-sanitaire-de-leau-distribuee-commune-par-commune/) soit via l'api Hub'eau (https://hubeau.eaufrance.fr/page/api-qualite-eau-potable#/qualite_eau_potable/communes)

## Enregistrement des UDIS dans la base de données

Le processus que nous proposons est le suivant:

Dans un premier temps nous récupérons les données géographiques des UDI via une requête authentifiée (et paramétrée pour avoir la France entière en coordonnées GPS) vers https://telecarto.atlasante.fr/DOWNLOAD qui téléchargera le fichier GeoJSON correspondant.

Puis nous traduisons les fichiers .json en .sql : `ogr2ogr -f "PGDump" -t_srs EPSG:4326 -nln "udis" output.sql ./dgs_metropole_udi_2022_j.json` par exemple

	•	`udis` est le nom de la table dans notre base de données (pas de uppercase possible)
	•	`-t_srs EPSG:4326` : pour spécifier le SRID (Spatial Reference Identifier) de la géographie à importer. Ici, 4326 correspond au système de coordonnées WGS 84 (GPS).

Enfin nous enregistrons les données dans notre base de données: `psql "postgresql://recosante:{password}@localhost:5442/recosante" -f bretagne.sql` par exemple

## Requête pour obtenir les UDIS en fonction de coordonnées

ATTENTION: les coordonnées doivent être dans un format RGF93 / Lambert 93 et non GPS (il y a donc une conversion à faire entre le GPS renvoyé par les téléphones et les coordonnées utilisées pour requêter la base de données)

Ensuite, la requête sera de type (exemple pour un point au pif dans Brest)

```
SELECT code_udi
FROM Udis
WHERE ST_Within(
    ST_SetSRID(ST_MakePoint(-4.52345, 48.39704), 4326),
    wkb_geometry
);
```

Cette requête signifie :
	1.	`SELECT code_udi FROM Udis`: Sélectionnez le champ `code_udi` de la table ﻿Udis.
	2.	`ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)`: Créez un point géographique avec les coordonnées GPS fournies (en remplaçant `longitude` et `latitude` par les coordonnées réelles) dans le système de référence de coordonnées WGS 84 (EPSG: 4326).
	3.	`ST_Within( ..., wkb_geometry)`: Vérifiez si le point converti est à l'intérieur de la géométrie `wkb_geometry` de chaque enregistrement de la table `Udis`.