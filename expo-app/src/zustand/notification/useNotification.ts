import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_MATOMO_USER_ID } from '~/constants/matamo';
// import API from '~/services/api';
import { NOTIFICATION_STORAGE } from '~/constants/notification';
import API from '~/services/api';

interface State {
  selectedNotifications: string[];
  setSelectedNotifications: (notifications: string[]) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrationState: boolean) => void;
}

export const useNotification = create<State>()(
  persist(
    (set, _get) => ({
      selectedNotifications: [],
      setSelectedNotifications: async (notifications) => {
        set({ selectedNotifications: notifications });
        const matomo_id = await AsyncStorage.getItem(STORAGE_MATOMO_USER_ID);
        API.post({
          path: '/user',
          body: {
            matomo_id,
            notifications_preference: notifications,
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
      name: NOTIFICATION_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
