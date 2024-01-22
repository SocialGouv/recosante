import { type CustomError } from '~/types/error';
import { z } from 'zod';
import prisma from '~/prisma';
import dayjs from 'dayjs';
import type { Indicator } from '~/types/api/indicator';
import {
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
  type Municipality,
} from '@prisma/client';
import { indicatorsObject } from './indicators_list';
import utc from 'dayjs/plugin/utc';
import { capture } from '~/third-parties/sentry';
import { formatPollensAPIValues, getPollensStatus } from '~/utils/pollens';
dayjs.extend(utc);

async function getPollensFromMunicipalityAndDate({
  municipality_insee_code,
  date_UTC_ISO,
}: {
  municipality_insee_code: Municipality['COM'];
  date_UTC_ISO: string;
}) {
  try {
    z.object({
      municipality_insee_code: z.string().length(5),
      date_UTC_ISO: z.string().length(24),
      // matomo_id: z.string().length(16), // at least for auth
    }).parse({
      municipality_insee_code,
      date_UTC_ISO,
    });
  } catch (zodError) {
    const error = new Error(
      `Invalid request in getPollensFromMunicipalityAndDate ${
        zodError instanceof Error ? zodError.message : 'Unknown error'
      }`,
    ) as CustomError;
    error.status = 400;
    throw error;
  }

  const pollensJ0 = await prisma.pollenAllergyRisk.findFirst({
    where: {
      municipality_insee_code,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      validity_start: {
        lte: dayjs(date_UTC_ISO).utc().startOf('day').toISOString(),
      },
    },
    orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
  });

  if (!pollensJ0) {
    capture('No pollens found', {
      extra: {
        municipality_insee_code,
        date_UTC_ISO,
      },
    });
    return null;
  }

  const recommandationsJ0 = await prisma.recommandation
    .findMany({
      where: {
        indicator: IndicatorsSlugEnum.pollen_allergy,
        indicator_value: pollensJ0.total ?? 0,
      },
      select: {
        recommandation_content: true,
      },
      take: 2,
    })
    .then((recommandations) =>
      recommandations.map(
        (recommandation) => recommandation.recommandation_content,
      ),
    );

  const formattedPollensJ0 = {
    id: pollensJ0.id,
    summary: {
      value: pollensJ0.total ?? 0,
      status: getPollensStatus(pollensJ0.total ?? 0),
      recommendations: recommandationsJ0,
    },
    validity_start: pollensJ0.validity_start.toISOString(),
    validity_end: pollensJ0.validity_end.toISOString(),
    diffusion_date: pollensJ0.diffusion_date.toISOString(),
    created_at: pollensJ0.created_at.toISOString(),
    updated_at: pollensJ0.updated_at.toISOString(),
    values: formatPollensAPIValues(pollensJ0),
  };

  const pollensIndicator: Indicator = {
    slug: IndicatorsSlugEnum.pollen_allergy,
    name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].name,
    long_name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].long_name,
    short_name: indicatorsObject[IndicatorsSlugEnum.pollen_allergy].short_name,
    municipality_insee_code: pollensJ0.municipality_insee_code,
    about_title: "à propos du risque d'allergie au pollen",
    about_description: `Pollen : Le risque d'exposition aux allergènes polliniques (RAEP) est un indice qui permet de prévoir comment va évoluer le risque allergénique dans les jours à venir. Sa valeur varie de 1 (risque faible) à 5 (risque élevé). Il est calculé à partir des concentrations polliniques passées, d’informations phénologiques (observations des végétaux), des prévisions météorologiques et du réseau de médecins sentinelles qui coopèrent avec le RNSA.
Comment est calculé notre indice Pollinique : la note de l'indice pollinique prend la pire note des indicateurs souvent.
Ambroisies : L’ambroisie est une plante qui se développe dans différents milieux : parcelles agricoles, friches, etc. Elle est présente sur l’ensemble du territoire français, particulièrement en région Auvergne-Rhône-Alpes, Nouvelle Aquitaine, et Bourgogne-Franche-Comté.
Il existe plusieurs espèces d’ambroisie dangereuses pour les personnes allergiques : l’ambroisie à feuilles d’armoise, l’ambroisie trifide et l’ambroisie à épis lisses, encore rare. Le pollen d’ambroisie, émis en fin d’été, provoque de fortes réactions allergiques (rhinites, conjonctivite, asthme) chez les personnes sensibles. En France, 1 à 3,5 millions de personnes seraient allergiques aux pollens d’ambroisie. Une réglementation nationale a été adoptée en 2017 pour lutter contre l’ambroisie. Une plateforme de signalement de l’ambroisie est disponible.
Armoises : L’armoise est une plante herbacée très présente en France, notamment dans les terrains vagues ou en bordure de chemin. Il s’agit d’une plante en forme de buisson d’environ 70 cm dont le feuillage est vert et les fleurs jaunes ou blanches en fonction de l’espèce.
Sa floraison a lieu entre juillet et septembre et génère une forte odeur. En France, l’allergie au pollen d’armoise concernerait 10 à 14 % des individus atteints d’allergie pollinique.
Aulne : L’aulne est un arbre aux feuilles vertes pouvant aller jusqu’à 25 mètres de hauteur. Les différentes espèces d’aulne sont présentes partout en France, dans les villes et en milieu naturel.
Sa floraison a lieu de février à avril et le risque d’allergie est important.
Bouleau : Le bouleau est un arbre très répandu en France, notamment dans le nord du pays, en ville comme dans les milieux naturels. Il en existe deux types principaux : le bouleau verruqueux (ou bouleau blanc) et le bouleau pubescent.
Sa période de pollinisation s’étend de mars à mai. Son pollen est très allergisant, à l’origine de conjonctivites, de rhinoconjonctivites et d’asthmes allergiques.
Charme : Le charme est un arbre pouvant atteindre 20 mètres de hauteur dont les feuilles sont vertes et les fleurs vert-jaune. Présent partout en France, le charme est fréquemment planté comme arbre d’ornement dans les parcs et jardins.
Sa floraison a lieu de mars à mai et son potentiel allergisant est fort.
Chataigner : Le châtaignier est un arbre présent partout en France, qui peut être cultivé pour ses fruits.
Sa pollinisation a lieu en juin. Son pollen est peu allergisant mais il peut être présent en abondance dans l’air et donc provoquer des allergies.
Chene : Le chêne est un arbre fruitier qui produit des glands. Plusieurs espèces de chêne sont très présentes en France.
Sa floraison a lieu au printemps avec l’apparition des nouvelles feuilles. De grandes quantités de pollens sont alors dispersées par le vent. Le pollen du chêne est moyennement allergisant.
Cypres : Les cupressacées sont une famille de plantes qui compte plus de cent espèces parmi lesquels le genévrier, le cyprès, le thuya ou encore le séquoia. Les feuilles de ces arbres sont en forme d’aiguilles. Les cupressacées sont très présentes en région méditerranéenne.
Leur période de pollinisation a lieu entre février et avril. Toutes les espèces de cupressacées ne sont pas allergisantes mais, celles qui le sont, présentent un risque d’allergie fort.
Frene : Le frêne est un arbre au feuillage vert foncé et aux bourgeons noirs. Certaines espèces possèdent aussi des fleurs blanches et odorantes.
Les frênes fleurissent entre janvier et mai, et leurs pollens ont un potentiel allergisant très élevé.
Graminées : Les graminées sont des plantes à fleur. Les céréales, les roseaux, les bambous, les herbes des prairies naturelles ou les pelouses cultivées font par exemple partie de cette famille de plantes. Elles sont donc largement présentes en France dans les prairies, sur les rochers, en forêt, dans l’eau, dans les fossés ou accotements de routes, etc.
Les graminées sont en général présentes au printemps et en été, de mars à juillet en fonction des espèces. Le potentiel allergisant est fort, avec un pic dominant en juin.
Noisetier : Le noisetier est un arbuste dont la période de pollinisation a lieu entre février et avril. Son pollen est très allergisant.
Le noisetier est très répandu en Europe. Il est commun en France dans le Centre, l’Est et le Nord-Est, plus rare dans l’Ouest et le Sud-Ouest.
Olivier : L’olivier est un arbre fruitier aux feuilles vert foncé qui produit des olives.
Particulièrement présent en région méditerranéenne, l’olivier a un pollen très allergisant. Sa période de pollinisation a lieu de mai à juin.
Peuplier : Le peuplier est un arbre d’ornement emblématique des berges de rivière et des canaux.
La période de fleuraison du peuplier s’étend de mars à mai, mais son pollen est peu allergisant.
Plantain : Le plantain est une herbe haute qui peut atteindre 40 cm de hauteur. Il existe plusieurs centaines d’espèces de plantain : une douzaine est recensée en France, spécifiquement sur les littoraux, dans les champs et dans les pâturages.
Sa période de floraison dépend de l’espèce : le plantain lancéolé fleurit d’avril à septembre et le plantain majeur de juin à septembre. Leur pollen est moyennement allergisant.
Platane : Le platane est un grand arbre souvent utilisé pour l’ornement en ville et le long des routes, même s’il est aussi présent en milieu naturel dans les vallées et près des cours d’eau.
Le platane produit des fruits en forme de boule dont les poils sont allergisants. Sa période de pollinisation dure d’avril à mai et son pollen est fortement allergisant.
Rumex : L’oseille (ou Rumex) pousse à l’état sauvage sur plusieurs continents, notamment en Europe. Plusieurs espèces sont également cultivées pour leurs feuilles comestibles.
Sa floraison se déroule pendant l’été. Ce pollen peut être responsable d’allergies respiratoires.
Saule : Le saule est un arbre décoratif, souvent planté dans les jardins.
Sa période de floraison s’étend de mars à mai et provoque l’apparition d’un pollen moyennement allergisant, qui est souvent le premier de l’année.
Les saules sont des espèces dioïques : les plantes mâles et femelles sont différentes, et les plantes femelles ne produisent pas de pollen allergisant.
Tilleul : Les tilleuls constituent un genre d'arbres à croissance rapide pouvant atteindre 30 à 40 m. Leurs feuilles sont généralement en forme de cœur.
Le tilleul est un arbre très répandu dans la végétalisation des villes et des villages. On le retrouve souvent dans les parcs et les jardins.
Sa période de floraison (période à risque pour les allergies) s’étend de mai à juillet. C’est un pollen possédant un potentiel allergisant modéré. Son pollen se diffuse difficilement par le vent, d’où un risque allergisant moyen, impactant plutôt la vie des personnes allergiques vivant à sa proximité.
Urticacees : Les urticacées sont une famille de plantes à fleurs qui compte environ 2 625 espèces différentes répertoriées, dont font notamment partie les orties. Elles sont présentes partout dans le monde, dans les bois comme sur des terrains ouverts, et peuvent prendre la forme d’arbustes, de lianes, d’herbes ou plus rarement d’arbres.
Ces plantes sont pollinisées par le vent. Leur période de floraison a lieu entre juin et août.`,
    j0: formattedPollensJ0,
  };

  if (
    dayjs()
      .utc()
      .add(1, 'day')
      .endOf('day')
      .isAfter(dayjs(pollensJ0.validity_end).utc())
  ) {
    const pollensJ1 = await prisma.pollenAllergyRisk.findFirst({
      where: {
        municipality_insee_code,
        data_availability: DataAvailabilityEnum.AVAILABLE,
        validity_start: {
          lte: dayjs(date_UTC_ISO)
            .utc()
            .add(1, 'day')
            .startOf('day')
            .toISOString(),
        },
      },
      orderBy: [{ diffusion_date: 'desc' }, { validity_start: 'asc' }],
    });

    if (pollensJ1) {
      const recommandationsJ1 = await prisma.recommandation
        .findMany({
          where: {
            indicator: IndicatorsSlugEnum.pollen_allergy,
            indicator_value: pollensJ1.total ?? 0,
          },
          select: {
            recommandation_content: true,
          },
          take: 2,
        })
        .then((recommandations) =>
          recommandations.map(
            (recommandation) => recommandation.recommandation_content,
          ),
        );

      pollensIndicator.j1 = {
        id: pollensJ1.id,
        summary: {
          value: pollensJ1.total ?? 0,
          status: getPollensStatus(pollensJ1.total ?? 0),
          recommendations: recommandationsJ1,
        },
        validity_start: pollensJ1.validity_start.toISOString(),
        validity_end: pollensJ1.validity_end.toISOString(),
        diffusion_date: pollensJ1.diffusion_date.toISOString(),
        created_at: pollensJ1.created_at.toISOString(),
        updated_at: pollensJ1.updated_at.toISOString(),
        values: formatPollensAPIValues(pollensJ1),
      };
    }
  } else {
    pollensIndicator.j1 = formattedPollensJ0;
  }

  return pollensIndicator;
}

export { getPollensFromMunicipalityAndDate };
