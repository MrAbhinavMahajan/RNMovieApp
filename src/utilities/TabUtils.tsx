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
        <BottomTabIcon
          {...data}
          iconName={data?.focused ? 'home' : 'home-outline'}
          label={'Home'}
        />
      ),
    },
  },
  [kTABS.WATCHLIST_TAB]: {
    name: kTABS.WATCHLIST_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon
          {...data}
          iconName={data?.focused ? 'home' : 'home-outline'}
          label={'Watchlist'}
        />
      ),
    },
  },
};

export const tabOptions = (key: string) => TABS[`${key}`].options;
