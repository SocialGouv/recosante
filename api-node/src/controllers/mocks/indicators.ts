import { IndicatorsSlugEnum } from '@prisma/client';
import type { IndicatorDataTodayAndTomorrow } from '~/types/api/indicator';

const bathing_water: IndicatorDataTodayAndTomorrow = {
  name: 'Eau de baignade',
  slug: IndicatorsSlugEnum.bathing_water,
  municipality_insee_code: '12345',
  recommendations: [
    "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
    "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
  ],
  about:
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
  j0: {
    id: '1234',
    summary: {
      value: 3,
      color: '#207900',
      label: 'Faible',
      recommendation: 'blablabla',
    },
    validity_start: '2020-01-01T00:00:00.000Z',
    validity_end: '2020-12-31T23:59:59.999Z',
    diffusion_date: '2020-01-01T00:00:00.000Z',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    values: [],
  },
  j1: {
    id: '1234',
    summary: {
      value: 3,
      color: '#207900',
      label: 'Faible',
      recommendation: 'blablabla',
    },
    validity_start: '2020-01-01T00:00:00.000Z',
    validity_end: '2020-12-31T23:59:59.999Z',
    diffusion_date: '2020-01-01T00:00:00.000Z',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    values: [],
  },
};

const pollen_allergy: IndicatorDataTodayAndTomorrow = {
  name: 'Allergie aux pollens',
  slug: IndicatorsSlugEnum.pollen_allergy,
  municipality_insee_code: '12345',
  recommendations: [
    "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
    "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
  ],
  about:
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
  j0: {
    id: '1234',
    summary: {
      value: 10,
      color: '#D8001D',
      label: 'Très Fort',
      recommendation: 'blablabla',
    },
    validity_start: '2020-01-01T00:00:00.000Z',
    validity_end: '2020-12-31T23:59:59.999Z',
    diffusion_date: '2020-01-01T00:00:00.000Z',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    values: [],
  },
  j1: {
    id: '1234',
    summary: {
      value: 5,
      color: '#EFD100',
      label: 'Modéré',
      recommendation: 'blablabla',
    },
    validity_start: '2020-01-01T00:00:00.000Z',
    validity_end: '2020-12-31T23:59:59.999Z',
    diffusion_date: '2020-01-01T00:00:00.000Z',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    values: [],
  },
};

const weather_alert: IndicatorDataTodayAndTomorrow = {
  name: 'Vigilance météo',
  slug: IndicatorsSlugEnum.weather_alert,
  municipality_insee_code: '12345',
  recommendations: [
    "🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins secondaires et les itinéraires moins fréquentés, ce qui vous permettra d'éviter les zones à fort trafic et de limiter votre exposition à la pollution atmosphérique.",
    "🏋️‍♂️ Limitez les activités physiques intenses en extérieur pendant les périodes de vigilance météo pour réduire l'exposition aux polluants atmosphériques et préserver votre santé.",
  ],
  about:
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
  j0: {
    id: '1234',
    summary: {
      value: 0,
      color: '#757575',
      label: 'Nul',
      recommendation: 'blablabla',
    },
    validity_start: '2020-01-01T00:00:00.000Z',
    validity_end: '2020-12-31T23:59:59.999Z',
    diffusion_date: '2020-01-01T00:00:00.000Z',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    values: [],
  },
  j1: {
    id: '1234',
    summary: {
      value: 7,
      color: '#EB5000',
      label: 'Fort',
      recommendation: 'blablabla',
    },
    validity_start: '2020-01-01T00:00:00.000Z',
    validity_end: '2020-12-31T23:59:59.999Z',
    diffusion_date: '2020-01-01T00:00:00.000Z',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    values: [],
  },
};

export { bathing_water, pollen_allergy, weather_alert };
