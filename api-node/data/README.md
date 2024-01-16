# Note explicative quant aux données disponibles sur ce repo Github

## Municipalités

### Liste des communes fournie par l'INSEE

La liste des communes est tirée du "INSEE - Code officiel géographique au 1er janvier 2023" sur https://www.insee.fr/fr/information/6800675.

Le lien de téléchargement est le suivant: https://www.insee.fr/fr/statistiques/fichier/6800675/v_commune_2023.csv.

La conversion vers `./municipalities.json` a été faite avec le service fourni par https://csvjson.com/csv2json.

### Liste des EPCI fournie par l'INSEE

Les établissements publics de coopération intercommunale (EPCI) sont des regroupements de communes. Il s'agit des communautés urbaines, des communautés d'agglomération, des communautés de communes et des métropoles. Seuls ces EPCI sont disponibles dans les résultats. Les syndicats de communes et les syndicats mixtes sont des EPCI sans fiscalité propre. Les métropoles d'Aix-Marseille-Provence et du Grand Paris sont deux métropoles à statut particulier. La métropole de Lyon, créée par la loi MAPTAM, est une collectivité territoriale et non une intercommunalité. Elle n'est donc pas une métropole au sens de la loi de 2010. Elle est intégrée dans ce fichier aux EPCI avec une nature spécifique (METLYON).

La liste des EPCI est tirée de "INSEE - Intercommunalité - Téléchargement des fichiers relatifs aux EPCI à fiscalité propre et aux EPT" sur https://www.insee.fr/fr/information/2510634.

Le lien de téléchargement est le suivant: https://www.insee.fr/fr/statistiques/fichier/2510634/Intercommunalite_Metropole_au_01-01-2023.zip.

Ce .zip contient un fichier Excel contenant diverses définitions, et quatre tabs:
- EPCI: avec les colonnes `EPCI - Métropole`,	`Libellé de l'EPCI / Métropole`,`Nature d'EPCI`, `Nombre communes`
- **Composition_communale**: c'est la tab qui nous intéresse, avec les colonnes `Code géographique` (Code INSEE de la commune),	`Libellé géographique`,	`EPCI - Métropole` (code EPCI),	`Libellé de l'EPCI / Métropole`,	`Département` et `Région`
- Variables
- Documentation

On extrait donc en .csv la tab `Composition_communale`, puis on produit le fichier `./epci.json` avec le service fourni par https://csvjson.com/csv2json.

Ainsi, lorsqu'un indicateur est disponible au niveau EPCI, il est possible de le calculer au niveau commune en faisant correspondre les codes géographiques.