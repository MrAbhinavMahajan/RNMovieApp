import React from 'react';
import {APP_TABS_MAP} from '@constants/Navigation';
import BottomTabIcon from '../components/common/BottomTabIcon';

export interface TabInfo {
  focused: boolean;
  color: string;
  size: number;
  label: string;
  iconName: string;
}

export const TABS = {
  [APP_TABS_MAP.HOME_TAB]: {
    name: APP_TABS_MAP.HOME_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon {...data} iconName={'home'} label={'Home'} />
      ),
    },
  },
  [APP_TABS_MAP.SEARCH_TAB]: {
    name: APP_TABS_MAP.SEARCH_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon
          {...data}
          iconName={'local-fire-department'}
          label={'Search'}
        />
      ),
    },
  },

  [APP_TABS_MAP.PROFILE_TAB]: {
    name: APP_TABS_MAP.PROFILE_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon {...data} iconName={'person'} label={'Me'} />
      ),
    },
  },
};

export const tabOptions = (key: string) => TABS[`${key}`].options;
