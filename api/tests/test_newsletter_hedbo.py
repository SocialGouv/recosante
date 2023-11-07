from datetime import date, timedelta

from psycopg2.extras import DateRange

from ecosante.inscription.models import Inscription
from ecosante.newsletter.models import (Newsletter, NewsletterDB,
                                        NewsletterHebdoTemplate)


def test_get_templates(templates):
    _ = templates
    last_t = None
    for template in NewsletterHebdoTemplate.get_templates():
        if last_t:
            assert last_t.ordre <= template.ordre
        last_t = template


def test_next_template_first(inscription, templates):
    _ = templates
    assert NewsletterHebdoTemplate.next_template(inscription) is not None


def test_next_template(db_session, inscription, templates):
    template = min(templates, key=lambda t: t.ordre)
    newsletter = Newsletter(inscription=inscription,
                            newsletter_hebdo_template=template)
    db_session.add(NewsletterDB(newsletter))

    assert NewsletterHebdoTemplate.next_template(
        inscription).ordre > template.ordre


def test_next_template_last(db_session, inscription, templates):
    for template in templates:
        newsletter = Newsletter(inscription=inscription,
                                newsletter_hebdo_template=template)
        db_session.add(NewsletterDB(newsletter))

    assert NewsletterHebdoTemplate.next_template(inscription) is None


def test_hebdo_notification_web(db_session, inscription, templates):
    _ = templates
    inscription.indicateurs_media = ['notification_web']
    db_session.add(inscription)
    db_session.commit()

    assert len(list(Newsletter.export(type_='hebdomadaire'))) == 1


def test_hebdo_en_dehors_periode_validite(db_session, templates, inscription):
    for template in templates:
        # pylint: disable-next=protected-access
        template._periode_validite = DateRange(
            date.today() + timedelta(days=1),
            date.today() + timedelta(days=31)
        )
        db_session.add(template)
    db_session.commit()

    assert NewsletterHebdoTemplate.next_template(inscription) is None
    assert len(list(Newsletter.export(type_='hebdomadaire'))) == 0


def test_next_template_criteres(db_session, templates, inscription):
    for template in templates:
        template.activites = ["menage"]
        db_session.add(template)
    db_session.add(inscription)
    db_session.commit()

    assert NewsletterHebdoTemplate.next_template(inscription) is None
    assert len(list(Newsletter.export(type_='hebdomadaire'))) == 0

    inscription.activites = ["menage"]
    assert NewsletterHebdoTemplate.next_template(inscription) is not None
    assert len(list(Newsletter.export(type_='hebdomadaire'))) > 0


def test_hebdo_periode_validite_default(db_session, templates):
    db_session.add_all(templates)
    db_session.commit()
    template = templates[0]
    assert template.filtre_date(date.today().replace(month=1, day=12))
    assert template.filtre_date(date.today().replace(month=1, day=1))
    assert template.filtre_date(date.today().replace(month=12, day=31))


def test_periode_validite_contains_periode_validite_one_month(db_session, templates):
    template = templates[0]
    # pylint: disable-next=protected-access
    template._periode_validite = DateRange(date(2022, 1, 1), date(2022, 2, 1))
    db_session.add(template)
    db_session.commit()

    assert not template.filtre_date(date.today().replace(month=1, day=1))
    assert not template.filtre_date(date.today().replace(month=1, day=10))
    assert not template.filtre_date(date.today().replace(month=1, day=31))


def test_periode_validite_contains_periode_validite_two_month(db_session, templates):
    template = templates[0]
    # pylint: disable-next=protected-access
    template._periode_validite = DateRange(date(2022, 7, 1), date(2022, 9, 1))
    db_session.add(template)
    db_session.commit()

    for month in [7, 8]:
        assert not template.filtre_date(
            date.today().replace(month=month, day=1))
        assert not template.filtre_date(
            date.today().replace(month=month, day=10))
        assert not template.filtre_date(
            date.today().replace(month=month, day=31))


def test_chauffage(template, inscription):
    template.chauffage = []
    assert template.filtre_criteres(inscription) is True
    inscription.chauffage = ["bois"]
    assert template.filtre_criteres(inscription) is True

    template.chauffage = ["bois"]
    inscription.chauffage = None
    assert template.filtre_criteres(inscription) is False
    inscription.chauffage = ["bois"]
    assert template.filtre_criteres(inscription) is True

    template.chauffage = ["bois", "chaudiere"]
    inscription.chauffage = None
    assert template.filtre_criteres(inscription) is False
    inscription.chauffage = ["bois"]
    assert template.filtre_criteres(inscription) is True
    inscription.chauffage = ["chaudiere"]
    assert template.filtre_criteres(inscription) is True
    inscription.chauffage = ["chaudiere", "bois"]
    assert template.filtre_criteres(inscription) is True


def test_activites(template, inscription):
    template.activites = []
    assert template.filtre_criteres(inscription) is True
    inscription.activites = ["menage"]
    assert template.filtre_criteres(inscription) is True

    template.activites = ["menage"]
    inscription.activites = None
    assert template.filtre_criteres(inscription) is False
    inscription.activites = ["menage"]
    assert template.filtre_criteres(inscription) is True

    template.activites = ["bricolage"]
    inscription.activites = None
    assert template.filtre_criteres(inscription) is False
    inscription.activites = ["bricolage"]
    assert template.filtre_criteres(inscription) is True

    template.activites = ["jardinage"]
    inscription.activites = None
    assert template.filtre_criteres(inscription) is False
    inscription.activites = ["jardinage"]
    assert template.filtre_criteres(inscription) is True

    template.activites = ["activite_physique"]
    inscription.activites = None
    assert template.filtre_criteres(inscription) is False
    inscription.activites = ["sport"]
    assert template.filtre_criteres(inscription) is True

    template.activites = ["menage", "bricolage", "activite_physique"]
    inscription.activites = None
    assert template.filtre_criteres(inscription) is False
    inscription.activites = ["menage"]
    assert template.filtre_criteres(inscription) is True
    inscription.activites = ["bricolage"]
    assert template.filtre_criteres(inscription) is True
    inscription.activites = ["bricolage", "menage"]
    assert template.filtre_criteres(inscription) is True
    inscription.activites = ["bricolage", "menage", "sport"]
    assert template.filtre_criteres(inscription) is True


def test_enfants(template, inscription):
    template.enfants = None
    assert template.filtre_criteres(inscription) is True
    inscription.enfants = "oui"
    assert template.filtre_criteres(inscription) is True

    template.enfants = True
    inscription.enfants = "non"
    assert template.filtre_criteres(inscription) is False
    inscription.enfants = "oui"
    assert template.filtre_criteres(inscription) is True

    template.enfants = False
    inscription.enfants = "oui"
    assert template.filtre_criteres(inscription) is False
    inscription.enfants = "non"
    assert template.filtre_criteres(inscription) is True


def test_deplacement(template, inscription):
    template.deplacement = []
    assert template.filtre_criteres(inscription) is True
    inscription.deplacement = ["velo"]
    assert template.filtre_criteres(inscription) is True

    template.deplacement = ["velo"]
    inscription.deplacement = None
    assert template.filtre_criteres(inscription) is False
    inscription.deplacement = ["velo"]
    assert template.filtre_criteres(inscription) is True

    template.deplacement = ["velo", "tec"]
    inscription.deplacement = None
    assert template.filtre_criteres(inscription) is False
    inscription.deplacement = ["velo"]
    assert template.filtre_criteres(inscription) is True
    inscription.deplacement = ["tec"]
    assert template.filtre_criteres(inscription) is True
    inscription.deplacement = ["tec", "velo"]
    assert template.filtre_criteres(inscription) is True


def test_animaux_domestiques(template, inscription):
    template.animaux_domestiques = None
    assert template.filtre_criteres(inscription) is True
    inscription.animaux_domestiques = ["chat"]
    assert template.filtre_criteres(inscription) is True

    template.animaux_domestiques = True
    inscription.animaux_domestiques = None
    assert template.filtre_criteres(inscription) is False
    inscription.animaux_domestiques = ["chat"]
    assert template.filtre_criteres(inscription) is True

    template.animaux_domestiques = False
    inscription.animaux_domestiques = ["chat"]
    assert template.filtre_criteres(inscription) is False
    inscription.animaux_domestiques = None
    assert template.filtre_criteres(inscription) is True


def test_deux_criteres(template, inscription):
    template.animaux_domestiques = True
    template.deplacement = ['velo']

    assert template.filtre_criteres(inscription) is False
    inscription.animaux_domestiques = ["chat"]
    assert template.filtre_criteres(inscription) is False
    inscription.deplacement = ["velo"]
    assert template.filtre_criteres(inscription) is True


def test_vraie_vie(templates, inscription, db_session):
    templates = sorted(templates, key=lambda n: n.ordre)
    templates[1].animaux_domestiques = True
    templates[2].enfants = True
    templates[3].chauffage = ["bois"]

    db_session.add(inscription)
    db_session.add_all(templates)
    db_session.commit()

    newsletters = list(Newsletter.export(type_='hebdomadaire'))
    assert len(newsletters) == 1
    assert newsletters[0].newsletter_hebdo_template.id == templates[0].id
    db_session.add_all([NewsletterDB(newsletter)
                       for newsletter in newsletters])
    db_session.commit()

    newsletters = list(Newsletter.export(
        type_='hebdomadaire', filter_already_sent=False))
    assert len(newsletters) == 1
    assert newsletters[0].newsletter_hebdo_template.id == templates[4].id


def test_indicateurs(template, inscription):
    template.indicateurs = None
    inscription.indicateurs = ["raep", "indice_atmo"]
    assert template.filtre_criteres(inscription) is True

    template.indicateurs = []
    assert template.filtre_criteres(inscription) is True

    template.indicateurs = inscription.indicateurs
    assert template.filtre_criteres(inscription) is True

    inscription.indicateurs = []
    assert template.filtre_criteres(inscription) is False

    template.indicateurs = []
    assert template.filtre_criteres(inscription) is True

    template.indicateurs = ["raep"]
    inscription.indicateurs = ["indice_atmo"]
    assert template.filtre_criteres(inscription) is False

    template.indicateurs = ["raep"]
    inscription.indicateurs = ["indice_atmo", "raep"]
    assert template.filtre_criteres(inscription) is True

    template.indicateurs = ["raep", "indice_atmo"]
    inscription.indicateurs = ["indice_atmo"]
    assert template.filtre_criteres(inscription) is False

    template.indicateurs = ["raep", "indice_atmo"]
    inscription.indicateurs = ["indice_atmo", "raep"]
    assert template.filtre_criteres(inscription) is True


def test_indicateurs_exclus(template, inscription):
    template.indicateurs_exclus = None
    inscription.indicateurs = ["raep", "indice_atmo"]
    assert template.filtre_criteres(inscription) is True

    template.indicateurs_exclus = []
    assert template.filtre_criteres(inscription) is True

    template.indicateurs_exclus = inscription.indicateurs
    assert template.filtre_criteres(inscription) is False

    inscription.indicateurs = []
    assert template.filtre_criteres(inscription) is True

    template.indicateurs_exclus = []
    assert template.filtre_criteres(inscription) is True

    template.indicateurs_exclus = ["raep"]
    inscription.indicateurs = ["indice_atmo"]
    assert template.filtre_criteres(inscription) is True

    template.indicateurs_exclus = ["raep"]
    inscription.indicateurs = ["indice_atmo", "raep"]
    assert template.filtre_criteres(inscription) is False

    template.indicateurs_exclus = ["raep", "indice_atmo"]
    inscription.indicateurs = ["indice_atmo"]
    assert template.filtre_criteres(inscription) is False

    template.indicateurs_exclus = ["raep", "indice_atmo"]
    inscription.indicateurs = ["indice_atmo", "raep"]
    assert template.filtre_criteres(inscription) is False


def test_meme_ordre(templates, inscription, db_session):
    for template in templates:
        if template.ordre >= 11:
            continue
        newsletter = Newsletter(newsletter_hebdo_template=template,
                                inscription=inscription)
        db_session.add(NewsletterDB(newsletter))
    db_session.commit()
    inscription = Inscription.query.get(inscription.id)
    nlt = NewsletterHebdoTemplate.next_template(inscription)
    assert nlt.ordre == 11
    assert nlt.enfants is False

    inscription.enfants = 'oui'
    nlt = NewsletterHebdoTemplate.next_template(inscription)
    assert nlt.ordre == 11
    assert nlt.enfants is True


def test_meme_ordre_population_recoupe(templates, inscription, db_session):
    for template in templates:
        if template.ordre >= 12:
            continue
        newsletter = Newsletter(newsletter_hebdo_template=template,
                                inscription=inscription)
        db_session.add(NewsletterDB(newsletter))
    db_session.commit()
    inscription = Inscription.query.get(inscription.id)
    nlt = NewsletterHebdoTemplate.next_template(inscription)
    newsletter = Newsletter(
        newsletter_hebdo_template=nlt, inscription=inscription)
    newsletter.date = date.today() - timedelta(days=1)
    db_session.add(NewsletterDB(newsletter))
    db_session.commit()

    nlt = NewsletterHebdoTemplate.next_template(inscription)
    assert nlt is None or nlt.ordre > 12


def test_daily_and_weekly_sent(inscription):
    # I subscribed to daily emails AND weekly emails, I should receive both of them on the day the weekly newsletter is sent

    # weekly newsletter is sent on Thursday
    today = date.today()
    days_until_thursday = (3 - today.weekday()) % 7
    thursday = today + timedelta(days=days_until_thursday)

    # if user is subscribed to daily emails AND weekly emails
    if inscription.indicateurs_frequence.contains("quotidien") and inscription.indicateur_media.contains('mail') and inscription.recommandations_actives.contains('oui'):
        # Check that the user receives both newsletters on thursday
        assert inscription.last_month_newsletters[0].date == thursday
        assert inscription.last_newsletters_hebdo[0].date == thursday
