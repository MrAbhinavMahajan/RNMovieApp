import React, {useEffect} from 'react';
import {NativeAppEventEmitter, View} from 'react-native';
import {styles} from './styles';
import {PAGE_REFRESH} from '@constants/Page';

type PlayerBox = {
  movieId: number;
};

const PlayerBox = ({movieId}: PlayerBox) => {
  const refreshData = () => {
    // if (isFetching) {
    //   return;
    // }
    // refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshData,
    );
  }, []);

  return <View style={styles.container}></View>;
};

export default PlayerBox;
