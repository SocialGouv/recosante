import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type IndicatorItem } from '~/types/indicator';
import { INDICATOR_STORAGE } from '~/constants/indicator';
import API from '~/services/api';

interface State {
  indicators: IndicatorItem[];
  favoriteIndicator: IndicatorItem | null;
  setFavoriteIndicator: (indicator: IndicatorItem | null) => void;
  setIndicators: (indicators: IndicatorItem[]) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

export const useIndicatorsList = create<State>()(
  persist(
    (set, _get) => ({
      indicators: [],
      favoriteIndicator: null,
      setIndicators: async (indicators) => {
        set({ indicators });
      },

      setFavoriteIndicator: async (favoriteIndicator) => {
        set({ favoriteIndicator });
        API.put({
          path: '/user',
          body: {
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
          const indicators = response.data as IndicatorItem[];
          state?.setIndicators(indicators);
        });
      },
    },
  ),
);
