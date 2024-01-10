import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_MATOMO_USER_ID } from '~/constants/matamo';
// import API from '~/services/api';
import { Indicator, IndicatorCommonData } from '~/types/indicator';
import { INDICATOR_STORAGE } from '~/constants/indicator';
import API from '~/services/api';

interface State {
  indicators: Indicator[] | null;
  favoriteIndicator: Indicator | null;
  setFavoriteIndicator: (indicator: Indicator | null) => void;
  setIndicators: (indicators: Indicator[]) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

export const useIndicator = create<State>()(
  persist(
    (set, _get) => ({
      indicators: null,
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
      },
    },
  ),
);

interface SelectedState {
  selectedIndicator: IndicatorCommonData | null;
  setSelectedIndicator: (selectedIndicator: IndicatorCommonData | null) => void;
}
export const useSelectedIndicator = create<SelectedState>()((set, _get) => ({
  selectedIndicator: null,
  setSelectedIndicator: async (selectedIndicator) => {
    set({ selectedIndicator });
  },
}));
