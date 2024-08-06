/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import _ from 'lodash';
import {NativeAppEventEmitter} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import {useQuery} from '@tanstack/react-query';
import {APP_QUERY_MAP} from '@constants/Api';
import {fetchMovieDetails} from '@apis/Main';
import {PAGE_REFRESH} from '@constants/Page';
import {styles} from './styles';
import RNText from '@components/common/RNText';
import MovieGenres from '@components/common/MovieGenres';
import MovieOverview from '@components/common/MovieOverview';
import {QUERY_STATUS} from '@constants/Main';
import ErrorStateWidget from '~/src/components/widgets/ErrorState';

type DetailsBox = {
  movieId: number;
};
const DetailsBox = ({movieId}: DetailsBox) => {
  const {
    data: item,
    refetch,
    isFetching,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: [APP_QUERY_MAP.MOVIE_DETAILS, movieId, 'Details'],
    queryFn: ({signal}) => fetchMovieDetails(signal, movieId),
  });
  const {title, genres, overview} = item || {};

  const refreshData = () => {
    if (isFetching) {
      return;
    }

    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshData,
    );
  }, []);

  if (!isError && status !== QUERY_STATUS.PENDING && _.isEmpty(item)) {
    return <></>;
  }

  if (isError) {
    return (
      <ErrorStateWidget
        error={error}
        containerStyles={styles.errorContainer}
        retryCTA={refreshData}
      />
    );
  }

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      key={`${title}${movieId}`} // * Important for Animation
      style={styles.container}>
      <RNText style={styles.titleText}>{title}</RNText>
      {!_.isEmpty(genres) && (
        <MovieGenres
          genreIds={genres.map((genre: {id: any}) => genre.id)}
          genreTextStyles={styles.genreText}
        />
      )}
      <MovieOverview
        text={overview}
        textStyles={styles.overViewText}
        ctaTextStyles={styles.overViewCTAText}
        containerStyles={styles.overViewTextContainer}
      />
    </Animated.View>
  );
};

export default DetailsBox;
