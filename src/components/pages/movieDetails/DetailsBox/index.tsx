import React from 'react';
import {styles} from './styles';
import {useQuery} from '@tanstack/react-query';
import {APP_QUERY_MAP} from '@constants/Api';
import {fetchMovieDetails} from '@apis/Main';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import RNText from '@components/common/RNText';
import _ from 'lodash';
import MovieGenres from '@components/common/MovieGenres';
import MovieOverview from '@components/common/MovieOverview';

type DetailsBox = {
  movieId: number;
};
const DetailsBox = ({movieId}: DetailsBox) => {
  const {
    data: item,
    refetch,
    isLoading,
    isFetching,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: [APP_QUERY_MAP.MOVIE_DETAILS, movieId, 'Details'],
    queryFn: ({signal}) => fetchMovieDetails(signal, movieId),
  });
  const {title, genres, overview} = item || {};

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
