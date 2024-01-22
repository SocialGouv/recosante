import type { Indicator } from '~/types/api/indicator';

export const indicatorsMock: Indicator[] = [
  {
    name: 'Eau de baignade',
    short_name: 'Eau de baignade',
    long_name: 'La qualité des eaux de baignade',
    slug: 'bathing_water',
    municipality_insee_code: '12345',
    about_title: 'à propos de la qualité de l’eau de baignade',
    about_description: `Connaître la qualité de l’eau de baignade en eau de mer ou en eau douce est un moyen pour prévenir tout risque pour la santé des baigneurs.
      Dans l’évaluation de cette qualité, il convient de distinguer :
la qualité instantanée : le résultat d’analyse du dernier prélèvement d’un échantillon d’eau qualifié de « bon », « moyen » ou « mauvais » en fonction de sa qualité microbiologique (Escherichia coli et entérocoques intestinaux) ;
la qualité au terme de la saison balnéaire : le classement en catégorie « excellente », « bonne », « suffisante » ou « insuffisante » calculé de manière statistique à la fin de la saison balnéaire en prenant en compte les résultats obtenus sur les quatre dernières années.
Des mesures de gestion telles que des interdictions de baignades temporaires ou permanentes peuvent être prises de manière à éviter que les baigneurs soient exposés à une pollution.`,
    j0: {
      id: '1234',
      summary: {
        value: 3,
        status: 'Mauvais',
        recommendations: [
          "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
          "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
        ],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
    j1: {
      id: '1234',
      summary: {
        value: 3,
        status: 'Mauvais',
        recommendations: ['blablabla'],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
  },
  {
    name: 'Vigilance météo',
    short_name: 'Vigilance météo',
    long_name: 'La vigilance météo',
    slug: 'weather_alert',
    municipality_insee_code: '12345',
    about_title: 'à propos de la vigilance météo',
    about_description: `La vigilance météo est conçue pour informer en cas de phénomènes météorologiques dangereux en métropole dans les prochaines 24 heures. Elle complète les prévisions météorologiques et vise à attirer l’attention de tous sur les dangers potentiels d’une situation météorologique et à faire connaître les précautions pour se protéger.
La vigilance couvre 9 phénomènes : vent violent, vagues-submersion, pluie-inondation, crues, orages, neige-verglas, avalanches, canicule et grand froid.
Il existe 4 niveaux de risque, traduit par une couleur du vert (pas de vigilance particulière) au rouge (une vigilance absolue s’impose).
Pour déterminer ce niveau de risque, des critères de choix ont été définis pour chaque phénomène et pour chaque département. Ils tiennent compte de la sensibilité locale aux phénomènes météorologiques, en se basant sur les événements passés, les conséquences observées et le niveau d’acclimatation du département. Ainsi, quelques centimètres de neige peuvent suffire à perturber le trafic routier et le réseau de transports en commun à Marseille ou Paris, alors qu’ils n’ont que peu de conséquences dans les zones de montagne plus accoutumées.`,
    j0: {
      id: '1234',
      summary: {
        value: 0,
        status: 'Nul',
        recommendations: [
          "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
          "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
        ],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
    j1: {
      id: '1234',
      summary: {
        value: 3,
        status: 'Fort',
        recommendations: [
          "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
          "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
        ],
      },
      validity_start: '2020-01-01T00:00:00.000Z',
      validity_end: '2020-12-31T23:59:59.999Z',
      diffusion_date: '2020-01-01T00:00:00.000Z',
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
    },
  },
];
