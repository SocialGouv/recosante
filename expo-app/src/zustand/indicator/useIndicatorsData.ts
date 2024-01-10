import { create } from 'zustand';
import { IndicatorCommonData, IndicatorsSlugEnum } from '~/types/indicator';

type IndicatorsData = Partial<Record<IndicatorsSlugEnum, IndicatorCommonData>>;

interface State {
  data: IndicatorsData;
  setData: (data: IndicatorsData) => void;
}

export const useIndicatorsData = create<State>()((set, _get) => ({
  data: {},
  favoriteIndicator: null,
  setData: async (data: IndicatorsData) => {
    set({ data });
  },
}));
