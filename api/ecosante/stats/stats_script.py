import os
import json
import requests
from datetime import datetime
from calendar import different_locale, month_name

# Assuming you've imported other necessary dependencies from the original file as well.

MATOMO_API_URL = os.getenv("MATOMO_API_URL")
if MATOMO_API_URL is None:
    raise Exception("MATOMO_API_URL environment variable is required")

# ... Include the rest of your auxiliary functions like get_month_name, different_locale, etc. ...


def stats_web():
    matomo_api_url = os.getenv("MATOMO_API_URL")
    if matomo_api_url is None:
        raise Exception("MATOMO_API_URL var env is required")
    start_date = '2021-02-01'
    new_version_start_date = '2022-01-01'
    switch_date_iframe_onscreen_event = datetime(2023, 9, 1).date()
    switch_date_iframe_onscreen_event_string = switch_date_iframe_onscreen_event.strftime('%Y-%m-%d')
    # Nombre total de visites
    total_visits = 0
    try:
        request = requests.get(
            f"{matomo_api_url}&method=VisitsSummary.getVisits&period=range&date={start_date},today",
            timeout=10
        )
        request.raise_for_status()
        total_visits = request.json().get('value', 0)
    except Exception as exception:
        print("Error relative to Matomo API: %s", exception)
    # Nombre de visites mensuelles
    monthly_visits = {}
    try:
        request = requests.get(
            f"{matomo_api_url}&method=VisitsSummary.getVisits&period=month&date={start_date},today",
            timeout=10
        )
        request.raise_for_status()
        MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        monthly_visits = {f"{MONTHS_FR[datetime.strptime(m, '%Y-%m').month - 1]} {datetime.strptime(m, '%Y-%m').year}": v for m, v in request.json().items()}
    except Exception as exception:
        print("Error relative to Matomo API: %s", exception)
    # Nombre de visites mensuelles sur le tableau de bord
    place_monthly_visits = {}
    try:
        request = requests.get(
            # pylint: disable-next=line-too-long
            f"{matomo_api_url}&method=Actions.getPageUrls&period=month&date={start_date},today&filter_column=label&filter_pattern=^place$",
            timeout=10
        )
        request.raise_for_status()
        MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        place_monthly_visits = {f"{MONTHS_FR[datetime.strptime(m, '%Y-%m').month - 1]} {datetime.strptime(m, '%Y-%m').year}": (next(iter(v), {})).get('nb_visits', 0) for m, v in request.json().items()}

    except Exception as exception:
        print("Error relative to Matomo API: %s", exception)
    # Le site a beaucoup évolué entre 2021 et 2022
    # ce qui nous oblige à ignorer les stats d'intégration et de referrer antérieures
    # Nombre de visites qui proviennent de l'intégration du widget
    # Cas: après la création de l'event "OnScreen" dans le widget - depuis septembre 2023
    integration_widget = 0
    today_date = datetime.today().date()

    if today_date >= switch_date_iframe_onscreen_event:
        try:
            request = requests.get(
                f"{matomo_api_url}&method=Events.getCategory&category=Widget&secondaryDimension=eventAction&period=range&date={switch_date_iframe_onscreen_event_string},today",
                timeout=10
            )
            request.raise_for_status()
            event_data = request.json()
            for item in event_data:
                if item.get('label') == 'OnScreen' and item.get('events') and item.get('events').get('yes'):
                    integration_widget = item['events']['yes']
        except Exception as exception:
            print(f"Error relative to Matomo API: {exception}")
        else:
            try:
                request = requests.get(
                    # pylint: disable-next=line-too-long
                    f"{matomo_api_url}&method=VisitsSummary.getVisits&period=range&date={new_version_start_date},today&segment=entryPageUrl=@iframe%253D1",
                    timeout=10
                )
                request.raise_for_status()
                integration_widget = request.json().get('value', 0)
            except Exception as exception:
                print("Error relative to Matomo API: %s", exception)
    # Nombre de visites qui proviennent du site web
    integration_website = 0
    try:
        request = requests.get(
            # pylint: disable-next=line-too-long
            f"{matomo_api_url}&method=VisitsSummary.getVisits&period=range&date={new_version_start_date},today&segment=entryPageUrl!@iframe%253D1",
            timeout=10
        )
        request.raise_for_status()
        integration_website = request.json().get('value', 0)
    except Exception as exception:
        print("Error relative to Matomo API: %s", exception)
    # Nombre de visites selon le type de referrer
    # (moteur de rechercher, entrée directe, site web externe, réseaux sociaux, campagne suivie)
    channel_search = 0
    channel_direct = 0
    channel_website = 0
    channel_social = 0
    channel_campaign = 0
    try:
        request = requests.get(
            # pylint: disable-next=line-too-long
            f"{matomo_api_url}&method=Referrers.get&period=range&date={new_version_start_date},today&segment=entryPageUrl!@iframe%253D1",
            timeout=10
        )
        request.raise_for_status()
        channel_search = request.json().get('Referrers_visitorsFromSearchEngines', 0)
        channel_direct = request.json().get('Referrers_visitorsFromDirectEntry', 0)
        channel_website = request.json().get('Referrers_visitorsFromWebsites', 0)
        channel_social = request.json().get('Referrers_visitorsFromSocialNetworks', 0)
        channel_campaign = request.json().get('Referrers_visitorsFromCampaigns', 0)
    except Exception as exception:
        print(f"Error relative to Matomo API: {exception}")
    to_return = {
        "total_visits": total_visits,
        "monthly_visits": json.dumps(monthly_visits),
        "place_monthly_visits": json.dumps(place_monthly_visits),
        "integration_widget": integration_widget,
        "integration_website": integration_website,
        "channel_search": channel_search,
        "channel_direct": channel_direct,
        "channel_website": channel_website,
        "channel_social": channel_social,
        "channel_campaign": channel_campaign,
    }
    return to_return

if __name__ == "__main__":
    stats = stats_web()
    print(json.dumps(stats, ensure_ascii=False))
