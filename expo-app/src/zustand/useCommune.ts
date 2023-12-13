import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import API from "~/services/api";

type Commune = {
  nom: string;
  code: string;
  codesPostaux: Array<string>;
};

interface CommuneState {
  commune: Commune | null;
  setCommune: (commune: Commune) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

const useCommune = create<CommuneState>()(
  persist(
    (set, get) => ({
      commune: null,
      setCommune: async (commune) => {
        set({ commune });
        const matomoId = await AsyncStorage.getItem("STORAGE_MATOMO_USER_ID");
        API.post({
          path: "/user",
          body: {
            matomoId,
            commune_code: commune.code,
            commune_nom: commune.nom,
            commune_codesPostaux: JSON.stringify(commune.codesPostaux),
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
      name: "commune-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useCommune;
