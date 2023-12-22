import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MUNICPALITY_STORAGE } from '~/constants/municipality';
import { STORAGE_MATOMO_USER_ID } from '~/constants/matamo';
import API from '~/services/api';
import { Municipality } from '~/types/municipality';

interface MuniciaplityState {
  municipality: Municipality | null;
  setCommune: (municipality: Municipality) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

const useCommune = create<MuniciaplityState>()(
  persist(
    (set, _get) => ({
      municipality: null,
      setCommune: async (municipality) => {
        set({ municipality });
        const matomoId = await AsyncStorage.getItem(STORAGE_MATOMO_USER_ID);
        API.post({
          path: '/user',
          body: {
            matomoId,
            municipality_insee_code: municipality.code,
            municipality_nom: municipality.nom,
            municipality_zip_code: JSON.stringify(municipality.codesPostaux),
          },
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
      name: MUNICPALITY_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useCommune;
