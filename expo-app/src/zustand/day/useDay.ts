import { create } from 'zustand';
import { DayEnum } from '~/types/day';

interface DayState {
  day: 'j0' | 'j1';
  setDay: (day: DayEnum) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

export const useDay = create<DayState>()((set, _get) => ({
  day: 'j0',
  setDay: async (day) => {
    set({ day });
  },
  _hasHydrated: false,
  setHasHydrated: (hydrationState) => {
    set({
      _hasHydrated: hydrationState,
    });
  },
}));
