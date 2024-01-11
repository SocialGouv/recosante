import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MUNICPALITY_STORAGE } from '~/constants/municipality';
import { STORAGE_MATOMO_USER_ID } from '~/constants/matamo';
import API from '~/services/api';
import { Address } from '~/types/location';

interface LocationState {
  address: Address | null;
  setAddress: (location: Address) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

export const useAddress = create<LocationState>()(
  persist(
    (set, _get) => ({
      address: null,
      setAddress: async (address) => {
        set({ address });
        const matomo_id = await AsyncStorage.getItem(STORAGE_MATOMO_USER_ID);
        API.post({
          path: '/user',
          body: {
            matomo_id,
            municipality_insee_code: address.citycode,
            municipality_nom: address.city,
            municipality_zip_code: address.postcode,
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
      name: MUNICPALITY_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
