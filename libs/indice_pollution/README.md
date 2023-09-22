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

These command will generate a virtual environment in the `.venv` folder with all you need to run the `celery` worker.

### Run

Once the installation done, be sure to have the required services up and running. You can have a look at [the repository Dockerfile Compose file](../../docker-compose.yml).

Then set your env in you terminal. You can source / adapt the [`.env.example`](./.env.example) file or even create your `.env` file. Keep in mind that it won't be automatically sourced and some secrets are kept empty, but you should have the minimum requirements with the example file. If you need secrets for your local env, you can have a look at the secrets storage on rancher.

Once everything is ready, you can start the worker locally with the `start_*.sh` files in the project. Beware of the `alembic` migration.

### Test

There is currently no test in this project. PRs are welcome !

### Lint

To launch lint over source code, please use the command

```bash
yarn lint
```

or

```
./start_lint.sh
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
      "date": "2020-08-10",
      "date_ech": 1597017600000,
      "indice": 7,
      "qualif": "M\u00e9diocre",
      "val_no2": 0,
      "val_o3": 0,
      "val_pm10": 0,
      "val_pm25": 0,
      "val_so2": 0,
      "valeur": 7
    }
  ],
  "metadata": {
    "region": {
      "website": "http://www.atmonormandie.fr/",
      "nom": "Normandie"
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
