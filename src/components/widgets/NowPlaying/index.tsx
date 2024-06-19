import React, {useEffect} from 'react';
import {NativeAppEventEmitter} from 'react-native';

const NowPlayingMoviesWidget = () => {
  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener('HOME_PAGE_REFRESH', refreshWidget);
  }, []);
  return <></>;
};

export default NowPlayingMoviesWidget;
