import React, {useEffect} from 'react';
import {NativeAppEventEmitter} from 'react-native';
import {PAGE_REFRESH} from '../../../constants/Page';

const NowPlayingMoviesWidget = () => {
  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener(PAGE_REFRESH.HOME_SCREEN, refreshWidget);
  }, []);
  return <></>;
};

export default NowPlayingMoviesWidget;