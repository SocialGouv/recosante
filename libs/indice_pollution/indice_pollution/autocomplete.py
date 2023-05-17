import requests


def autocomplete(query_string):
    headers = {
        'Accept': 'application/json'
    }
    params = {
        'nom': query_string,
        'fields': 'nom,code,codesPostaux',
        'format': 'json',
        'boost': 'population'
    }
    request = requests.get(
        "https://geo.api.gouv.fr/communes",
        params=params,
        headers=headers,
        timeout=10,
    )

    request.raise_for_status()

    return request.json()
