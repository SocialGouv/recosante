import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MUNICPALITY_STORAGE } from '~/constants/municipality';
import API from '~/services/api';
import { type Address } from '~/types/location';

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
        API.put({
          path: '/user',
          body: {
            municipality_insee_code: address.citycode,
            municipality_name: address.city,
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
        if (state?.address?.citycode) {
          API.put({
            path: '/user',
            body: {
              municipality_insee_code: state.address.citycode,
              municipality_name: state.address.city,
              municipality_zip_code: state.address.postcode,
            },
          });
          // TODO: handle error
        }
      },
    },
  ),
);
