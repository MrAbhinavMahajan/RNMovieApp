import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  ActivityIndicator,
  Alert,
  NativeAppEventEmitter,
  ScrollView,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {addMovieRating, fetchMovieDetails} from '@apis/Main';
import {PAGE_REFRESH} from '../../../../constants/Page';
import {IMAGE_BASEURL} from '../../../../constants/Main';
import {COLORS} from '../../../../constants/Colors';
import {styles} from './styles';
import {AirbnbRating} from 'react-native-ratings';
import {vpx} from '../../../../libraries/responsive-pixels';
import {kGENERAL, kRATINGS} from '../../../../constants/Messages';
import {APP_QUERY_MAP} from '../../../../constants/Api';
import RNText from '../../../common/RNText';
import MoviePosterWidget from '../../../widgets/MoviePoster';
import RNImage from '../../../common/RNImage';
import AppCTA from '../../../common/AppCTA';

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
    queryKey: [APP_QUERY_MAP.MOVIE_DETAILS, movieId],
    queryFn: ({signal}) => fetchMovieDetails(signal, movieId),
  });
  console.log(`movieDetails: for ${movieId} \n`, query);
  const addRatingMutation = useMutation({
    mutationFn: addMovieRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APP_QUERY_MAP.SELF_RATED_MOVIES],
        refetchType: 'active',
      });
      Alert.alert(kRATINGS.addedRating.title, kRATINGS.addedRating.subtitle);
    },
    onError: () => {
      Alert.alert(kGENERAL.title, kGENERAL.subtitle);
    },
  });

  const {data: item, refetch} = query;
  const {vote_average, tagline, vote_count, backdrop_path, id, genres} =
    item || {};
  const imageURL = `${IMAGE_BASEURL}${backdrop_path}`;
  const [controlsViewLayout, setControlsViewLayout] = useState({
    height: 0,
    width: 0,
  });
  const [ratingsEnabled, setRatingsEnabled] = useState(false);

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
    // ! Cancelling Query in Progress on unmount
    queryClient.cancelQueries({
      queryKey: [APP_QUERY_MAP.MOVIE_DETAILS, movieId],
    });
  };

  const toggleRating = () => {
    setRatingsEnabled(r => !r);
  };

  const onFinishRating = (value: any) => {
    if (addRatingMutation.isPending) {
      return;
    }
    addRatingMutation.mutate({movieId: id, value});
    setRatingsEnabled(false);
  };

  useEffect(() => {
    onPageMount();
    return onPageUnmount;
  }, []);

  const onLayout = ({nativeEvent: {layout}}) => {
    setControlsViewLayout(layout);
  };

  const renderBackdrop = () => {
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

  const renderMoviePosterCard = () => {
    return (
      <View style={styles.moviePosterCard}>
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
    );
  };

  const renderMovieDetailsCard = () => {
    return (
      <View style={styles.movieDetails}>
        {!_.isEmpty(tagline) && (
          <RNText style={styles.movieTaglineText}>{tagline}</RNText>
        )}
        {vote_count > 0 && (
          <RNText style={styles.movieVotesText}>{vote_count}+ votes</RNText>
        )}

        <View style={styles.movieDetailsCardFooter}>
          <AppCTA
            style={styles.rateCtaView(ratingsEnabled)}
            onPress={toggleRating}
            disabled={addRatingMutation?.isPending}>
            <RNText style={styles.rateCtaText(ratingsEnabled)}>
              {ratingsEnabled ? 'Hide' : 'Rate'}
            </RNText>
          </AppCTA>
        </View>

        {ratingsEnabled && (
          <View>
            <View style={styles.movieDivider} />
            {addRatingMutation.isPending ? (
              <ActivityIndicator size={'large'} />
            ) : (
              <AirbnbRating
                count={5}
                reviews={['Terrible', 'Bad', 'Good', 'Very Good', 'Amazing']}
                defaultRating={0}
                size={vpx(30)}
                onFinishRating={onFinishRating}
              />
            )}
          </View>
        )}
      </View>
    );
  };

  const renderDetailsSection = () => {
    return (
      <View style={styles.movieDetailsSectionView}>
        <RNText style={styles.movieTitleText} numberOfLines={1}>
          {screenTitle}
        </RNText>
        <View style={styles.movieDetailsContainer}>
          {renderMoviePosterCard()}
          {renderMovieDetailsCard()}
        </View>
      </View>
    );
  };

  const renderDetailsFooter = () => {
    return <View style={styles.movieDetailsFooterView}>{renderGenres()}</View>;
  };

  return (
    <LinearGradient
      onLayout={onLayout}
      colors={[COLORS.transparent, COLORS.fullBlack]}
      style={styles.containerView}>
      {renderBackdrop()}
      {renderDetailsSection()}
      {renderDetailsFooter()}
    </LinearGradient>
  );
};

export default MovieDetailsScreenHeader;
