import { create } from 'zustand';
import { type IndicatorsDto } from '~/types/indicator';

interface State {
  indicatorsDto: IndicatorsDto;
  setIndicatorsDto: (indicatorsDto: IndicatorsDto) => void;
}

export const useIndicatorsDto = create<State>()((set, _get) => ({
  indicatorsDto: {},
  setIndicatorsDto: async (indicatorsDto: IndicatorsDto) => {
    set({ indicatorsDto });
  },
}));
