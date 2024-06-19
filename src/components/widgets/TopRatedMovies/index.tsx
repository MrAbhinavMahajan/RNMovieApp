import React, {useEffect} from 'react';
import {NativeAppEventEmitter} from 'react-native';

const TopRatedMoviesWidget = () => {
  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener('HOME_PAGE_REFRESH', refreshWidget);
  }, []);
  return <></>;
};

export default TopRatedMoviesWidget;
