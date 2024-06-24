import React, {useEffect, useState} from 'react';
import {NativeAppEventEmitter, View} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {styles} from './styles';
import {COLORS} from '../../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {PAGE_REFRESH} from '../../../../constants/Page';
import {fetchMovieDetails} from '../../../../apis/Main';
import RNText from '../../../common/RNText';
import MoviePosterWidget from '../../../widgets/MoviePoster';
import RNImage from '../../../common/RNImage';
import {IMAGE_BASEURL} from '../../../../constants/Main';
import _ from 'lodash';

interface MovieDetailsScreenHeaderProps {
  screenTitle: string;
  movieId: number;
}

const MovieDetailsScreenHeader = (props: MovieDetailsScreenHeaderProps) => {
  const {screenTitle, movieId} = props;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['movieDetails'],
    queryFn: () => fetchMovieDetails(movieId),
  });
  console.log(`movieDetails: for ${movieId} \n`, query);
  const {data: item, error, isLoading, isSuccess, refetch} = query;
  const {vote_average, tagline, vote_count, backdrop_path} = item || {};
  const imageURL = `${IMAGE_BASEURL}${backdrop_path}`;
  const [controlsViewLayout, setControlsViewLayout] = useState({
    height: 0,
    width: 0,
  });

  const refreshWidget = () => {
    refetch();
  };

  useEffect(() => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshWidget,
    );
  }, []);

  const onLayout = ({nativeEvent: {layout}}) => {
    setControlsViewLayout(layout);
  };

  return (
    <LinearGradient
      onLayout={onLayout}
      colors={[COLORS.transparent, COLORS.fullBlack]}
      style={styles.containerView}>
      <RNImage
        imageURL={imageURL}
        imageViewStyles={[
          styles.backdropImageView,
          {height: controlsViewLayout?.height},
        ]}
        blurRadius={10}
      />

      <View style={styles.movieDetailsView}>
        <View>
          <MoviePosterWidget
            item={item || {}}
            index={0}
            containerStyles={styles.moviePoster}
          />
          {vote_average > 0 && (
            <View style={styles.movieVotesAvgView}>
              <RNText style={styles.movieVotesAvgText}>
                ✪ {vote_average?.toFixed(1)}
              </RNText>
            </View>
          )}
        </View>

        <View style={styles.movieTitleView}>
          <RNText style={styles.movieTitleText} numberOfLines={2}>
            {screenTitle}
          </RNText>
          {!_.isEmpty(tagline) && (
            <RNText style={styles.movieTaglineText}>{tagline}</RNText>
          )}
        </View>
      </View>

      <View style={styles.movieInfoView}>
        {vote_count > 0 && (
          <RNText style={styles.movieVotesText}>{vote_count}+ votes</RNText>
        )}
      </View>
    </LinearGradient>
  );
};

export default MovieDetailsScreenHeader;
