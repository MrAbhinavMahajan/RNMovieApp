import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {NativeAppEventEmitter, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fetchMovieDetails} from '../../../../apis/Main';
import {PAGE_REFRESH} from '../../../../constants/Page';
import {IMAGE_BASEURL} from '../../../../constants/Main';
import {COLORS} from '../../../../constants/Colors';
import {styles} from './styles';
import RNText from '../../../common/RNText';
import MoviePosterWidget from '../../../widgets/MoviePoster';
import RNImage from '../../../common/RNImage';

interface MovieDetailsScreenHeaderProps {
  screenTitle: string;
  movieId: number;
}

interface MovieGenres {
  name: string;
  id: any;
}

const MovieDetailsScreenHeader = (props: MovieDetailsScreenHeaderProps) => {
  const queryClient = useQueryClient();
  const {screenTitle, movieId} = props;
  const query = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: ({signal}) => fetchMovieDetails(signal, movieId),
  });
  console.log(`movieDetails: for ${movieId} \n`, query);

  const {data: item, refetch} = query;
  const {vote_average, tagline, vote_count, backdrop_path, id, genres} =
    item || {};
  const imageURL = `${IMAGE_BASEURL}${backdrop_path}`;
  const [controlsViewLayout, setControlsViewLayout] = useState({
    height: 0,
    width: 0,
  });

  const refreshWidget = () => {
    refetch();
  };

  const onPageMount = () => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshWidget,
    );
  };

  const onPageUnmount = () => {
    queryClient.cancelQueries({queryKey: ['movieDetails', movieId]});
  };

  useEffect(() => {
    onPageMount();
    return onPageUnmount;
  }, []);

  const onLayout = ({nativeEvent: {layout}}) => {
    setControlsViewLayout(layout);
  };

  const renderMoviesBackdrop = () => {
    return (
      <RNImage
        imageURL={imageURL}
        imageViewStyles={[
          styles.backdropImageView,
          {height: controlsViewLayout?.height},
        ]}
        blurRadius={10}
      />
    );
  };

  const renderVotes = () => {
    if (!vote_count) {
      return <></>;
    }
    return <RNText style={styles.movieVotesText}>{vote_count}+ votes</RNText>;
  };

  const renderGenres = () => {
    if (_.isEmpty(genres)) {
      return <></>;
    }
    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.genresScrollView}
        showsHorizontalScrollIndicator={false}>
        {genres?.map((el: MovieGenres) => (
          <View key={el?.id} style={styles.genreItemView}>
            <RNText style={styles.genresText}>{el?.name}</RNText>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderMovieDetailsCard = () => {
    return (
      <View style={styles.movieDetailsCardView}>
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
    );
  };

  const renderMovieDetailsFooter = () => {
    return (
      <View style={styles.movieDetailsFooterView}>
        {renderVotes()}
        {renderGenres()}
      </View>
    );
  };

  return (
    <LinearGradient
      onLayout={onLayout}
      colors={[COLORS.transparent, COLORS.fullBlack]}
      style={styles.containerView}>
      {renderMoviesBackdrop()}
      {renderMovieDetailsCard()}
      {renderMovieDetailsFooter()}
    </LinearGradient>
  );
};

export default MovieDetailsScreenHeader;
