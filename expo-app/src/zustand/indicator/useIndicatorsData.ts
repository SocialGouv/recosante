import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_MATOMO_USER_ID } from '~/constants/matamo';
import { IndicatorCommonData, IndicatorsSlugEnum } from '~/types/indicator';
import { INDICATOR_STORAGE } from '~/constants/indicator';
import API from '~/services/api';

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
