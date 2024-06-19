import React, {useEffect} from 'react';
import {NativeAppEventEmitter} from 'react-native';

const TrendingMoviesWidget = () => {
  const refreshWidget = () => {};

  useEffect(() => {
    NativeAppEventEmitter.addListener('HOME_PAGE_REFRESH', refreshWidget);
  }, []);
  return <></>;
};

export default TrendingMoviesWidget;
