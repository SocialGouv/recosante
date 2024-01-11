import { create } from 'zustand';
import { type IndicatorCommonData } from '~/types/indicator';

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
