import React from 'react';
import {kTABS} from '../constants/Navigation';
import BottomTabIcon from '../components/common/BottomTabIcon';

export interface TabInfo {
  focused: boolean;
  color: string;
  size: number;
  label: string;
  iconName: string;
}

export const TABS = {
  [kTABS.HOME_TAB]: {
    name: kTABS.HOME_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon {...data} iconName={'home'} label={'Home'} />
      ),
    },
  },
  [kTABS.SEARCH_TAB]: {
    name: kTABS.SEARCH_TAB,
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

  [kTABS.PROFILE_TAB]: {
    name: kTABS.PROFILE_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon {...data} iconName={'person'} label={'Me'} />
      ),
    },
  },
};

export const tabOptions = (key: string) => TABS[`${key}`].options;
