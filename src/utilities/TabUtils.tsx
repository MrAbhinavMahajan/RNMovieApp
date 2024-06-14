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
  [kTABS.FAVORITE_TAB]: {
    name: kTABS.FAVORITE_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon {...data} iconName={'favorite'} label={'Watchlist'} />
      ),
    },
  },
  [kTABS.WATCHLIST_TAB]: {
    name: kTABS.WATCHLIST_TAB,
    options: {
      tabBarIcon: (data: TabInfo) => (
        <BottomTabIcon {...data} iconName={'list'} label={'Watchlist'} />
      ),
    },
  },
};

export const tabOptions = (key: string) => TABS[`${key}`].options;
