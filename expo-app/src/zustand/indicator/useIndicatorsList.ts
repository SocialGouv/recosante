import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_MATOMO_USER_ID } from '~/constants/matamo';
import { Indicator, IndicatorsSlugEnum } from '~/types/indicator';
import { INDICATOR_STORAGE } from '~/constants/indicator';
import API from '~/services/api';

const initIndicators: Indicator[] = [
  {
    name: 'Indice ATMO',
    slug: IndicatorsSlugEnum.indice_atmospheric,
  },
  {
    name: 'Indice UV',
    slug: IndicatorsSlugEnum.indice_uv,
  },
  {
    name: 'Allergie aux Pollens',
    slug: IndicatorsSlugEnum.pollen_allergy,
  },
  {
    name: 'Alerte Météo',
    slug: IndicatorsSlugEnum.weather_alert,
  },
  // {
  //   name: 'Épisode Pollution Atmosphérique',
  //   slug: IndicatorsSlugEnum.episode_pollution_atmospheric,
  // },
  // {
  //   name: 'Eau du robinet',
  //   slug: IndicatorsSlugEnum.tap_water,
  // },
  {
    name: 'Eau de baignades',
    slug: IndicatorsSlugEnum.bathing_water,
  },
];

interface State {
  indicators: Indicator[];
  favoriteIndicator: Indicator | null;
  setFavoriteIndicator: (indicator: Indicator | null) => void;
  setIndicators: (indicators: Indicator[]) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

export const useIndicatorsList = create<State>()(
  persist(
    (set, _get) => ({
      indicators: initIndicators,
      favoriteIndicator: null,
      setIndicators: async (indicators) => {
        set({ indicators });
      },

      setFavoriteIndicator: async (favoriteIndicator) => {
        set({ favoriteIndicator });
        const matomo_id = await AsyncStorage.getItem(STORAGE_MATOMO_USER_ID);
        API.post({
          path: '/user',
          body: {
            matomo_id,
            favorite_indicator: favoriteIndicator?.slug,
          },
          // TODO: handle error
        });
      },
      _hasHydrated: false,
      setHasHydrated: (hydrationState) => {
        set({
          _hasHydrated: hydrationState,
        });
      },
    }),
    {
      name: INDICATOR_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        API.get({ path: '/indicators/list' }).then((response) => {
          const indicators = response.data as Indicator[];
          state?.setIndicators(indicators);
        });
      },
    },
  ),
);
