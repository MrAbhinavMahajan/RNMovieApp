import {create} from 'zustand';
import {AccountDetails} from '@constants/AppInterfaces';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {APP_STACKS_MAP, APP_TABS_MAP} from '@constants/Navigation';
import {QUERY_CLIENT} from '@constants/Main';
import {logDebug} from '../analytics';
import * as NavigationService from '@service/Navigation';
import storageInstance, {getZustandStateStorage} from '@utilities/Storage';
import useMovieStore from './useMovieStore';

interface AppStateProps {
  isSignedIn: boolean;
  accountId: string | null;
  accountDetails: AccountDetails | null;
}

interface AppStoreProps extends AppStateProps {
  login: (accountId: string, accessToken: string) => void;
  logout: () => void;
  setAccountDetails: (accountDetails: AccountDetails) => void;
  reset: () => void;
}

const useSessionStore = create<AppStoreProps>()(
  devtools(
    persist<AppStoreProps>(
      set => ({
        // InitialValues
        isSignedIn: false,
        accountId: null,
        accountDetails: null,

        // Setters
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
          // State Reset
          set({
            isSignedIn: false,
            accountId: null,
            accountDetails: null,
          });
          useMovieStore.getState().reset();
          // Cache/ Storage Clear
          storageInstance.clearAll(); // Clears All Storage data
          QUERY_CLIENT.clear(); // Clears Query Cache
          NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
          logDebug('Session terminated');
        },

        setAccountDetails: (accountDetails: AccountDetails) => {
          set(state => ({
            ...state,
            accountDetails,
          }));
        },

        reset: () => {
          // State Reset
          set({
            isSignedIn: false,
            accountId: null,
            accountDetails: null,
          });
          useMovieStore.getState().reset();
          // Cache/ Storage Clear
          storageInstance.clearAll(); // Clears All Storage data
          QUERY_CLIENT.clear(); // Clears Query Cache
          NavigationService.navigateReplace(APP_STACKS_MAP.AUTH_STACK);
        },
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => getZustandStateStorage()),
      },
    ),
  ),
);

export default useSessionStore;
export const getSessionStoreState = () => useSessionStore.getState();
