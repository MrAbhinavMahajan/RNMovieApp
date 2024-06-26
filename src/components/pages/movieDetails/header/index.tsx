import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  Alert,
  NativeAppEventEmitter,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  fetchMovieDetails,
  fetchMovieFavorites,
  fetchMovieWatchlist,
  updateMovieFavorites,
  updateMovieWatchlist,
} from '../../../../apis/Main';
import {PAGE_REFRESH} from '../../../../constants/Page';
import {IMAGE_BASEURL} from '../../../../constants/Main';
import {IconSize, MaterialIcon} from '../../../common/RNIcon';
import {COLORS} from '../../../../constants/Colors';
import {styles} from './styles';
import {
  FavoriteRequestBody,
  WatchlistRequestBody,
} from '../../../../constants/AppInterfaces';
import RNText from '../../../common/RNText';
import MoviePosterWidget from '../../../widgets/MoviePoster';
import RNImage from '../../../common/RNImage';
import {
  GENERIC_ERROR_MESSAGE,
  GENERIC_ERROR_TITLE,
} from '../../../../constants/Error';

interface MovieDetailsScreenHeaderProps {
  screenTitle: string;
  movieId: number;
}

const MovieDetailsScreenHeader = (props: MovieDetailsScreenHeaderProps) => {
  const queryClient = useQueryClient();
  const {screenTitle, movieId} = props;
  const page = 1;
  const query = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: ({signal}) => fetchMovieDetails(signal, movieId),
  });
  const favoriteMoviesQuery = useQuery({
    queryKey: ['favoriteMovies'],
    queryFn: ({signal}) => fetchMovieFavorites(signal, page),
  });
  const watchlistMoviesDataQuery = useQuery({
    queryKey: ['watchlistMovies'],
    queryFn: ({signal}) => fetchMovieWatchlist(signal, page),
  });
  const favoritesMutation = useMutation({
    mutationFn: updateMovieFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries(['favoriteMovies']); // ! Invalidates the favoriteMovies query data and fetch on successful mutation
    },
    onError: () => {
      Alert.alert(GENERIC_ERROR_TITLE, GENERIC_ERROR_MESSAGE);
    },
  });
  const watchlistMutation = useMutation({
    mutationFn: updateMovieWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries(['watchlistMovies']); // ! Invalidates the watchlistMovies query data and fetch on successful mutation
    },
    onError: () => {
      Alert.alert(GENERIC_ERROR_TITLE, GENERIC_ERROR_MESSAGE);
    },
  });
  console.log(`movieDetails: for ${movieId} \n`, query);

  const {data: item, refetch} = query;
  const {vote_average, tagline, vote_count, backdrop_path, id} = item || {};
  const imageURL = `${IMAGE_BASEURL}${backdrop_path}`;
  const [controlsViewLayout, setControlsViewLayout] = useState({
    height: 0,
    width: 0,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const refreshWidget = () => {
    refetch();
  };

  const onPageMount = () => {
    NativeAppEventEmitter.addListener(
      PAGE_REFRESH.MOVIE_DETAILS_SCREEN,
      refreshWidget,
    );

    setIsFavorite(() => {
      let isMovieFound = false;
      if (!_.isEmpty(favoriteMoviesQuery?.data?.results)) {
        isMovieFound =
          favoriteMoviesQuery?.data?.results.filter(el => el.id === movieId)
            ?.length > 0;
      }
      return isMovieFound;
    });

    setIsWatchlist(() => {
      let isMovieFound = false;
      if (!_.isEmpty(watchlistMoviesDataQuery?.data?.results)) {
        isMovieFound =
          watchlistMoviesDataQuery?.data?.results.filter(
            el => el.id === movieId,
          )?.length > 0;
      }
      return isMovieFound;
    });
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

  const toggleFavorite = () => {
    setIsFavorite(val => {
      const body: FavoriteRequestBody = {
        media_type: 'movie',
        media_id: id,
        favorite: !val,
      };
      favoritesMutation.mutateAsync(body);
      return !val;
    });
  };

  const toggleWatchlist = () => {
    setIsWatchlist(val => {
      const body: WatchlistRequestBody = {
        media_type: 'movie',
        media_id: id,
        watchlist: !val,
      };
      watchlistMutation.mutateAsync(body);
      return !val;
    });
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

        <View style={styles.movieCTAView}>
          <TouchableOpacity
            style={styles.movieCTA}
            onPress={() => {
              toggleFavorite();
            }}>
            <MaterialIcon
              name={isFavorite ? 'favorite' : 'favorite-outline'}
              size={IconSize.extraLarge}
              color={isFavorite ? COLORS.red : COLORS.azureishWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.movieCTA}
            onPress={() => {
              toggleWatchlist();
            }}>
            <MaterialIcon
              name={isWatchlist ? 'bookmark' : 'bookmark-outline'}
              size={IconSize.extraLarge}
              color={COLORS.azureishWhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default MovieDetailsScreenHeader;
