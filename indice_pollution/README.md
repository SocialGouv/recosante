# Indice pollution

This package give you access to air pollution level in France.

You can instantiate a small website with a search bar, to search the air pollution level for a specific city, or you can use it as a lib.

## Website

Make a new virtual environment, and install the package with

```
pip install indice_pollution
```

And then run flask

```
flask run
```

Access it at `http://localhost:5000`

## As a lib


Make a new virtual environment, and install the package with

```
pip install indice_pollution
```

And then you can use it with

```
from indice_pollution import forecast
forecast(75101)
```


## Usage

### Forecast

#### Request

`GET` `/forecast?insee=${insee}`


#### Response

```json
{
  "data": [
    {
      "date":"2020-08-10",
      "date_ech":1597017600000,
      "indice":7,
      "qualif":"M\u00e9diocre",
      "val_no2":0,
      "val_o3":0,
      "val_pm10":0,
      "val_pm25":0,
      "val_so2":0,
      "valeur":7
    }
  ],
  "metadata": {
    "region": {
      "website": "http://www.atmonormandie.fr/",
      "nom": "Normandie",
    }
  }
}

```

##### data

The array may contains several objects. Typically, one for the current day and potentially one forecast object for one or a couple of next days.

- `date` is the date for the forecast provided in `YYYY-MM-DD` format
- `indice` is the general "indice ATMO" as standardized by l'État Français (`1` is good air quality, `10` is terrible air quality)

- (optional) `date_ech` is ?
- (optional) `val_<pollutant>` are each the "indice AMTO" for each pollutant as standardized by l'État Français (`0` is a mistake value)
- (optional) `qualif` is a word qualifying the general "indice ATMO" as standardized by l'État Français. One of `Très bon`, `Bon`, `Moyen`, `Médiocre`, `Mauvais`, 
- (optional) `valeur`. Same thing than `indice`

 ##### metadata
 
Currently, it only has a `region` property. This property is an object with: 
- `nom` France Région name
- `website` corresponding AASQUA website



## Test

A test instanced is deployed at https://app-ed2e0e03-0bd3-4eb4-8326-000288aeb6a0.cleverapps.io/

Query example: https://app-ed2e0e03-0bd3-4eb4-8326-000288aeb6a0.cleverapps.io/forecast?insee=76717






