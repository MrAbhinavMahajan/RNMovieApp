import {create} from 'zustand';
import {AccountDetails} from '@constants/AppInterfaces';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {APP_STACKS_MAP, APP_TABS_MAP} from '@constants/Navigation';
import {QUERY_CLIENT} from '@constants/Main';
import * as NavigationService from '@service/Navigation';
import zustandStorage from './storage';
import storageInstance from '@utilities/Storage';

interface AppStateProps {
  isSignedIn: boolean;
  accountId: string | null;
  lastWatchedMovieId: number | null;
  accountDetails: AccountDetails | null;
}

interface AppStoreProps extends AppStateProps {
  login: (accountId: string, accessToken: string) => void;
  logout: () => void;
  setAccountDetails: (accountDetails: AccountDetails) => void;
  setLastWatchedMovieId: (lastWatchedMovieId: number) => void;
  reset: () => void;
}

const useAppStore = create<AppStoreProps>()(
  devtools(
    persist<AppStoreProps>(
      set => ({
        isSignedIn: false,
        accountId: null,
        accountDetails: null,
        lastWatchedMovieId: null,

        login: (accountId: string, accessToken: string) => {
          set({
            isSignedIn: true,
            accountId,
          });
          storageInstance.setUserStorageInstance(String(accountId));
          storageInstance.saveToUserStorage('accountId', String(accountId));
          storageInstance.saveToUserStorage('accessToken', accessToken);
          NavigationService.navigateReplace(APP_TABS_MAP.MAIN_TAB);
        },

        logout: () => {
          // Clears User data & it's Storage
          set({
            isSignedIn: false,
            accountId: null,
            accountDetails: null,
            lastWatchedMovieId: null,
          });
          storageInstance.clearUserStorage(); // Clears UserStorage
          zustandStorage.clear(); // Removes persisted data
          QUERY_CLIENT.clear(); // Clears Query Cache
          NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
        },

        setAccountDetails: (accountDetails: AccountDetails) => {
          set(state => ({
            ...state,
            accountDetails,
          }));
        },

        setLastWatchedMovieId: (lastWatchedMovieId: number) => {
          set(state => ({
            ...state,
            lastWatchedMovieId,
          }));
        },

        reset: () => {
          // Clears Every Cache & Storage
          set({
            isSignedIn: false,
            accountId: null,
            accountDetails: null,
          });
          storageInstance.clearAll(); // Clears AppStorage & UserStorage data
          zustandStorage.clear(); // Removes persisted data
          QUERY_CLIENT.clear(); // Clears Query Cache
          NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
        },
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => zustandStorage.storage),
      },
    ),
  ),
);

export default useAppStore;
export const getAppStoreState = () => useAppStore.getState();
