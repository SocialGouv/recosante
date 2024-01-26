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
];
